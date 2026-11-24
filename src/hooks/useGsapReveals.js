import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveals() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.gsap-reveal').forEach((section) => {
        gsap.fromTo(section,
          { autoAlpha: 0, y: 42 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 86%',
              once: true
            }
          }
        );
      });

      gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.fromTo(card,
          { y: 28, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 90%', once: true }
          }
        );
      });
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, [pathname]);
}
