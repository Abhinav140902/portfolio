import Nav from "@/components/Nav";
import ParticleMount from "@/components/ParticleMount";
import Rail from "@/components/Rail";
import { About, Contact, Earlier, GroupTitle, Hero, ProjectChapter, RoleChapter, Skills } from "@/components/Sections";
import { projects, roles } from "@/data/content";

export default function Home() {
  return (
    <>
      <ParticleMount />
      <Nav />
      <Rail />
      <main>
        <Hero />
        <About />
        <GroupTitle id="experience" kicker="2023 — now · 4 roles" line="From internships to" accent="leading a team." />
        <RoleChapter role={roles[0]} />
        <RoleChapter role={roles[1]} flip />
        <Earlier />
        <GroupTitle id="projects" kicker="Built & shipped" line="Products I designed and shipped to" accent="real users." />
        <ProjectChapter project={projects[0]} flip />
        <ProjectChapter project={projects[1]} />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
