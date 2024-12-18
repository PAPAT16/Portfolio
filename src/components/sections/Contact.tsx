import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, Phone } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// Initialize EmailJS with your public key
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'timilehinsamuel505@gmail.com',
      href: 'mailto:timilehinsamuel505@gmail.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+234 7087905841',
      href: 'tel:+234 7087905841',
    },
    {
      icon: MessageSquare,
      title: 'LinkedIn',
      value: 'timilehin samuel',
      href: 'https://www.linkedin.com/in/timilehin-samuel-6143942b6/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BpfZmx1owRiKjBrRIIMdGDA%3D%3D',
    },
  ];

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_name: 'Timilehin', // Your name
      };

      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        toast.success('Message sent successfully! I will get back to you soon.');
        reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Email error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  };

  return (
    <section id="contact" className="py-20">
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
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg text-muted-foreground">
            Have a project in mind? Let's work together to bring your ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
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
              <Card className="p-6 text-center hover:bg-secondary/50 transition-colors">
                <item.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.value}
                </a>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto mt-16"
        >
          <Card className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={formAnimation} custom={0} animate={inView ? "visible" : "hidden"}>
                  <Input
                    placeholder="Name"
                    {...register("name", { required: "Name is required" })}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <span className="text-sm text-red-500">{errors.name.message}</span>
                  )}
                </motion.div>
                <motion.div variants={formAnimation} custom={1} animate={inView ? "visible" : "hidden"}>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">{errors.email.message}</span>
                  )}
                </motion.div>
              </div>
              <motion.div variants={formAnimation} custom={2} animate={inView ? "visible" : "hidden"}>
                <Input
                  placeholder="Subject"
                  {...register("subject", { required: "Subject is required" })}
                  className={errors.subject ? "border-red-500" : ""}
                />
                {errors.subject && (
                  <span className="text-sm text-red-500">{errors.subject.message}</span>
                )}
              </motion.div>
              <motion.div variants={formAnimation} custom={3} animate={inView ? "visible" : "hidden"}>
                <Textarea
                  placeholder="Your message"
                  rows={6}
                  {...register("message", { required: "Message is required" })}
                  className={errors.message ? "border-red-500" : ""}
                />
                {errors.message && (
                  <span className="text-sm text-red-500">{errors.message.message}</span>
                )}
              </motion.div>
              <motion.div variants={formAnimation} custom={4} animate={inView ? "visible" : "hidden"}>
                <Button
                  className="w-full"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </motion.div>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}