"use client";

import { useEffect, useRef } from "react";

/**
 * Arka plandaki parlak 3B form.
 *
 * Video dosyası yok — her kare tarayıcıda ışın yürütmeyle (raymarching)
 * hesaplanıyor. WebGL açılmazsa alttaki CSS ışığı görünür kalır.
 *
 * Renk, vitrinde seçilen markaya göre değişir: Showcase bileşeni
 * window.__formRengi("#RRGGBB") çağırır.
 */

const VERT = "attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}";

const FRAG = [
  "precision highp float;",
  "uniform vec2 uRes; uniform float uT; uniform vec3 uCol;",
  "mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}",
  "float smin(float a,float b,float k){float h=clamp(0.5+0.5*(b-a)/k,0.0,1.0);return mix(b,a,h)-k*h*(1.0-h);}",
  "float sdBox(vec3 p,vec3 b,float r){vec3 q=abs(p)-b;return length(max(q,0.0))+min(max(q.x,max(q.y,q.z)),0.0)-r;}",
  "float map(vec3 p){",
  "  p.xz*=rot(uT*0.17); p.xy*=rot(0.42+uT*0.10);",
  "  float a=atan(p.z,p.x); float rr=length(p.xz);",
  "  float sec=1.2566371;",
  "  a=mod(a+sec*0.5,sec)-sec*0.5;",
  "  vec3 q=vec3(cos(a)*rr,p.y,sin(a)*rr);",
  "  float arm=sdBox(q-vec3(1.30,0.0,0.0),vec3(1.02,0.055,0.055),0.30);",
  "  float core=length(p)-0.50;",
  "  return smin(arm,core,0.55);",
  "}",
  "vec3 nrm(vec3 p){vec2 e=vec2(0.0018,0.0);return normalize(vec3(",
  "  map(p+e.xyy)-map(p-e.xyy),map(p+e.yxy)-map(p-e.yxy),map(p+e.yyx)-map(p-e.yyx)));}",
  "void main(){",
  "  vec2 uv=(gl_FragCoord.xy-0.5*uRes)/uRes.y;",
  "  vec3 ro=vec3(0.0,0.0,3.65);",
  "  vec3 rd=normalize(vec3(uv,-1.55));",
  "  float t=0.0; bool hit=false;",
  "  for(int i=0;i<72;i++){",
  "    vec3 p=ro+rd*t; float d=map(p);",
  "    if(d<0.0016){hit=true;break;}",
  "    t+=d*0.88; if(t>8.5) break;",
  "  }",
  "  vec3 bg=vec3(0.019,0.019,0.031);",
  "  bg+=uCol*0.055*pow(max(0.0,1.0-length(uv)*0.62),3.0);",
  "  vec3 col=bg;",
  "  if(hit){",
  "    vec3 p=ro+rd*t; vec3 n=nrm(p); vec3 v=-rd;",
  "    vec3 l1=normalize(vec3(-0.55,0.78,0.42));",
  "    vec3 l2=normalize(vec3(0.72,-0.38,0.52));",
  "    float fres=pow(1.0-max(dot(n,v),0.0),2.3);",
  "    float s1=pow(max(dot(n,normalize(l1+v)),0.0),140.0);",
  "    float s2=pow(max(dot(n,normalize(l2+v)),0.0),30.0);",
  "    float diff=max(dot(n,l1),0.0);",
  "    col=vec3(0.010,0.010,0.019);",
  "    col+=uCol*fres*1.45; col+=uCol*s2*1.05;",
  "    col+=vec3(1.0)*s1*1.25; col+=uCol*diff*0.085;",
  "    col=mix(col,bg,smoothstep(3.2,8.0,t));",
  "  }",
  "  col+=(fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.545)-0.5)*0.016;",
  "  gl_FragColor=vec4(col,1.0);",
  "}",
].join("\n");

declare global {
  interface Window {
    __formRengi?: (hex: string) => void;
  }
}

export default function Form3D() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;

    const gl =
      (cv.getContext("webgl", {
        antialias: false,
        alpha: false,
        depth: false,
        powerPreference: "high-performance",
      }) as WebGLRenderingContext | null) ??
      (cv.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    const derle = (tip: number, src: string) => {
      const sh = gl.createShader(tip);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
    };

    const vs = derle(gl.VERTEX_SHADER, VERT);
    const fs = derle(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uT = gl.getUniformLocation(prog, "uT");
    const uCol = gl.getUniformLocation(prog, "uCol");
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    const boyutla = () => {
      const w = Math.max(1, Math.round(cv.clientWidth * dpr));
      const h = Math.max(1, Math.round(cv.clientHeight * dpr));
      if (cv.width !== w || cv.height !== h) {
        cv.width = w;
        cv.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, cv.width, cv.height);
    };

    const simdi = [0.42, 0.36, 0.94];
    let hedef = simdi.slice();
    window.__formRengi = (hex: string) => {
      const n = parseInt(hex.slice(1), 16);
      hedef = [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
    };

    const yavas = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const bas = performance.now();
    let son = 0;
    let acik = true;
    let raf = 0;

    boyutla();
    cv.style.opacity = "1";

    const kare = (ts: number) => {
      raf = requestAnimationFrame(kare);
      if (!acik) return;
      if (ts - son < 33) return;
      const dt = Math.min(0.5, (ts - son) / 1000);
      son = ts;
      boyutla();
      const k = 1 - Math.exp(-dt / 0.4);
      for (let i = 0; i < 3; i++) simdi[i] += (hedef[i] - simdi[i]) * k;
      gl.uniform3f(uCol, simdi[0], simdi[1], simdi[2]);
      gl.uniform1f(uT, yavas ? 7 : (ts - bas) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(kare);

    // ekran dışındayken çizme — pil ve işlemci boşa gitmesin
    const io = new IntersectionObserver(
      (g) => g.forEach((e) => (acik = e.isIntersecting)),
      { threshold: 0 }
    );
    io.observe(cv);

    window.addEventListener("resize", boyutla, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", boyutla);
      delete window.__formRengi;
    };
  }, []);

  return (
    <>
      {/* WebGL açılmazsa görünen yedek */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 blur-[28px]"
        style={{
          background:
            "radial-gradient(60% 55% at 30% 36%, rgba(107,92,240,.38), transparent 70%), radial-gradient(48% 46% at 72% 62%, rgba(107,92,240,.22), transparent 72%)",
        }}
      />
      <canvas
        ref={ref}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 block h-full w-full opacity-0 transition-opacity duration-[1400ms]"
      />
    </>
  );
}
