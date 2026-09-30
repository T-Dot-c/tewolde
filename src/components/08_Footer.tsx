export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg, #ffffff)', borderTop: '1px solid var(--line-faint, rgba(5,5,7,0.08))', padding: '32px 0' }} className="transition-colors duration-300">
      <div
        className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left"
        style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 12, color: 'var(--muted, #71717a)' }}
      >
        <div>
          © 2026 Tewolde Lisanwork Mekonnen
        </div>
        <div style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Updated July 7, 2026
        </div>
      </div>
    </footer>
  );
}
