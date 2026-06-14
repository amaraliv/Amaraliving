export function getClientInitials(name) {
  const parts = name
    .replace(/[^a-zA-Z\s&]/g, '')
    .split(/[\s&]+/)
    .filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }

  return (parts[0]?.slice(0, 2) ?? 'AL').toUpperCase();
}
