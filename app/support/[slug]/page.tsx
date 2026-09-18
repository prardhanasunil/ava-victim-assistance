"use client";

import Link from "next/link";
import QuickExit from "@/components/QuickExit";
import { useParams } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const services = [
  {
    slug: "verified-legal-aid-service",
    category: "Legal Support",
    location: "Bengaluru Urban",
    type: "Government",
    languages: ["English", "Kannada", "Hindi"],
  },
  {
    slug: "victim-support-organisation",
    category: "NGOs & Support Groups",
    location: "Mysuru (Mysore)",
    type: "NGO",
    languages: ["English", "Kannada"],
  },
  {
    slug: "psychological-support-service",
    category: "Psychological Support",
    location: "Bengaluru Urban",
    type: "Private",
    languages: ["English", "Kannada", "Hindi"],
  },
  {
    slug: "community-legal-support-centre",
    category: "Legal Support",
    location: "Belagavi (Belgaum)",
    type: "NGO",
    languages: ["English", "Kannada"],
  },
  {
    slug: "medical-victim-support-service",
    category: "Medical Support",
    location: "Dakshina Kannada",
    type: "Government",
    languages: ["English", "Kannada"],
  },
];

const serviceContent = {
  "verified-legal-aid-service": {
    en: {
      name: "Verified Legal Aid Service",
      description:
        "Legal support information and assistance for people affected by crime.",
      services: [
        "General legal information",
        "Information about legal rights",
        "Guidance on accessing legal aid",
        "Information about the criminal justice process",
      ],
    },
    kn: {
      name: "ಪರಿಶೀಲಿಸಲಾದ ಕಾನೂನು ನೆರವು ಸೇವೆ",
      description:
        "ಅಪರಾಧದಿಂದ ಬಾಧಿತರಾದವರಿಗೆ ಕಾನೂನು ನೆರವು ಮಾಹಿತಿ ಮತ್ತು ಸಹಾಯ.",
      services: [
        "ಸಾಮಾನ್ಯ ಕಾನೂನು ಮಾಹಿತಿ",
        "ಕಾನೂನು ಹಕ್ಕುಗಳ ಕುರಿತು ಮಾಹಿತಿ",
        "ಕಾನೂನು ನೆರವು ಪಡೆಯುವ ಕುರಿತು ಮಾರ್ಗದರ್ಶನ",
        "ಅಪರಾಧ ನ್ಯಾಯ ಪ್ರಕ್ರಿಯೆಯ ಕುರಿತು ಮಾಹಿತಿ",
      ],
    },
    hi: {
      name: "सत्यापित कानूनी सहायता सेवा",
      description:
        "अपराध से प्रभावित लोगों के लिए कानूनी सहायता संबंधी जानकारी और सहायता।",
      services: [
        "सामान्य कानूनी जानकारी",
        "कानूनी अधिकारों की जानकारी",
        "कानूनी सहायता प्राप्त करने के बारे में मार्गदर्शन",
        "आपराधिक न्याय प्रक्रिया की जानकारी",
      ],
    },
  },

  "victim-support-organisation": {
    en: {
      name: "Victim Support Organisation",
      description:
        "Victim-centred support and information for people affected by crime.",
      services: [
        "Victim support",
        "Information and referrals",
        "Support-group information",
        "Access to relevant services",
      ],
    },
    kn: {
      name: "ಬಾಧಿತರಿಗೆ ಬೆಂಬಲ ನೀಡುವ ಸಂಸ್ಥೆ",
      description:
        "ಅಪರಾಧದಿಂದ ಬಾಧಿತರಾದವರಿಗೆ ಬಾಧಿತ ಕೇಂದ್ರಿತ ಬೆಂಬಲ ಮತ್ತು ಮಾಹಿತಿ.",
      services: [
        "ಬಾಧಿತರಿಗೆ ಬೆಂಬಲ",
        "ಮಾಹಿತಿ ಮತ್ತು ಸೂಕ್ತ ಸೇವೆಗಳಿಗೆ ಸಂಪರ್ಕ",
        "ಬೆಂಬಲ ಗುಂಪುಗಳ ಕುರಿತು ಮಾಹಿತಿ",
        "ಸಂಬಂಧಿತ ಸೇವೆಗಳಿಗೆ ಪ್ರವೇಶ",
      ],
    },
    hi: {
      name: "पीड़ित सहायता संगठन",
      description:
        "अपराध से प्रभावित लोगों के लिए पीड़ित-केंद्रित सहायता और जानकारी।",
      services: [
        "पीड़ित सहायता",
        "जानकारी और रेफरल",
        "सहायता समूहों की जानकारी",
        "संबंधित सेवाओं तक पहुंच",
      ],
    },
  },

  "psychological-support-service": {
    en: {
      name: "Psychological Support Service",
      description:
        "Psychological support information and access to appropriate professional services.",
      services: [
        "Psychological support",
        "Counselling referrals",
        "Information about support services",
        "Professional service referrals",
      ],
    },
    kn: {
      name: "ಮಾನಸಿಕ ಬೆಂಬಲ ಸೇವೆ",
      description:
        "ಮಾನಸಿಕ ಬೆಂಬಲದ ಮಾಹಿತಿ ಮತ್ತು ಸೂಕ್ತ ವೃತ್ತಿಪರ ಸೇವೆಗಳಿಗೆ ಪ್ರವೇಶ.",
      services: [
        "ಮಾನಸಿಕ ಬೆಂಬಲ",
        "ಸಮಾಲೋಚನೆಗೆ ಸಂಬಂಧಿಸಿದ ರೆಫರಲ್‌ಗಳು",
        "ಬೆಂಬಲ ಸೇವೆಗಳ ಕುರಿತು ಮಾಹಿತಿ",
        "ವೃತ್ತಿಪರ ಸೇವೆಗಳಿಗೆ ರೆಫರಲ್‌ಗಳು",
      ],
    },
    hi: {
      name: "मनोवैज्ञानिक सहायता सेवा",
      description:
        "मनोवैज्ञानिक सहायता संबंधी जानकारी और उपयुक्त पेशेवर सेवाओं तक पहुंच।",
      services: [
        "मनोवैज्ञानिक सहायता",
        "काउंसलिंग रेफरल",
        "सहायता सेवाओं की जानकारी",
        "पेशेवर सेवाओं के लिए रेफरल",
      ],
    },
  },

  "community-legal-support-centre": {
    en: {
      name: "Community Legal Support Centre",
      description:
        "Community-based legal support and information for people affected by crime.",
      services: [
        "General legal information",
        "Legal aid information",
        "Rights information",
        "Justice-process guidance",
      ],
    },
    kn: {
      name: "ಸಮುದಾಯ ಕಾನೂನು ಬೆಂಬಲ ಕೇಂದ್ರ",
      description:
        "ಅಪರಾಧದಿಂದ ಬಾಧಿತರಾದವರಿಗೆ ಸಮುದಾಯ ಆಧಾರಿತ ಕಾನೂನು ಬೆಂಬಲ ಮತ್ತು ಮಾಹಿತಿ.",
      services: [
        "ಸಾಮಾನ್ಯ ಕಾನೂನು ಮಾಹಿತಿ",
        "ಕಾನೂನು ನೆರವು ಮಾಹಿತಿ",
        "ಹಕ್ಕುಗಳ ಕುರಿತು ಮಾಹಿತಿ",
        "ನ್ಯಾಯ ಪ್ರಕ್ರಿಯೆಯ ಕುರಿತು ಮಾರ್ಗದರ್ಶನ",
      ],
    },
    hi: {
      name: "सामुदायिक कानूनी सहायता केंद्र",
      description:
        "अपराध से प्रभावित लोगों के लिए समुदाय-आधारित कानूनी सहायता और जानकारी।",
      services: [
        "सामान्य कानूनी जानकारी",
        "कानूनी सहायता की जानकारी",
        "अधिकारों की जानकारी",
        "न्याय प्रक्रिया के बारे में मार्गदर्शन",
      ],
    },
  },

  "medical-victim-support-service": {
    en: {
      name: "Medical Victim Support Service",
      description:
        "Medical support information and access to relevant healthcare services.",
      services: [
        "Medical support information",
        "Healthcare referrals",
        "Information about available services",
        "Support-service referrals",
      ],
    },
    kn: {
      name: "ವೈದ್ಯಕೀಯ ಬಾಧಿತ ಬೆಂಬಲ ಸೇವೆ",
      description:
        "ವೈದ್ಯಕೀಯ ಬೆಂಬಲದ ಮಾಹಿತಿ ಮತ್ತು ಸಂಬಂಧಿತ ಆರೋಗ್ಯ ಸೇವೆಗಳಿಗೆ ಪ್ರವೇಶ.",
      services: [
        "ವೈದ್ಯಕೀಯ ಬೆಂಬಲ ಮಾಹಿತಿ",
        "ಆರೋಗ್ಯ ಸೇವೆಗಳಿಗೆ ರೆಫರಲ್‌ಗಳು",
        "ಲಭ್ಯವಿರುವ ಸೇವೆಗಳ ಕುರಿತು ಮಾಹಿತಿ",
        "ಬೆಂಬಲ ಸೇವೆಗಳಿಗೆ ರೆಫರಲ್‌ಗಳು",
      ],
    },
    hi: {
      name: "चिकित्सा पीड़ित सहायता सेवा",
      description:
        "चिकित्सा सहायता संबंधी जानकारी और संबंधित स्वास्थ्य सेवाओं तक पहुंच।",
      services: [
        "चिकित्सा सहायता की जानकारी",
        "स्वास्थ्य सेवाओं के लिए रेफरल",
        "उपलब्ध सेवाओं की जानकारी",
        "सहायता सेवाओं के लिए रेफरल",
      ],
    },
  },
} as const;

