"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import {
  calculateDistance,
  formatDistance,
  type Coordinates,
} from "@/lib/distance";
import { dlsaServices } from "@/lib/dlsa-services";
import {
  supportServices,
  type SupportService,
} from "@/lib/support-services";

type LocationStatus =
  | "idle"
  | "requesting"
  | "success"
  | "denied"
  | "unavailable";

type NearbyService = SupportService & {
  distanceKm: number;
};

type NearbyDlsa = {
  id: string;
  name: string;
  district: string;
  localizedName: {
    en: string;
    kn: string;
    hi: string;
  };
  address: string;
  phones: string[];
  officialSource: string;
};

type LocalizedServiceText = {
  type: string;
  supportAreas: string[];
  address: string;
};

type SupportFilter =
  | "all"
  | "legal"
  | "medical"
  | "psychological"
  | "womenChildren"
  | "domesticViolence"
  | "childSupport"
  | "disability"
  | "elderSupport";

const serviceTranslations: Record<
  string,
  {
    en: string;
    kn: string;
    hi: string;
  }
> = {
  "bembala-vydehi": {
    en: "Bembala Foundation",
    kn: "ಬೆಂಬಲ ಫೌಂಡೇಶನ್",
    hi: "बेम्बला फाउंडेशन",
  },
  "apsa-vimanapura": {
    en: "APSA — Association for Promoting Social Action",
    kn: "APSA — ಸಾಮಾಜಿಕ ಕಾರ್ಯ ಉತ್ತೇಜನ ಸಂಘ",
    hi: "APSA — सामाजिक कार्य को बढ़ावा देने वाला संघ",
  },
  "apd-lingarajapuram": {
    en: "Association for People with Disability (APD) — Lingarajapuram",
    kn: "ಅಂಗವೈಕಲ್ಯ ಹೊಂದಿರುವವರ ಸಂಘ (APD) — ಲಿಂಗರಾಜಪುರಂ",
    hi: "दिव्यांग व्यक्तियों के लिए संघ (APD) — लिंगराजपुरम",
  },
  "apd-kyalasanahalli": {
    en: "Association for People with Disability (APD) — Kyalasanahalli",
    kn: "ಅಂಗವೈಕಲ್ಯ ಹೊಂದಿರುವವರ ಸಂಘ (APD) — ಕ್ಯಾಲಸನಹಳ್ಳಿ",
    hi: "दिव्यांग व्यक्तियों के लिए संघ (APD) — क्यालासनहल्ली",
  },
  "nightingales-kasturinagar": {
    en: "Nightingales Centre for Ageing & Alzheimer's",
    kn: "ನೈಟಿಂಗೇಲ್ಸ್ ವೃದ್ಧಾಪ್ಯ ಮತ್ತು ಅಲ್ಜೈಮರ್ಸ್ ಕೇಂದ್ರ",
    hi: "नाइटिंगेल्स वृद्धावस्था एवं अल्ज़ाइमर केंद्र",
  },
  "sparsha-mathikere": {
    en: "Sparsha Trust",
    kn: "ಸ್ಪರ್ಶ ಟ್ರಸ್ಟ್",
    hi: "स्पर्श ट्रस्ट",
  },
};

const serviceDetails: Record<
  string,
  {
    en: LocalizedServiceText;
    kn: LocalizedServiceText;
    hi: LocalizedServiceText;
  }
