import React, { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (formRef.current) {
        const result = await emailjs.sendForm(
          'service_yic0k1p', // Replace with your EmailJS service ID
          'template_v6jkv17', // Replace with your EmailJS template ID
          formRef.current,
          'IV4mqUcHx0pTPEhhA' // Replace with your EmailJS public key
        );

        if (result.text === 'OK') {
          setIsSuccess(true);
          toast({
            title: "Message sent successfully!",
            description: "Thank you for your message. I will get back to you soon.",
          });
          
          // Reset form
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });

          // Reset success message after 3 seconds
          setTimeout(() => {
            setIsSuccess(false);
          }, 3000);
        }
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-navy-light relative opacity-0 transition-opacity duration-1000"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-navy to-navy-light"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-accent uppercase tracking-wider text-sm font-medium mb-2 animate-fade-in">Get In Touch</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white-off animate-fade-in animate-delay-100">Contact Me</h2>
            <div className="w-20 h-1 bg-blue-accent mx-auto mt-4 mb-6 animated-underline"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="animate-fade-in-left opacity-0">
              <h3 className="text-2xl font-semibold mb-6 text-white-off">
                Let's Start a <span className="text-blue-accent">Conversation</span>
              </h3>
              
              <p className="text-muted-foreground mb-8">
                I'm always open to new opportunities, interesting projects, and connecting with fellow developers. Feel free to reach out if you have any questions or just want to say hi!
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/40 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-blue-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white-off mb-1">Email</h4>
                    <a href="mailto:thisaranavodbandara@gmail.com" className="text-muted-foreground hover:text-blue-accent transition-colors">
                      thisaranavodbandara@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/40 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-blue-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white-off mb-1">Phone</h4>
                    <a href="tel:+94774048410" className="text-muted-foreground hover:text-blue-accent transition-colors">
                      (+94) 77 404 8410
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/40 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-blue-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white-off mb-1">Location</h4>
                    <p className="text-muted-foreground">
                      D 45/1, Mederigama, Mawanella
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in-right opacity-0">
              <form ref={formRef} onSubmit={handleSubmit} className="glass rounded-xl p-6 relative">
                {isSuccess && (
                  <div className="absolute top-0 left-0 right-0 bg-green-500/20 text-green-400 py-3 px-4 rounded-t-xl flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>Email sent successfully! We'll get back to you soon.</span>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-secondary/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-accent/50 text-white-off"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-secondary/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-accent/50 text-white-off"
                      placeholder="Your email"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-secondary/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-accent/50 text-white-off"
                    placeholder="Subject"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-secondary/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-accent/50 text-white-off resize-none"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-accent text-white-off rounded-lg hover:bg-blue-accent/90 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 size={18} />
                      Sent Successfully!
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