function getCategoryTranslation(
  category: string,
  t: ReturnType<typeof useLanguage>["t"]
) {
  switch (category) {
    case "Legal Support":
      return t("legalSupport");
    case "Medical Support":
      return t("medicalSupport");
    case "Psychological Support":
      return t("psychologicalSupport");
    case "NGOs & Support Groups":
      return t("supportGroups");
    default:
      return category;
  }
}

function getTypeTranslation(
  type: string,
  t: ReturnType<typeof useLanguage>["t"]
) {
  switch (type) {
    case "Government":
      return t("government");
    case "NGO":
      return t("ngo");
    case "Private":
      return t("private");
    default:
      return type;
  }
}

function getDistrictTranslation(
  district: string,
  language: string
) {
  const districtTranslations: Record<string, Record<string, string>> = {
    "Bengaluru Urban": {
      kn: "ಬೆಂಗಳೂರು ನಗರ",
      hi: "बेंगलुरु शहरी",
    },
    "Mysuru (Mysore)": {
      kn: "ಮೈಸೂರು",
      hi: "मैसूरु",
    },
    "Belagavi (Belgaum)": {
      kn: "ಬೆಳಗಾವಿ",
      hi: "बेलगावी",
    },
    "Dakshina Kannada": {
      kn: "ದಕ್ಷಿಣ ಕನ್ನಡ",
      hi: "दक्षिण कन्नड़",
    },
  };

  if (language === "en") {
    return district;
  }

  return districtTranslations[district]?.[language] ?? district;
}

