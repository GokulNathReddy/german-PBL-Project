document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initImageComparisons();
});

function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const storedTheme = window.localStorage.getItem("gc-theme");
  const initialDark = storedTheme ? storedTheme === "dark" : prefersDark;

  setTheme(initialDark);

  toggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    window.localStorage.setItem("gc-theme", isDark ? "dark" : "light");
    updateThemeIcon(toggle, isDark);
  });

  updateThemeIcon(toggle, document.body.classList.contains("dark"));
}

function setTheme(dark) {
  if (dark) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

function updateThemeIcon(button, isDark) {
  const iconSpan = button.querySelector(".theme-icon");
  if (!iconSpan) return;
  iconSpan.textContent = isDark ? "☀️" : "🌙";
}

function initImageComparisons() {
  const components = document.querySelectorAll(".image-comparison");
  components.forEach((component) => {
    const slider = component.querySelector(".image-comparison__slider");
    const overlay = component.querySelector(".image-comparison__overlay");
    if (!slider || !overlay) return;

    const syncOverlay = (value) => {
      const clamped = Math.min(100, Math.max(0, Number(value)));
      component.style.setProperty("--slider-percent", `${clamped}%`);
    };

    syncOverlay(slider.value || 50);

    slider.addEventListener("input", (event) => {
      syncOverlay(event.target.value);
    });
  });
}