> = {
  "bembala-vydehi": {
    en: {
      type: "NGO / Crisis Support Centre",
      supportAreas: [
        "Domestic violence",
        "Women and children facing abuse",
        "Emotional support",
        "Safety planning",
        "Referrals",
      ],
      address:
        "Ob-Gyn Department, Ground Floor, Vydehi Institute of Medical Sciences and Research Centre, 82 EPIP Area, Whitefield, Bengaluru 560066",
    },
    kn: {
      type: "ಎನ್‌ಜಿಒ / ಬಿಕ್ಕಟ್ಟು ಸಹಾಯ ಕೇಂದ್ರ",
      supportAreas: [
        "ಕೌಟುಂಬಿಕ ಹಿಂಸೆ",
        "ಹಿಂಸೆ ಎದುರಿಸುತ್ತಿರುವ ಮಹಿಳೆಯರು ಮತ್ತು ಮಕ್ಕಳು",
        "ಭಾವನಾತ್ಮಕ ಸಹಾಯ",
        "ಸುರಕ್ಷತಾ ಯೋಜನೆ",
        "ಉಲ್ಲೇಖ ಸೇವೆಗಳು",
      ],
      address:
        "ಪ್ರಸೂತಿ ಮತ್ತು ಸ್ತ್ರೀರೋಗ ವಿಭಾಗ, ನೆಲ ಮಹಡಿ, ವೈದೇಹಿ ವೈದ್ಯಕೀಯ ವಿಜ್ಞಾನ ಮತ್ತು ಸಂಶೋಧನಾ ಸಂಸ್ಥೆ, 82 EPIP ಪ್ರದೇಶ, ವೈಟ್‌ಫೀಲ್ಡ್, ಬೆಂಗಳೂರು 560066",
    },
    hi: {
      type: "एनजीओ / संकट सहायता केंद्र",
      supportAreas: [
        "घरेलू हिंसा",
        "हिंसा का सामना कर रही महिलाएँ और बच्चे",
        "भावनात्मक सहायता",
        "सुरक्षा योजना",
        "रेफरल सेवाएँ",
      ],
      address:
        "प्रसूति एवं स्त्रीरोग विभाग, भूतल, वैदेही इंस्टीट्यूट ऑफ मेडिकल साइंसेज एंड रिसर्च सेंटर, 82 ईपीआईपी क्षेत्र, व्हाइटफील्ड, बेंगलुरु 560066",
    },
  },

  "apsa-vimanapura": {
    en: {
      type: "NGO / Child Protection",
      supportAreas: [
        "Child protection",
        "Children in distress",
        "Child rights",
        "Community support",
      ],
      address:
        "34, Annasandrapalya, Vimanapura Post, Bengaluru 560017",
    },
    kn: {
      type: "ಎನ್‌ಜಿಒ / ಮಕ್ಕಳ ರಕ್ಷಣೆ",
      supportAreas: [
        "ಮಕ್ಕಳ ರಕ್ಷಣೆ",
        "ಸಂಕಷ್ಟದಲ್ಲಿರುವ ಮಕ್ಕಳು",
        "ಮಕ್ಕಳ ಹಕ್ಕುಗಳು",
        "ಸಮುದಾಯ ಸಹಾಯ",
      ],
      address:
        "34, ಅನ್ನಸಂದ್ರಪಾಳ್ಯ, ವಿಮಾನಪುರ ಅಂಚೆ, ಬೆಂಗಳೂರು 560017",
    },
    hi: {
      type: "एनजीओ / बाल संरक्षण",
      supportAreas: [
        "बाल संरक्षण",
        "संकट में बच्चे",
        "बाल अधिकार",
        "सामुदायिक सहायता",
      ],
      address:
        "34, अन्नसंद्रपल्या, विमानपुरा पोस्ट, बेंगलुरु 560017",
    },
  },

  "apd-lingarajapuram": {
    en: {
      type: "NGO / Disability Support",
      supportAreas: [
        "Disability support",
        "Rehabilitation",
        "Early intervention",
        "Assistive devices",
        "Family support",
      ],
      address:
        "6th Cross, Hutchins Road, Off Hennur Road, Lingarajapuram, Bengaluru 560084",
    },
    kn: {
      type: "ಎನ್‌ಜಿಒ / ಅಂಗವೈಕಲ್ಯ ಸಹಾಯ",
      supportAreas: [
        "ಅಂಗವೈಕಲ್ಯ ಸಹಾಯ",
        "ಪುನರ್ವಸತಿ",
        "ಆರಂಭಿಕ ಹಸ್ತಕ್ಷೇಪ",
        "ಸಹಾಯಕ ಸಾಧನಗಳು",
        "ಕುಟುಂಬ ಸಹಾಯ",
      ],
      address:
        "6ನೇ ಕ್ರಾಸ್, ಹಚ್ಚಿನ್ಸ್ ರಸ್ತೆ, ಹೆಣ್ಣೂರು ರಸ್ತೆಯ ಸಮೀಪ, ಲಿಂಗರಾಜಪುರಂ, ಬೆಂಗಳೂರು 560084",
    },
    hi: {
      type: "एनजीओ / दिव्यांग सहायता",
      supportAreas: [
        "दिव्यांग सहायता",
        "पुनर्वास",
        "प्रारंभिक हस्तक्षेप",
        "सहायक उपकरण",
        "परिवार सहायता",
      ],
      address:
        "6वीं क्रॉस, हचिन्स रोड, हेन्नूर रोड के पास, लिंगराजपुरम, बेंगलुरु 560084",
    },
  },

  "apd-kyalasanahalli": {
    en: {
      type: "NGO / Disability Support",
      supportAreas: [
        "Disability support",
        "Rehabilitation",
        "Assistive technology",
        "Family support",
        "Inclusion",
      ],
      address:
        "Doddagubbi Road, Kothanur Post, Kyalasanahalli, near Dattatreya Temple, Bengaluru 560049",
    },
    kn: {
      type: "ಎನ್‌ಜಿಒ / ಅಂಗವೈಕಲ್ಯ ಸಹಾಯ",
      supportAreas: [
        "ಅಂಗವೈಕಲ್ಯ ಸಹಾಯ",
        "ಪುನರ್ವಸತಿ",
        "ಸಹಾಯಕ ತಂತ್ರಜ್ಞಾನ",
        "ಕುಟುಂಬ ಸಹಾಯ",
        "ಒಳಗೊಳ್ಳುವಿಕೆ",
      ],
      address:
        "ದೊಡ್ಡಗುಬ್ಬಿ ರಸ್ತೆ, ಕೊತ್ತನೂರು ಅಂಚೆ, ಕ್ಯಾಲಸನಹಳ್ಳಿ, ದತ್ತಾತ್ರೇಯ ದೇವಸ್ಥಾನದ ಸಮೀಪ, ಬೆಂಗಳೂರು 560049",
    },
    hi: {
      type: "एनजीओ / दिव्यांग सहायता",
      supportAreas: [
        "दिव्यांग सहायता",
        "पुनर्वास",
        "सहायक तकनीक",
        "परिवार सहायता",
        "समावेशन",
      ],
      address:
        "दोड्डगुब्बी रोड, कोथनूर पोस्ट, क्यालासनहल्ली, दत्तात्रेय मंदिर के पास, बेंगलुरु 560049",
    },
  },

  "nightingales-kasturinagar": {
    en: {
      type: "NGO / Elder Support",
      supportAreas: [
        "Elder abuse",
        "Dementia support",
        "Elder care",
        "Caregiver support",
        "Mental and social wellbeing",
      ],
      address:
        "8P6, 3rd A Cross, East of NGEF Layout, Kasturinagar, Banaswadi, Bengaluru 560043",
    },
    kn: {
      type: "ಎನ್‌ಜಿಒ / ಹಿರಿಯರ ಸಹಾಯ",
      supportAreas: [
        "ಹಿರಿಯರ ಮೇಲಿನ ಹಿಂಸೆ",
        "ಡಿಮೆನ್ಶಿಯಾ ಸಹಾಯ",
        "ಹಿರಿಯರ ಆರೈಕೆ",
        "ಆರೈಕೆದಾರರ ಸಹಾಯ",
        "ಮಾನಸಿಕ ಮತ್ತು ಸಾಮಾಜಿಕ ಕ್ಷೇಮ",
      ],
      address:
        "8P6, 3ನೇ A ಕ್ರಾಸ್, NGEF ಲೇಔಟ್‌ನ ಪೂರ್ವಕ್ಕೆ, ಕಸ್ತೂರಿನಗರ, ಬಾಣಸವಾಡಿ, ಬೆಂಗಳೂರು 560043",
    },
    hi: {
      type: "एनजीओ / वरिष्ठ नागरिक सहायता",
      supportAreas: [
        "वरिष्ठ नागरिकों के साथ दुर्व्यवहार",
        "डिमेंशिया सहायता",
        "वरिष्ठ नागरिक देखभाल",
        "देखभालकर्ता सहायता",
        "मानसिक और सामाजिक कल्याण",
      ],
      address:
        "8P6, तीसरी A क्रॉस, NGEF लेआउट के पूर्व में, कस्तूरिनगर, बाणसवाड़ी, बेंगलुरु 560043",
    },
  },

  "sparsha-mathikere": {
    en: {
      type: "NGO / Child & Vulnerable Community Support",
      supportAreas: [
        "Child protection",
        "Children in difficult circumstances",
        "Women and youth",
        "Safe accommodation",
        "Healthcare and counselling",
      ],
      address:
        "2nd Cross, 12th Main Road, Gokula 1st Stage, HMT Layout, Mathikere, Bengaluru 560054",
    },
    kn: {
      type: "ಎನ್‌ಜಿಒ / ಮಕ್ಕಳು ಮತ್ತು ದುರ್ಬಲ ಸಮುದಾಯಗಳ ಸಹಾಯ",
      supportAreas: [
        "ಮಕ್ಕಳ ರಕ್ಷಣೆ",
        "ಕಷ್ಟಕರ ಪರಿಸ್ಥಿತಿಯಲ್ಲಿರುವ ಮಕ್ಕಳು",
        "ಮಹಿಳೆಯರು ಮತ್ತು ಯುವಕರು",
        "ಸುರಕ್ಷಿತ ವಸತಿ",
        "ಆರೋಗ್ಯ ಸೇವೆ ಮತ್ತು ಸಮಾಲೋಚನೆ",
      ],
      address:
        "2ನೇ ಕ್ರಾಸ್, 12ನೇ ಮೇನ್ ರಸ್ತೆ, ಗೋಕುಲ 1ನೇ ಹಂತ, HMT ಲೇಔಟ್, ಮತ್ತಿಕೆರೆ, ಬೆಂಗಳೂರು 560054",
    },
    hi: {
      type: "एनजीओ / बच्चे एवं संवेदनशील समुदाय सहायता",
      supportAreas: [
        "बाल संरक्षण",
        "कठिन परिस्थितियों में बच्चे",
        "महिलाएँ और युवा",
        "सुरक्षित आवास",
        "स्वास्थ्य सेवा और परामर्श",
      ],
      address:
        "2वीं क्रॉस, 12वीं मेन रोड, गोकुला प्रथम चरण, HMT लेआउट, मत्तिकेरे, बेंगलुरु 560054",
    },
  },
};

