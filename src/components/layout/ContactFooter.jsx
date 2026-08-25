import { useRef, useEffect } from 'react';
import { gsap } from '../../utils/gsap';
import { FOOTER_COLLECTIONS, FOOTER_SOCIAL, FOOTER_STUDIOS } from '../../constants/footer';
import { IconMail, IconMapPin, IconPhone } from '../ui/FooterIcons';
import FooterLink from '../ui/FooterLink';
import logoImg from '../../assets/logo/logo.png';

export default function ContactFooter() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.foot-item', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: 'top 82%' },
      });
      gsap.from('.foot-brand', {
        y: 32,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: { trigger: ref.current, start: 'top 88%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative text-[#111111] overflow-hidden border-t border-[#0B0B0B]/10 bg-[#FAF6F0] shadow-[0_-4px_24px_rgba(0,0,0,0.03)]"
    >
      {/* Subtle ambient radial glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,16,46,0.05),transparent_60%)]" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1850px] px-4 sm:px-6 md:px-8 lg:px-10 pt-4 pb-6 md:pt-6 md:pb-8 lg:pt-8 lg:pb-10">
        <div className="foot-brand">
          {/* 4 columns on desktop, 2 columns on tablet, 1 column on mobile */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start">

            {/* Column 1: Logo & Company Description */}
            <div className="flex flex-col items-start lg:col-span-1">
              <div className="flex flex-col items-start">
                <img
                  src={logoImg}
                  alt="Amara Living"
                  className="h-20 sm:h-24 md:h-28 object-contain"
                />
              </div>
              <p className="mt-2 max-w-xs font-body text-sm leading-[1.8] text-[#444444] font-normal" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Amara Living is a leading exporter of premium tiles, granites, and furniture from India.
                Since 2010, we have been delivering quality products to customers worldwide, backed by
                reliable service, competitive pricing, and timely delivery.
              </p>
              <p className="mt-3 font-body text-xs uppercase tracking-[0.3em] text-[#C8102E] font-semibold" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Est. 2010
              </p>
            </div>

            {/* Column 2: Experience Centers + Product Range stacked */}
            <div className="flex flex-col gap-6 foot-item pt-6">
              {/* Experience Centers */}
              <div>
                <p className="font-body text-xs tracking-[0.35em] text-[#C8102E] uppercase font-semibold mb-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Experience Centers
                </p>
                <ul className="space-y-3">
                  {FOOTER_STUDIOS.map((studio) => (
                    <li key={studio.city}>
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#C8102E]/25 bg-[#C8102E]/[0.06] text-[#C8102E] transition-all duration-300">
                          <IconMapPin className="h-4 w-4 stroke-[1.5]" />
                        </span>
                        <div>
                          <p className="font-body text-sm font-semibold text-[#111111]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{studio.city}</p>
                          <p className="font-body text-xs text-[#555555] leading-relaxed mt-0.5" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{studio.region}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Product Range — shifted below Experience Centers */}
              <div>
                <p className="font-body text-xs tracking-[0.35em] text-[#C8102E] uppercase font-semibold mb-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Product Range
                </p>
                <ul className="space-y-2.5">
                  {FOOTER_COLLECTIONS.map((item) => (
                    <li key={item} className="group/item flex items-center gap-2.5 font-body text-sm font-medium text-[#333333] hover:text-[#C8102E] transition-colors duration-300 cursor-pointer" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C8102E]/70 group-hover/item:scale-125 transition-transform duration-300" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 3: Get In Touch */}
            <div className="foot-item pl-0 md:pl-8 pt-6">
              <p className="font-body text-xs tracking-[0.35em] text-[#C8102E] uppercase font-semibold mb-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Get In Touch
              </p>
              <div className="space-y-3">
                <FooterLink href="mailto:connect@amaraliv.com" icon={IconMail} label="General Inquiries">
                  connect@amaraliv.com
                </FooterLink>
                <FooterLink href="mailto:sales@amaraliv.com" icon={IconMail} label="Sales Department">
                  sales@amaraliv.com
                </FooterLink>
                <FooterLink href="tel:7397623509" icon={IconPhone} label="Mobile Contact">
                  +91 73976 23509
                </FooterLink>
                <div className="text-[11px] font-body text-[#666666] pt-3 border-t border-[#0B0B0B]/10" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  <span className="block text-[#C8102E] uppercase tracking-wider font-semibold mb-0.5">Tax Registration</span>
                  GST: 33BRYPA3994H1ZB
                </div>
              </div>
            </div>

            {/* Column 4: Follow Us */}
            <div className="foot-item pt-6">
              <p className="font-body text-xs tracking-[0.35em] text-[#C8102E] uppercase font-semibold mb-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Follow Us
              </p>
              <p className="mb-4 font-body text-sm font-normal leading-[1.8] text-[#555555]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Project showcases, new arrivals, and design inspiration.
              </p>
              <div className="flex gap-3">
                {FOOTER_SOCIAL.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C8102E]/25 bg-[#C8102E]/[0.06] text-[#C8102E] transition-all duration-300 hover:border-[#C8102E] hover:bg-[#C8102E] hover:text-white hover:shadow-[0_4px_12px_rgba(200,16,46,0.3)]"
                  >
                    <Icon className="h-4 w-4 stroke-[1.5]" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom copyright row with thin divider line */}
        <div className="foot-item mt-6 pt-4 border-t border-[#0B0B0B]/10 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <p className="font-body text-xs text-[#777777]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            &copy; {new Date().getFullYear()} Amara Living. All rights reserved.
          </p>
          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-[#C8102E] font-semibold" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Premium Surfaces &amp; Furniture Since 2010
          </p>
        </div>
      </div>
    </footer>
  );
}