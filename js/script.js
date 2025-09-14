
// Theme toggle
const root = document.body;
const switchBtn = document.getElementById('themeSwitch');
const saved = localStorage.getItem('theme');
if (saved) root.className = saved + ' gradient-bg';
if (switchBtn) switchBtn.addEventListener('click', () => {
  root.classList.toggle('theme-dark');
  root.classList.toggle('theme-light');
  localStorage.setItem('theme', root.className.replace(' gradient-bg',''));
});

// Bars animate on scroll
document.querySelectorAll('.bar span').forEach(span => {
  const w = span.getAttribute('data-w');
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        span.style.width = w + '%';
        o.disconnect();
      }
    });
  }, {threshold:.4});
  obs.observe(span);
});

// Intersection reveal play-state handling
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.style.animationPlayState='running'; }
  });
},{threshold:0.08});
document.querySelectorAll('.reveal-up,.reveal-right').forEach(el=>{
  el.style.animationPlayState='paused';
  observer.observe(el);
});

// Certifications "Highlight" button animation (color flip)
document.querySelectorAll('.pulse-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.add('clicked');
    setTimeout(()=>btn.classList.remove('clicked'), 900);
    const link = btn.getAttribute('data-link');
    if (link) window.open(link, '_blank');
  });
});

// Load radar chart if present
if (document.getElementById('skillsRadar')){
  const script = document.querySelector('script[src*="chart.js"]');
  function initChart(){
    const ctx = document.getElementById('skillsRadar').getContext('2d');
    // eslint-disable-next-line no-undef
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Java','Web Dev','Full‑Stack','Python','DSA','AI/ML'],
        datasets: [{
          label: 'Skill Level',
          data: [95,90,88,80,86,74],
          fill: true,
          backgroundColor: 'rgba(96,165,250,0.25)',
          borderColor: '#2563eb',
          pointBackgroundColor: '#2563eb',
          pointBorderColor: '#fff',
          pointHoverRadius: 5
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display:false } },
        scales: {
          r: {
            angleLines: { color: 'rgba(96,165,250,.25)' },
            grid: { color: 'rgba(96,165,250,.2)' },
            suggestedMin: 0, suggestedMax: 100,
            ticks: { showLabelBackdrop:false, stepSize:20, color: getComputedStyle(document.body).getPropertyValue('--muted') },
            pointLabels: { color: getComputedStyle(document.body).getPropertyValue('--text') }
          }
        },
        animation: { duration: 1400, easing: 'easeOutQuart' }
      }
    });
  }
  if (script && script.complete) initChart(); else window.addEventListener('load', initChart);
}

// ===== Background Animation =====
const canvas = document.createElement('canvas');
canvas.classList.add('animated-bg');
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function initStars() {
  stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.2
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });
}

function moveStars() {
  stars.forEach(star => {
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
}

function animate() {
  drawStars();
  moveStars();
  requestAnimationFrame(animate);
}

initStars();
animate();