const filterLabels = {
  en: {
    all: "All",
    legal: "Legal",
    medical: "Medical",
    psychological: "Psychological",
    womenChildren: "Women & Children",
    domesticViolence: "Domestic Violence",
    childSupport: "Child Support",
    disability: "Disability",
    elderSupport: "Elder Support",
    filterQuestion: "What kind of support do you need?",
    servicesFound: "verified services found",
    noResults: "No nearby services found for this type of support.",
  },

  kn: {
    all: "ಎಲ್ಲಾ",
    legal: "ಕಾನೂನು",
    medical: "ವೈದ್ಯಕೀಯ",
    psychological: "ಮಾನಸಿಕ",
    womenChildren: "ಮಹಿಳೆಯರು ಮತ್ತು ಮಕ್ಕಳು",
    domesticViolence: "ಕೌಟುಂಬಿಕ ಹಿಂಸೆ",
    childSupport: "ಮಕ್ಕಳ ಸಹಾಯ",
    disability: "ಅಂಗವೈಕಲ್ಯ ಸಹಾಯ",
    elderSupport: "ಹಿರಿಯರ ಸಹಾಯ",
    filterQuestion: "ನಿಮಗೆ ಯಾವ ರೀತಿಯ ಸಹಾಯ ಬೇಕು?",
    servicesFound: "ಪರಿಶೀಲಿತ ಸೇವೆಗಳು ಕಂಡುಬಂದಿವೆ",
    noResults:
      "ಈ ರೀತಿಯ ಸಹಾಯಕ್ಕಾಗಿ ಸಮೀಪದಲ್ಲಿ ಯಾವುದೇ ಸೇವೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
  },

  hi: {
    all: "सभी",
    legal: "कानूनी",
    medical: "चिकित्सा",
    psychological: "मनोवैज्ञानिक",
    womenChildren: "महिलाएँ और बच्चे",
    domesticViolence: "घरेलू हिंसा",
    childSupport: "बाल सहायता",
    disability: "दिव्यांग सहायता",
    elderSupport: "वरिष्ठ नागरिक सहायता",
    filterQuestion: "आपको किस प्रकार की सहायता चाहिए?",
    servicesFound: "सत्यापित सेवाएँ मिलीं",
    noResults:
      "इस प्रकार की सहायता के लिए पास में कोई सेवा नहीं मिली।",
  },
};

