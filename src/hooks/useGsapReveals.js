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


      const story = document.querySelector('.story-section');
      if (story) {
        const stage = story.querySelector('.story-stage');
        const panels = gsap.utils.toArray('.story-panel', story);
        gsap.set(panels, { autoAlpha: 0, y: 22 });
        const storyTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: story,
            start: 'top top',
            end: `+=${Math.max(1500, panels.length * 760)}`,
            scrub: 1,
            pin: stage,
            anticipatePin: 1
          }
        });
        panels.forEach((panel, index) => {
          storyTimeline.to(panel, { autoAlpha: 1, y: 0, duration: 0.55 }, index);
          if (index > 0) {
            storyTimeline.to(panels[index - 1], { autoAlpha: 0, y: -18, duration: 0.45 }, index);
          }
          storyTimeline.fromTo(panel.querySelector('.story-panel-image'),
            { scale: 1.12, xPercent: 2 },
            { scale: 1, xPercent: 0, duration: 0.9 }, index
          );
          storyTimeline.fromTo(panel.querySelector('.story-panel-copy'),
            { y: 34, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.65 }, index + 0.08
          );
        });
      }

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
