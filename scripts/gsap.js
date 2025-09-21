[
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
    selector: ".new",
    target: ".new dt, .new dd",
    options: {
      from: { opacity: 0, x: 20 },
      to: { opacity: 1, x: 0 },
      trigger: ".new",
      start: "top bottom",
      stagger: { each: 0.1, from: "start" },
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
].forEach(({ selector, target, options }) => {
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






const grid = document.querySelector('.grid__container');

if (grid) {
  const x_max = 15;
  const y_max = 50;

  for (let x = 0; x < x_max; x++) {
    const row = document.createElement('div');
    row.className = 'row';
    
    for (let y = 0; y < y_max; y++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.x = x;
      cell.dataset.y = y;
      row.appendChild(cell);
    }
    
    grid.appendChild(row);
  }

  // GSAP アニメーション
  const rows = [...document.querySelectorAll('.row')];
  const cells = [...document.querySelectorAll('.cell')];

  let clicked = false;
  let reset_all = false;
  const pull_distance = 70;

  const updateCellPositions = () => {
    cells.forEach((cell) => {
      const rect = cell.getBoundingClientRect();
      cell.center_position = {
        x: (rect.left + rect.right) / 2,
        y: (rect.top + rect.bottom) / 2,
      };
    });
  };

  const handleCellClick = (e, i) => {
    if (clicked) return;
    clicked = true;

    gsap.to('.cell', {
      duration: 1.6,
      physics2D: {
        velocity: 'random(400, 1000)',
        angle: 'random(250, 290)',
        gravity: 2000
      },
      stagger: {
        grid: [rows.length, rows[0].children.length],
        from: i,
        amount: 0.3
      },
      onComplete: function () {
        this.timeScale(-1.3);
      },
      onReverseComplete: () => {
        clicked = false;
        reset_all = true;
        handlePointerMove();
      },
    });
  };

  const handlePointerMove = (e = { pageX: -pull_distance, pageY: -pull_distance }) => {
    if (clicked) return;

    const pointer_x = e.pageX;
    const pointer_y = e.pageY;

    cells.forEach((cell) => {
      const diff_x = pointer_x - cell.center_position.x;
      const diff_y = pointer_y - cell.center_position.y;
      const distance = Math.sqrt(diff_x * diff_x + diff_y * diff_y);

      if (distance < pull_distance) {
        const percent = distance / pull_distance;
        cell.pulled = true;
        gsap.to(cell, { duration: 0.2, x: diff_x * percent, y: diff_y * percent });
      } else {
        if (!cell.pulled) return;
        cell.pulled = false;
        gsap.to(cell, { duration: 1, x: 0, y: 0, ease: "elastic.out(1, 0.3)" });
      }
    });

    if (reset_all) {
      reset_all = false;
      gsap.to(cells, { duration: 1, x: 0, y: 0, ease: "elastic.out(1, 0.3)" });
    }
  };

  const init = () => {
    updateCellPositions();
    window.addEventListener('resize', updateCellPositions);
    window.addEventListener('pointermove', handlePointerMove);
    document.body.addEventListener('pointerleave', () => handlePointerMove());

    cells.forEach((cell, i) =>
      cell.addEventListener('pointerup', (e) => handleCellClick(e, i))
    );
  };

  init();
}

