import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge as ShadcnBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform built with Vue.js and Node.js',
    image: "src/Screenshot_6-12-2024_115720_content-theta-eight.vercel.app.jpeg",
    tags: ['Vue.js', 'Node.js', 'Bootstrap'],
    liveUrl: 'https://content-theta-eight.vercel.app/',
    githubUrl: 'https://github.com/PAPAT16/Content',
  },
  {
    title: 'Task Management App',
    description: 'A comprehensive task management application with user authentication, task creation, and progress tracking.',
    image: "src/Screenshot 2024-12-06 114658 task.png",
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    liveUrl: 'https://to-do-list-xi-ten-11.vercel.app/',
    githubUrl: 'https://github.com/PAPAT16/To-Do-List',
  },
  {
    title: 'Reaction Timer App',
    description: 'A Vue.js Reaction Timer App To Test Your Reaction Speed',
    image:"src/Screenshot 2024-12-06 115308 reaction.png",
    tags: ['Vue.js', 'HTML', 'CSS'],
    liveUrl: 'https://reaction-timer-snowy.vercel.app/',
    githubUrl: 'https://github.com/PAPAT16/Reaction-Timer',
  },
];

export function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.8,
            type: "spring",
            bounce: 0.3
          }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground">
            A selection of my recent work and personal projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ 
                duration: 0.6,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="overflow-hidden h-full">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <ShadcnBadge key={tag}>
                        {tag}
                      </ShadcnBadge>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button 
                      asChild
                      className="w-full"
                    >
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button 
                      asChild
                      className="w-full"
                    >
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}