function getLanguageTranslation(
  languageName: string,
  language: string
) {
  const languageTranslations: Record<
    string,
    Record<string, string>
  > = {
    English: {
      kn: "ಇಂಗ್ಲಿಷ್",
      hi: "अंग्रेज़ी",
    },
    Kannada: {
      kn: "ಕನ್ನಡ",
      hi: "कन्नड़",
    },
    Hindi: {
      kn: "ಹಿಂದಿ",
      hi: "हिन्दी",
    },
  };

  if (language === "en") {
    return languageName;
  }

  return languageTranslations[languageName]?.[language] ?? languageName;
}

export default function SupportDetailsPage() {
  const { language, t } = useLanguage();

  const params = useParams();
  const slug = params.slug as string;

  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return (
      <main className="min-h-screen bg-ava-cream px-6 py-12 text-ava-charcoal">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/support"
            className="text-sm font-medium text-ava-slate transition hover:text-ava-rose"
          >
            ← {t("backToAVA")}
          </Link>

          <div className="mt-10 rounded-2xl border border-ava-mist bg-ava-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-ava-charcoal">
              {language === "kn"
                ? "ಬೆಂಬಲ ಸೇವೆ ಕಂಡುಬಂದಿಲ್ಲ"
                : language === "hi"
                  ? "सहायता सेवा नहीं मिली"
                  : "Support service not found"}
            </h1>

            <p className="mt-3 text-ava-slate">
              {language === "kn"
                ? "ಪ್ರಸ್ತುತ AVA ಡೆಮೋ ಡೈರೆಕ್ಟರಿಯಲ್ಲಿ ಈ ಬೆಂಬಲ ಸೇವೆ ಕಂಡುಬಂದಿಲ್ಲ."
                : language === "hi"
                  ? "वर्तमान AVA डेमो निर्देशिका में यह सहायता सेवा नहीं मिली।"
                  : "This support service could not be found in the current AVA demo directory."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const content =
    serviceContent[service.slug as keyof typeof serviceContent];

  const translatedContent =
    content[language as keyof typeof content] ?? content.en;

  return (
    <main className="min-h-screen bg-ava-cream text-ava-charcoal">
      {/* Header */}
      <header className="border-b border-ava-mist bg-ava-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-2xl font-bold text-ava-slate transition hover:text-ava-rose"
          >
            {t("appName")}
          </Link>

          <Link
            href="/support"
            className="text-sm font-medium text-ava-slate transition hover:text-ava-rose"
          >
            ← {t("backToAVA")}
          </Link>
        </div>
      </header>

      {/* Demo warning */}
      <div className="border-b border-ava-rose/20 bg-ava-rose/10 px-6 py-3">
        <div className="mx-auto max-w-6xl text-center text-sm font-semibold text-ava-charcoal">
          {t("demoData")}
        </div>
      </div>

      {/* Main content */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-ava-rose">
            {getCategoryTranslation(service.category, t)}
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ava-charcoal sm:text-4xl">
            {translatedContent.name}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-ava-slate">
            {translatedContent.description}
          </p>
        </div>

        {/* Service information */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-ava-mist bg-ava-white p-6 shadow-sm">
            <p className="text-sm text-ava-dusty">
              {t("location")}
            </p>

            <p className="mt-2 font-semibold text-ava-charcoal">
              {getDistrictTranslation(service.location, language)}
            </p>
          </div>

          <div className="rounded-2xl border border-ava-mist bg-ava-white p-6 shadow-sm">
            <p className="text-sm text-ava-dusty">
              {t("organisationType")}
            </p>

            <p className="mt-2 font-semibold text-ava-charcoal">
              {getTypeTranslation(service.type, t)}
            </p>
          </div>

          <div className="rounded-2xl border border-ava-rose/30 bg-ava-rose/10 p-6">
            <p className="text-sm text-ava-dusty">
              {t("verificationStatus")}
            </p>

            <p className="mt-2 font-semibold text-ava-rose">
              ✓ {t("verified")}
            </p>
          </div>
        </div>

        {/* Support and languages */}
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <section className="rounded-2xl border border-ava-mist bg-ava-white p-7 shadow-sm">
            <h2 className="text-xl font-bold text-ava-charcoal">
              {t("supportAvailable")}
            </h2>

            <ul className="mt-5 space-y-3">
              {translatedContent.services.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-ava-slate"
                >
                  <span className="mt-1 font-bold text-ava-rose">
                    •
                  </span>

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-ava-mist bg-ava-white p-7 shadow-sm">
            <h2 className="text-xl font-bold text-ava-charcoal">
              {t("languages")}
            </h2>

            <div className="mt-5 flex flex-wrap gap-2">
              {service.languages.map((languageName) => (
                <span
                  key={languageName}
                  className="rounded-full bg-ava-mist px-4 py-2 text-sm font-medium text-ava-slate"
                >
                  {getLanguageTranslation(
                    languageName,
                    language
                  )}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-ava-mist bg-ava-cream p-5">
              <p className="text-sm leading-6 text-ava-slate">
                {t("disclaimer")}
              </p>
            </div>
          </section>
        </div>

        {/* Verification information */}
        <div className="mt-8 rounded-2xl border border-ava-rose/25 bg-ava-white p-7 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-ava-charcoal">
              {t("verificationInformation")}
            </h2>

            <span className="rounded-full bg-ava-rose/15 px-3 py-1 text-xs font-semibold text-ava-rose">
              ✓ {t("verified")}
            </span>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm text-ava-dusty">
                {t("verificationStatus")}
              </p>

              <p className="mt-1 font-semibold text-ava-rose">
                {t("verified")}
              </p>
            </div>

            <div>
              <p className="text-sm text-ava-dusty">
                {t("source")}
              </p>

              <p className="mt-1 text-ava-slate">
                {language === "kn"
                  ? "ಡೆಮೋ ಪರಿಶೀಲನಾ ದಾಖಲೆ"
                  : language === "hi"
                    ? "डेमो सत्यापन रिकॉर्ड"
                    : "Demo verification record"}
              </p>
            </div>
          </div>
        </div>

        {/* Back button */}
        <div className="mt-10">
          <Link
            href="/support"
            className="inline-block rounded-xl bg-ava-slate px-6 py-3 font-semibold text-ava-white shadow-sm transition hover:bg-ava-rose"
          >
            ← {t("backToAVA")}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ava-mist bg-ava-white px-6 py-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-ava-dusty">
          {t("appName")} — {t("tagline")}
        </div>
      </footer>

      <QuickExit />
    </main>
  );
}