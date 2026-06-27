import { useRef, useEffect } from 'react';
import { gsap } from '../../utils/gsap';
import { FOOTER_COLLECTIONS, FOOTER_SOCIAL, FOOTER_STUDIOS } from '../../constants/footer';
import { IconMail, IconMapPin, IconPhone } from '../ui/FooterIcons';
import FooterLink from '../ui/FooterLink';

export default function ContactFooter() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.foot-line', {
        scaleX: 0,
        transformOrigin: 'left',
        duration: 1.2,
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      });
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
    <footer ref={ref} id="contact" className="relative bg-dark text-cream">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(212,175,55,0.07),transparent_55%)]" aria-hidden="true" />

      <div className="wrap relative py-10 md:py-12 lg:py-14">
        <div className="foot-brand">
          <div className="foot-line mb-5 h-px w-full max-w-xs bg-gold/40" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6 lg:items-start">
            <div className="sm:col-span-2 lg:col-span-4">
              <h2 className="font-display text-3xl font-medium leading-tight md:text-4xl lg:text-[2.75rem]">
                Amara <span className="italic text-gold">Living</span>
              </h2>
              <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-cream/65">
                A premium destination for granite, designer tiles, and bespoke furniture — curated,
                fabricated, and installed for refined residential and commercial interiors across South India.
              </p>
              <p className="mt-3 font-body text-xs uppercase tracking-[0.24em] text-gold/75">
                Est. 2010 · Chennai & Madurai
              </p>
            </div>

            <div className="foot-item grid gap-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4 lg:gap-6">
              <div>
                <p className="eyebrow mb-4">Showrooms</p>
                <ul className="space-y-3">
                  {FOOTER_STUDIOS.map((studio) => (
                    <li key={studio.city}>
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-cream/15 bg-cream/[0.04] text-gold/85">
                          <IconMapPin />
                        </span>
                        <div>
                          <p className="font-body text-sm font-medium text-cream/85">{studio.city}</p>
                          <p className="font-body text-xs text-cream/50">{studio.region}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="eyebrow mb-4">Product Range</p>
                <ul className="space-y-2.5">
                  {FOOTER_COLLECTIONS.map((item) => (
                    <li key={item} className="flex items-center gap-2 font-body text-sm text-cream/70">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-gold/70" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="eyebrow mb-4">Get In Touch</p>
                <div className="space-y-3">
                  <FooterLink href="mailto:hello@amaraliving.com" icon={IconMail} label="Email">
                    hello@amaraliving.com
                  </FooterLink>
                  <FooterLink href="tel:+914412345678" icon={IconPhone} label="Phone">
                    +91 44 1234 5678
                  </FooterLink>
                </div>
              </div>

              <div>
                <p className="eyebrow mb-4">Follow Us</p>
                <p className="mb-4 font-body text-sm leading-relaxed text-cream/55">
                  Project showcases, new arrivals, and design inspiration.
                </p>
                <div className="flex gap-2.5">
                  {FOOTER_SOCIAL.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-sm border border-cream/15 bg-cream/[0.04] text-cream/60 transition-all hover:border-gold/40 hover:bg-gold/10 hover:text-gold hover:shadow-glow-sm"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="foot-item mt-6 flex flex-col justify-between gap-3 border-t border-cream/10 pt-4 md:flex-row md:items-center">
          <p className="font-body text-xs text-cream/40">
            &copy; {new Date().getFullYear()} Amara Living. All rights reserved.
          </p>
          <p className="font-body text-[10px] uppercase tracking-[0.32em] text-cream/35">
            Premium Surfaces & Furniture Since 2010
          </p>
        </div>
      </div>
    </footer>
  );
}
