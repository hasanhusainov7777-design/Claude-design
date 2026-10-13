const carousel = document.querySelector('.carousel');
const track = carousel.querySelector('.track');
const slides = track.children;
const dots = carousel.querySelector('.dots');
let index = 0;
let timer;

for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement('button');
  dot.setAttribute('role', 'tab');
  dot.setAttribute('aria-label', `Слайд ${i + 1}`);
  dot.addEventListener('click', () => go(i));
  dots.append(dot);
}

function go(i) {
  index = (i + slides.length) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
  [...dots.children].forEach((d, n) => d.setAttribute('aria-selected', n === index));
  restart();
}

function restart() {
  clearInterval(timer);
  timer = setInterval(() => go(index + 1), 5000);
}

carousel.querySelector('.prev').addEventListener('click', () => go(index - 1));
carousel.querySelector('.next').addEventListener('click', () => go(index + 1));
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') go(index - 1);
  if (e.key === 'ArrowRight') go(index + 1);
});

let startX = null;
track.addEventListener('pointerdown', (e) => { startX = e.clientX; });
track.addEventListener('pointerup', (e) => {
  if (startX === null) return;
  const dx = e.clientX - startX;
  if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
  startX = null;
});

go(0);
