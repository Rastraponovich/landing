import { About } from '../../../widgets/about';
import { Contact } from '../../../widgets/contact';
import { Hero } from '../../../widgets/hero';
import { Projects } from '../../../widgets/projects';
import { Stack } from '../../../widgets/stack';

export function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Stack />
      <Projects />
      <Contact />
    </main>
  );
}
