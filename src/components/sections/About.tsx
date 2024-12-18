import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Code2, Palette, Lightbulb } from 'lucide-react';

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Code2,
      title: 'Clean Code',
      description: 'Writing maintainable and scalable code with modern best practices.',
    },
    {
      icon: Palette,
      title: 'Creative Design',
      description: 'Crafting beautiful interfaces with attention to detail and aesthetics.',
    },
    {
      icon: Lightbulb,
      title: 'Problem Solving',
      description: 'Finding elegant solutions to complex technical challenges.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-secondary/30">
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
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground">
            I'm a passionate developer with a keen eye for design and a drive for creating
            exceptional digital experiences. With expertise in modern web technologies,
            I bring ideas to life through clean code and intuitive interfaces.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              ref={ref}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ 
                duration: 0.6,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="p-6 h-full bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-colors">
                <feature.icon className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}