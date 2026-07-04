import { useEffect } from 'react';
import { motion } from 'framer-motion';
import BookConsultationForm from '../components/sections/BookConsultationForm';

export default function ConsultationPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FAF8F5] text-[#2A2A2A] min-h-[90vh]">
      {/* Hero section */}
      <section className="relative py-20 bg-dark text-white text-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80"
            alt="Interior design advisory meeting concept"
            className="w-full h-full object-cover img-grade filter brightness-[0.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/45 to-dark" />
        </div>
        
        <div className="wrap relative z-10 max-w-4xl mx-auto pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="eyebrow text-[#C9A96E] mb-4 block">Bespoke Design Services</span>
            <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">
              Design Enquiry &amp;<br />
              <span className="italic font-normal text-[#C9A96E]">Consultation</span>
            </h1>
            <p className="max-w-2xl mx-auto font-body text-sm font-light leading-[1.8] text-white/70">
              Share details about your space. Whether it is select granite stone slabs, custom tiling, or bespoke furniture, our specialists are ready to bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <BookConsultationForm />
      </motion.div>
    </div>
  );
}
