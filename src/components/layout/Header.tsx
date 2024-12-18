import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b' : ''}`}>
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold font-dancing-script">Oluwatimilehin</h1>
        </motion.div>

        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button 
            asChild 
            className="bg-black hover:bg-black/80 text-white"
          >
            <a 
              href="https://github.com/PAPAT16" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="flex items-center justify-center"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button 
            asChild 
            className="bg-black hover:bg-black/80 text-white"
          >
            <a 
              href="https://www.linkedin.com/in/timilehin-samuel-6143942b6/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BSG5641DdQoOkDYrmvh78pQ%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex items-center justify-center"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button 
            asChild 
            className="bg-black hover:bg-black/80 text-white"
          >
            <a 
              href="mailto:timilehinsamuel505@gmail.com" 
              aria-label="Send Email"
              className="flex items-center justify-center"
            >
              <Mail className="h-5 w-5" />
            </a>
          </Button>
        </div>

        <div className="md:hidden">
          <Button 
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden absolute top-16 left-0 w-full bg-background/95 backdrop-blur-md"
        >
          <div className="container mx-auto px-4 py-6">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center space-x-4 mt-4">
              <Button 
                asChild 
                className="bg-black hover:bg-black/80 text-white"
              >
                <a 
                  href="https://github.com/PAPAT16" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="flex items-center justify-center"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button 
                asChild 
                className="bg-black hover:bg-black/80 text-white"
              >
                <a 
                  href="https://www.linkedin.com/in/timilehin-samuel-6143942b6/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BSG5641DdQoOkDYrmvh78pQ%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="flex items-center justify-center"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button 
                asChild 
                className="bg-black hover:bg-black/80 text-white"
              >
                <a 
                  href="mailto:timilehinsamuel505@gmail.com" 
                  aria-label="Send Email"
                  className="flex items-center justify-center"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}