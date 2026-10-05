"use client";

import Link from "next/link";
import { useState } from "react";
import QuickExit from "@/components/QuickExit";
import { useLanguage } from "@/components/LanguageProvider";

type SakhiCentre = {
  id: string;
  district: string;
  location: string;
  phones: string[];
};

const sakhiCentres: SakhiCentre[] = [
  {
    id: "bagalkot",
    district: "Bagalkot",
    location: "District Government Hospital, Navanagar, Bagalkot",
    phones: ["08354-235182"],
  },
  {
    id: "bengaluru-rural",
    district: "Bengaluru Rural",
    location: "Government Hospital premises, Doddaballapur",
    phones: ["080-29787445"],
  },
  {
    id: "bengaluru-urban",
    district: "Bengaluru Urban",
    location: "Sakhi OSC, Majestic BMTC Bus Stand, Bengaluru",
    phones: ["080-26538977"],
  },
  {
    id: "belagavi",
    district: "Belagavi",
    location: "BIMS Hospital / District Civil Hospital, Club Road, Belagavi",
    phones: ["0831-2421967"],
  },
  {
    id: "ballari",
    district: "Ballari",
    location: "District Hospital, Ballari",
    phones: ["08392-266219", "08392-266217"],
  },
  {
    id: "bidar",
    district: "Bidar",
    location: "District Hospital / BRIMS, Bidar",
    phones: ["08482-234237"],
  },
  {
    id: "vijayapura",
    district: "Vijayapura",
    location: "District Hospital Campus, Vijayapura",
    phones: ["08352-276353", "08352-278962"],
  },
  {
    id: "chamarajanagar",
    district: "Chamarajanagar",
    location: "District Hospital, Chamarajanagar",
    phones: ["08226-226371"],
  },
  {
    id: "chikkamagaluru",
    district: "Chikkamagaluru",
    location: "Rukminamma Government Maternity Hospital, Chikkamagaluru",
    phones: ["08262-233940"],
  },
  {
    id: "chikkaballapur",
    district: "Chikkaballapur",
    location: "District Government Hospital, Chikkaballapur",
    phones: ["08156-270181"],
  },
  {
    id: "chitradurga",
    district: "Chitradurga",
    location: "District Hospital, Chitradurga",
    phones: ["08194-235709"],
  },
  {
    id: "dakshina-kannada",
    district: "Dakshina Kannada",
    location: "Government Lady Goschen Hospital, Mangaluru",
    phones: ["0824-2441222"],
  },
  {
    id: "davanagere",
    district: "Davanagere",
    location: "Chigateri Government Hospital, Davanagere",
    phones: ["08192-295738"],
  },
  {
    id: "dharwad",
    district: "Dharwad",
    location: "KIMS Hospital, Vidyanagar, Hubballi",
    phones: ["0836-2270020"],
  },
  {
    id: "gadag",
    district: "Gadag",
    location: "District Hospital, Mallasamudra, Gadag",
    phones: ["08372-295555"],
  },
  {
    id: "kalaburagi",
    district: "Kalaburagi",
    location: "District Hospital, Kalaburagi",
    phones: ["08472-228659"],
  },
  {
    id: "hassan",
    district: "Hassan",
    location: "Sri Chamarajendra Hospital, Hassan",
    phones: ["08172-267218", "08172-235133"],
  },
  {
    id: "haveri",
    district: "Haveri",
    location: "Government Hospital, Haveri",
    phones: ["08375-236726"],
  },
  {
    id: "kodagu",
    district: "Kodagu",
    location: "Government Hospital, Madikeri",
    phones: ["08272-225444"],
  },
  {
    id: "kolar",
    district: "Kolar",
    location: "District Hospital / SNR Hospital, Kolar",
    phones: ["08152-223665", "08152-222753"],
  },
  {
    id: "koppal",
    district: "Koppal",
    location: "Sri Gavisiddeshwar Ayurvedic College / district OSC, Koppal",
    phones: ["08539-225941"],
  },
  {
    id: "mandya",
    district: "Mandya",
    location: "MIMS Hospital, Mandya",
    phones: ["08232-224316"],
  },
  {
    id: "mysuru",
    district: "Mysuru",
    location: "Cheluvamba Hospital, Mysuru",
    phones: ["0821-2423181"],
  },
  {
    id: "raichur",
    district: "Raichur",
    location: "RIMS Hospital, Raichur",
    phones: ["08532-221818"],
  },
  {
    id: "ramanagara",
    district: "Ramanagara",
    location: "District Government Hospital, Ramanagara",
    phones: ["080-27272741", "080-27273036"],
  },
  {
    id: "shivamogga",
    district: "Shivamogga",
    location: "McGann District Hospital, Shivamogga",
    phones: ["08182-223055"],
  },
  {
    id: "tumakuru",
    district: "Tumakuru",
    location: "Government District Hospital, Tumakuru",
    phones: ["0816-2274199"],
  },
  {
    id: "udupi",
    district: "Udupi",
    location: "State Home Campus, Kodankur/Nittur, Udupi",
    phones: ["0820-2987592"],
  },
  {
    id: "uttara-kannada",
    district: "Uttara Kannada",
    location: "General Hospital, Karwar",
    phones: ["08382-226761", "08382-221914"],
  },
  {
    id: "yadgir",
    district: "Yadgir",
    location: "District Government Hospital, Yadgir",
    phones: ["08473-253886"],
  },
];

