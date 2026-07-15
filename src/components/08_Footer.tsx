export default function Footer() {
  return (
    <footer className="w-full py-8 bg-cream border-t border-token-border">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left font-sans text-xs text-muted-foreground/75">
        <div>
          © 2026 Tewolde Lisanwork Mekonnen
        </div>
        <div className="font-mono text-[11px] tracking-wider uppercase">
          Updated July 7, 2026
        </div>
      </div>
    </footer>
  );
}
