import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-logo" href="/">
          koyachito
        </Link>

        <nav aria-label="メインナビゲーション">
          <ul className="site-nav">
            <li>
              <Link href="/">Blog</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <a
                href="https://github.com/koyachito"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}