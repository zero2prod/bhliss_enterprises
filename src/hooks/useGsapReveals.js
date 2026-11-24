import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveals() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.gsap-reveal').forEach((section) => {
        gsap.fromTo(section,
          { autoAlpha: 0, y: 54 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 84%',
              once: true
            }
          }
        );
      });
      gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.fromTo(card,
          { y: 34, autoAlpha: 0 },
          {
            y: 0, autoAlpha: 1, duration: 0.75, delay: index * 0.12,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 90%', once: true }
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);
}
