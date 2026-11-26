'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { publicAsset } from '@/lib/site';

type Props = {
  image?: string;
  alt?: string;
  sceneClassName?: string;
  imageClassName?: string;
  sizes?: string;
};

export function HomePortraitScene({
  image = '/images/atila-home.webp',
  alt = '',
  sceneClassName = 'home-portrait-scene',
  imageClassName = 'home-portrait-image',
  sizes = '100vw',
}: Props) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let pointerFrame = 0;
    const updateParallax = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = scene.getBoundingClientRect();
        const offset = Math.max(-18, Math.min(18, bounds.top * -0.045));
        scene.style.setProperty('--portrait-scroll', `${offset}px`);
      });
    };

    const updatePointer = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || !window.matchMedia('(pointer: fine)').matches) return;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        const bounds = scene.getBoundingClientRect();
        const inside = event.clientX >= bounds.left && event.clientX <= bounds.right
          && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
        if (!inside) {
          scene.style.setProperty('--portrait-active', '0');
          scene.style.setProperty('--portrait-shift-x', '0px');
          scene.style.setProperty('--portrait-shift-y', '0px');
          scene.style.setProperty('--portrait-rotate-x', '0deg');
          scene.style.setProperty('--portrait-rotate-y', '0deg');
          return;
        }

        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        scene.style.setProperty('--portrait-active', '1');
        scene.style.setProperty('--portrait-shift-x', `${(0.5 - x) * 34}px`);
        scene.style.setProperty('--portrait-shift-y', `${(0.5 - y) * 22}px`);
        scene.style.setProperty('--portrait-rotate-y', `${(x - 0.5) * 7}deg`);
        scene.style.setProperty('--portrait-rotate-x', `${(0.5 - y) * 4}deg`);
        scene.style.setProperty('--portrait-light-x', `${x * 100}%`);
        scene.style.setProperty('--portrait-light-y', `${y * 100}%`);
      });
    };

    window.addEventListener('scroll', updateParallax, { passive: true });
    window.addEventListener('pointermove', updatePointer, { passive: true });
    updateParallax();
    return () => {
      window.removeEventListener('scroll', updateParallax);
      window.removeEventListener('pointermove', updatePointer);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pointerFrame);
    };
  }, []);

  return <div
    ref={sceneRef}
    className={sceneClassName}
    aria-hidden={alt ? undefined : true}
  >
    <Image className={imageClassName} src={publicAsset(image)} alt={alt} fill priority sizes={sizes} />
    <div className="home-portrait-light" />
  </div>;
}
