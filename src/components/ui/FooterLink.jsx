export default function FooterLink({ href, icon: Icon, label, children, external = false }) {
  return (
    <a
      href={href}
      className="group flex items-start gap-3 transition-colors"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-cream/15 bg-cream/[0.04] text-gold/85 transition-all group-hover:border-gold/40 group-hover:bg-gold/10 group-hover:text-gold">
        <Icon />
      </span>
      <span className="min-w-0 pt-0.5">
        <span className="block font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/45">
          {label}
        </span>
        <span className="mt-0.5 block font-body text-sm leading-snug text-cream/75 transition-colors group-hover:text-gold">
          {children}
        </span>
      </span>
    </a>
  );
}
