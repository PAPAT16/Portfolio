import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const skills = {
  frontend: [
    { name: 'React/Next.js', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Tailwind CSS', level: 95 },
    { name: 'Frontend Testing', level: 80 },
  ],
  backend: [
    { name: 'Node.js', level: 85 },
    { name: 'Python', level: 75 },
    { name: 'SQL/NoSQL', level: 80 },
    { name: 'API Design', level: 85 },
  ],
  tools: [
    { name: 'Git/GitHub', level: 90 },
    { name: 'Docker', level: 75 },
    { name: 'CI/CD', level: 80 },
    { name: 'AWS', level: 70 },
  ],
};

export function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: { 
        duration: 1,
        ease: "easeOut",
        delay: 0.3
      }
    })
  };

  return (
    <section id="skills" className="py-20 bg-secondary/30">
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
          <h2 className="text-3xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground">
            A comprehensive overview of my technical skills and proficiencies
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="frontend" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>
            {Object.entries(skills).map(([category, items]) => (
              <TabsContent key={category} value={category}>
                <div className="space-y-6">
                  {items.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ 
                        duration: 0.5,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          custom={skill.level}
                          variants={progressVariants}
                          initial="hidden"
                          animate={inView ? "visible" : "hidden"}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}