import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const animateFadeUp = (
  targets: gsap.DOMTarget,
  options: {
    delay?: number;
    duration?: number;
    stagger?: number;
    trigger?: gsap.DOMTarget;
    start?: string;
  } = {}
) => {
  if (prefersReducedMotion()) {
    return gsap.to(targets, { opacity: 1, duration: 0.3 });
  }

  const { delay = 0, duration = 0.8, stagger = 0.1, trigger, start = "top 85%" } = options;

  return gsap.fromTo(
    targets,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger: trigger
        ? {
            trigger,
            start,
            once: true,
          }
        : undefined,
    }
  );
};

export const animateCounter = (
  element: HTMLElement | null,
  targetValue: number,
  duration = 2
) => {
  if (!element) return;
  if (prefersReducedMotion()) {
    element.innerText = `${targetValue}+`;
    return;
  }

  const obj = { value: 0 };
  gsap.to(obj, {
    value: targetValue,
    duration,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      once: true,
    },
    onUpdate: () => {
      element.innerText = `${Math.floor(obj.value)}+`;
    },
  });
};

export const animateSvgPath = (path: SVGPathElement | null, duration = 1.6) => {
  if (!path) return;
  const length = path.getTotalLength();
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

  if (prefersReducedMotion()) {
    gsap.set(path, { strokeDashoffset: 0 });
    return;
  }

  gsap.to(path, {
    strokeDashoffset: 0,
    duration,
    ease: "power2.out",
    scrollTrigger: {
      trigger: path,
      start: "top 80%",
      once: true,
    },
  });
};