const districtTranslations: Record<
  string,
  { en: string; kn: string; hi: string }
> = {
  Bagalkot: { en: "Bagalkot", kn: "ಬಾಗಲಕೋಟೆ", hi: "बागलकोट" },
  "Bengaluru Rural": {
    en: "Bengaluru Rural",
    kn: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ",
    hi: "बेंगलुरु ग्रामीण",
  },
  "Bengaluru Urban": {
    en: "Bengaluru Urban",
    kn: "ಬೆಂಗಳೂರು ನಗರ",
    hi: "बेंगलुरु शहरी",
  },
  Belagavi: { en: "Belagavi", kn: "ಬೆಳಗಾವಿ", hi: "बेलगावी" },
  Ballari: { en: "Ballari", kn: "ಬಳ್ಳಾರಿ", hi: "बल्लारी" },
  Bidar: { en: "Bidar", kn: "ಬೀದರ್", hi: "बीदर" },
  Vijayapura: { en: "Vijayapura", kn: "ವಿಜಯಪುರ", hi: "विजयपुरा" },
  Chamarajanagar: {
    en: "Chamarajanagar",
    kn: "ಚಾಮರಾಜನಗರ",
    hi: "चामराजनगर",
  },
  Chikkamagaluru: {
    en: "Chikkamagaluru",
    kn: "ಚಿಕ್ಕಮಗಳೂರು",
    hi: "चिक्कमगलुरु",
  },
  Chikkaballapur: {
    en: "Chikkaballapur",
    kn: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ",
    hi: "चिक्कबल्लापुर",
  },
  Chitradurga: {
    en: "Chitradurga",
    kn: "ಚಿತ್ರದುರ್ಗ",
    hi: "चित्रदुर्ग",
  },
  "Dakshina Kannada": {
    en: "Dakshina Kannada",
    kn: "ದಕ್ಷಿಣ ಕನ್ನಡ",
    hi: "दक्षिण कन्नड़",
  },
  Davanagere: {
    en: "Davanagere",
    kn: "ದಾವಣಗೆರೆ",
    hi: "दावणगेरे",
  },
  Dharwad: { en: "Dharwad", kn: "ಧಾರವಾಡ", hi: "धारवाड़" },
  Gadag: { en: "Gadag", kn: "ಗದಗ", hi: "गदग" },
  Kalaburagi: { en: "Kalaburagi", kn: "ಕಲಬುರಗಿ", hi: "कलाबुरगी" },
  Hassan: { en: "Hassan", kn: "ಹಾಸನ", hi: "हासन" },
  Haveri: { en: "Haveri", kn: "ಹಾವೇರಿ", hi: "हावेरी" },
  Kodagu: { en: "Kodagu", kn: "ಕೊಡಗು", hi: "कोडगु" },
  Kolar: { en: "Kolar", kn: "ಕೋಲಾರ", hi: "कोलार" },
  Koppal: { en: "Koppal", kn: "ಕೊಪ್ಪಳ", hi: "कोप्पल" },
  Mandya: { en: "Mandya", kn: "ಮಂಡ್ಯ", hi: "मांड्या" },
  Mysuru: { en: "Mysuru", kn: "ಮೈಸೂರು", hi: "मैसूरु" },
  Raichur: { en: "Raichur", kn: "ರಾಯಚೂರು", hi: "रायचूर" },
  Ramanagara: {
    en: "Ramanagara",
    kn: "ರಾಮನಗರ",
    hi: "रामनगर",
  },
  Shivamogga: {
    en: "Shivamogga",
    kn: "ಶಿವಮೊಗ್ಗ",
    hi: "शिवमोग्गा",
  },
  Tumakuru: { en: "Tumakuru", kn: "ತುಮಕೂರು", hi: "तुमकुरु" },
  Udupi: { en: "Udupi", kn: "ಉಡುಪಿ", hi: "उडुपी" },
  "Uttara Kannada": {
    en: "Uttara Kannada",
    kn: "ಉತ್ತರ ಕನ್ನಡ",
    hi: "उत्तर कन्नड़",
  },
  Yadgir: { en: "Yadgir", kn: "ಯಾದಗಿರಿ", hi: "यादगिरि" },
};

