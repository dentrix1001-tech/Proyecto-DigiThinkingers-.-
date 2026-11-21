/* js/awa-translator.js - Traductor nativo + cobertura amplia de idiomas + enlace a Supabase */
(function () {
  "use strict";

  const RTL_LANGS = new Set(["ar", "he", "fa", "ur", "ps", "sd", "ug", "yi", "ckb"]);

  const COUNTRY_TO_LANG = {
    // Europa
    ES: "es", AD: "ca", GI: "en", PT: "pt", FR: "fr", MC: "fr", LU: "fr",
    BE: "nl", NL: "nl", DE: "de", AT: "de", CH: "de", LI: "de", IT: "it",
    SM: "it", VA: "it", GB: "en", IE: "en", MT: "mt", DK: "da", NO: "no",
    SE: "sv", FI: "fi", IS: "is", EE: "et", LV: "lv", LT: "lt", PL: "pl",
    CZ: "cs", SK: "sk", HU: "hu", RO: "ro", MD: "ro", BG: "bg", GR: "el",
    CY: "el", HR: "hr", SI: "sl", RS: "sr", BA: "bs", ME: "sr", MK: "mk",
    AL: "sq", UA: "uk", BY: "be", RU: "ru",
    // América
    US: "en", CA: "en", MX: "es", GT: "es", BZ: "en", SV: "es", HN: "es",
    NI: "es", CR: "es", PA: "es", CU: "es", DO: "es", PR: "es", JM: "en",
    HT: "fr", TT: "en", BB: "en", BS: "en", CO: "es", VE: "es", EC: "es",
    PE: "es", BO: "es", PY: "es", UY: "es", AR: "es", CL: "es", BR: "pt",
    GY: "en", SR: "nl",
    // Asia y Oriente Medio
    JP: "ja", CN: "zh-CN", HK: "zh-HK", MO: "zh-MO", TW: "zh-TW", KR: "ko",
    KP: "ko", IN: "hi", PK: "ur", BD: "bn", LK: "si", NP: "ne", TH: "th",
    VN: "vi", ID: "id", MY: "ms", SG: "en", PH: "fil", KH: "km", LA: "lo",
    MM: "my", MN: "mn", KZ: "kk", UZ: "uz", KG: "ky", TJ: "tg", AM: "hy",
    GE: "ka", AZ: "az", TR: "tr", IL: "he", SA: "ar", AE: "ar", QA: "ar",
    KW: "ar", BH: "ar", OM: "ar", JO: "ar", LB: "ar", SY: "ar", IQ: "ar",
    IR: "fa", AF: "ps",
    // África
    MA: "ar", DZ: "ar", TN: "ar", LY: "ar", EG: "ar", SD: "ar", MR: "ar",
    ET: "am", ER: "ti", SO: "so", KE: "sw", TZ: "sw", UG: "en", RW: "rw",
    BI: "rn", NG: "en", GH: "en", ZA: "en", NA: "en", BW: "en", ZW: "en",
    ZM: "en", MW: "en", MZ: "pt", AO: "pt", CV: "pt", SN: "fr", CI: "fr",
    CM: "fr", ML: "fr", BF: "fr", NE: "fr", TD: "fr", GN: "fr", BJ: "fr",
    TG: "fr", GA: "fr", CG: "fr", CD: "fr", MG: "mg", MU: "en",
    // Oceanía
    AU: "en", NZ: "en", FJ: "en", PG: "en", WS: "sm", TO: "to"
  };

  const BASE_LANG_CODES = [
    "es", "es-ES", "es-MX", "es-AR", "es-CO", "es-CL", "es-PE", "es-VE", "es-US",
    "eu", "eu-ES", "ca", "ca-ES", "gl", "gl-ES", "ast", "an", "oc",
    "en", "en-US", "en-GB", "en-CA", "en-AU", "en-NZ", "en-IE", "en-IN", "en-ZA",
    "fr", "fr-FR", "fr-CA", "fr-BE", "fr-CH",
    "de", "de-DE", "de-AT", "de-CH",
    "it", "it-IT", "it-CH",
    "pt", "pt-PT", "pt-BR",
    "nl", "nl-NL", "nl-BE",
    "ru", "uk", "be", "pl", "cs", "sk", "hu", "ro", "bg", "hr", "sr", "sl", "mk", "sq", "bs",
    "el", "et", "lv", "lt", "fi", "sv", "sv-SE", "sv-FI", "nb", "nn", "no", "da", "is", "mt", "ga", "cy", "gd",
    "ja", "ko", "zh", "zh-CN", "zh-TW", "zh-HK",
    "hi", "bn", "pa", "gu", "mr", "ta", "te", "kn", "ml", "si", "ne", "ur", "fa", "ps",
    "th", "vi", "id", "ms", "fil", "km", "lo", "my", "mn", "kk", "uz", "ky", "tg", "hy", "ka", "az", "tr",
    "ar", "ar-SA", "ar-EG", "ar-MA", "ar-DZ", "ar-TN", "ar-AE", "he",
    "sw", "am", "ti", "so", "rw", "mg", "zu", "xh", "af", "ha", "yo", "ig"
  ];

  const PHRASE_DICT = {
    en: {
      "saltar al contenido principal": "Skip to main content",
      "aplicar idioma": "Apply language",
      "restablecer (es)": "Reset (ES)",
      "usar idioma sugerido": "Use suggested language",
      "portal profesional": "Professional Portal",
      "conocimiento": "Knowledge",
      "contenido": "Content",
      "proyectos": "Projects",
      "accesibilidad y cc by 4.0": "Accessibility & CC BY 4.0",
      "contacto": "Contact",
      "modo oscuro": "Dark Mode",
      "modo claro": "Light Mode",
      "brindis por el conocimiento": "A Toast to Knowledge",
      "zona central de contenido": "Central Content Area",
      "educación": "Education",
      "investigación": "Research",
      "tecnología": "Technology",
      "innovación": "Innovation",
      "construcción de proyectos": "Project Building"
    },
    eu: {
      "saltar al contenido principal": "Jauzi eduki nagusira",
      "aplicar idioma": "Hizkuntza aplikatu",
      "restablecer (es)": "Berrezarri (ES)",
      "usar idioma sugerido": "Iradokitako hizkuntza erabili",
      "portal profesional": "Atari Profesionala",
      "conocimiento": "Ezagutza",
      "contenido": "Edukia",
      "proyectos": "Proiektuak",
      "accesibilidad y cc by 4.0": "Irisgarritasuna eta CC BY 4.0",
      "contacto": "Kontaktua",
      "modo oscuro": "Modu Iluna",
      "modo claro": "Modu Argia",
      "brindis por el conocimiento": "Ezagutzaren aldeko topa",
      "zona central de contenido": "Edukiaren Erdialdeko Gunea",
      "educación": "Hezkuntza",
      "investigación": "Ikerketa",
      "tecnología": "Teknologia",
      "innovación": "Berrikuntza",
      "construcción de proyectos": "Proiektuen Eraikuntza"
    },
    fr: {
      "saltar al contenido principal": "Aller au contenu principal",
      "aplicar idioma": "Appliquer la langue",
      "restablecer (es)": "Réinitialiser (ES)",
      "usar idioma sugerido": "Utiliser la langue suggérée",
      "portal profesional": "Portail Professionnel",
      "conocimiento": "Connaissance",
      "contenido": "Contenu",
      "proyectos": "Projets",
      "accesibilidad y cc by 4.0": "Accessibilité et CC BY 4.0",
      "contacto": "Contact",
      "modo oscuro": "Mode Sombre",
      "modo claro": "Mode Clair",
      "educación": "Éducation",
      "investigación": "Recherche",
      "tecnología": "Technologie",
      "innovación": "Innovation"
    },
    de: {
      "saltar al contenido principal": "Zum Hauptinhalt springen",
      "aplicar idioma": "Sprache anwenden",
      "restablecer (es)": "Zurücksetzen (ES)",
      "usar idioma sugerido": "Vorgeschlagene Sprache verwenden",
      "portal profesional": "Professionelles Portal",
      "conocimiento": "Wissen",
      "contenido": "Inhalt",
      "proyectos": "Projekte",
      "accesibilidad y cc by 4.0": "Barrierefreiheit & CC BY 4.0",
      "contacto": "Kontakt",
      "modo oscuro": "Dunkelmodus",
      "modo claro": "Hellmodus",
      "brindis por el conocimiento": "Ein Toast auf das Wissen",
      "zona central de contenido": "Zentraler Inhaltsbereich",
      "educación": "Bildung",
      "investigación": "Forschung",
      "tecnología": "Technologie",
      "innovación": "Innovation",
      "construcción de proyectos": "Projektentwicklung"
    }
  };

  let suggestedLangCode = null;

  function getDisplayNames(uiLocale) {
    try {
      if (typeof Intl !== "undefined" && typeof Intl.DisplayNames === "function") {
        return new Intl.DisplayNames([uiLocale || "es"], { type: "language" });
      }
    } catch (_) {}
    return null;
  }

  function formatLanguageLabel(code, displayNames) {
    const cleanCode = String(code || "").trim();
    if (!cleanCode) return "";
    let friendly = "";
    if (displayNames) {
      try {
        friendly = displayNames.of(cleanCode) || displayNames.of(cleanCode.split("-")[0]) || "";
      } catch (_) {
        friendly = "";
      }
    }
    if (friendly && friendly.toLowerCase() !== cleanCode.toLowerCase()) {
      return friendly.charAt(0).toUpperCase() + friendly.slice(1) + " (" + cleanCode + ")";
    }
    return cleanCode;
  }

  function collectBrowserLanguages() {
    const set = new Set(BASE_LANG_CODES);

    if (typeof navigator !== "undefined") {
      if (navigator.language) {
        set.add(navigator.language.trim());
        const base0 = navigator.language.split("-")[0];
        if (base0) set.add(base0.trim());
      }
      if (navigator.userLanguage) {
        set.add(String(navigator.userLanguage).trim());
      }
      if (Array.isArray(navigator.languages)) {
        navigator.languages.forEach((lang) => {
          if (lang && typeof lang === "string") {
            set.add(lang.trim());
            const base = lang.split("-")[0];
            if (base) set.add(base.trim());
          }
        });
      }
    }

    return Array.from(set);
  }

  function populateLanguageSelect() {
    const select = document.getElementById("browserLangSelect");
    if (!select) return;

    const displayNames = getDisplayNames(document.documentElement.lang || "es");
    const options = collectBrowserLanguages().map((code) => ({
      code,
      label: formatLanguageLabel(code, displayNames)
    }));

    options.sort((a, b) => a.label.localeCompare(b.label, "es", { sensitivity: "base" }));
    select.innerHTML = "";

    options.forEach((opt) => {
      const optionEl = document.createElement("option");
      optionEl.value = opt.code;
      optionEl.textContent = opt.label;
      select.appendChild(optionEl);
    });

    const savedLang = localStorage.getItem("awa_preferred_lang") || "es";
    if (!Array.from(select.options).some((o) => o.value === savedLang)) {
      const customOpt = document.createElement("option");
      customOpt.value = savedLang;
      customOpt.textContent = formatLanguageLabel(savedLang, displayNames);
      select.prepend(customOpt);
    }
    select.value = savedLang;
  }

  function restoreOriginalTexts(rootScope) {
    const elements = rootScope.querySelectorAll("[data-orig-text]");
    elements.forEach((el) => {
      el.textContent = el.dataset.origText;
    });
  }

  async function translateElements(rootScope, baseCode) {
    const dict = PHRASE_DICT[baseCode] || null;
    const selector = "h1, h2, h3, h4, p, a, button, label, span.card-cta, .nav a";
    const nodes = rootScope.querySelectorAll(selector);

    let nativeTranslator = null;
    if (typeof window.Translator !== "undefined" && typeof window.Translator.create === "function" && baseCode !== "es") {
      try {
        const canTranslate = typeof window.Translator.availability === "function"
          ? await window.Translator.availability({ sourceLanguage: "es", targetLanguage: baseCode })
          : "readily";

        if (canTranslate && canTranslate !== "unavailable") {
          nativeTranslator = await window.Translator.create({
            sourceLanguage: "es",
            targetLanguage: baseCode
          });
        }
      } catch (_) {
        nativeTranslator = null;
      }
    }

    for (let i = 0; i < nodes.length; i++) {
      const el = nodes[i];
      if (!el) continue;
      if (el.closest(".top-translator-bar") && !["BUTTON", "LABEL"].includes(el.tagName)) continue;
      if (el.children.length > 0 && !(el.children.length === 1 && el.children[0].tagName === "SPAN" && el.classList.contains("theme-toggle"))) continue;

      const raw = (el.textContent || "").trim();
      if (!raw) continue;

      if (!el.dataset.origText) {
        el.dataset.origText = el.textContent;
      }

      const key = el.dataset.origText.trim().toLowerCase();
      if (dict && dict[key]) {
        el.textContent = dict[key];
      } else if (nativeTranslator) {
        try {
          el.textContent = await nativeTranslator.translate(el.dataset.origText);
        } catch (_) {}
      }
    }
  }

  async function applyLanguage(langCode) {
    const code = (langCode || "es").trim();
    const baseCode = code.split("-")[0].toLowerCase();
    const isRtl = RTL_LANGS.has(baseCode);

    document.documentElement.lang = code;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";

    const mainRoot = document.querySelector("[data-translatable-root]") || document.body;
    if (mainRoot) {
      mainRoot.setAttribute("lang", code);
      mainRoot.setAttribute("dir", isRtl ? "rtl" : "ltr");
    }

    localStorage.setItem("awa_preferred_lang", code);

    const activeLabelEl = document.getElementById("activeLangLabel");
    if (activeLabelEl) {
      activeLabelEl.textContent = formatLanguageLabel(code, getDisplayNames(code));
    }

    restoreOriginalTexts(document);

    if (baseCode !== "es") {
      await translateElements(document, baseCode);
    }
  }

  function updateClock() {
    const telemetryEl = document.getElementById("telemetryDataText");
    if (!telemetryEl) return;

    const now = new Date();
    const fechaStr = now.toLocaleDateString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit" });
    const horaStr = now.toLocaleTimeString("es-ES");
    const netText = window.cachedGeoSummary || "Zona geográfica pendiente de consulta";

    telemetryEl.textContent = fechaStr + " - " + horaStr + " | " + netText;
  }

  async function detectGeoAndLanguage() {
    const geoTextEl = document.getElementById("geoSuggestionText");
    const useSuggestedBtn = document.getElementById("useSuggestedLangBtn");
    const barEl = document.querySelector(".top-translator-bar");
    const supabaseGeoUrl = barEl ? (barEl.dataset.supabaseGeoUrl || "").trim() : "";

    const endpoint = supabaseGeoUrl || "https://ipapi.co/json/";
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);

    try {
      const response = await fetch(endpoint, { signal: controller.signal });
      clearTimeout(timer);
      if (!response.ok) throw new Error("Respuesta no válida");

      const data = await response.json();
      const countryCode = String(data.country_code || data.country || "").toUpperCase();
      const city = data.city || "Ubicación regional";
      const ip = data.ip || "Protegida";

      window.cachedGeoSummary = city + (countryCode ? ", " + countryCode : "") + (data.ip ? " (IP: " + ip + ")" : "");
      updateClock();

      const mappedLang = data.suggested_lang || COUNTRY_TO_LANG[countryCode] || (navigator.language || "es");
      suggestedLangCode = mappedLang;

      if (geoTextEl) {
        geoTextEl.textContent =
          "Zona detectada: " + city + (countryCode ? " (" + countryCode + ")" : "") +
          " · Idioma sugerido: " + formatLanguageLabel(mappedLang, getDisplayNames(mappedLang));
      }
      if (useSuggestedBtn) useSuggestedBtn.style.display = "inline-block";
    } catch (_) {
      clearTimeout(timer);
      const fallbackLang = (navigator.languages && navigator.languages[0]) || navigator.language || "es";
      suggestedLangCode = fallbackLang;
      window.cachedGeoSummary = "Red local / Detección por navegador (" + fallbackLang + ")";
      updateClock();

      if (geoTextEl) {
        geoTextEl.textContent = "Sugerencia por navegador: " + formatLanguageLabel(fallbackLang, getDisplayNames(fallbackLang));
      }
      if (useSuggestedBtn) useSuggestedBtn.style.display = "inline-block";
    }
  }

  function initThemeToggle() {
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const themeText = document.getElementById("themeText");
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
      htmlElement.setAttribute("data-theme", "dark");
      if (themeText) themeText.textContent = "Modo Claro";
    }

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => {
        if (htmlElement.getAttribute("data-theme") === "dark") {
          htmlElement.removeAttribute("data-theme");
          localStorage.setItem("theme", "light");
          if (themeText) themeText.textContent = "Modo Oscuro";
        } else {
          htmlElement.setAttribute("data-theme", "dark");
          localStorage.setItem("theme", "dark");
          if (themeText) themeText.textContent = "Modo Claro";
        }
      });
    }
  }

  function onReady() {
    populateLanguageSelect();
    initThemeToggle();
    updateClock();
    setInterval(updateClock, 1000);
    detectGeoAndLanguage();

    const initialLang = localStorage.getItem("awa_preferred_lang") || "es";
    if (initialLang !== "es") applyLanguage(initialLang);

    const applyBtn = document.getElementById("applyLangBtn");
    const resetBtn = document.getElementById("resetLangBtn");
    const selectEl = document.getElementById("browserLangSelect");
    const useSuggestedBtn = document.getElementById("useSuggestedLangBtn");

    if (applyBtn && selectEl) {
      applyBtn.addEventListener("click", () => applyLanguage(selectEl.value));
    }
    if (resetBtn && selectEl) {
      resetBtn.addEventListener("click", () => {
        selectEl.value = "es";
        applyLanguage("es");
      });
    }
    if (useSuggestedBtn && selectEl) {
      useSuggestedBtn.addEventListener("click", () => {
        if (!suggestedLangCode) return;
        if (!Array.from(selectEl.options).some((o) => o.value === suggestedLangCode)) {
          const opt = document.createElement("option");
          opt.value = suggestedLangCode;
          opt.textContent = formatLanguageLabel(suggestedLangCode, getDisplayNames(suggestedLangCode));
          selectEl.prepend(opt);
        }
        selectEl.value = suggestedLangCode;
        applyLanguage(suggestedLangCode);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
})();
