'use client';

import { useState } from 'react';

type Props = { name: string; icon?: string; mark: string; color: string };

export function TechLogo({ name, icon, mark, color }: Props) {
  const [failed, setFailed] = useState(false);

  if (!icon || failed) {
    return <span className="stack-tech-mark stack-tech-fallback" aria-hidden="true">{mark}</span>;
  }

  return <span className="stack-tech-mark stack-tech-brand" aria-hidden="true">
    <img
      src={`https://cdn.simpleicons.org/${icon}/${color.replace('#', '')}`}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
    />
    <span className="visually-hidden">{name}</span>
  </span>;
}
