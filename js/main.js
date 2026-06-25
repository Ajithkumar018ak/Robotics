

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCanvasBackground();
  initNavbar();
  initTiltCards();
  initMagneticButtons();
  initScrollAnimations();
  initAccordions();
  initNewsletter();
});

/* --- Cyber Boot Loader --- */
function initLoader() {
  const loader = document.getElementById('cyber-loader');
  const percentEl = document.getElementById('loader-percent');
  const logsEl = document.getElementById('loader-logs');
  
  if (!loader) return;

  const bootLogs = [
    'INITIATING CORE BOOT SEQUENCE...',
    'CONNECTING INTEGRATED SYNAPSE CORE...',
    'LOADING COMPUTER VISION MODEL V4.9...',
    'MOUNTING SMART FACTORY SHIELD...',
    'OPTIMIZING EDGE COMPUTING NODE...',
    'SYNCING DIGITAL TWIN TELEMETRY...',
    'ESTABLISHING ENCRYPTED LINK...',
    'AETHERA OS ONLINE. WELCOME.'
  ];

  let percentage = 0;
  let logIndex = 0;

  // Simple intervals to simulate booting speed
  const progressInterval = setInterval(() => {
    percentage += Math.floor(Math.random() * 8) + 2;
    if (percentage >= 100) {
      percentage = 100;
      clearInterval(progressInterval);
      setTimeout(hideLoader, 500);
    }
    percentEl.textContent = `${percentage}%`;
    
    // Staggered log display
    if (percentage > (logIndex + 1) * 12.5 && logIndex < bootLogs.length) {
      logsEl.textContent = bootLogs[logIndex];
      logIndex++;
    }
  }, 100);

  function hideLoader() {
    loader.style.opacity = 0;
    loader.style.visibility = 'hidden';
    document.body.style.overflow = '';
    
    // Trigger scroll animations for the hero once loader disappears
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.classList.add('reveal-active');
    }
  }
}

/* --- Interactive Canvas Particle Network --- */
function initCanvasBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = Math.min(60, Math.floor((width * height) / 30000));
  const connectionDistance = 140;
  
  let mouse = { x: null, y: null, radius: 180 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.5 + 0.25;
      this.color = Math.random() > 0.5 ? '#00f0ff' : '#ab20fd';
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    update() {
      // Bounce off walls
      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse interactive push/attract
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 1.5;
          this.y += (dy / dist) * force * 1.5;
        }
      }

      this.x += this.vx;
      this.y += this.vy;
      this.draw();
    }
  }

  // Populate particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.globalAlpha = 1;

    // Update and draw particles
    particles.forEach(p => p.update());

    // Connect particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.12;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = '#00f0ff';
          ctx.lineWidth = 0.8;
          ctx.globalAlpha = alpha;
          ctx.stroke();
        }
      }
    }

    // Connect mouse
    if (mouse.x !== null && mouse.y !== null) {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.15;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = '#ab20fd';
          ctx.lineWidth = 0.8;
          ctx.globalAlpha = alpha;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* --- Sticky & Mobile Navbar Controls --- */


  // Active link identification
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    if (link) {
      const href = link.getAttribute('href');
      if (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html')) {
        item.classList.add('active');
      }
    }
  });


/* --- 3D Card Tilt Interaction --- */
function initTiltCards() {
  const cards = document.querySelectorAll('.service-card, .tech-node, .benefit-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x coordinate inside element
      const y = e.clientY - rect.top;  // y coordinate inside element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = -(y - centerY) / (rect.height / 10); // max rotate 10deg
      const rotateY = (x - centerX) / (rect.width / 10);
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0deg)';
    });
  });
}

/* --- Magnetic Buttons Hover System --- */
function initMagneticButtons() {
  const btns = document.querySelectorAll('.cyber-btn, .nav-cta, .carousel-btn');
  
  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* --- Circular Counters & Metrics Progress Reveals --- */
function initScrollAnimations() {
  const fillMetrics = document.querySelectorAll('.metric-bar-fill');
  const fillCircles = document.querySelectorAll('.circle-fill');
  const counts = document.querySelectorAll('.count-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Trigger linear bar progress
        if (entry.target.classList.contains('metric-bar-fill')) {
          const val = entry.target.dataset.width || '0%';
          entry.target.style.width = val;
        }
        
        // Trigger circular gauge progress
        if (entry.target.classList.contains('circle-fill')) {
          const pct = entry.target.dataset.percentage || '0';
          entry.target.style.strokeDasharray = `${pct} 100`;
        }

        // Trigger dynamic count animations
        if (entry.target.classList.contains('count-number')) {
          animateCount(entry.target);
        }

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fillMetrics.forEach(item => observer.observe(item));
  fillCircles.forEach(item => observer.observe(item));
  counts.forEach(item => observer.observe(item));

  function animateCount(el) {
    const target = parseFloat(el.dataset.target);
    const speed = parseInt(el.dataset.speed) || 1500;
    const isFloat = el.dataset.float === 'true';
    let current = 0;
    const increment = target / (speed / 16); // ~60fps refresh rate

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      if (isFloat) {
        el.textContent = current.toFixed(1);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 16);
  }
}

/* --- Accordions System (FAQ + Career Accordions) --- */
function initAccordions() {
  const headers = document.querySelectorAll('.faq-header, .job-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const isOpen = parent.classList.contains('open');
      
      // Close other accordions in the same list
      const siblingList = parent.parentElement.querySelectorAll(parent.tagName.toLowerCase());
      siblingList.forEach(sib => sib.classList.remove('open'));
      
      // Toggle current
      if (!isOpen) {
        parent.classList.add('open');
      }
    });
  });
}

