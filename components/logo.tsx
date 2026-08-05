import Link from "next/link";
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="logo" aria-label="Living Pages home">
      <span className="logo-mark">
        <i />
        <i />
        <i />
      </span>
      {!compact && <span>Living Pages</span>}
    </Link>
  );
}
