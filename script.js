"use strict";

const page = document.querySelector(".landing-page");
const basePageWidth = 860;

const fitPageToViewport = () => {
  if (!page) return;

  const viewportWidth = window.innerWidth;
  const scale = Math.min(1, viewportWidth / basePageWidth);

  document.documentElement.classList.toggle("is-mobile", viewportWidth <= 859);
  document.documentElement.style.setProperty("--page-scale", scale.toString());
  document.body.style.height = scale < 1 ? `${page.scrollHeight * scale}px` : "";
};

window.addEventListener("resize", fitPageToViewport, { passive: true });
window.addEventListener("orientationchange", fitPageToViewport, { passive: true });
window.addEventListener("load", fitPageToViewport, { once: true });
fitPageToViewport();

const motionRevealSelectors = [
  ".brand-story__content h2",
  ".brand-story__copy p",
  ".brand-story__divider",
  ".news__header > *",
  ".news__item",
  ".core-feature__eyebrow",
  ".core-feature__header h2",
  ".core-feature__summary",
  ".core-feature__step",
  ".core-feature__name",
  ".core-feature__visual",
  ".stand-system",
  ".core-feature__copy",
  ".stick-feature__main",
  ".stick-feature__details article",
  ".stick-feature__copy",
  ".fullset-feature__main",
  ".fullset-feature__box",
  ".fullset-feature__copy",
  ".brand-philosophy__logo",
  ".brand-philosophy__divider",
  ".brand-philosophy h2 span",
  ".assembly-notice > *",
  ".assembly-step > h2",
  ".assembly-step__visual",
  ".assembly-step__instructions article",
  ".assembly-direction__visual",
  ".assembly-direction__copy",
  ".assembly-column__visual",
  ".assembly-column__copy",
  ".assembly-pad > h2",
  ".assembly-pad__visual",
  ".assembly-pad__instructions article",
  ".assembly-finish > h2",
  ".assembly-finish__visual",
  ".assembly-finish__labels",
  ".assembly-finish__notice",
  ".assembly-finish__angle-box",
  ".product-details",
  ".closing-story__header > p",
  ".closing-story__header h2",
  ".closing-story__copy > *",
];

const motionImageSelectors = [
  ".core-feature__visual",
  ".stand-system",
  ".stick-feature__main",
  ".fullset-feature__main",
  ".assembly-step__visual",
  ".assembly-direction__visual",
  ".assembly-column__visual",
  ".assembly-pad__visual",
  ".assembly-finish__visual",
  ".product-details",
];

const motionRevealElements = [
  ...new Set(
    motionRevealSelectors.flatMap((selector) =>
      Array.from(document.querySelectorAll(selector)),
    ),
  ),
];

motionRevealElements.forEach((element) => {
  element.classList.add("motion-reveal");

  if (motionImageSelectors.some((selector) => element.matches(selector))) {
    element.classList.add("motion-reveal--image");
  }
});

document.querySelectorAll("section").forEach((section) => {
  const sectionRevealElements = motionRevealElements.filter((element) =>
    section.contains(element),
  );

  sectionRevealElements.forEach((element, index) => {
    element.style.setProperty("--reveal-delay", `${Math.min(index * 0.06, 0.3)}s`);
  });
});

const guidebookSection = document.querySelector(".guidebook");
const guidebookTrigger = document.querySelector(".guidebook__visual");
const revealTargetMap = new Map();

const revealTargets = [
  ...document.querySelectorAll(".hero, .package, .core-feature, .closing-story"),
  ...motionRevealElements,
];

if (guidebookSection && guidebookTrigger) {
  revealTargetMap.set(guidebookTrigger, guidebookSection);
  revealTargets.push(guidebookTrigger);
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const revealTarget = revealTargetMap.get(entry.target) || entry.target;

        revealTarget.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      root: null,
      rootMargin: "0px 0px 20% 0px",
      threshold: 0.01,
    },
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => {
    const revealTarget = revealTargetMap.get(target) || target;
    revealTarget.classList.add("is-visible");
  });
}
