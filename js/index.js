var themeToggleButton = document.getElementById("theme-toggle-button");
var html = document.querySelector("html");

var scrollToTopBtn = document.getElementById("scroll-to-top");
var heroSection = document.getElementById("hero-section");

var filterBtns = document.querySelectorAll(".portfolio-filter");
var portfolioItem = document.querySelectorAll(".portfolio-item");

var testimonialsCarousel = document.getElementById("testimonials-carousel");
var testimonialCards = document.querySelectorAll(".testimonial-card");
var nextBtn = document.getElementById("next-testimonial");
var prevBtn = document.getElementById("prev-testimonial");
var carouselIndicators = document.querySelectorAll(".carousel-indicator");

var settingsToggleBtn = document.getElementById("settings-toggle");
var settingsSidebar = document.getElementById("settings-sidebar");
var closeSettings = document.getElementById("close-settings");
var fontOption = document.querySelectorAll(".font-option");
var themeColorsGrid = document.getElementById("theme-colors-grid");
var resetSettings = document.getElementById("reset-settings");

var savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  html.classList.remove("dark");
} else {
  html.classList.add("dark");
}
themeToggleButton.addEventListener("click", function () {
  html.classList.toggle("dark");
  if (html.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.visibility = "visible";
    scrollToTopBtn.style.opacity = 1;
  } else {
    scrollToTopBtn.style.visibility = "hidden";
    scrollToTopBtn.style.opacity = 0;
  }
});

scrollToTopBtn.addEventListener("click", function () {
  heroSection.scrollIntoView();
});

//Navs and tabs
for (var button of filterBtns) {
  button.addEventListener("click", function () {
    var filter = this.getAttribute("data-filter");

    for (var btn of filterBtns) {
      btn.classList.remove(
        "active",
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white",
        "hover:shadow-lg",
        "hover:shadow-primary/50"
      );
      btn.classList.add(
        "bg-white",
        "dark:bg-slate-800",
        "text-slate-600",
        "dark:text-slate-300",
        "hover:bg-slate-100",
        "dark:hover:bg-slate-700",
        "border",
        "border-slate-300",
        "dark:border-slate-700"
      );
      btn.setAttribute("aria-pressed", "false");
    }
    this.classList.add(
      "active",
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
      "hover:shadow-lg",
      "hover:shadow-primary/50"
    );
    this.classList.remove(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
      "hover:bg-slate-100",
      "dark:hover:bg-slate-700",
      "border",
      "border-slate-300",
      "dark:border-slate-700"
    );
    this.setAttribute("aria-pressed", "true");
    for (var item of portfolioItem) {
      var category = item.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    }
  });
}

// Carousel
var currentIndex = 0;
var visibleCardCount = getVisibleCardCount();

function getVisibleCardCount() {
  if (window.innerWidth < 640) {
    return 1;
  } else if (window.innerWidth < 1024) {
    return 2;
  } else {
    return 3;
  }
}

window.addEventListener("resize", function () {
  visibleCardCount = getVisibleCardCount();
  updateCarousel();
});

function updateCarousel() {
  var cardWidth = testimonialCards[0].offsetWidth;
  testimonialsCarousel.style.transform = `translateX(${
    currentIndex * cardWidth
  }px)`;
}
var currentIndicator = 0;
function updateIndicator() {
  for (var i = 0; i < carouselIndicators.length; i++) {
    if (i === currentIndicator) {
      carouselIndicators[i].classList.add("active", "bg-accent");
      carouselIndicators[i].classList.remove(
        "bg-slate-400",
        "dark:bg-slate-600"
      );
      carouselIndicators[i].setAttribute("aria-selected", "true");
    } else {
      carouselIndicators[i].classList.remove("active", "bg-accent");
      carouselIndicators[i].classList.add("bg-slate-400", "dark:bg-slate-600");
      carouselIndicators[i].setAttribute("aria-selected", "false");
    }
  }
}

function moveSlide(step) {
  currentIndex += step;
  if (currentIndex > testimonialCards.length - visibleCardCount) {
    currentIndex = 0;
    currentIndicator = carouselIndicators.length;
  }
  if (currentIndex < 0) {
    currentIndex = testimonialCards.length - visibleCardCount;
    currentIndicator = 0;
  }
  updateCarousel();
}

