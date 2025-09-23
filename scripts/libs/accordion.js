function Accordion(selector) {
  const items = document.querySelectorAll(selector);

  if (items.length > 0) {
    items[0].classList.add("active");
  }

  items.forEach((item) => {
    const btn = item.querySelector(".qa__question");
    btn.addEventListener("click", () => {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      } else {
        items.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
      }
    });
  });
}
