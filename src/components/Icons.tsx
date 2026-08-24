type P = { className?: string };

const base = "h-5 w-5";

export function IconBuilding({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M15 21V9h2a2 2 0 0 1 2 2v10M9 7h2M9 11h2M9 15h2" />
    </svg>
  );
}
export function IconCart({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" />
      <path d="M2.5 3h2.2l2.3 12.2a1.6 1.6 0 0 0 1.6 1.3h9.1a1.6 1.6 0 0 0 1.6-1.3L21 7.5H6" />
    </svg>
  );
}
export function IconTarget({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" />
    </svg>
  );
}
export function IconSearch({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" /><path d="m20 20-3.6-3.6" />
    </svg>
  );
}
export function IconRefresh({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 11a8 8 0 0 0-14-4.5L4 9M4 13a8 8 0 0 0 14 4.5l2-2.5" /><path d="M4 4v5h5M20 20v-5h-5" />
    </svg>
  );
}
export function IconShield({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 3v6c0 4.3-2.9 7.6-7 9-4.1-1.4-7-4.7-7-9V6l7-3Z" /><path d="m9 12 2 2 4-4" />
    </svg>
  );
}
export function IconCheck({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}
export function IconArrow({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
export function IconExternal({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4h6v6M20 4l-8.5 8.5" /><path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
    </svg>
  );
}
export function IconWhatsApp({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.6 2 2.17 6.43 2.17 11.87c0 1.74.46 3.44 1.32 4.94L2 22l5.35-1.4a9.86 9.86 0 0 0 4.69 1.19h.01c5.43 0 9.86-4.43 9.86-9.87 0-2.64-1.03-5.12-2.89-6.98A9.8 9.8 0 0 0 12.04 2Zm0 17.98h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.16 8.16 0 0 1-1.25-4.37c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.25.86 5.8 2.41a8.15 8.15 0 0 1 2.4 5.8c0 4.52-3.68 8.2-8.2 8.2Z" />
    </svg>
  );
}
export function IconPhone({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.2 2 2 0 0 1 6 4l.5-1Z" />
    </svg>
  );
}
export function IconMail({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}
export function IconPin({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" /><circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}
export function IconInstagram({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function IconFacebook({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.3-.04-1.3-.13-2.47-.13-2.44 0-4.11 1.49-4.11 4.23v2.2H7.4V13h2.72v8h3.38Z" />
    </svg>
  );
}
export function IconLinkedin({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M6.94 8.5H3.9V21h3.04V8.5ZM5.42 3a1.76 1.76 0 1 0 0 3.52 1.76 1.76 0 0 0 0-3.52ZM20.1 13.9c0-3.3-1.77-4.84-4.12-4.84-1.9 0-2.75 1.05-3.22 1.78V8.5H9.72c.04.86 0 12.5 0 12.5h3.04v-6.98c0-.33.02-.66.12-.9.26-.66.86-1.34 1.87-1.34 1.32 0 1.85 1 1.85 2.48V21h3.5v-7.1Z" />
    </svg>
  );
}
export function IconYoutube({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.27 5 12 5 12 5s-6.27 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.73 19 12 19 12 19s6.27 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.02V8.98L15.2 12 10 15.02Z" />
    </svg>
  );
}

export const iconMap = {
  building: IconBuilding,
  cart: IconCart,
  target: IconTarget,
  search: IconSearch,
  refresh: IconRefresh,
  shield: IconShield,
} as const;