const dlsaText = {
  en: {
    heading: "District Legal Services Authorities",
    description:
      "Government legal aid offices providing legal aid, advice, awareness and related legal services.",
    category: "Legal Aid",
    legalAid: "Legal aid",
    legalAdvice: "Legal advice",
    legalAwareness: "Legal awareness",
    phone: "Phone",
    addressNote:
      "Official address shown for accurate directions.",
  },

  kn: {
    heading: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರಗಳು",
    description:
      "ಕಾನೂನು ನೆರವು, ಸಲಹೆ, ಜಾಗೃತಿ ಮತ್ತು ಸಂಬಂಧಿತ ಕಾನೂನು ಸೇವೆಗಳನ್ನು ಒದಗಿಸುವ ಸರ್ಕಾರಿ ಕಾನೂನು ನೆರವು ಕಚೇರಿಗಳು.",
    category: "ಕಾನೂನು ನೆರವು",
    legalAid: "ಕಾನೂನು ನೆರವು",
    legalAdvice: "ಕಾನೂನು ಸಲಹೆ",
    legalAwareness: "ಕಾನೂನು ಜಾಗೃತಿ",
    phone: "ದೂರವಾಣಿ",
    addressNote:
      "ನಿಖರವಾದ ದಿಕ್ಕುಗಳಿಗಾಗಿ ಅಧಿಕೃತ ವಿಳಾಸವನ್ನು ತೋರಿಸಲಾಗಿದೆ.",
  },

  hi: {
    heading: "जिला विधिक सेवा प्राधिकरण",
    description:
      "कानूनी सहायता, सलाह, जागरूकता और संबंधित कानूनी सेवाएँ प्रदान करने वाले सरकारी कानूनी सहायता कार्यालय।",
    category: "विधिक सहायता",
    legalAid: "विधिक सहायता",
    legalAdvice: "विधिक सलाह",
    legalAwareness: "कानूनी जागरूकता",
    phone: "फ़ोन",
    addressNote:
      "सटीक दिशा-निर्देशों के लिए आधिकारिक पता दिखाया गया है।",
  },
};

