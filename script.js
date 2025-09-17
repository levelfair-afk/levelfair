document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".menu-link");

  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("data-target");
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Tema/idioma handlers, if present
  const langBtn = document.getElementById("toggle-lang");
  if (langBtn) {
    langBtn.addEventListener("click", function () {
      const langPT = document.querySelectorAll(".lang-pt");
      const langEN = document.querySelectorAll(".lang-en");
      langPT.forEach(el => el.classList.toggle("hidden"));
      langEN.forEach(el => el.classList.toggle("hidden"));
    });
  }
});
  });

  // Tema e idioma (mantém)
  const themeBtn = document.getElementById("toggle-theme");
  themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("theme-dark");
    document.body.classList.toggle("theme-light");
  });

  const langBtn = document.getElementById("toggle-lang");
  langBtn.addEventListener("click", function () {
    const langPT = document.querySelectorAll(".lang-pt");
    const langEN = document.querySelectorAll(".lang-en");
    langPT.forEach(el => el.classList.toggle("hidden"));
    langEN.forEach(el => el.classList.toggle("hidden"));
  });
});
