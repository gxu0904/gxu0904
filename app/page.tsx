import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';

export default function Page() {
  return (
    <main>
      <header className="border-b border-navy-200/80">
        <div className="container h-14 flex items-center justify-between">
          <a href="#" className="font-semibold">Grace Xu</a>
          <nav className="hidden md:flex items-center gap-3 text-sm">
            <a href="#about" className="hover:underline">About</a>
            <a href="#projects" className="hover:underline">Projects</a>
            <a href="#contact" className="hover:underline">Resume + Contact</a>
          </nav>
        </div>
      </header>
      <Hero />
      <About />
      <Projects />
      <Contact />
      <footer className="border-t border-navy-200/80">
        <div className="container py-6 text-sm text-navy-600">© {new Date().getFullYear()} Grace Xu</div>
      </footer>
    </main>
  );
}


