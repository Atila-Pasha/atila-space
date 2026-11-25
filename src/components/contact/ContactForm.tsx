'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { Icon } from '@/components/home/Icon';

const contactEmail = 'AtilaPashazdeh@gmail.com';

export function ContactForm() {
  const [status, setStatus] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const message = String(form.get('message') ?? '').trim();
    const subject = `Portfolio message from ${name || 'a visitor'}`;
    const body = [`Name: ${name}`, `Email: ${email}`, '', message].join('\n');
    setStatus('Opening your email app…');
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return <form className="contact-form" onSubmit={handleSubmit}>
    <label className="visually-hidden" htmlFor="contact-name">Your name</label>
    <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Your Name" required />
    <label className="visually-hidden" htmlFor="contact-email">Your email</label>
    <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="Your Email" required />
    <label className="visually-hidden" htmlFor="contact-message">Your message</label>
    <textarea id="contact-message" name="message" placeholder="Your Message" rows={5} required />
    <button className="contact-submit" type="submit">Send Message <Icon name="arrow" /></button>
    <p className="contact-form-note" aria-live="polite">{status || 'This opens your email app; your message is not stored on this site.'}</p>
  </form>;
}
