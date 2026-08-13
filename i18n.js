(function () {
  "use strict";

  var STORAGE_KEY = "sv_lang";
  var DEFAULT_LANG = "en";

  var translations = {
    en: {
      "nav.svicDesc":
        '<strong>Silent Visionary Intelligence Cloud (SVIC)</strong> — the\n              unified, explainable intelligence layer connecting Forensics,\n              Sentinel, Redact, Compliance, and FraudShield into one platform.',
      "nav.demo": "Request a Demo",
      "breadcrumb.home": "Home",
      "breadcrumb.products": "Products",
      "hero.product": "Product",
      "footer.desc":
        "The unified AI intelligence platform for government, enterprise, and public safety — forensics, threat detection, redaction, fraud prevention, and compliance in one explainable system.",
      "footer.products": "Products",
      "footer.company": "Company",
      "footer.productsOverview": "Products Overview",
      "footer.solutions": "Solutions",
      "footer.technology": "Technology",
      "footer.contact": "Contact",
      "footer.touch": "Get in Touch",
      "footer.copyright": "&copy; 2025 Silent Visionary. All rights reserved.",
      "footer.badge.government": "Government-first",
      "footer.badge.multimodal": "Multimodal AI",
      "footer.badge.platform": "Unified Intelligence Platform",
      "footer.language": "Language",

      "index.hero.badge": "Explainable AI. Built for Government.",
      "index.hero.title":
        'Turn Every Signal<br />\n            <span class="hero__title-accent">Into a Clear Decision.</span>',
      "index.hero.subtitle":
        "One AI platform for digital forensics, threat detection, fraud\n            prevention, redaction, and compliance.",
      "index.hero.description":
        "Silent Visionary unifies logs, video, documents, and device data\n            into a single explainable intelligence layer. Every finding comes\n            with the reasoning behind it — built for agencies that answer to\n            courts, auditors, and the public, and ready for any organization\n            that can't afford to get security wrong.",
      "index.hero.ctaPrimary": "Schedule a Live Demo",
      "index.hero.ctaSecondary": "Explore Products",
      "index.hero.trust1": "Government-ready",
      "index.hero.trust2": "Explainable AI",
      "index.hero.trust3": "CJIS-aligned design",
      "index.tag.multimodal": "Multimodal AI",
      "index.tag.government": "Government-First Architecture",
      "index.tag.explainable": "Explainable Insights",

      "forensics.hero.title": "Close Cases Faster. Prove Every Step.",
      "forensics.hero.subtitle":
        "AI-powered digital forensics that turns scattered evidence into\n              a single, court-ready narrative — in hours, not weeks.",
      "forensics.hero.description":
        "Silent Visionary Forensics™ automates evidence triage, timeline\n              reconstruction, and report generation across video, logs, and\n              devices — so investigators spend less time processing and more\n              time solving.",

      "sentinel.hero.title": "See the Threat Before It Becomes a Breach.",
      "sentinel.hero.subtitle":
        "Behavioral detection that cuts through alert fatigue and puts\n              the risks that matter in front of your analysts first.",
      "sentinel.hero.description":
        "Silent Visionary Sentinel™ correlates signals across your\n              entire environment in real time, transforming thousands of\n              noisy alerts into a handful of prioritized, explainable\n              incidents your SOC can act on immediately.",

      "redact.hero.title": "Redact in Minutes. Release with Confidence.",
      "redact.hero.subtitle":
        "Meet every disclosure deadline without sacrificing privacy —\n              or your team's sanity.",
      "redact.hero.description":
        "Silent Visionary Redact™ automates redaction across documents,\n              video, and audio, clearing FOIA backlogs and public-records\n              requests in a fraction of the time manual review takes — with\n              an audit trail for every decision.",

      "compliance.hero.title": "Audit-Ready, Every Single Day.",
      "compliance.hero.subtitle":
        "Stop scrambling before every audit — turn your compliance\n              program into something that's always current, always provable.",
      "compliance.hero.description":
        "Silent Visionary Compliance™ centralizes frameworks, controls,\n              and evidence in one place, using AI to continuously monitor\n              your posture and cut audit prep from weeks to days.",

      "fraudshield.hero.title": "Stop Fraud Rings Before They Cost You.",
      "fraudshield.hero.subtitle":
        "Graph-powered AI that connects the dots between identities,\n              transactions, and behavior — so hidden fraud rings can't stay\n              hidden.",
      "fraudshield.hero.description":
        "Silent Visionary FraudShield™ maps relationships across your\n              data in real time, catching coordinated fraud and abuse that\n              rule-based systems miss, and giving your team the evidence to\n              act before losses grow.",
    },

    "pt-BR": {
      "nav.svicDesc":
        '<strong>Silent Visionary Intelligence Cloud (SVIC)</strong> — a camada de inteligência unificada e explicável que conecta Forensics, Sentinel, Redact, Compliance e FraudShield em uma única plataforma.',
      "nav.demo": "Solicitar uma Demonstração",
      "breadcrumb.home": "Início",
      "breadcrumb.products": "Produtos",
      "hero.product": "Produto",
      "footer.desc":
        "A plataforma unificada de inteligência artificial para governo, empresas e segurança pública — perícia digital, detecção de ameaças, redação de documentos, prevenção de fraudes e conformidade em um único sistema explicável.",
      "footer.products": "Produtos",
      "footer.company": "Empresa",
      "footer.productsOverview": "Visão Geral dos Produtos",
      "footer.solutions": "Soluções",
      "footer.technology": "Tecnologia",
      "footer.contact": "Contato",
      "footer.touch": "Fale Conosco",
      "footer.copyright": "&copy; 2025 Silent Visionary. Todos os direitos reservados.",
      "footer.badge.government": "Foco Governamental",
      "footer.badge.multimodal": "IA Multimodal",
      "footer.badge.platform": "Plataforma de Inteligência Unificada",
      "footer.language": "Idioma",

      "index.hero.badge": "IA Explicável. Feita para o Governo.",
      "index.hero.title":
        'Transforme Cada Sinal<br />\n            <span class="hero__title-accent">Em uma Decisão Clara.</span>',
      "index.hero.subtitle":
        "Uma única plataforma de IA para perícia digital, detecção de ameaças,\n            prevenção de fraudes, redação de documentos e conformidade.",
      "index.hero.description":
        "A Silent Visionary unifica registros, vídeos, documentos e dados de\n            dispositivos em uma única camada de inteligência explicável. Cada\n            descoberta vem acompanhada do raciocínio por trás dela —\n            desenvolvida para agências que respondem a tribunais, auditores e\n            ao público, e pronta para qualquer organização que não pode se\n            dar ao luxo de errar em segurança.",
      "index.hero.ctaPrimary": "Agendar uma Demonstração",
      "index.hero.ctaSecondary": "Explorar Produtos",
      "index.hero.trust1": "Pronto para o governo",
      "index.hero.trust2": "IA explicável",
      "index.hero.trust3": "Design alinhado ao CJIS",
      "index.tag.multimodal": "IA Multimodal",
      "index.tag.government": "Arquitetura Governo-Primeiro",
      "index.tag.explainable": "Insights Explicáveis",

      "forensics.hero.title": "Encerre Casos Mais Rápido. Comprove Cada Etapa.",
      "forensics.hero.subtitle":
        "Perícia digital com IA que transforma evidências dispersas em uma\n              única narrativa pronta para o tribunal — em horas, não semanas.",
      "forensics.hero.description":
        "A Silent Visionary Forensics™ automatiza a triagem de evidências, a\n              reconstrução de linhas do tempo e a geração de relatórios em\n              vídeos, registros e dispositivos — para que investigadores\n              gastem menos tempo processando e mais tempo solucionando.",

      "sentinel.hero.title": "Veja a Ameaça Antes que Ela se Torne uma Violação.",
      "sentinel.hero.subtitle":
        "Detecção comportamental que reduz a fadiga de alertas e prioriza os\n              riscos que realmente importam para seus analistas.",
      "sentinel.hero.description":
        "A Silent Visionary Sentinel™ correlaciona sinais em todo o seu\n              ambiente em tempo real, transformando milhares de alertas\n              ruidosos em poucos incidentes priorizados e explicáveis nos\n              quais seu SOC pode agir imediatamente.",

      "redact.hero.title": "Redija em Minutos. Divulgue com Confiança.",
      "redact.hero.subtitle":
        "Cumpra todos os prazos de divulgação sem sacrificar a privacidade —\n              nem a sanidade da sua equipe.",
      "redact.hero.description":
        "A Silent Visionary Redact™ automatiza a redação em documentos,\n              vídeos e áudios, eliminando o acúmulo de solicitações de\n              registros públicos em uma fração do tempo que a revisão manual\n              exige — com um histórico de auditoria para cada decisão.",

      "compliance.hero.title": "Pronta para Auditoria, Todos os Dias.",
      "compliance.hero.subtitle":
        "Pare de correr contra o tempo antes de cada auditoria — transforme\n              seu programa de conformidade em algo sempre atualizado e sempre\n              comprovável.",
      "compliance.hero.description":
        "A Silent Visionary Compliance™ centraliza frameworks, controles e\n              evidências em um só lugar, usando IA para monitorar\n              continuamente sua postura e reduzir a preparação para\n              auditorias de semanas para dias.",

      "fraudshield.hero.title": "Detenha Quadrilhas de Fraude Antes que Custem Caro.",
      "fraudshield.hero.subtitle":
        "IA baseada em grafos que conecta identidades, transações e\n              comportamentos — para que quadrilhas de fraude ocultas não\n              permaneçam escondidas.",
      "fraudshield.hero.description":
        "A Silent Visionary FraudShield™ mapeia relações em seus dados em\n              tempo real, identificando fraudes coordenadas e abusos que\n              sistemas baseados em regras não detectam, e dando à sua equipe\n              as evidências para agir antes que as perdas aumentem.",
    },
  };

  var LANG_NAMES = { en: "en", "pt-BR": "pt-BR" };

  function getSavedLang() {
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && translations[saved]) return saved;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function applyLanguage(lang) {
    var dict = translations[lang] || translations[DEFAULT_LANG];
    var fallback = translations[DEFAULT_LANG];
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      var value = dict[key] || fallback[key];
      if (value !== undefined) {
        nodes[i].innerHTML = value;
      }
    }
    document.documentElement.setAttribute("lang", LANG_NAMES[lang] || "en");
    var select = document.getElementById("lang-select");
    if (select) select.value = lang;
  }

  function setLanguage(lang) {
    if (!translations[lang]) lang = DEFAULT_LANG;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    applyLanguage(lang);
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyLanguage(getSavedLang());
    var select = document.getElementById("lang-select");
    if (select) {
      select.addEventListener("change", function () {
        setLanguage(select.value);
      });
    }
  });
})();
