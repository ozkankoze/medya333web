import type { NextConfig } from "next";

/**
 * /admin eski Medya 333 finans paneline aitti.
 * ESKİ_PANEL adresi tanımlıysa /admin oraya gider; tanımlı değilse
 * bu projenin referans paneline (/panel) düşer — hiçbir koşulda 404 olmaz.
 */
const eskiPanel = process.env.ESKI_PANEL_URL?.trim();

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/admin",
        destination: eskiPanel || "/panel",
        permanent: false,
      },
      {
        source: "/admin/:yol*",
        destination: eskiPanel ? `${eskiPanel}/:yol*` : "/panel",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
