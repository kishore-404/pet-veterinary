import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// home page review counter
export const animateCounter = (el :any, endValue = 100, suffix = "+ Reviews") => {
  const obj = { val: 0 };

  gsap.to(obj, {
    val: endValue,
    duration: 2,
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    ease: "power2.out",
    onUpdate: () => {
      el.textContent = `${Math.floor(obj.val)}${suffix}`;
    },
  });
};

