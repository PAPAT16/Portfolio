import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { ProfileImage } from '@/components/sections/ProfileImage';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Contact } from '@/components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <ProfileImage />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;