import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, Download, Send } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600/10 via-indigo-500/10 to-purple-600/10">
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center relative z-10">
        <div className="space-y-6 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            Hi, I'm <span className="text-primary">Oluwatimilehin Samuel</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0"
          >
            A passionate Full Stack Developer crafting innovative digital solutions
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 100 }}
            className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
          >
            <Button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group w-full sm:w-auto"
            >
              <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              Contact Me
            </Button>
            <Button 
              asChild
              className="group w-full sm:w-auto"
            >
              <a 
                href="/Grey Modern Professional CV Resume (1).pdf" 
                download 
                className="flex items-center justify-center"
              >
                <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Download CV
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Profile Image Placeholder or Component */}
        <div className="hidden md:flex items-center justify-center">
          {/* Add your profile image component here */}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.6, 
          type: "spring", 
          stiffness: 100 
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <Button 
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            });
          }}
          className="animate-bounce"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </motion.div>
    </section>
  );
}