/* --- Newsletter Console mock --- */
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn = form.querySelector('button');
      
      if (input && input.value) {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        btn.style.backgroundColor = '#00f0ff';
        btn.style.boxShadow = '0 0 15px #00f0ff';
        
        input.disabled = true;
        input.value = "SUBSCRIBED SECURELY";
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.backgroundColor = '';
          btn.style.boxShadow = '';
          input.disabled = false;
          input.value = '';
        }, 3000);
      }
    });
  });
}


document.addEventListener("DOMContentLoaded", () => {

  const title = document.querySelector(".animate-title");

  if(title){

    const text = title.textContent;

    title.innerHTML = text
      .split("")
      .map(letter =>
        letter === " "
        ? " "
        : `<span>${letter}</span>`
      )
      .join("");

    gsap.to(".animate-title span",{
      opacity:1,
      y:0,
      duration:0.8,
      stagger:0.03,
      ease:"power4.out"
    });
  }

  gsap.to(".hero-tag",{
    opacity:1,
    y:0,
    delay:.5,
    duration:1
  });

  gsap.to(".hero-desc",{
    opacity:1,
    y:0,
    delay:.9,
    duration:1
  });

  gsap.to(".hero-btns",{
    opacity:1,
    y:0,
    delay:1.2,
    duration:1
  });

  gsap.to(".hero-stats",{
    opacity:1,
    y:0,
    delay:1.5,
    duration:1
  });

});

gsap.from(".hero-title", {
  y: 100,
  opacity: 0,
  duration: 1.5
});

gsap.from(".hero-desc", {
  y: 50,
  opacity: 0,
  delay: 0.5,
  duration: 1
});

gsap.from(".hero-btns", {
  y: 50,
  opacity: 0,
  delay: 1,
  duration: 1
});

gsap.utils.toArray("section").forEach(section => {

  gsap.from(section, {
    opacity: 0,
    y: 100,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: "top 80%"
    }
  });

});

const hero = document.querySelector(".hero-section");
const visual = document.querySelector(".hero-visual");

hero.addEventListener("mousemove", e => {

  const x = (window.innerWidth / 2 - e.clientX) / 25;
  const y = (window.innerHeight / 2 - e.clientY) / 25;

  visual.style.transform =
    `translate(${x}px, ${y}px)`;

});

document.querySelectorAll(".cyber-btn").forEach(btn => {

  btn.addEventListener("mousemove", e => {

    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform =
      `translate(${x * .15}px, ${y * .15}px)`;

  });

  btn.addEventListener("mouseleave", () => {

    btn.style.transform = "translate(0,0)";

  });

});


document.addEventListener("DOMContentLoaded", () => {

    const bg =
        document.getElementById("heroBackground");

    if (!bg) return;

    let frame = 1;
    const totalFrames = 180;

    setInterval(() => {

        frame++;

        if (frame > totalFrames) {
            frame = 1;
        }

        bg.src =
        `assets/images/ezgif-frame-${String(frame).padStart(3,'0')}.jpg`;

    }, 33);

});

// ===============================
// LOGIN MODAL OPEN / CLOSE
// ===============================

function openAuth() {

    const modal = document.getElementById("loginModal");

    if (!modal) return;

    modal.style.display = "flex";
    modal.classList.add("active");

    showLogin();
}

function closeAuth() {

    const modal = document.getElementById("loginModal");

    if (!modal) return;

    modal.classList.remove("active");

    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}

// ===============================
// SHOW LOGIN FORM
// ===============================

function showLogin() {

    document.getElementById("loginBox").style.display = "block";

    if (document.getElementById("signupBox"))
        document.getElementById("signupBox").style.display = "none";

    if (document.getElementById("forgotBox"))
        document.getElementById("forgotBox").style.display = "none";
}

// ===============================
// SHOW SIGNUP FORM
// ===============================