nextBtn.addEventListener("click", function () {
  moveSlide(1);
  if (currentIndex < testimonialCards.length + 1 - visibleCardCount) {
    currentIndicator++;
    if (currentIndicator >= carouselIndicators.length) {
      currentIndicator = 0;
    }
  }
  updateIndicator();
});
prevBtn.addEventListener("click", function () {
  moveSlide(-1);
  if (currentIndex < testimonialCards.length + 1 - visibleCardCount) {
    currentIndicator--;
    if (currentIndicator < 0) {
      currentIndicator = carouselIndicators.length - 1;
    }
  }
  updateIndicator();
});

for (var i = 0; i < carouselIndicators.length; i++) {
  carouselIndicators[i].addEventListener("click", function () {
    var clickedIndex = parseInt(this.getAttribute("data-index"));
    var step = clickedIndex - currentIndicator;

    moveSlide(step);

    currentIndicator = clickedIndex;
    updateIndicator();
  });
}

// Settings Sidebar
settingsToggleBtn.addEventListener("click", function () {
  settingsSidebar.classList.remove("translate-x-full");
  if (settingsSidebar.classList.contains("translate-x-full")) {
    settingsToggleBtn.style.right = "0";
  } else {
    settingsToggleBtn.style.right = "320px";
  }
});
closeSettings.addEventListener("click", closeSettingsSidebar);

function closeSettingsSidebar() {
  settingsSidebar.classList.add("translate-x-full");
  settingsToggleBtn.style.right = "0";
}

document.addEventListener("click", function (e) {
  if (
    !settingsSidebar.contains(e.target) &&
    !settingsToggleBtn.contains(e.target)
  ) {
    closeSettingsSidebar();
  }
});

var defaultFont = "tajawal";
var savedFont = localStorage.getItem("selectedFont");

if (!savedFont) {
  savedFont = defaultFont;
  localStorage.setItem("selectedFont", savedFont);
}

for (var oldFont of fontOption) {
  var f = oldFont.getAttribute("data-font");
  document.body.classList.remove(`font-${f}`);
  oldFont.classList.remove(
    "active",
    "border-primary",
    "bg-slate-50",
    "dark:bg-slate-800"
  );
  oldFont.classList.add("border-slate-200", "dark:border-slate-700");
  oldFont.setAttribute("aria-checked", "false");
}
document.body.classList.add(`font-${savedFont}`);

for (var font of fontOption) {
  if (font.getAttribute("data-font") === savedFont) {
    font.classList.add(
      "active",
      "border-primary",
      "bg-slate-50",
      "dark:bg-slate-800"
    );
    font.classList.remove("border-slate-200", "dark:border-slate-700");
    font.setAttribute("aria-checked", "true");
  }
}


for (var i = 0; i < fontOption.length; i++) {
  fontOption[i].addEventListener("click", function () {
    var font = this.getAttribute("data-font");

    for (var j = 0; j < fontOption.length; j++) {
      fontOption[j].classList.remove(
        "active",
        "border-primary",
        "bg-slate-50",
        "dark:bg-slate-800"
      );
      fontOption[j].classList.add("border-slate-200", "dark:border-slate-700");

      fontOption[j].setAttribute("aria-checked", "false");
      var f = fontOption[j].getAttribute("data-font");
      document.body.classList.remove(`font-${f}`);
    }
    this.classList.remove("border-slate-200", "dark:border-slate-700");
    this.classList.add(
      "active",
      "border-primary",
      "bg-slate-50",
      "dark:bg-slate-800"
    );
    this.setAttribute("aria-checked", "true");
    document.body.classList.add(`font-${font}`);

    localStorage.setItem("selectedFont", font);
  });
}

