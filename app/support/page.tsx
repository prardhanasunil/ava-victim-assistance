"use client";

import QuickExit from "@/components/QuickExit";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const categories = [
  {
    icon: "⚖️",
    titleKey: "legalSupport",
    descriptionKey: "legalSupportDescription",
  },
  {
    icon: "🏥",
    titleKey: "medicalSupport",
    descriptionKey: "medicalSupportDescription",
  },
  {
    icon: "💙",
    titleKey: "psychologicalSupport",
    descriptionKey: "psychologicalSupportDescription",
  },
  {
    icon: "🤝",
    titleKey: "supportGroups",
    descriptionKey: "supportGroupsDescription",
  },
] as const;

const demoServices = [
  {
    slug: "verified-legal-aid-service",
    nameKey: "verifiedLegalAidService",
    descriptionKey: "legalSupportDescription",
    category: "Legal Support",
    location: "Bengaluru Urban",
    type: "Government",
    availability: "Verified",
  },
  {
    slug: "victim-support-organisation",
    nameKey: "victimSupportOrganisation",
    descriptionKey: "supportGroupsDescription",
    category: "NGOs & Support Groups",
    location: "Mysuru (Mysore)",
    type: "NGO",
    availability: "Verified",
  },
  {
    slug: "psychological-support-service",
    nameKey: "psychologicalSupportService",
    descriptionKey: "psychologicalSupportDescription",
    category: "Psychological Support",
    location: "Bengaluru Urban",
    type: "Private",
    availability: "Verified",
  },
  {
    slug: "community-legal-support-centre",
    nameKey: "communityLegalSupportCentre",
    descriptionKey: "legalSupportDescription",
    category: "Legal Support",
    location: "Belagavi (Belgaum)",
    type: "NGO",
    availability: "Verified",
  },
  {
    slug: "medical-victim-support-service",
    nameKey: "medicalVictimSupportService",
    descriptionKey: "medicalSupportDescription",
    category: "Medical Support",
    location: "Dakshina Kannada",
    type: "Government",
    availability: "Verified",
  },
] as const;

const districts = [
  "All districts",
  "Bagalkot",
  "Ballari (Bellary)",
  "Belagavi (Belgaum)",
  "Bengaluru Rural",
  "Bengaluru Urban",
  "Bidar",
  "Chamarajanagar",
  "Chikkaballapura",
  "Chikkamagaluru",
  "Chitradurga",
  "Dakshina Kannada",
  "Davanagere",
  "Dharwad",
  "Gadag",
  "Hassan",
  "Haveri",
  "Kalaburagi (Gulbarga)",
  "Kodagu",
  "Kolar",
  "Koppal",
  "Mandya",
  "Mysuru (Mysore)",
  "Raichur",
  "Ramanagara",
  "Shivamogga (Shimoga)",
  "Tumakuru (Tumkur)",
  "Udupi",
  "Uttara Kannada",
  "Vijayanagara",
  "Vijayapura (Bijapur)",
  "Yadgir",
] as const;

const supportTypes = [
  "All support types",
  "Legal Support",
  "Medical Support",
  "Psychological Support",
  "NGOs & Support Groups",
] as const;

const organisationTypes = [
  "All organisations",
  "Government",
  "NGO",
  "Private",
] as const;

