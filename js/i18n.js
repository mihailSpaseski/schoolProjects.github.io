const translations = {
  en: {
    title: "Word Speed Reader",
    title_main: "📚 School Apps",
    textarea_placeholder: "Paste or type text here...",
    speed_label: "Reading Speed",
    start: "Start",
    pause: "Pause",
    resume: "Resume",
    stop: "Stop",
    reset: "Reset",
    ready: "Ready",
    done: "Done",
    return_home: "Return Home",
    display: "Ready. Your text will appear here.",
    unit: "WPM",
    tool_select: "Select a tool to get started",
    app_speed_reader: "Speed Reader",
    app_speed_reader_desc: "Train your reading speed and focus",
    app_math_solver: "Math Solver",
    coming_soon: "Coming soon",
  },

  mk: {
    title: "Брз Читач на Зборови",
    title_main: "📚 Школски апликации",
    textarea_placeholder: "Внесете текст тука...",
    speed_label: "Брзина на читање",
    start: "Почни",
    pause: "Пауза",
    resume: "Продолжи",
    stop: "Стоп",
    reset: "Ресет",
    ready: "Подготвен",
    done: "Завршено",
    return_home: "Врати се на почетна страна",
    display: "Спремно. Текстот ќе се појави тука.",
    unit: "Зборови во минута",
    tool_select: "Одберете алатка/апликација",
    app_speed_reader: "Брзо Читање",
    app_speed_reader_desc: "Вежбај ја брзината и концентрацијата при читање",
    app_math_solver: "Решавач на математика",
    coming_soon: "Наскоро",
  },

  sq: {
    title: "Lexues i Shpejtë i Fjalëve",
    title_main: "📚 Aplikacione Shkollore",
    textarea_placeholder: "Ngjit ose shkruaj tekstin këtu...",
    speed_label: "Shpejtësia e Leximit",
    start: "Fillo",
    pause: "Pauzë",
    resume: "Vazhdo",
    stop: "Ndalo",
    reset: "Rivendos",
    ready: "Gati",
    done: "Përfunduar",
    return_home: "Kthehu në faqen kryesore",
    display: "Gati. Teksti juaj do të shfaqet këtu.",
    unit: "Fjalë në minutë",
    tool_select: "Zgjidh një mjet për të filluar",
    app_speed_reader: "Lexim i Shpejtë",
    app_speed_reader_desc: "Stërvit shpejtësinë dhe përqendrimin në lexim",
    app_math_solver: "Zgjidhës Matematike",
    coming_soon: "Së shpejti",
  },
};

let currentLang = localStorage.getItem("lang") || "en";
const languageSelect = document.getElementById("languageSelect");
languageSelect.value = currentLang;

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    el.textContent = translations[currentLang][key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    el.placeholder = translations[currentLang][key];
  });
}

document.getElementById("languageSelect").addEventListener("change", (e) => {
  currentLang = e.target.value;
  localStorage.setItem("lang", currentLang);
  applyTranslations();
});

applyTranslations();