const filterOptions: SupportFilter[] = [
  "all",
  "legal",
  "medical",
  "psychological",
  "womenChildren",
  "domesticViolence",
  "childSupport",
  "disability",
  "elderSupport",
];

function getServiceText(
  service: SupportService,
  language: string
): LocalizedServiceText {
  const translations = serviceDetails[service.id];

  if (!translations) {
    return {
      type: service.type,
      supportAreas: service.supportAreas,
      address: service.address,
    };
  }

  if (language === "kn") return translations.kn;
  if (language === "hi") return translations.hi;

  return translations.en;
}

function getServiceName(
  service: SupportService,
  language: string
): string {
  const translations = serviceTranslations[service.id];

  if (!translations) return service.name;

  if (language === "kn") return translations.kn;
  if (language === "hi") return translations.hi;

  return translations.en;
}

function matchesFilter(
  service: SupportService,
  filter: SupportFilter
): boolean {
  if (filter === "all") return true;

  const areas = service.supportAreas.map((area) =>
    area.toLowerCase()
  );

  switch (filter) {
    case "legal":
      return areas.some(
        (area) =>
          area.includes("legal") ||
          area.includes("law") ||
          area.includes("rights")
      );

    case "medical":
      return areas.some(
        (area) =>
          area.includes("health") ||
          area.includes("medical") ||
          area.includes("healthcare")
      );

    case "psychological":
      return areas.some(
        (area) =>
          area.includes("emotional") ||
          area.includes("mental") ||
          area.includes("counselling") ||
          area.includes("counseling")
      );

    case "womenChildren":
      return areas.some(
        (area) =>
          area.includes("women") ||
          area.includes("children") ||
          area.includes("child")
      );

    case "domesticViolence":
      return areas.some(
        (area) =>
          area.includes("domestic violence") ||
          area.includes("abuse")
      );

    case "childSupport":
      return areas.some(
        (area) =>
          area.includes("child") ||
          area.includes("children")
      );

    case "disability":
      return areas.some(
        (area) =>
          area.includes("disability") ||
          area.includes("rehabilitation") ||
          area.includes("assistive")
      );

    case "elderSupport":
      return areas.some(
        (area) =>
          area.includes("elder") ||
          area.includes("dementia") ||
          area.includes("caregiver")
      );

    default:
      return true;
  }
}

