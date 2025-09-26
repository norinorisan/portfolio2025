

class Main {
  #observers = [];

  constructor() {
    this.header = document.querySelector(".header");
    this.hero = null; // ← 初期値は null にする
    this.sides = document.querySelectorAll(".side");
    this.#init();
  }

  #init() {
    new MobileMenu();

    // HeroSlider が存在し、かつ .swiper がある場合だけ初期化
    if (typeof HeroSlider !== "undefined" && document.querySelector(".swiper")) {
      this.hero = new HeroSlider(".swiper");
    }

    // Pace.js が終わったら scrollInit を走らせる
    Pace.on("done", this.#scrollInit.bind(this));
  }

  destroy() {
    this.#observers.forEach((so) => so.destroy());
  }

  #scrollInit() {
    if (
      typeof Accordion !== "undefined" &&
      document.querySelector(".qa__item")
    ) {
      new Accordion(".qa__item");
    }

    if (typeof initGsapAnimations === "function") initGsapAnimations();

    this.#observers.push(
      new ScrollObserver("#main-content", this.#sideAnimation.bind(this), {
        once: false,
        rootMargin: "-300px 0px",
      }),
      new ScrollObserver(".nav-trigger", this.#navAnimation.bind(this), {
        once: false,
      }),

      // HeroSlider が存在する場合だけ監視する
      ...(this.hero
        ? [
            new ScrollObserver(
              ".swiper",
              this.#toggleSlideAnimation.bind(this),
              { once: false }
            ),
          ]
        : []),

      new ScrollObserver(".cover-slide", this.#inviewAnimation),
      new ScrollObserver(".appear", this.#inviewAnimation),
      new ScrollObserver(".text-flow__cover", this.#inviewAnimation),
      new ScrollObserver(".tween-animate-title", this.#textAnimation)
    );
  }

  #toggleSlideAnimation(el, inview) {
    if (!this.hero) return; // hero がないページでは処理しない
    if (inview) {
      this.hero.start();
    } else {
      this.hero.stop();
    }
  }

  #textAnimation(el, inview) {
    if (inview) {
      const ta = new TweenTextAnimation(el);
      ta.animate();
    }
  }

  #navAnimation(el, inview) {
    if (inview) {
      this.header.classList.remove("triggered");
    } else {
      this.header.classList.add("triggered");
    }
  }

  #sideAnimation(el, inview) {
    if (inview) {
      this.sides.forEach((side) => side.classList.add("inview"));
    } else {
      this.sides.forEach((side) => side.classList.remove("inview"));
    }
  }

  #inviewAnimation(el, inview) {
    if (inview) {
      el.classList.add("inview");
    } else {
      el.classList.remove("inview");
    }
  }
}

const main = new Main();
