import { useRef, useEffect } from 'react';
import { gsap } from '../../utils/gsap';
import { FOOTER_COLLECTIONS, FOOTER_SOCIAL, FOOTER_STUDIOS } from '../../constants/footer';
import { IconMail, IconMapPin, IconPhone } from '../ui/FooterIcons';
import FooterLink from '../ui/FooterLink';
import logoImg from '../../assets/images/amara-logo.png';

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
      className="relative text-cream overflow-hidden border-t border-[#C8A35F]/20 bg-[#0A0A0A] shadow-[inset_0_1px_0_0_rgba(200,163,95,0.1),0_-8px_32px_rgba(200,163,95,0.06)]"
    >
      {/* Subtle gold radial glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,163,95,0.06),transparent_60%)]" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1850px] px-4 sm:px-6 md:px-8 lg:px-10 pt-1 pb-5 md:pt-1.5 md:pb-7 lg:pt-2 lg:pb-8">
        <div className="foot-brand">
          {/* 4 columns on desktop, 2 columns on tablet, 1 column on mobile */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start">

            {/* Column 1: Logo & Company Description */}
            <div className="flex flex-col items-start lg:col-span-1">
              <div className="flex flex-col items-start">
                <img
                  src={logoImg}
                  alt="Amara Living"
                  className="h-60 md:h-55 lg:h-45 -ml-2 md:-ml-3 -mt-6 md:-mt-8 object-contain filter brightness-[1.05]"
                />

              </div>
              <p className="-mt-6 md:-mt-8 max-w-xs font-body text-sm leading-relaxed text-cream/80 font-medium">
                Amara Living is a leading exporter of premium tiles, granites, and furniture from India.
                Since 2010, we have been delivering quality products to customers worldwide, backed by
                reliable service, competitive pricing, and timely delivery.
              </p>
              <p className="mt-2.5 font-body text-xs uppercase tracking-[0.24em] text-[#C8A35F] font-bold">
                Est. 2010
              </p>
            </div>

            {/* Column 2: Experience Centers + Product Range stacked */}
            <div className="flex flex-col gap-6 foot-item pt-6">
              {/* Experience Centers */}
              <div>
                <p className="font-display text-sm tracking-[0.18em] text-[#C8A35F] uppercase font-bold mb-3">Experience Centers</p>
                <ul className="space-y-2.5">
                  {FOOTER_STUDIOS.map((studio) => (
                    <li key={studio.city}>
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#C8A35F]/25 bg-[#C8A35F]/[0.04] text-[#C8A35F] transition-all duration-300">
                          <IconMapPin className="h-4 w-4 stroke-[1.5]" />
                        </span>
                        <div>
                          <p className="font-body text-sm font-bold text-cream">{studio.city}</p>
                          <p className="font-body text-xs text-cream/65 leading-relaxed mt-0.5">{studio.region}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Product Range — shifted below Experience Centers */}
              <div>
                <p className="font-display text-sm tracking-[0.18em] text-[#C8A35F] uppercase font-bold mb-3">Product Range</p>
                <ul className="space-y-2">
                  {FOOTER_COLLECTIONS.map((item) => (
                    <li key={item} className="group/item flex items-center gap-2 font-body text-sm font-semibold text-cream/85 hover:text-[#C8A35F] transition-colors duration-300 cursor-pointer">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C8A35F]/70 group-hover/item:scale-125 transition-transform duration-300" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 3: Get In Touch */}
            <div className="foot-item pl-6 md:pl-8 pt-6">
              <p className="font-display text-sm tracking-[0.18em] text-[#C8A35F] uppercase font-bold mb-3">Get In Touch</p>
              <div className="space-y-2">
                <FooterLink href="mailto:connect@amaraliv.com" icon={IconMail} label="General Inquiries">
                  connect@amaraliv.com
                </FooterLink>
                <FooterLink href="mailto:sales@amaraliv.com" icon={IconMail} label="Sales Department">
                  sales@amaraliv.com
                </FooterLink>
                <FooterLink href="tel:7397623509" icon={IconPhone} label="Mobile Contact">
                  +91 73976 23509
                </FooterLink>
                <div className="text-[10px] font-body text-cream/50 pt-2 border-t border-[#C8A35F]/15">
                  <span className="block text-[#C8A35F] uppercase tracking-wider font-bold mb-0.5">Tax Registration</span>
                  GST: 33BRYPA3994H1ZB
                </div>
              </div>
            </div>

            {/* Column 4: Follow Us */}
            <div className="foot-item pt-6">
              <p className="font-display text-sm tracking-[0.18em] text-[#C8A35F] uppercase font-bold mb-3">Follow Us</p>
              <p className="mb-3 font-body text-sm font-medium leading-relaxed text-cream/70">
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
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C8A35F]/25 bg-[#C8A35F]/[0.04] text-[#C8A35F]/85 transition-all duration-300 hover:border-[#C8A35F]/70 hover:bg-[#C8A35F]/12 hover:text-[#C8A35F] hover:shadow-[0_0_14px_rgba(200,163,95,0.3)]"
                  >
                    <Icon className="h-4 w-4 stroke-[1.5]" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom copyright row with thin warm gold divider line */}
        <div className="foot-item mt-4 pt-2.5 border-t border-[#C8A35F]/15 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-cream/45">
            &copy; {new Date().getFullYear()} Amara Living. All rights reserved.
          </p>
          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-[#C8A35F]/65 font-medium">
            Premium Surfaces & Furniture Since 2010
          </p>
        </div>
      </div>
    </footer>
  );
}