export default function SupportNearMe() {
  const { language, t } = useLanguage();

  const [status, setStatus] =
    useState<LocationStatus>("idle");

  const [coordinates, setCoordinates] =
    useState<Coordinates | null>(null);

  const [nearbyServices, setNearbyServices] =
    useState<NearbyService[]>([]);

  const [nearbyDlsaServices, setNearbyDlsaServices] =
    useState<NearbyDlsa[]>([]);

  const [selectedFilter, setSelectedFilter] =
    useState<SupportFilter>("all");

  const findNearbyServices = (
    userLocation: Coordinates
  ) => {
    const servicesWithDistance: NearbyService[] =
      supportServices
        .map((service) => ({
          ...service,
          distanceKm: calculateDistance(
            userLocation,
            service.coordinates
          ),
        }))
        .sort(
          (a, b) =>
            a.distanceKm - b.distanceKm
        );

    setNearbyServices(servicesWithDistance);
    setNearbyDlsaServices(dlsaServices);
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setStatus("unavailable");
      setNearbyServices([]);
      setNearbyDlsaServices([]);
      return;
    }

    setStatus("requesting");
    setNearbyServices([]);
    setNearbyDlsaServices([]);
    setSelectedFilter("all");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation: Coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setCoordinates(userLocation);
        findNearbyServices(userLocation);
        setSelectedFilter("all");
        setStatus("success");
      },
      (error) => {
        setCoordinates(null);
        setNearbyServices([]);
        setNearbyDlsaServices([]);
        setSelectedFilter("all");

        if (
          error.code ===
          error.PERMISSION_DENIED
        ) {
          setStatus("denied");
        } else {
          setStatus("unavailable");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const selectedFilterLabels =
    language === "kn"
      ? filterLabels.kn
      : language === "hi"
        ? filterLabels.hi
        : filterLabels.en;

  const selectedDlsaText =
    language === "kn"
      ? dlsaText.kn
      : language === "hi"
        ? dlsaText.hi
        : dlsaText.en;

  const filteredServices =
    nearbyServices.filter((service) =>
      matchesFilter(
        service,
        selectedFilter
      )
    );

  const filteredDlsaServices =
    selectedFilter === "all" ||
    selectedFilter === "legal"
      ? nearbyDlsaServices
      : [];

  const totalResults =
    filteredServices.length +
    filteredDlsaServices.length;

  return (
    <section
      aria-labelledby="support-near-me-title"
      className="mx-auto box-border w-full max-w-full min-w-0 overflow-hidden rounded-3xl border border-ava-rose/30 bg-ava-white p-6 shadow-sm sm:max-w-6xl sm:p-8"
    >
      {/* HEADER */}
      <div className="flex w-full min-w-0 flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full min-w-0 max-w-2xl">
          <div className="flex min-w-0 items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ava-rose/10 text-xl"
            >
              📍
            </span>

            <div className="min-w-0">
              <h2
                id="support-near-me-title"
                className="break-words text-2xl font-bold text-ava-charcoal"
              >
                {t("supportNearMe")}
              </h2>

              <p className="mt-1 break-words text-sm text-ava-slate">
                {t("supportNearMeSubtitle")}
              </p>
            </div>
          </div>

          <p className="mt-5 break-words text-xs leading-5 text-ava-dusty">
            🔒 {t("supportNearMePrivacy")}
          </p>

          {status === "requesting" && (
            <div
              role="status"
              aria-live="polite"
              className="mt-4 w-full min-w-0 rounded-xl bg-ava-mist/60 px-4 py-3 text-sm text-ava-slate"
            >
              {t("findingLocation")}
            </div>
          )}

          {status === "success" && coordinates && (
            <div
              role="status"
              aria-live="polite"
              className="mt-4 w-full min-w-0 rounded-xl bg-ava-rose/10 px-4 py-3"
            >
              <p className="break-words font-semibold text-ava-charcoal">
                ✓ {t("locationFound")}
              </p>

              <p className="mt-1 break-words text-sm text-ava-slate">
                {t("nearbySupportSorted")}
              </p>
            </div>
          )}

          {status === "denied" && (
            <div
              role="alert"
              className="mt-4 w-full min-w-0 rounded-xl border border-ava-mist bg-ava-cream px-4 py-3 text-sm text-ava-slate"
            >
              {t("locationAccessDenied")}
            </div>
          )}

          {status === "unavailable" && (
            <div
              role="alert"
              className="mt-4 w-full min-w-0 rounded-xl border border-ava-mist bg-ava-cream px-4 py-3 text-sm text-ava-slate"
            >
              {t("locationUnavailable")}
            </div>
          )}
        </div>

        <div className="w-full min-w-0 sm:w-auto sm:shrink-0">
          {status === "requesting" ? (
            <button
              type="button"
              disabled
              className="w-full rounded-xl bg-ava-dusty px-5 py-3 text-sm font-semibold text-white opacity-70 sm:w-auto"
            >
              {t("findingLocation")}
            </button>
          ) : (
            <button
              type="button"
              onClick={requestLocation}
              className="w-full rounded-xl bg-ava-rose px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ava-rose/40 focus:ring-offset-2 sm:w-auto"
            >
              {status === "idle"
                ? t("useMyLocation")
                : t("tryAgain")}
            </button>
          )}
        </div>
      </div>

      {(nearbyServices.length > 0 ||
        filteredDlsaServices.length > 0) && (
        <div className="mt-8 w-full min-w-0 border-t border-ava-mist pt-6">
          <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h3 className="break-words text-xl font-bold text-ava-charcoal">
                {t("nearbySupport")}
              </h3>

              <p className="mt-1 break-words text-sm text-ava-dusty">
                {totalResults}{" "}
                {selectedFilterLabels.servicesFound}
              </p>
            </div>
          </div>

          {/* SUPPORT TYPE FILTER */}
          <div className="mt-6 w-full min-w-0">
            <p className="mb-3 break-words text-sm font-semibold text-ava-charcoal">
              {selectedFilterLabels.filterQuestion}
            </p>

            <div
              className="flex w-full min-w-0 max-w-full gap-2 overflow-x-auto pb-2"
              role="group"
              aria-label={
                selectedFilterLabels.filterQuestion
              }
            >
              {filterOptions.map((filter) => {
                const isSelected =
                  selectedFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() =>
                      setSelectedFilter(filter)
                    }
                    aria-pressed={isSelected}
                    className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-ava-rose/40 focus:ring-offset-2 ${
                      isSelected
                        ? "border-ava-rose bg-ava-rose text-white"
                        : "border-ava-mist bg-ava-white text-ava-slate hover:border-ava-rose/50 hover:bg-ava-rose/5"
                    }`}
                  >
                    {selectedFilterLabels[filter]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* DLSA RESULTS */}
          {filteredDlsaServices.length > 0 && (
            <div className="mt-6 w-full min-w-0 space-y-4">
              <div className="w-full min-w-0 rounded-2xl border border-ava-rose/30 bg-ava-rose/5 px-5 py-4">
                <p className="break-words text-sm font-semibold text-ava-charcoal">
                  {selectedDlsaText.heading}
                </p>

                <p className="mt-1 break-words text-xs leading-5 text-ava-slate">
                  {selectedDlsaText.description}
                </p>
              </div>

              {filteredDlsaServices.map((dlsa) => {
                const directionsUrl =
                  `https://www.google.com/maps/dir/?api=1&destination=` +
                  encodeURIComponent(
                    `${dlsa.name}, ${dlsa.address}`
                  );

                const dlsaName =
                  language === "kn"
                    ? dlsa.localizedName.kn
                    : language === "hi"
                      ? dlsa.localizedName.hi
                      : dlsa.localizedName.en;

                return (
                  <article
                    key={dlsa.id}
                    className="box-border w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-ava-mist bg-ava-cream p-5"
                  >
                    <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="w-full min-w-0">
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                          <span className="shrink-0 rounded-full bg-ava-slate px-2.5 py-1 text-xs font-bold text-white">
                            {selectedDlsaText.category}
                          </span>

                          <span className="shrink-0 rounded-full bg-ava-rose/15 px-3 py-1 text-xs font-semibold text-ava-rose">
                            ✓ {t("verified")}
                          </span>
                        </div>

                        <h4 className="mt-3 break-words text-lg font-bold text-ava-charcoal">
                          {dlsaName}
                        </h4>

                        <p className="mt-1 break-words text-sm text-ava-slate">
                          {dlsa.address}
                        </p>

                        <p className="mt-2 break-words text-xs text-ava-dusty">
                          {selectedDlsaText.addressNote}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 w-full min-w-0">
                      <p className="break-words text-xs font-semibold uppercase tracking-wide text-ava-dusty">
                        {t("supportAreas")}
                      </p>

                      <div className="mt-2 flex min-w-0 flex-wrap gap-2">
                        <span className="max-w-full break-words rounded-full bg-ava-white px-3 py-1 text-xs text-ava-slate">
                          {selectedDlsaText.legalAid}
                        </span>

                        <span className="max-w-full break-words rounded-full bg-ava-white px-3 py-1 text-xs text-ava-slate">
                          {selectedDlsaText.legalAdvice}
                        </span>

                        <span className="max-w-full break-words rounded-full bg-ava-white px-3 py-1 text-xs text-ava-slate">
                          {selectedDlsaText.legalAwareness}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 w-full min-w-0 border-t border-ava-mist pt-4">
                      <p className="break-words text-xs font-semibold uppercase tracking-wide text-ava-dusty">
                        {selectedDlsaText.phone}
                      </p>

                      <div className="mt-2 flex min-w-0 flex-wrap gap-2">
                        {dlsa.phones.map((phone) => (
                          <a
                            key={phone}
                            href={`tel:${phone}`}
                            className="shrink-0 rounded-full bg-ava-white px-3 py-1 text-xs font-semibold text-ava-slate hover:text-ava-charcoal"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 flex w-full min-w-0 flex-col gap-3 border-t border-ava-mist pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="w-full min-w-0 text-xs text-ava-dusty sm:flex-1">
                        <p className="break-words">
                          {t("officialSource")}:{" "}
                          <span className="break-all">
                            {dlsa.officialSource}
                          </span>
                        </p>

                        <p className="mt-1 break-words">
                          {t("lastVerified")}: 5 October 2026
                        </p>
                      </div>

                      <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full shrink-0 items-center justify-center rounded-xl bg-ava-slate px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ava-charcoal focus:outline-none focus:ring-2 focus:ring-ava-slate/40 focus:ring-offset-2 sm:w-auto"
                      >
                        📍 {t("getDirections")}
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* NGO / OTHER SUPPORT RESULTS */}
          {filteredServices.length > 0 && (
            <div className="mt-5 w-full min-w-0 space-y-4">
              {filteredServices.map((service) => {
                const serviceText =
                  getServiceText(
                    service,
                    language
                  );

                const originalIndex =
                  nearbyServices.findIndex(
                    (item) =>
                      item.id === service.id
                  );

                const directionsUrl =
                  `https://www.google.com/maps/dir/?api=1&destination=` +
                  `${service.coordinates.latitude},${service.coordinates.longitude}`;

                return (
                  <article
                    key={service.id}
                    className="box-border w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-ava-mist bg-ava-cream p-5"
                  >
                    <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="w-full min-w-0">
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                          <span className="shrink-0 rounded-full bg-ava-slate px-2.5 py-1 text-xs font-bold text-white">
                            #{originalIndex + 1}
                          </span>

                          {service.verified && (
                            <span className="shrink-0 rounded-full bg-ava-rose/15 px-3 py-1 text-xs font-semibold text-ava-rose">
                              ✓ {t("verified")}
                            </span>
                          )}

                          <span className="max-w-full break-words text-xs font-semibold text-ava-dusty">
                            {serviceText.type}
                          </span>
                        </div>

                        <h4 className="mt-3 break-words text-lg font-bold text-ava-charcoal">
                          {getServiceName(
                            service,
                            language
                          )}
                        </h4>

                        <p className="mt-1 break-words text-sm text-ava-slate">
                          {serviceText.address}
                        </p>
                      </div>

                      <div className="w-full shrink-0 rounded-xl bg-ava-rose/10 px-4 py-2 text-center sm:w-auto">
                        <p className="text-lg font-bold text-ava-rose">
                          {formatDistance(
                            service.distanceKm
                          )}
                        </p>

                        <p className="text-xs text-ava-slate">
                          {t("away")}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 w-full min-w-0">
                      <p className="break-words text-xs font-semibold uppercase tracking-wide text-ava-dusty">
                        {t("supportAreas")}
                      </p>

                      <div className="mt-2 flex min-w-0 flex-wrap gap-2">
                        {serviceText.supportAreas.map(
                          (area) => (
                            <span
                              key={area}
                              className="max-w-full break-words rounded-full bg-ava-white px-3 py-1 text-xs text-ava-slate"
                            >
                              {area}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    <div className="mt-5 flex w-full min-w-0 flex-col gap-3 border-t border-ava-mist pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="w-full min-w-0 text-xs text-ava-dusty sm:flex-1">
                        <p className="break-words">
                          {t("officialSource")}:{" "}
                          <span className="break-all">
                            {service.officialSource}
                          </span>
                        </p>

                        <p className="mt-1 break-words">
                          {t("lastVerified")}:{" "}
                          {service.lastVerified}
                        </p>
                      </div>

                      <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full shrink-0 items-center justify-center rounded-xl bg-ava-slate px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ava-charcoal focus:outline-none focus:ring-2 focus:ring-ava-slate/40 focus:ring-offset-2 sm:w-auto"
                      >
                        📍 {t("getDirections")}
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* NO RESULTS */}
          {filteredServices.length === 0 &&
            filteredDlsaServices.length === 0 && (
              <div className="mt-6 w-full min-w-0 rounded-2xl border border-ava-mist bg-ava-cream px-5 py-8 text-center">
                <p className="break-words text-sm text-ava-slate">
                  {selectedFilterLabels.noResults}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedFilter("all")
                  }
                  className="mt-4 rounded-xl bg-ava-slate px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ava-charcoal focus:outline-none focus:ring-2 focus:ring-ava-slate/40 focus:ring-offset-2"
                >
                  {selectedFilterLabels.all}
                </button>
              </div>
            )}
        </div>
      )}
    </section>
  );
}