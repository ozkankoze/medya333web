import Cursor from "@/components/Cursor";
import Hero from "@/components/Hero";
import Desktop from "@/components/Desktop";
import Hizmetler from "@/components/Hizmetler";
import Surec from "@/components/Surec";
import Sss from "@/components/Sss";
import Chat from "@/components/Chat";
import Footer from "@/components/Footer";
import { getProjects } from "@/lib/projects";
import { faqs } from "@/lib/content";
import { sssSemasi } from "@/lib/seo";

export const revalidate = 60;

export default async function Home() {
  const projects = await getProjects();

  /**
   * ⚠️ FAQPage ŞEMASI SAYFADA ÜRETİLİR, bileşenin içinde değil: aynı
   * sayfada iki FAQPage bulunması doğrulama hatası verir.
   *
   * ⚠️ ProfessionalService şeması burada TEKRARLANMAZ — o, layout.tsx
   * içinde bütün sayfalara tek seferde konuyor.
   */
  const sss = sssSemasi(faqs);

  return (
    <>
      <Cursor />
      <main>
        <Hero />
        <Desktop projects={projects} />
        <Hizmetler />
        <Surec />
        <Sss />
        <Chat />
      </main>
      <Footer />
      {sss && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sss) }}
        />
      )}
    </>
  );
}
