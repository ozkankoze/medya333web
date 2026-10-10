import Cursor from "@/components/Cursor";
import Hero from "@/components/Hero";
import Desktop from "@/components/Desktop";
import Chat from "@/components/Chat";
import Footer from "@/components/Footer";
import { getProjects } from "@/lib/projects";

export const revalidate = 60;

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Cursor />
      <main>
        <Hero />
        <Desktop projects={projects} />
        <Chat />
      </main>
      <Footer />
    </>
  );
}
