import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';

export function ProfileImage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <Card className="overflow-hidden bg-gradient-to-b from-background/50 to-background p-4 md:p-6">
            <figure className="relative aspect-square overflow-hidden rounded-lg">
              <img
                src="/src/IMG-20240926-WA0006.jpg"
                alt="Professional portrait of a developer wearing a blue and white chevron pattern shirt"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg" />
            </figure>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Creative Developer & Designer
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}