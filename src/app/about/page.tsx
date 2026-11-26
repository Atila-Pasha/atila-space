import Link from 'next/link';
import type { Metadata } from 'next';
import { getArticles, getNotes } from '@/content/loaders';
import { Icon } from '@/components/home/Icon';
import { HomePortraitScene } from '@/components/home/HomePortraitScene';
import { PortfolioSidebar } from '@/components/layout/PortfolioSidebar';
import { WorkspaceTopbar } from '@/components/layout/WorkspaceTopbar';
import { createSearchItems } from '@/lib/searchItems';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'About',
  description:
    'About Atila Pashazadeh (Atila Pasha / آتیلا پاشازاده / آتیلا پاشا) — Statistics student, Python developer, and backend engineer.',
  path: '/about/',
  image: '/images/atila-about.jpg',
  imageAlt: 'Atila Pashazadeh (Atila Pasha) in violet studio lighting',
});

export default async function AboutPage() {
  const [articles, notes] = await Promise.all([getArticles(), getNotes()]);
  const searchItems = createSearchItems(articles, notes);

  return <main className="portfolio-frame about-frame">
    <PortfolioSidebar activePath="/about/" />

    <section className="home-workspace about-workspace">
      <WorkspaceTopbar items={searchItems} />
      <div className="about-main">
        <article className="about-card" aria-labelledby="about-title">
          <HomePortraitScene
            sceneClassName="about-portrait-scene"
            imageClassName="about-portrait"
            image="/images/atila-about.jpg"
            alt="Atila Pashazadeh (Atila Pasha) in violet studio lighting"
            sizes="(max-width: 760px) 100vw, 58vw"
          />
          <div className="about-photo-shade" aria-hidden="true" />
          <div className="about-copy">
            <div className="about-eyebrow"><Icon name="sparkle" /><span>A LITTLE ABOUT MY JOURNEY</span></div>
            <h1 id="about-title">About Me</h1>
            <p className="about-lead">I&apos;m Atila Pashazadeh (Atila Pasha), a Statistics student, Python developer, and someone deeply curious about how things work.</p>
            <div className="about-prose">
              <p>My interests lie at the intersection of software engineering, mathematics, and artificial intelligence. I enjoy building things, exploring ideas, and understanding the principles behind the technology I use. I&apos;m particularly interested in backend development, machine learning, and intelligent systems.</p>
              <p>I believe that good engineering is not just about writing code that works, but about understanding problems, making thoughtful decisions, and building solutions that stand the test of time.</p>
              <p>Beyond programming, I&apos;m drawn to books, philosophy, and the kind of questions that don&apos;t always have straightforward answers. I value curiosity, independent thinking, and the process of learning through experimentation.</p>
              <p>This website is a small reflection of who I am — a place to share my work, document ideas, collect notes, and explore things that catch my attention.</p>
              <p className="about-persian" lang="fa" dir="rtl">آتیلا پاشازاده (آتیلا پاشا) — برنامه‌نویس پایتون، علاقه‌مند به توسعه بک‌اند، هوش مصنوعی و دانشجوی آمار.</p>
            </div>
            <p className="about-mantra">Still learning. Still building. Always curious.</p>
            <Link className="button button-primary about-contact" href="/contact">Let’s connect <Icon name="arrow" /></Link>
          </div>
          <div className="about-image-caption"><span /> ATILA PASHAZADEH <i>·</i> STILL EXPLORING</div>
        </article>
      </div>
    </section>
  </main>;
}
