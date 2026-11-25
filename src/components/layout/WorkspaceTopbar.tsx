import Image from 'next/image';
import Link from 'next/link';
import { HomeSearch } from '@/components/home/HomeSearch';
import type { SearchItem } from '@/lib/searchItems';
import { ThemeButton } from '@/components/home/ThemeButton';
import { publicAsset } from '@/lib/site';

export function WorkspaceTopbar({ items }: { items: SearchItem[] }) {
  return <header className="topbar">
    <HomeSearch items={items} />
    <div className="topbar-actions">
      <ThemeButton />
      <Link className="profile-avatar" href="/about/" aria-label="About Atila" title="About Atila">
        <Image src={publicAsset('/images/atila-avatar.webp')} alt="" fill sizes="40px" />
      </Link>
    </div>
  </header>;
}
