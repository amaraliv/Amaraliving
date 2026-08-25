export default function FooterLink({ href, icon: Icon, label, children, external = false }) {
  return (
    <a
      href={href}
      className="group flex items-start gap-3 transition-colors duration-300"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C8102E]/25 bg-[#C8102E]/[0.03] text-[#C8102E]/85 transition-all duration-300 group-hover:border-[#C8102E]/70 group-hover:bg-[#C8102E]/12 group-hover:text-[#C8102E] group-hover:shadow-[0_0_12px_rgba(200,16,46,0.25)]">
        <Icon className="h-4 w-4 stroke-[1.5]" />
      </span>
      <span className="min-w-0 pt-0.5">
        {label && (
          <span className="block font-body text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#C8102E]/70 transition-colors duration-300 group-hover:text-[#C8102E]">
            {label}
          </span>
        )}
        <span className="mt-0.5 block font-body text-sm leading-snug text-[#333333] transition-colors duration-300 group-hover:text-[#C8102E]">
          {children}
        </span>
      </span>
    </a>
  );
}