function getDistrictTranslation(
  district: string,
  language: string
) {
  const districtTranslations: Record<string, Record<string, string>> = {
    Bagalkot: {
      kn: "ಬಾಗಲಕೋಟೆ",
      hi: "बागलकोट",
    },
    "Ballari (Bellary)": {
      kn: "ಬಳ್ಳಾರಿ",
      hi: "बल्लारी",
    },
    "Belagavi (Belgaum)": {
      kn: "ಬೆಳಗಾವಿ",
      hi: "बेलगावी",
    },
    "Bengaluru Rural": {
      kn: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ",
      hi: "बेंगलुरु ग्रामीण",
    },
    "Bengaluru Urban": {
      kn: "ಬೆಂಗಳೂರು ನಗರ",
      hi: "बेंगलुरु शहरी",
    },
    Bidar: {
      kn: "ಬೀದರ್",
      hi: "बीदर",
    },
    Chamarajanagar: {
      kn: "ಚಾಮರಾಜನಗರ",
      hi: "चामराजनगर",
    },
    Chikkaballapura: {
      kn: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ",
      hi: "चिक्कबल्लापुर",
    },
    Chikkamagaluru: {
      kn: "ಚಿಕ್ಕಮಗಳೂರು",
      hi: "चिक्कमगलुरु",
    },
    Chitradurga: {
      kn: "ಚಿತ್ರದುರ್ಗ",
      hi: "चित्रदुर्ग",
    },
    "Dakshina Kannada": {
      kn: "ದಕ್ಷಿಣ ಕನ್ನಡ",
      hi: "दक्षिण कन्नड़",
    },
    Davanagere: {
      kn: "ದಾವಣಗೆರೆ",
      hi: "दावणगेरे",
    },
    Dharwad: {
      kn: "ಧಾರವಾಡ",
      hi: "धारवाड़",
    },
    Gadag: {
      kn: "ಗದಗ",
      hi: "गडग",
    },
    Hassan: {
      kn: "ಹಾಸನ",
      hi: "हासन",
    },
    Haveri: {
      kn: "ಹಾವೇರಿ",
      hi: "हावेरी",
    },
    "Kalaburagi (Gulbarga)": {
      kn: "ಕಲಬುರಗಿ",
      hi: "कलाबुरगी",
    },
    Kodagu: {
      kn: "ಕೊಡಗು",
      hi: "कोडगु",
    },
    Kolar: {
      kn: "ಕೋಲಾರ",
      hi: "कोलार",
    },
    Koppal: {
      kn: "ಕೊಪ್ಪಳ",
      hi: "कोप्पल",
    },
    Mandya: {
      kn: "ಮಂಡ್ಯ",
      hi: "मांड्या",
    },
    "Mysuru (Mysore)": {
      kn: "ಮೈಸೂರು",
      hi: "मैसूरु",
    },
    Raichur: {
      kn: "ರಾಯಚೂರು",
      hi: "रायचूर",
    },
    Ramanagara: {
      kn: "ರಾಮನಗರ",
      hi: "रामनगर",
    },
    "Shivamogga (Shimoga)": {
      kn: "ಶಿವಮೊಗ್ಗ",
      hi: "शिवमोग्गा",
    },
    "Tumakuru (Tumkur)": {
      kn: "ತುಮಕೂರು",
      hi: "तुमकुरु",
    },
    Udupi: {
      kn: "ಉಡುಪಿ",
      hi: "उडुपी",
    },
    "Uttara Kannada": {
      kn: "ಉತ್ತರ ಕನ್ನಡ",
      hi: "उत्तर कन्नड़",
    },
    Vijayanagara: {
      kn: "ವಿಜಯನಗರ",
      hi: "विजयनगर",
    },
    "Vijayapura (Bijapur)": {
      kn: "ವಿಜಯಪುರ",
      hi: "विजयपुर",
    },
    Yadgir: {
      kn: "ಯಾದಗಿರಿ",
      hi: "यादगीर",
    },
  };

  if (district === "All districts") {
    return language === "kn"
      ? "ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು"
      : language === "hi"
        ? "सभी जिले"
        : "All districts";
  }

  if (language === "en") {
    return district;
  }

  return districtTranslations[district]?.[language] ?? district;
}

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

