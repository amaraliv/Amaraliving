export default function FooterLink({ href, icon: Icon, label, children, external = false }) {
  return (
    <a
      href={href}
      className="group flex items-start gap-3 transition-colors duration-300"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C8A35F]/20 bg-[#C8A35F]/[0.02] text-[#C8A35F]/80 transition-all duration-300 group-hover:border-[#C8A35F]/60 group-hover:bg-[#C8A35F]/10 group-hover:text-[#C8A35F] group-hover:shadow-[0_0_12px_rgba(200,163,95,0.2)]">
        <Icon className="h-4 w-4 stroke-[1.5]" />
      </span>
      <span className="min-w-0 pt-0.5">
        {label && (
          <span className="block font-body text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#C8A35F]/65 transition-colors duration-300 group-hover:text-[#C8A35F]">
            {label}
          </span>
        )}
        <span className="mt-0.5 block font-body text-sm leading-snug text-cream/80 transition-colors duration-300 group-hover:text-[#C8A35F]">
          {children}
        </span>
      </span>
    </a>
  );
}
