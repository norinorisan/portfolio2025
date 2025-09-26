// gsap.js

function initGsapAnimations() {
  const animations = [
    {
      selector: ".skill__title",
      target: ".skill__title span",
      options: {
        from: { opacity: 0, y: -50 },
        to: { opacity: 1, y: 0 },
        trigger: ".skill__title",
        start: "top bottom",
        stagger: { each: 0.1, from: "random" },
      },
    },
    {
      selector: ".message__title",
      target: ".message__title span",
      options: {
        from: { opacity: 0, y: -50 },
        to: { opacity: 1, y: 0 },
        trigger: ".message__title",
        start: "top bottom",
        stagger: { each: 0.1, from: "random" },
      },
    },
    {
      selector: ".service__title",
      target: ".service__title span",
      options: {
        from: { opacity: 0, y: -50 },
        to: { opacity: 1, y: 0 },
        trigger: ".service__title",
        start: "top bottom",
        stagger: { each: 0.1, from: "random" },
      },
    },
    {
      selector: ".price__title",
      target: ".price__title span",
      options: {
        from: { opacity: 0, y: -50 },
        to: { opacity: 1, y: 0 },
        trigger: ".price__title",
        start: "top bottom",
        stagger: { each: 0.1, from: "random" },
      },
    },
    {
      selector: ".qa__title",
      target: ".qa__title span",
      options: {
        from: { opacity: 0, y: -50 },
        to: { opacity: 1, y: 0 },
        trigger: ".qa__title",
        start: "top bottom",
        stagger: { each: 0.1, from: "random" },
      },
    },
    {
      selector: ".new",
      target: ".new dt, .new dd",
      options: {
        from: { opacity: 0, x: 10 },
        to: { opacity: 1, x: 0 },
        trigger: ".new",
        start: "top bottom",
        stagger: { each: 0.1, from: "start" },
      },
    },
    {
      selector: ".qa",
      target: ".qa__item",
      options: {
        from: { opacity: 0, y: 10 },
        to: { opacity: 1, y: 0 },
        trigger: ".qa",
        start: "top bottom",
      },
    },
    {
      selector: ".contact-form",
      target: ".form-group",
      options: {
        from: { opacity: 0, x: 30 },
        to: { opacity: 1, x: 0 },
        trigger: ".contact-form",
        start: "top center",
        stagger: { each: 0.5, from: "start" },
      },
    },
  ];

  animations.forEach(({ selector, target, options }) => {
    if (document.querySelector(selector)) {
      gsap.fromTo(
        target,
        options.from,
        {
          scrollTrigger: {
            trigger: options.trigger,
            start: options.start,
          },
          stagger: options.stagger,
          ...options.to,
        }
      );
    }
  });
}



