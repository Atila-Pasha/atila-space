import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { Icon } from '@/components/home/Icon';
import { PortfolioSidebar } from '@/components/layout/PortfolioSidebar';
import { WorkspaceTopbar } from '@/components/layout/WorkspaceTopbar';
import { getArticles, getNotes } from '@/content/loaders';
import { createSearchItems } from '@/lib/searchItems';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact',
  description:
    'Get in touch with Atila Pashazadeh (Atila Pasha / آتیلا پاشازاده / آتیلا پاشا) via email, GitHub, Telegram, or Instagram.',
  path: '/contact/',
});

export default async function ContactPage() {
  const [articles, notes] = await Promise.all([getArticles(), getNotes()]);
  const searchItems = createSearchItems(articles, notes);

  return <main className="portfolio-frame contact-frame">
    <PortfolioSidebar activePath="/contact/" />
    <section className="home-workspace contact-workspace">
      <WorkspaceTopbar items={searchItems} />
      <div className="contact-main">
        <section className="contact-card" aria-labelledby="contact-title">
          <div className="contact-wave" aria-hidden="true" />
          <div className="contact-info">
            <p className="page-eyebrow">LET’S CONNECT</p>
            <h1 id="contact-title">Contact</h1>
            <p className="contact-subtitle">Let’s connect.</p>
            <p className="contact-intro">Feel free to reach out to Atila Pashazadeh (Atila Pasha / <bdi lang="fa" dir="rtl">آتیلا پاشازاده</bdi>) for collaborations, questions, or just to say hello!</p>
            <div className="contact-methods">
              <a className="contact-method" href="mailto:AtilaPashazdeh@gmail.com">
                <span className="contact-method-icon"><Icon name="mail" /></span>
                <span><strong>Email</strong><small>AtilaPashazdeh@gmail.com</small></span>
                <Icon className="contact-method-arrow" name="arrow" />
              </a>
              <a className="contact-method" href="https://github.com/Atila-Pasha" target="_blank" rel="noreferrer">
                <span className="contact-method-icon"><Icon name="github" /></span>
                <span><strong>GitHub</strong><small>@Atila-Pasha</small></span>
                <Icon className="contact-method-arrow" name="arrow" />
              </a>
              <a className="contact-method" href="https://t.me/AtilaPashazadeh" target="_blank" rel="noreferrer">
                <span className="contact-method-icon"><Icon name="telegram" /></span>
                <span><strong>Telegram</strong><small>@AtilaPashazadeh</small></span>
                <Icon className="contact-method-arrow" name="arrow" />
              </a>
              <a className="contact-method" href="https://instagram.com/Atilapasha_" target="_blank" rel="noreferrer">
                <span className="contact-method-icon"><Icon name="instagram" /></span>
                <span><strong>Instagram</strong><small>@Atilapasha_</small></span>
                <Icon className="contact-method-arrow" name="arrow" />
              </a>
            </div>
          </div>
          <div className="contact-form-panel"><ContactForm /></div>
          <p className="contact-signoff"><span /> BUILD SOMETHING MEANINGFUL</p>
        </section>
      </div>
    </section>
  </main>;
}
