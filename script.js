// DARK MODE
const toggle = document.getElementById("darkToggle");
const moonIcon = document.getElementById("moonIcon");
const sunIcon = document.getElementById("sunIcon");

toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        moonIcon.style.display = "none";
        sunIcon.style.display = "block";
    } else {
        moonIcon.style.display = "block";
        sunIcon.style.display = "none";
    }
});

// MAGNETIC EFFECT
document.querySelectorAll(".skill-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const moveX = (x - rect.width / 2) / 15;
        const moveY = (y - rect.height / 2) / 15;

        card.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translate(0,0)";
    });
});


/* ================= Experience Filters ================= */
const filterButtons = document.querySelectorAll(".filter-btn");
const timelineItems = document.querySelectorAll(".timeline-item");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const type = btn.dataset.filter;
    timelineItems.forEach(item => {
      const itemType = item.dataset.type;
      const show = (type === "all" || itemType === type);
      item.style.display = show ? "grid" : "none";
    });
  });
});

/* ================= Card spotlight follows cursor ================= */
document.querySelectorAll(".tl-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    const my = ((e.clientY - r.top) / r.height) * 100;
    card.style.setProperty("--mx", `${mx}%`);
    card.style.setProperty("--my", `${my}%`);
  });
});


/* ================= Contact Form (AJAX submit) ================= */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const sendText = document.getElementById("sendText");
const submitBtn = contactForm?.querySelector("button[type='submit']");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // basic spam trap
    const gotcha = contactForm.querySelector("input[name='_gotcha']");
    if (gotcha && gotcha.value.trim() !== "") return;

    formStatus.textContent = "";
    submitBtn.disabled = true;
    sendText.textContent = "Sending...";

    try {
      const formData = new FormData(contactForm);

      const res = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        formStatus.textContent = "Message sent successfully. I’ll reply soon.";
        contactForm.reset();
      } else {
        formStatus.textContent = "Something went wrong. Please try again.";
      }
    } catch (err) {
      formStatus.textContent = "Network error. Please check your internet and try again.";
    } finally {
      submitBtn.disabled = false;
      sendText.textContent = "Send Message";
    }
  });
}


// MOBILE MENU
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const menuOverlay = document.getElementById("menuOverlay");

function openMenu(){
  mobileMenu.classList.add("active");
  menuOverlay.classList.add("active");
  hamburger.setAttribute("aria-expanded", "true");
}

function closeMenu(){
  mobileMenu.classList.remove("active");
  menuOverlay.classList.remove("active");
  hamburger.setAttribute("aria-expanded", "false");
}

hamburger.addEventListener("click", () => {
  if(mobileMenu.classList.contains("active")) closeMenu();
  else openMenu();
});

menuOverlay.addEventListener("click", closeMenu);

// Close menu when a link is clicked
document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", closeMenu);
});