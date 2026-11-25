import Link from 'next/link';
import { mainNavigation } from '@/data/navigation';
import { Icon, type IconName } from '@/components/home/Icon';

export function PortfolioSidebar({ activePath }: { activePath: string }) {
  const normalizedActivePath = activePath.replace(/\/$/, '') || '/';

  return <aside className="sidebar">
    <Link href="/" className="brand-mark" aria-label="Atila home">
      <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M23.9 5.2 5.2 42h11.2l7.5-15.1 7.2 15.1h11.7L24.1 5.2Zm.1 15.1 4.1 8.2h-8.2Z" fill="currentColor"/><path d="M17.8 32.8h12.4l4.5 9.2H13.2Z" fill="currentColor" opacity=".55"/></svg>
    </Link>
    <nav className="side-navigation" aria-label="Main navigation">
      {mainNavigation.map(({ href, label, icon }) => <Link
        key={href}
        href={href}
        className={`side-link${href === normalizedActivePath ? ' is-active' : ''}`}
        aria-current={href === normalizedActivePath ? 'page' : undefined}
        title={label}
      ><Icon name={icon as IconName} /><span>{label}</span></Link>)}
    </nav>
    <div className="sidebar-footer">
      <div className="sidebar-orbit" aria-hidden="true"><span className="orbit-moon"><Icon name="moon" /></span><span className="orbit-dot" /><span className="orbit-star">✦</span></div>
      <div className="contact-prompt"><p>Have an idea<br />to explore together?</p><Link href="/contact">Contact me <Icon name="arrow" /></Link></div>
      <div className="social-links">
        <a href="https://github.com/Atila-Pasha" target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
        <a href="/rss.xml" aria-label="Articles RSS feed"><Icon name="rss" /></a>
      </div>
    </div>
  </aside>;
}
