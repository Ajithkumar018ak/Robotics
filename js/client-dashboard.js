
// ============================
// PAGE LOAD ANIMATION
// ============================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

// ============================
// STATS COUNTER ANIMATION
// ============================

const counters =
document.querySelectorAll(".counter");

counters.forEach(counter => {

    const target =
    parseInt(counter.dataset.target);

    let count = 0;

    const update = () => {

        count += Math.ceil(target / 80);

        if (count > target)
            count = target;

        counter.innerText = count;

        if (count < target)
            requestAnimationFrame(update);
    };

    update();

});

// ============================
// CARD HOVER GLOW
// ============================

const cards =
document.querySelectorAll(
".stat-card,.project-card,.insight-card"
);

cards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect =
        card.getBoundingClientRect();

        const x =
        e.clientX - rect.left;

        const y =
        e.clientY - rect.top;

        card.style.setProperty(
            "--x",
            `${x}px`
        );

        card.style.setProperty(
            "--y",
            `${y}px`
        );

    });

});

// ============================
// FLOATING ROBOT IMAGE
// ============================

const robot =
document.querySelector(".hero-image img");

if(robot){

    let pos = 0;

    setInterval(() => {

        pos += 0.03;

        robot.style.transform =
        `translateY(${Math.sin(pos)*12}px)`;

    },20);

}

// ============================
// REALTIME CLOCK
// ============================

function updateClock(){

    const clock =
    document.getElementById("clock");

    if(!clock) return;

    const now = new Date();

    clock.innerHTML =
    now.toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();

// ============================
// SCROLL REVEAL
// ============================

const revealElements =
document.querySelectorAll(
".stat-card,.project-card,.insight-card"
);

function revealOnScroll(){

    revealElements.forEach(el => {

        const top =
        el.getBoundingClientRect().top;

        if(top < window.innerHeight - 100){

            el.classList.add("show");

        }

    });

}

window.addEventListener(
"scroll",
revealOnScroll
);

revealOnScroll();

const menuItems = document.querySelectorAll(".sidebar-menu li[data-page]");
const sections = document.querySelectorAll(".content-section");

function showPage(page) {
  sections.forEach(sec => {
    sec.style.display = "none";
  });

  const activeSection = document.getElementById(page);
  if (activeSection) {
    activeSection.style.display = "block";
  }
}

// default load
showPage("dashboard");

menuItems.forEach(item => {
  item.addEventListener("click", () => {

    menuItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    const page = item.getAttribute("data-page");
    showPage(page);
  });
});

// logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});


function showDashboard() {

    // sidebar active remove
    document.querySelectorAll(".sidebar-menu li").forEach(item => {
        item.classList.remove("active");
    });

    // dashboard menu active
    document.querySelector('[data-page="dashboard"]').classList.add("active");

    // hide all sections
    document.querySelectorAll(".content-section").forEach(section => {
        section.style.display = "none";
    });

    // show dashboard
    document.getElementById("dashboard").style.display = "block";
}

function open404Page() {
    window.location.href = "404client.html";
}

function toggleSidebar(){

    const sidebar =
    document.querySelector(".sidebar");

    const overlay =
    document.querySelector(".sidebar-overlay");

    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");

    document.body.classList.toggle("sidebar-open");
}

/* Auto close on menu click */

document
.querySelectorAll(".sidebar-menu li")
.forEach(item => {

    item.addEventListener("click", () => {

        if(window.innerWidth <= 768){

            document
            .querySelector(".sidebar")
            .classList.remove("active");

            document
            .querySelector(".sidebar-overlay")
            .classList.remove("active");

            document.body
            .classList.remove("sidebar-open");
        }

    });

});




function toggleSidebar() {

    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".sidebar-overlay");

    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("sidebar-open");
}

/* Close sidebar when menu clicked */

document.querySelectorAll(".sidebar-menu li[data-page]")
.forEach(item => {

    item.addEventListener("click", () => {

        const sidebar = document.querySelector(".sidebar");
        const overlay = document.querySelector(".sidebar-overlay");

        sidebar.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("sidebar-open");
    });

});

/* Outside click close */

document.addEventListener("click", function(e){

    const sidebar = document.querySelector(".sidebar");
    const btn = document.querySelector(".menu-toggle");

    if(
        window.innerWidth <= 768 &&
        !sidebar.contains(e.target) &&
        !btn.contains(e.target)
    ){
        sidebar.classList.remove("active");
        document.querySelector(".sidebar-overlay")
        .classList.remove("active");

        document.body.classList.remove("sidebar-open");
    }

});