var theme = [
  {
    title: "Purple Blue",
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#a855f7",
  },
  {
    title: "Pink Orange",
    primary: "#ec4899",
    secondary: "#f97316",
    accent: "#fb923c",
  },
  {
    title: "Green Emerald",
    primary: "#10b981",
    secondary: "#059669",
    accent: "#34d399",
  },
  {
    title: "Blue Cyan",
    primary: "#3b82f6",
    secondary: "#06b6d4",
    accent: "#22d3ee",
  },
  {
    title: "Red Rose",
    primary: "#ef4444",
    secondary: "#f43f5e",
    accent: "#fb7185",
  },
  {
    title: "Amber Orange",
    primary: "#f59e0b",
    secondary: "#ea580c",
    accent: "#fbbf24",
  },
];
var box = "";
for (var i = 0; i < theme.length; i++) {
  box += `<button 
              class="w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm"
              title="${theme[i].title}"
              data-primary = "${theme[i].primary}"
              data-secondary="${theme[i].secondary}"
              data-accent = "${theme[i].accent}"
              style="background: linear-gradient(135deg, ${theme[i].primary}, ${theme[i].secondary})"
              ></button>`;
}
themeColorsGrid.innerHTML = box;
var colorBtns = document.querySelectorAll("#theme-colors-grid button");

var savedColor = localStorage.getItem("themeColors");
if (savedColor) {
  var colors = JSON.parse(savedColor);

  document.documentElement.style.setProperty("--color-primary", colors.primary);
  document.documentElement.style.setProperty(
    "--color-secondary",
    colors.secondary
  );
  document.documentElement.style.setProperty("--color-accent", colors.accent);

  for (var i = 0; i < colorBtns.length; i++) {
    if (colorBtns[i].getAttribute("data-primary") === colors.primary) {
      colorBtns[i].classList.add(
        "ring-2",
        "ring-primary",
        "ring-offset-2",
        "ring-offset-white",
        "dark:ring-offset-slate-900"
      );
    }
  }
}

for (var i = 0; i < colorBtns.length; i++) {
  colorBtns[i].addEventListener("click", function () {
    var primaryColor = this.getAttribute("data-primary");
    var secondaryColor = this.getAttribute("data-secondary");
    var accentColor = this.getAttribute("data-accent");

    document.documentElement.style.setProperty("--color-primary", primaryColor);
    document.documentElement.style.setProperty(
      "--color-secondary",
      secondaryColor
    );
    document.documentElement.style.setProperty("--color-accent", accentColor);
    localStorage.setItem(
      "themeColors",
      JSON.stringify({
        primary: primaryColor,
        secondary: secondaryColor,
        accent: accentColor,
      })
    );

    for (var j = 0; j < colorBtns.length; j++) {
      colorBtns[j].classList.remove(
        "ring-2",
        "ring-primary",
        "ring-offset-2",
        "ring-offset-white",
        "dark:ring-offset-slate-900"
      );
    }
    this.classList.add(
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900"
    );
  });
}

resetSettings.addEventListener("click", function () {
  for (var font of fontOption) {
    var f = font.getAttribute("data-font");
    document.body.classList.remove(`font-${f}`);
    font.classList.remove(
      "active",
      "border-primary",
      "bg-slate-50",
      "dark:bg-slate-800"
    );
    font.classList.add("border-slate-200", "dark:border-slate-700");
    font.setAttribute("aria-checked", "false");
  }

  document.body.classList.add(`font-${defaultFont}`);

  for (var font of fontOption) {
    if (font.getAttribute("data-font") === defaultFont) {
      font.classList.add(
        "active",
        "border-primary",
        "bg-slate-50",
        "dark:bg-slate-800"
      );
      font.classList.remove("border-slate-200", "dark:border-slate-700");
      font.setAttribute("aria-checked", "true");
    }
  }

  var defaultColor = theme[0];
  document.documentElement.style.setProperty(
    "--color-primary",
    defaultColor.primary
  );
  document.documentElement.style.setProperty(
    "--color-secondary",
    defaultColor.secondary
  );
  document.documentElement.style.setProperty(
    "--color-accent",
    defaultColor.accent
  );

  for (var btn of colorBtns) {
    btn.classList.remove(
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900"
    );
  }
  colorBtns[0].classList.add(
    "ring-2",
    "ring-primary",
    "ring-offset-2",
    "ring-offset-white",
    "dark:ring-offset-slate-900"
  );

  localStorage.setItem("selectedFont", defaultFont);
  localStorage.setItem(
    "themeColors",
    JSON.stringify({
      primary: defaultColor.primary,
      secondary: defaultColor.secondary,
      accent: defaultColor.accent,
    })
  );
  closeSettingsSidebar();
});
