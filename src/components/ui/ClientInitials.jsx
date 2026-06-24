import { getClientInitials } from '../../utils/initials';

export default function ClientInitials({ name }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gradient-to-br from-stone/50 to-stone/30 font-body text-[11px] font-semibold uppercase tracking-wide text-gold"
    >
      {getClientInitials(name)}
    </span>
  );
}
