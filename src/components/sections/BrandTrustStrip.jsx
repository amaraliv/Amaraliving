import { motion } from 'framer-motion';

export default function BrandTrustStrip() {
  const stats = [
    { icon: '🏆', value: '500+', label: 'Projects Completed' },
    { icon: '🏠', value: '300+', label: 'Happy Families' },
    { icon: '⭐', value: '4.9/5', label: 'Customer Rating' },
    { icon: '📍', value: 'Pan India', label: 'Delivery' },
  ];

  const features = [
    { title: 'Premium Quality Materials', desc: 'Sourced from historical quarries' },
    { title: 'Direct Factory Pricing', desc: 'Honest rates without middleman margins' },
    { title: 'Expert Design Consultation', desc: 'Bespoke layouts tailored for you' },
    { title: 'Installation Support', desc: 'Meticulous supervision on site' },
    { title: 'Nationwide Delivery', desc: 'Seamless transit across India' },
  ];

  return (
    <section className="bg-cream py-10 md:py-14 border-b border-stone/30 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom_left,_rgba(212,175,55,0.04)_0%,_transparent_60%)]" aria-hidden="true" />
      
      <div className="wrap flex flex-col gap-10 md:gap-14 relative z-10">
        
        {/* Row 1: Brand Trust Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-x-0 md:divide-x divide-stone/60">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center px-4"
            >
              <span className="text-2xl mb-2 filter drop-shadow-sm">{stat.icon}</span>
              <span className="font-display text-2xl md:text-3xl font-bold text-dark">{stat.value}</span>
              <span className="font-body text-[10px] md:text-xs uppercase tracking-wider text-ink/65 mt-1">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Separator line */}
        <div className="line-gold opacity-30" />

        {/* Row 2: Why Amara Living */}
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="text-center">
            <span className="eyebrow">The Amara Advantage</span>
            <h3 className="font-display text-2xl md:text-3xl text-dark mt-2 font-medium">Why Amara Living</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mt-2">
            {features.map((feat, index) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="bg-white/60 hover:bg-white rounded-2xl border border-stone/50 hover:border-gold/30 p-5 md:p-6 transition-all duration-400 shadow-[0_4px_20px_-10px_rgba(8,18,41,0.03)] hover:shadow-[0_15px_30px_-15px_rgba(8,18,41,0.06)] flex flex-col items-start"
              >
                {/* Custom checkmark icon container */}
                <div className="h-7 w-7 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-3.5">
                  <svg className="h-4 w-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h4 className="font-body text-xs md:text-sm font-bold text-dark leading-snug">
                  {feat.title}
                </h4>
                <p className="font-body text-[10px] md:text-xs text-ink/50 mt-1 leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