function showSignup() {

    document.getElementById("loginBox").style.display = "none";

    if (document.getElementById("forgotBox"))
        document.getElementById("forgotBox").style.display = "none";

    document.getElementById("signupBox").style.display = "block";
}

// ===============================
// SHOW FORGOT PASSWORD FORM
// ===============================

function showForgot() {

    document.getElementById("loginBox").style.display = "none";

    if (document.getElementById("signupBox"))
        document.getElementById("signupBox").style.display = "none";

    document.getElementById("forgotBox").style.display = "block";
}

// ===============================
// LOGIN
// ===============================

function loginUser() {

    const role =
        document.getElementById("loginRole").value;

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;

    if (!email || !password) {

        alert("Please fill all fields");
        return;
    }

    localStorage.setItem("userRole", role);
    localStorage.setItem("userEmail", email);

    if (role === "Client") {

        window.location.href =
            "client-dashboard.html";

    } else {

        window.location.href =
            "admin-dashboard.html";
    }
}

// ===============================
// SIGNUP
// ===============================

function signupUser() {

    const name =
        document.getElementById("signupName")?.value;

    const email =
        document.getElementById("signupEmail")?.value;

    const password =
        document.getElementById("signupPassword")?.value;

    if (!name || !email || !password) {

        alert("Please fill all fields");
        return;
    }

    alert("Account Created Successfully");

    showLogin();
}

// ===============================
// FORGOT PASSWORD
// ===============================

function forgotPassword() {

    const email =
        document.getElementById("forgotEmail")?.value;

    if (!email) {

        alert("Enter your email");
        return;
    }

    alert("Password Reset Link Sent");
}

// ===============================
// CLOSE MODAL WHEN CLICK OUTSIDE
// ===============================

window.onclick = function (event) {

    const modal =
        document.getElementById("loginModal");

    if (event.target === modal) {

        closeAuth();
    }
};

// ===============================
// ESC KEY CLOSE
// ===============================

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        closeAuth();
    }
});

/* --- Sticky & Mobile Navbar Controls --- */
function initNavbar() {

    const header = document.querySelector('.header-sticky');
    const toggle = document.querySelector('.mobile-toggle');
    const overlay = document.querySelector('.mobile-overlay');

    // Sticky Header
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 20);
        });
    }

   // Mobile Menu
if (toggle && overlay) {

    const backdrop = document.querySelector('.menu-backdrop');

    toggle.addEventListener('click', () => {

        overlay.classList.toggle('active');
        toggle.classList.toggle('active');

        if (backdrop) {
            backdrop.classList.toggle('active');
        }

        document.body.style.overflow =
            overlay.classList.contains('active')
            ? 'hidden'
            : 'auto';
    });

    // Close menu when link clicked
    document.querySelectorAll('.mobile-link').forEach(link => {

        link.addEventListener('click', () => {

            overlay.classList.remove('active');
            toggle.classList.remove('active');

            if (backdrop) {
                backdrop.classList.remove('active');
            }

            document.body.style.overflow = 'auto';

        });

    });

    // Close when backdrop clicked
    if (backdrop) {

        backdrop.addEventListener('click', () => {

            overlay.classList.remove('active');
            toggle.classList.remove('active');
            backdrop.classList.remove('active');

            document.body.style.overflow = 'auto';

        });

    }

}

}




// Mobile Sidebar
const mobileToggle = document.querySelector(".mobile-toggle");
const mobileSidebar = document.querySelector(".mobile-sidebar");
const mobileOverlay = document.querySelector(".mobile-overlay");
const closeSidebar = document.querySelector(".close-sidebar");

mobileToggle.addEventListener("click", () => {
    mobileSidebar.classList.add("active");
    mobileOverlay.classList.add("active");
});

closeSidebar.addEventListener("click", () => {
    mobileSidebar.classList.remove("active");
    mobileOverlay.classList.remove("active");
});

mobileOverlay.addEventListener("click", () => {
    mobileSidebar.classList.remove("active");
    mobileOverlay.classList.remove("active");
});

// Login Modal
function openAuth() {
    document.getElementById("loginModal").style.display = "flex";

    // Sidebar close after login click
    mobileSidebar.classList.remove("active");
    mobileOverlay.classList.remove("active");
}

function closeAuth() {
    document.getElementById("loginModal").style.display = "none";
}


let scrollPosition = 0;

mobileToggle.addEventListener("click", () => {

    scrollPosition = window.pageYOffset;

    mobileSidebar.classList.add("active");
    mobileOverlay.classList.add("active");

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";
});

function closeSidebarMenu() {

    mobileSidebar.classList.remove("active");
    mobileOverlay.classList.remove("active");

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";

    window.scrollTo(0, scrollPosition);
}

closeSidebar.addEventListener("click", closeSidebarMenu);
mobileOverlay.addEventListener("click", closeSidebarMenu);