function districtLabel(
  district: string,
  language: string
): string {
  const item = districtTranslations[district];

  if (!item) return district;

  if (language === "kn") return item.kn;
  if (language === "hi") return item.hi;

  return item.en;
}

function getText(language: string) {
  if (language === "kn") {
    return {
      title: "ಸಖಿ — ಒನ್ ಸ್ಟಾಪ್ ಸೆಂಟರ್‌ಗಳು",
      intro:
        "ಹಿಂಸೆಗೆ ಒಳಗಾದ ಮಹಿಳೆಯರಿಗೆ ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ ಪಡೆಯಲು ಸಖಿ ಒನ್ ಸ್ಟಾಪ್ ಸೆಂಟರ್‌ಗಳ ಮಾಹಿತಿಯನ್ನು ಹುಡುಕಿ.",
      directory: "ಸಖಿ ಕೇಂದ್ರಗಳ ಡೈರೆಕ್ಟರಿ",
      directoryNote:
        "ಈ ಡೈರೆಕ್ಟರಿಯಲ್ಲಿ AVAಗಾಗಿ ಒದಗಿಸಲಾದ ಕರ್ನಾಟಕದ ಸಖಿ ಒನ್ ಸ್ಟಾಪ್ ಸೆಂಟರ್ ಸಂಪರ್ಕ ಮಾಹಿತಿಯನ್ನು ಪ್ರದರ್ಶಿಸಲಾಗಿದೆ.",
      search: "ಕೇಂದ್ರ ಅಥವಾ ಸ್ಥಳವನ್ನು ಹುಡುಕಿ",
      allDistricts: "ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು",
      district: "ಜಿಲ್ಲೆ",
      results: "ಫಲಿತಾಂಶಗಳು",
      centre: "ಸಖಿ ಒನ್ ಸ್ಟಾಪ್ ಸೆಂಟರ್",
      location: "ಸ್ಥಳ",
      organisationType: "ಸಂಸ್ಥೆಯ ಪ್ರಕಾರ",
      government: "ಸರ್ಕಾರಿ",
      category: "ವರ್ಗ",
      categoryValue: "NGOs ಮತ್ತು ಬೆಂಬಲ ಗುಂಪುಗಳು",
      contact: "ಸಂಪರ್ಕ",
      callNow: "ಈಗ ಕರೆ ಮಾಡಿ",
      source: "ಮೂಲ ಮಾಹಿತಿ",
      sourceText:
        "AVA ಡೈರೆಕ್ಟರಿಗಾಗಿ ಒದಗಿಸಲಾದ ಸಖಿ ಒನ್ ಸ್ಟಾಪ್ ಸೆಂಟರ್ ಸಂಪರ್ಕ ಮಾಹಿತಿ.",
      noResults: "ಯಾವುದೇ ಕೇಂದ್ರಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
      tryDifferent:
        "ಬೇರೆ ಹುಡುಕಾಟ ಅಥವಾ ಜಿಲ್ಲೆಯ ಫಿಲ್ಟರ್ ಪ್ರಯತ್ನಿಸಿ.",
      back: "AVA ಗೆ ಹಿಂತಿರುಗಿ",
      notice:
        "ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ಬಳಕೆದಾರರಿಗೆ ಸಹಾಯ ಮಾಡಲು ಪ್ರದರ್ಶಿಸಲಾಗಿದೆ. ತುರ್ತು ಪರಿಸ್ಥಿತಿಯಲ್ಲಿ 112 ಅನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    };
  }

  if (language === "hi") {
    return {
      title: "सखी — वन स्टॉप सेंटर",
      intro:
        "हिंसा से प्रभावित महिलाओं के लिए सहायता और समर्थन पाने हेतु सखी वन स्टॉप सेंटर खोजें।",
      directory: "सखी केंद्र निर्देशिका",
      directoryNote:
        "यह निर्देशिका AVA के लिए उपलब्ध कराई गई कर्नाटक की सखी वन स्टॉप सेंटर संपर्क जानकारी प्रदर्शित करती है।",
      search: "केंद्र या स्थान खोजें",
      allDistricts: "सभी जिले",
      district: "जिला",
      results: "परिणाम",
      centre: "सखी वन स्टॉप सेंटर",
      location: "स्थान",
      organisationType: "संगठन का प्रकार",
      government: "सरकारी",
      category: "श्रेणी",
      categoryValue: "NGO और सहायता समूह",
      contact: "संपर्क",
      callNow: "अभी कॉल करें",
      source: "स्रोत जानकारी",
      sourceText:
        "AVA निर्देशिका के लिए उपलब्ध कराई गई सखी वन स्टॉप सेंटर संपर्क जानकारी।",
      noResults: "कोई केंद्र नहीं मिला",
      tryDifferent:
        "कोई दूसरा खोज शब्द या जिला फ़िल्टर आज़माएँ।",
      back: "AVA पर वापस जाएँ",
      notice:
        "संपर्क विवरण सहायता के लिए प्रदर्शित किए गए हैं। आपातकालीन स्थिति में 112 से संपर्क करें।",
    };
  }

  return {
    title: "Sakhi — One Stop Centres",
    intro:
      "Find Sakhi One Stop Centres providing support and assistance to women affected by violence.",
    directory: "Sakhi Centre Directory",
    directoryNote:
      "This directory displays Sakhi One Stop Centre contact information for Karnataka provided for the AVA directory.",
    search: "Search centre or location",
    allDistricts: "All districts",
    district: "District",
    results: "results",
    centre: "Sakhi One Stop Centre",
    location: "Location",
    organisationType: "Organisation type",
    government: "Government",
    category: "Category",
    categoryValue: "NGOs & Support Groups",
    contact: "Contact",
    callNow: "Call now",
    source: "Source information",
    sourceText:
      "Sakhi One Stop Centre contact information provided for the AVA directory.",
    noResults: "No centres found",
    tryDifferent:
      "Try a different search term or district filter.",
    back: "Back to AVA",
    notice:
      "Contact details are displayed to help users seek support. In an emergency, contact 112.",
  };
}

export default function SakhiPage() {
  const { language, t } = useLanguage();
  const text = getText(language);

  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("All districts");

  const districts = [
    "All districts",
    ...sakhiCentres.map((centre) => centre.district),
  ];

  const filteredCentres = sakhiCentres.filter((centre) => {
    const searchTerm = search.trim().toLowerCase();

    const matchesSearch =
      searchTerm === "" ||
      centre.district.toLowerCase().includes(searchTerm) ||
      centre.location.toLowerCase().includes(searchTerm) ||
      "sakhi one stop centre".includes(searchTerm);

    const matchesDistrict =
      district === "All districts" ||
      centre.district === district;

    return matchesSearch && matchesDistrict;
  });

  return (
    <main className="min-h-screen bg-ava-cream text-ava-charcoal">
      {/* Header */}
      <header className="border-b border-ava-mist bg-ava-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/support"
              className="text-sm font-semibold text-ava-slate transition hover:text-ava-rose"
            >
              ← {text.back}
            </Link>

            <span className="rounded-full bg-ava-rose/10 px-3 py-2 text-xs font-semibold text-ava-rose">
              {text.government}
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-ava-mist bg-ava-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-ava-rose">
              🌸 {text.centre}
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-ava-charcoal sm:text-4xl">
              {text.title}
            </h1>

            <p className="mt-4 text-base leading-7 text-ava-slate">
              {text.intro}
            </p>

            <div className="mt-6 rounded-2xl border border-ava-rose/20 bg-ava-rose/10 p-5">
              <p className="text-sm leading-6 text-ava-slate">
                {text.notice}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and filters */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-2xl border border-ava-mist bg-ava-white p-6">
          <h2 className="text-xl font-bold text-ava-charcoal">
            {text.directory}
          </h2>

          <p className="mt-2 text-sm leading-6 text-ava-dusty">
            {text.directoryNote}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_280px]">
            <div>
              <label
                htmlFor="sakhi-search"
                className="text-sm font-semibold text-ava-charcoal"
              >
                {t("search")}
              </label>

              <input
                id="sakhi-search"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={text.search}
                className="mt-2 w-full rounded-xl border border-ava-mist bg-ava-white px-5 py-4 text-ava-charcoal outline-none transition placeholder:text-ava-dusty focus:border-ava-rose focus:ring-2 focus:ring-ava-rose/20"
              />
            </div>

            <div>
              <label
                htmlFor="sakhi-district"
                className="text-sm font-semibold text-ava-charcoal"
              >
                {text.district}
              </label>

              <select
                id="sakhi-district"
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
                className="mt-2 w-full rounded-xl border border-ava-mist bg-ava-white px-4 py-3 text-ava-charcoal outline-none transition focus:border-ava-rose focus:ring-2 focus:ring-ava-rose/20"
              >
                {districts.map((item) => (
                  <option key={item} value={item}>
                    {item === "All districts"
                      ? text.allDistricts
                      : districtLabel(item, language)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="border-t border-ava-mist bg-ava-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-ava-charcoal">
                {text.directory}
              </h2>

              <p className="mt-2 text-sm text-ava-dusty">
                {text.categoryValue} · {text.government}
              </p>
            </div>

            <p className="text-sm font-medium text-ava-dusty">
              {filteredCentres.length} {text.results}
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {filteredCentres.length > 0 ? (
              filteredCentres.map((centre) => (
                <article
                  key={centre.id}
                  className="rounded-2xl border border-ava-mist bg-ava-cream p-6 transition hover:border-ava-dusty"
                >
                  <div className="flex flex-col justify-between gap-6 lg:flex-row">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-ava-charcoal">
                          {text.centre}
                        </h3>

                        <span className="rounded-full bg-ava-rose/15 px-3 py-1 text-xs font-semibold text-ava-rose">
                          {text.government}
                        </span>
                      </div>

                      <p className="mt-2 text-sm font-semibold text-ava-slate">
                        📍 {districtLabel(centre.district, language)}
                      </p>

                      <div className="mt-4 space-y-3 text-sm leading-6 text-ava-slate">
                        <p>
                          <span className="font-semibold text-ava-charcoal">
                            {text.location}:
                          </span>{" "}
                          {centre.location}
                        </p>

                        <p>
                          <span className="font-semibold text-ava-charcoal">
                            {text.category}:
                          </span>{" "}
                          {text.categoryValue}
                        </p>

                        <p>
                          <span className="font-semibold text-ava-charcoal">
                            {text.organisationType}:
                          </span>{" "}
                          {text.government}
                        </p>
                      </div>

                      <div className="mt-5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-ava-dusty">
                          {text.contact}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {centre.phones.map((phone) => (
                            <a
                              key={phone}
                              href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                              className="rounded-xl bg-ava-rose px-4 py-2 text-sm font-semibold text-white transition hover:bg-ava-slate"
                            >
                              📞 {text.callNow} · {phone}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 lg:w-64">
                      <div className="rounded-xl border border-ava-mist bg-ava-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-ava-dusty">
                          {text.source}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-ava-slate">
                          {text.sourceText}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-ava-mist bg-ava-cream p-10 text-center">
                <h3 className="text-lg font-semibold text-ava-charcoal">
                  {text.noResults}
                </h3>

                <p className="mt-2 text-sm text-ava-dusty">
                  {text.tryDifferent}
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