export default function SupportPage() {
  const { language, t } = useLanguage();

  const [search, setSearch] = useState("");
  const [district, setDistrict] =
    useState<(typeof districts)[number]>("All districts");
  const [supportType, setSupportType] =
    useState<(typeof supportTypes)[number]>("All support types");
  const [organisationType, setOrganisationType] =
    useState<(typeof organisationTypes)[number]>("All organisations");

  const filteredServices = demoServices.filter((service) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      t(service.nameKey)
        .toLowerCase()
        .includes(searchTerm) ||
      t(service.descriptionKey)
        .toLowerCase()
        .includes(searchTerm) ||
      getCategoryTranslation(service.category, t)
        .toLowerCase()
        .includes(searchTerm);

    const matchesDistrict =
      district === "All districts" ||
      service.location === district;

    const matchesSupportType =
      supportType === "All support types" ||
      service.category === supportType;

    const matchesOrganisationType =
      organisationType === "All organisations" ||
      service.type === organisationType;

    return (
      matchesSearch &&
      matchesDistrict &&
      matchesSupportType &&
      matchesOrganisationType
    );
  });

  return (
    <main className="min-h-screen bg-ava-cream text-ava-charcoal">
      {/* Header */}
      <header className="border-b border-ava-mist bg-ava-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-sm font-medium text-ava-slate transition hover:text-ava-rose"
          >
            ← {t("backToAVA")}
          </Link>

          <div className="text-right">
            <p className="text-xl font-bold text-ava-slate">
              {t("appName")}
            </p>

            <p className="text-xs text-ava-dusty">
              {t("tagline")}
            </p>
          </div>
        </div>
      </header>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-ava-rose">
          {t("findSupport")}
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-ava-charcoal sm:text-5xl">
          {t("supportTitle")}
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-ava-slate">
          {t("supportIntro")}
        </p>

        {/* Demo warning */}
        <div className="mt-8 rounded-2xl border border-ava-rose/30 bg-ava-rose/10 p-5">
          <p className="font-semibold text-ava-charcoal">
            {t("demoData")}
          </p>

          <p className="mt-2 text-sm leading-6 text-ava-slate">
            {t("supportDemoText")}
          </p>
        </div>

        {/* Search */}
        <div className="mt-10">
          <label
            htmlFor="support-search"
            className="text-sm font-semibold text-ava-charcoal"
          >
            {t("search")}
          </label>

          <input
            id="support-search"
            type="text"
            placeholder={t("supportSearchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-2 w-full rounded-xl border border-ava-mist bg-ava-white px-5 py-4 text-ava-charcoal outline-none transition placeholder:text-ava-dusty focus:border-ava-rose focus:ring-2 focus:ring-ava-rose/20"
          />
        </div>

        {/* Filters */}
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {/* District */}
          <div>
            <label
              htmlFor="district-filter"
              className="text-sm font-semibold text-ava-charcoal"
            >
              {t("district")}
            </label>

            <select
              id="district-filter"
              value={district}
              onChange={(e) =>
                setDistrict(
                  e.target.value as (typeof districts)[number]
                )
              }
              className="mt-2 w-full rounded-xl border border-ava-mist bg-ava-white px-4 py-3 text-ava-charcoal outline-none transition focus:border-ava-rose focus:ring-2 focus:ring-ava-rose/20"
            >
              {districts.map((item) => (
                <option key={item} value={item}>
                  {getDistrictTranslation(item, language)}
                </option>
              ))}
            </select>
          </div>

          {/* Support type */}
          <div>
            <label
              htmlFor="support-type-filter"
              className="text-sm font-semibold text-ava-charcoal"
            >
              {t("category")}
            </label>

            <select
              id="support-type-filter"
              value={supportType}
              onChange={(e) =>
                setSupportType(
                  e.target.value as (typeof supportTypes)[number]
                )
              }
              className="mt-2 w-full rounded-xl border border-ava-mist bg-ava-white px-4 py-3 text-ava-charcoal outline-none transition focus:border-ava-rose focus:ring-2 focus:ring-ava-rose/20"
            >
              {supportTypes.map((item) => (
                <option key={item} value={item}>
                  {item === "All support types"
                    ? t("allSupportTypes")
                    : item === "Legal Support"
                      ? t("legalSupport")
                      : item === "Medical Support"
                        ? t("medicalSupport")
                        : item === "Psychological Support"
                          ? t("psychologicalSupport")
                          : t("supportGroups")}
                </option>
              ))}
            </select>
          </div>

          {/* Organisation type */}
          <div>
            <label
              htmlFor="organisation-type-filter"
              className="text-sm font-semibold text-ava-charcoal"
            >
              {t("organisationType")}
            </label>

            <select
              id="organisation-type-filter"
              value={organisationType}
              onChange={(e) =>
                setOrganisationType(
                  e.target.value as (typeof organisationTypes)[number]
                )
              }
              className="mt-2 w-full rounded-xl border border-ava-mist bg-ava-white px-4 py-3 text-ava-charcoal outline-none transition focus:border-ava-rose focus:ring-2 focus:ring-ava-rose/20"
            >
              {organisationTypes.map((item) => (
                <option key={item} value={item}>
                  {item === "All organisations"
                    ? t("allOrganisations")
                    : item === "Government"
                      ? t("government")
                      : item === "NGO"
                        ? t("ngo")
                        : t("private")}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <h2 className="text-2xl font-bold text-ava-charcoal">
          {t("browseSupportType")}
        </h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <button
              key={category.titleKey}
              type="button"
              onClick={() => {
                const categoryName =
                  category.titleKey === "legalSupport"
                    ? "Legal Support"
                    : category.titleKey === "medicalSupport"
                      ? "Medical Support"
                      : category.titleKey === "psychologicalSupport"
                        ? "Psychological Support"
                        : "NGOs & Support Groups";

                setSupportType(
                  categoryName as (typeof supportTypes)[number]
                );

                document
                  .getElementById("support-results")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
              className={`rounded-2xl border p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                index === 2
                  ? "border-ava-rose/40 bg-ava-rose/10"
                  : "border-ava-mist bg-ava-white"
              }`}
            >
              <div className="text-3xl">
                {category.icon}
              </div>

              <h3 className="mt-4 font-semibold text-ava-charcoal">
                {t(category.titleKey)}
              </h3>

              <p className="mt-2 text-sm leading-6 text-ava-slate">
                {t(category.descriptionKey)}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Results */}
      <section
        id="support-results"
        className="border-t border-ava-mist bg-ava-white"
      >
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-ava-charcoal">
                {t("availableServices")}
              </h2>

              <p className="mt-2 text-sm text-ava-dusty">
                {t("verifiedServicesNote")}
              </p>
            </div>

            <p className="text-sm font-medium text-ava-dusty">
              {filteredServices.length} {t("results")}
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <div
                  key={service.slug}
                  className="rounded-2xl border border-ava-mist bg-ava-cream p-6 transition hover:border-ava-dusty"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-ava-charcoal">
                          {t(service.nameKey)}
                        </h3>

                        <span className="rounded-full bg-ava-rose/15 px-3 py-1 text-xs font-semibold text-ava-rose">
                          ✓ {t("verified")}
                        </span>
                      </div>

                      <p className="mt-2 text-sm font-medium text-ava-slate">
                        {getCategoryTranslation(
                          service.category,
                          t
                        )}
                      </p>

                      <p className="mt-2 max-w-2xl text-sm leading-6 text-ava-dusty">
                        {t(service.descriptionKey)}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full bg-ava-white px-3 py-2 text-ava-slate">
                          📍{" "}
                          {getDistrictTranslation(
                            service.location,
                            language
                          )}
                        </span>

                        <span className="rounded-full bg-ava-white px-3 py-2 text-ava-slate">
                          🏢{" "}
                          {getTypeTranslation(
                            service.type,
                            t
                          )}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/support/${service.slug}`}
                      className="rounded-xl border border-ava-dusty bg-ava-white px-5 py-3 text-sm font-semibold text-ava-slate transition hover:border-ava-rose hover:bg-ava-rose/10 hover:text-ava-rose"
                    >
                      {t("viewDetails")}
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-ava-mist bg-ava-cream p-10 text-center">
                <h3 className="text-lg font-semibold text-ava-charcoal">
                  {t("noResults")}
                </h3>

                <p className="mt-2 text-sm text-ava-dusty">
                  {t("tryDifferentFilters")}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ava-slate">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-ava-mist">
          <p className="font-semibold text-ava-white">
            {t("appName")} — {t("tagline")}
          </p>

          <p className="mt-2">
            {t("footerDescription")}
          </p>
        </div>
      </footer>

      <QuickExit />
    </main>
  );
}