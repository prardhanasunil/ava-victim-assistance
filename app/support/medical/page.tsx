"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import QuickExit from "@/components/QuickExit";
import { useLanguage } from "@/components/LanguageProvider";

type Language = "en" | "kn" | "hi";

type Hospital = {
  id: string;
  name: string;
  nameKn: string;
  nameHi: string;

  district: string;
  districtKn: string;
  districtHi: string;

  type: string;
  typeKn: string;
  typeHi: string;

  address: string;
  addressKn: string;
  addressHi: string;

  phone: string | null;

  services: string[];
  servicesKn: string[];
  servicesHi: string[];

  victimSupport: string[];
  victimSupportKn: string[];
  victimSupportHi: string[];

  officialSource: string;
  lastVerified: string;
};

const hospitals: Hospital[] = [
  {
    id: "victoria",
    name: "Victoria Hospital",
    nameKn: "ವಿಕ್ಟೋರಿಯಾ ಆಸ್ಪತ್ರೆ",
    nameHi: "विक्टोरिया अस्पताल",
    district: "Bengaluru Urban",
    districtKn: "ಬೆಂಗಳೂರು ನಗರ",
    districtHi: "बेंगलुरु शहरी",
    type: "Government General Hospital",
    typeKn: "ಸರ್ಕಾರಿ ಸಾಮಾನ್ಯ ಆಸ್ಪತ್ರೆ",
    typeHi: "सरकारी सामान्य अस्पताल",
    address:
      "Mysore Road, near City Market, New Tharagupet, Bengaluru, Karnataka 560002",
    addressKn:
      "ಮೈಸೂರು ರಸ್ತೆ, ಸಿಟಿ ಮಾರ್ಕೆಟ್ ಸಮೀಪ, ನ್ಯೂ ತರಗುಪೇಟೆ, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ 560002",
    addressHi:
      "मैसूर रोड, सिटी मार्केट के पास, न्यू तरगुपेट, बेंगलुरु, कर्नाटक 560002",
    phone: "080-26701150",
    services: [
      "General medical care",
      "Emergency and trauma care",
      "Surgery",
      "Orthopaedics",
      "Obstetrics and gynaecology",
      "Diagnostic services",
    ],
    servicesKn: [
      "ಸಾಮಾನ್ಯ ವೈದ್ಯಕೀಯ ಆರೈಕೆ",
      "ತುರ್ತು ಮತ್ತು ಟ್ರಾಮಾ ಆರೈಕೆ",
      "ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
      "ಅಸ್ಥಿರೋಗ ಚಿಕಿತ್ಸೆ",
      "ಪ್ರಸೂತಿ ಮತ್ತು ಸ್ತ್ರೀರೋಗ ಚಿಕಿತ್ಸೆ",
      "ರೋಗನಿರ್ಣಯ ಸೇವೆಗಳು",
    ],
    servicesHi: [
      "सामान्य चिकित्सा देखभाल",
      "आपातकालीन और ट्रॉमा देखभाल",
      "शल्य चिकित्सा",
      "हड्डी एवं जोड़ उपचार",
      "प्रसूति एवं स्त्रीरोग सेवाएँ",
      "नैदानिक सेवाएँ",
    ],
    victimSupport: [
      "Medical treatment following injuries",
      "Emergency assessment",
      "Referral for specialist care",
    ],
    victimSupportKn: [
      "ಗಾಯಗಳ ನಂತರ ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ",
      "ತುರ್ತು ವೈದ್ಯಕೀಯ ಮೌಲ್ಯಮಾಪನ",
      "ತಜ್ಞ ವೈದ್ಯಕೀಯ ಆರೈಕೆಗೆ ರೆಫರಲ್",
    ],
    victimSupportHi: [
      "चोटों के बाद चिकित्सा उपचार",
      "आपातकालीन चिकित्सा मूल्यांकन",
      "विशेषज्ञ चिकित्सा देखभाल के लिए रेफरल",
    ],
    officialSource: "Karnataka Health & Family Welfare Department",
    lastVerified: "5 October 2026",
  },

  {
    id: "bowring",
    name: "Bowring & Lady Curzon Hospital",
    nameKn: "ಬೌರಿಂಗ್ ಮತ್ತು ಲೇಡಿ ಕರ್ಜನ್ ಆಸ್ಪತ್ರೆ",
    nameHi: "बॉरिंग और लेडी कर्ज़न अस्पताल",
    district: "Bengaluru Urban",
    districtKn: "ಬೆಂಗಳೂರು ನಗರ",
    districtHi: "बेंगलुरु शहरी",
    type: "Government General Hospital",
    typeKn: "ಸರ್ಕಾರಿ ಸಾಮಾನ್ಯ ಆಸ್ಪತ್ರೆ",
    typeHi: "सरकारी सामान्य अस्पताल",
    address:
      "Lady Curzon Road, Shivaji Nagar, Bengaluru, Karnataka 560001",
    addressKn:
      "ಲೇಡಿ ಕರ್ಜನ್ ರಸ್ತೆ, ಶಿವಾಜಿನಗರ, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ 560001",
    addressHi:
      "लेडी कर्ज़न रोड, शिवाजी नगर, बेंगलुरु, कर्नाटक 560001",
    phone: "08431186388",
    services: [
      "General medical care",
      "Emergency care",
      "Surgery",
      "Obstetrics and gynaecology",
      "Paediatrics",
      "Diagnostic services",
    ],
    servicesKn: [
      "ಸಾಮಾನ್ಯ ವೈದ್ಯಕೀಯ ಆರೈಕೆ",
      "ತುರ್ತು ಆರೈಕೆ",
      "ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
      "ಪ್ರಸೂತಿ ಮತ್ತು ಸ್ತ್ರೀರೋಗ ಚಿಕಿತ್ಸೆ",
      "ಮಕ್ಕಳ ವೈದ್ಯಕೀಯ ಸೇವೆಗಳು",
      "ರೋಗನಿರ್ಣಯ ಸೇವೆಗಳು",
    ],
    servicesHi: [
      "सामान्य चिकित्सा देखभाल",
      "आपातकालीन देखभाल",
      "शल्य चिकित्सा",
      "प्रसूति एवं स्त्रीरोग सेवाएँ",
      "बाल चिकित्सा सेवाएँ",
      "नैदानिक सेवाएँ",
    ],
    victimSupport: [
      "Treatment of injuries",
      "Emergency assessment",
      "Specialist referral",
    ],
    victimSupportKn: [
      "ಗಾಯಗಳ ಚಿಕಿತ್ಸೆ",
      "ತುರ್ತು ವೈದ್ಯಕೀಯ ಮೌಲ್ಯಮಾಪನ",
      "ತಜ್ಞ ವೈದ್ಯಕೀಯ ರೆಫರಲ್",
    ],
    victimSupportHi: [
      "चोटों का उपचार",
      "आपातकालीन चिकित्सा मूल्यांकन",
      "विशेषज्ञ चिकित्सा रेफरल",
    ],
    officialSource: "Karnataka Health & Family Welfare Department",
    lastVerified: "5 October 2026",
  },

  {
    id: "kc-general",
    name: "K.C. General Hospital",
    nameKn: "ಕೆ.ಸಿ. ಸಾಮಾನ್ಯ ಆಸ್ಪತ್ರೆ",
    nameHi: "के.सी. सामान्य अस्पताल",
    district: "Bengaluru Urban",
    districtKn: "ಬೆಂಗಳೂರು ನಗರ",
    districtHi: "बेंगलुरु शहरी",
    type: "Government General Hospital",
    typeKn: "ಸರ್ಕಾರಿ ಸಾಮಾನ್ಯ ಆಸ್ಪತ್ರೆ",
    typeHi: "सरकारी सामान्य अस्पताल",
    address:
      "Malleswaram Circle, Police Station Road, Bengaluru, Karnataka 560003",
    addressKn:
      "ಮಲ್ಲೇಶ್ವರಂ ಸರ್ಕಲ್, ಪೊಲೀಸ್ ಸ್ಟೇಷನ್ ರಸ್ತೆ, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ 560003",
    addressHi:
      "मल्लेश्वरम सर्कल, पुलिस स्टेशन रोड, बेंगलुरु, कर्नाटक 560003",
    phone: "080-23341771",
    services: [
      "General medical care",
      "Emergency care",
      "Surgery",
      "Orthopaedics",
      "Obstetrics and gynaecology",
    ],
    servicesKn: [
      "ಸಾಮಾನ್ಯ ವೈದ್ಯಕೀಯ ಆರೈಕೆ",
      "ತುರ್ತು ಆರೈಕೆ",
      "ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
      "ಅಸ್ಥಿರೋಗ ಚಿಕಿತ್ಸೆ",
      "ಪ್ರಸೂತಿ ಮತ್ತು ಸ್ತ್ರೀರೋಗ ಚಿಕಿತ್ಸೆ",
    ],
    servicesHi: [
      "सामान्य चिकित्सा देखभाल",
      "आपातकालीन देखभाल",
      "शल्य चिकित्सा",
      "हड्डी एवं जोड़ उपचार",
      "प्रसूति एवं स्त्रीरोग सेवाएँ",
    ],
    victimSupport: [
      "Injury treatment",
      "Emergency medical assessment",
      "Specialist referral",
    ],
    victimSupportKn: [
      "ಗಾಯಗಳ ಚಿಕಿತ್ಸೆ",
      "ತುರ್ತು ವೈದ್ಯಕೀಯ ಮೌಲ್ಯಮಾಪನ",
      "ತಜ್ಞ ವೈದ್ಯಕೀಯ ರೆಫರಲ್",
    ],
    victimSupportHi: [
      "चोटों का उपचार",
      "आपातकालीन चिकित्सा मूल्यांकन",
      "विशेषज्ञ चिकित्सा रेफरल",
    ],
    officialSource: "Karnataka Health & Family Welfare Department",
    lastVerified: "5 October 2026",
  },

  {
    id: "jayanagar",
    name: "Jayanagar General Hospital",
    nameKn: "ಜಯನಗರ ಸಾಮಾನ್ಯ ಆಸ್ಪತ್ರೆ",
    nameHi: "जयनगर सामान्य अस्पताल",
    district: "Bengaluru Urban",
    districtKn: "ಬೆಂಗಳೂರು ನಗರ",
    districtHi: "बेंगलुरु शहरी",
    type: "Government General Hospital",
    typeKn: "ಸರ್ಕಾರಿ ಸಾಮಾನ್ಯ ಆಸ್ಪತ್ರೆ",
    typeHi: "सरकारी सामान्य अस्पताल",
    address:
      "4th B Block, 32nd E Cross Road, Tilak Nagar, Jayanagar, Bengaluru, Karnataka 560041",
    addressKn:
      "4ನೇ ಬಿ ಬ್ಲಾಕ್, 32ನೇ ಇ ಕ್ರಾಸ್ ರಸ್ತೆ, ತಿಲಕ್ ನಗರ, ಜಯನಗರ, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ 560041",
    addressHi:
      "4था बी ब्लॉक, 32वीं ई क्रॉस रोड, तिलक नगर, जयनगर, बेंगलुरु, कर्नाटक 560041",
    phone: "09480452475",
    services: [
      "General medical care",
      "Emergency care",
      "Surgery",
      "Obstetrics and gynaecology",
      "Paediatrics",
      "Psychiatric care",
    ],
    servicesKn: [
      "ಸಾಮಾನ್ಯ ವೈದ್ಯಕೀಯ ಆರೈಕೆ",
      "ತುರ್ತು ಆರೈಕೆ",
      "ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
      "ಪ್ರಸೂತಿ ಮತ್ತು ಸ್ತ್ರೀರೋಗ ಚಿಕಿತ್ಸೆ",
      "ಮಕ್ಕಳ ವೈದ್ಯಕೀಯ ಸೇವೆಗಳು",
      "ಮನೋವೈದ್ಯಕೀಯ ಆರೈಕೆ",
    ],
    servicesHi: [
      "सामान्य चिकित्सा देखभाल",
      "आपातकालीन देखभाल",
      "शल्य चिकित्सा",
      "प्रसूति एवं स्त्रीरोग सेवाएँ",
      "बाल चिकित्सा सेवाएँ",
      "मनोचिकित्सकीय देखभाल",
    ],
    victimSupport: [
      "Injury treatment",
      "Emergency assessment",
      "Mental-health referral where available",
    ],
    victimSupportKn: [
      "ಗಾಯಗಳ ಚಿಕಿತ್ಸೆ",
      "ತುರ್ತು ವೈದ್ಯಕೀಯ ಮೌಲ್ಯಮಾಪನ",
      "ಲಭ್ಯವಿದ್ದಲ್ಲಿ ಮಾನಸಿಕ ಆರೋಗ್ಯ ರೆಫರಲ್",
    ],
    victimSupportHi: [
      "चोटों का उपचार",
      "आपातकालीन चिकित्सा मूल्यांकन",
      "उपलब्ध होने पर मानसिक स्वास्थ्य रेफरल",
    ],
    officialSource: "Karnataka Health & Family Welfare / ORS",
    lastVerified: "5 October 2026",
  },

  {
    id: "cv-raman",
    name: "C.V. Raman General Hospital",
    nameKn: "ಸಿ.ವಿ. ರಾಮನ್ ಸಾಮಾನ್ಯ ಆಸ್ಪತ್ರೆ",
    nameHi: "सी.वी. रमन सामान्य अस्पताल",
    district: "Bengaluru Urban",
    districtKn: "ಬೆಂಗಳೂರು ನಗರ",
    districtHi: "बेंगलुरु शहरी",
    type: "Government General Hospital",
    typeKn: "ಸರ್ಕಾರಿ ಸಾಮಾನ್ಯ ಆಸ್ಪತ್ರೆ",
    typeHi: "सरकारी सामान्य अस्पताल",
    address:
      "68/1, 80 Feet Road, Kalyan Nagar, Michael Palaya, H Colony, Indiranagar, Bengaluru, Karnataka 560038",
    addressKn:
      "68/1, 80 ಫೀಟ್ ರಸ್ತೆ, ಕಲ್ಯಾಣ ನಗರ, ಮೈಕೆಲ್ ಪಾಳ್ಯ, ಎಚ್ ಕಾಲೋನಿ, ಇಂದಿರಾನಗರ, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ 560038",
    addressHi:
      "68/1, 80 फीट रोड, कल्याण नगर, माइकल पाल्या, एच कॉलोनी, इंदिरानगर, बेंगलुरु, कर्नाटक 560038",
    phone: "080-25281245",
    services: [
      "General medical care",
      "Emergency care",
      "Surgery",
      "Diagnostic services",
    ],
    servicesKn: [
      "ಸಾಮಾನ್ಯ ವೈದ್ಯಕೀಯ ಆರೈಕೆ",
      "ತುರ್ತು ಆರೈಕೆ",
      "ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
      "ರೋಗನಿರ್ಣಯ ಸೇವೆಗಳು",
    ],
    servicesHi: [
      "सामान्य चिकित्सा देखभाल",
      "आपातकालीन देखभाल",
      "शल्य चिकित्सा",
      "नैदानिक सेवाएँ",
    ],
    victimSupport: [
      "Medical treatment following injury",
      "Emergency assessment",
    ],
    victimSupportKn: [
      "ಗಾಯಗಳ ನಂತರ ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ",
      "ತುರ್ತು ವೈದ್ಯಕೀಯ ಮೌಲ್ಯಮಾಪನ",
    ],
    victimSupportHi: [
      "चोटों के बाद चिकित्सा उपचार",
      "आपातकालीन चिकित्सा मूल्यांकन",
    ],
    officialSource: "Karnataka Health & Family Welfare / ORS",
    lastVerified: "5 October 2026",
  },

  {
    id: "vani-vilas",
    name: "Vani Vilas Hospital",
    nameKn: "ವಾಣಿ ವಿಲಾಸ್ ಆಸ್ಪತ್ರೆ",
    nameHi: "वाणी विलास अस्पताल",
    district: "Bengaluru Urban",
    districtKn: "ಬೆಂಗಳೂರು ನಗರ",
    districtHi: "बेंगलुरु शहरी",
    type: "Government Women & Children Hospital",
    typeKn: "ಸರ್ಕಾರಿ ಮಹಿಳಾ ಮತ್ತು ಮಕ್ಕಳ ಆಸ್ಪತ್ರೆ",
    typeHi: "सरकारी महिला एवं बाल अस्पताल",
    address:
      "Victoria Hospital Compound, Sultan Road, Kalasipalya, Bengaluru, Karnataka 560002",
    addressKn:
      "ವಿಕ್ಟೋರಿಯಾ ಆಸ್ಪತ್ರೆ ಆವರಣ, ಸುಲ್ತಾನ್ ರಸ್ತೆ, ಕಲಾಸಿಪಾಳ್ಯ, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ 560002",
    addressHi:
      "विक्टोरिया अस्पताल परिसर, सुल्तान रोड, कलासिपाल्या, बेंगलुरु, कर्नाटक 560002",
    phone: "09886931261",
    services: [
      "Obstetrics and gynaecology",
      "Maternal care",
      "Paediatric care",
      "Emergency care",
    ],
    servicesKn: [
      "ಪ್ರಸೂತಿ ಮತ್ತು ಸ್ತ್ರೀರೋಗ ಚಿಕಿತ್ಸೆ",
      "ತಾಯಂದಿರ ಆರೈಕೆ",
      "ಮಕ್ಕಳ ಆರೈಕೆ",
      "ತುರ್ತು ಆರೈಕೆ",
    ],
    servicesHi: [
      "प्रसूति एवं स्त्रीरोग सेवाएँ",
      "मातृ देखभाल",
      "बाल चिकित्सा देखभाल",
      "आपातकालीन देखभाल",
    ],
    victimSupport: [
      "Women and child medical care",
      "Treatment following injury",
      "Specialist referral",
    ],
    victimSupportKn: [
      "ಮಹಿಳೆ ಮತ್ತು ಮಕ್ಕಳ ವೈದ್ಯಕೀಯ ಆರೈಕೆ",
      "ಗಾಯಗಳ ನಂತರ ಚಿಕಿತ್ಸೆ",
      "ತಜ್ಞ ವೈದ್ಯಕೀಯ ರೆಫರಲ್",
    ],
    victimSupportHi: [
      "महिला एवं बाल चिकित्सा देखभाल",
      "चोटों के बाद उपचार",
      "विशेषज्ञ चिकित्सा रेफरल",
    ],
    officialSource: "Karnataka Health & Family Welfare Department",
    lastVerified: "5 October 2026",
  },

  {
    id: "igi-child",
    name: "Indira Gandhi Institute of Child Health",
    nameKn: "ಇಂದಿರಾ ಗಾಂಧಿ ಮಕ್ಕಳ ಆರೋಗ್ಯ ಸಂಸ್ಥೆ",
    nameHi: "इंदिरा गांधी बाल स्वास्थ्य संस्थान",
    district: "Bengaluru Urban",
    districtKn: "ಬೆಂಗಳೂರು ನಗರ",
    districtHi: "बेंगलुरु शहरी",
    type: "Government Children's Hospital",
    typeKn: "ಸರ್ಕಾರಿ ಮಕ್ಕಳ ಆಸ್ಪತ್ರೆ",
    typeHi: "सरकारी बाल अस्पताल",
    address:
      "1st Block, Siddapura, Jayanagar, Bengaluru, Karnataka 560011",
    addressKn:
      "1ನೇ ಬ್ಲಾಕ್, ಸಿದ್ದಾಪುರ, ಜಯನಗರ, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ 560011",
    addressHi:
      "1ला ब्लॉक, सिद्धापुरा, जयनगर, बेंगलुरु, कर्नाटक 560011",
    phone: "080-22443143",
    services: [
      "Paediatric care",
      "Emergency care",
      "Child specialist services",
      "Diagnostic services",
    ],
    servicesKn: [
      "ಮಕ್ಕಳ ವೈದ್ಯಕೀಯ ಆರೈಕೆ",
      "ತುರ್ತು ಆರೈಕೆ",
      "ಮಕ್ಕಳ ತಜ್ಞ ಸೇವೆಗಳು",
      "ರೋಗನಿರ್ಣಯ ಸೇವೆಗಳು",
    ],
    servicesHi: [
      "बाल चिकित्सा देखभाल",
      "आपातकालीन देखभाल",
      "बाल विशेषज्ञ सेवाएँ",
      "नैदानिक सेवाएँ",
    ],
    victimSupport: [
      "Medical care for children",
      "Injury assessment",
      "Specialist paediatric referral",
    ],
    victimSupportKn: [
      "ಮಕ್ಕಳ ವೈದ್ಯಕೀಯ ಆರೈಕೆ",
      "ಗಾಯಗಳ ಮೌಲ್ಯಮಾಪನ",
      "ಮಕ್ಕಳ ತಜ್ಞ ವೈದ್ಯಕೀಯ ರೆಫರಲ್",
    ],
    victimSupportHi: [
      "बच्चों के लिए चिकित्सा देखभाल",
      "चोटों का मूल्यांकन",
      "बाल विशेषज्ञ चिकित्सा रेफरल",
    ],
    officialSource: "Government health institution / ORS",
    lastVerified: "5 October 2026",
  },

  {
    id: "kr-puram",
    name: "General Hospital K.R. Puram",
    nameKn: "ಕೆ.ಆರ್. ಪುರಂ ಸಾಮಾನ್ಯ ಆಸ್ಪತ್ರೆ",
    nameHi: "के.आर. पुरम सामान्य अस्पताल",
    district: "Bengaluru Urban",
    districtKn: "ಬೆಂಗಳೂರು ನಗರ",
    districtHi: "बेंगलुरु शहरी",
    type: "Government General Hospital",
    typeKn: "ಸರ್ಕಾರಿ ಸಾಮಾನ್ಯ ಆಸ್ಪತ್ರೆ",
    typeHi: "सरकारी सामान्य अस्पताल",
    address:
      "Old Madras Road, Krishnarajapuram, Bengaluru, Karnataka 560036",
    addressKn:
      "ಓಲ್ಡ್ ಮದ್ರಾಸ್ ರಸ್ತೆ, ಕೃಷ್ಣರಾಜಪುರಂ, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ 560036",
    addressHi:
      "ओल्ड मद्रास रोड, कृष्णराजपुरम, बेंगलुरु, कर्नाटक 560036",
    phone: null,
    services: [
      "General medical care",
      "Emergency care",
      "Diagnostic services",
    ],
    servicesKn: [
      "ಸಾಮಾನ್ಯ ವೈದ್ಯಕೀಯ ಆರೈಕೆ",
      "ತುರ್ತು ಆರೈಕೆ",
      "ರೋಗನಿರ್ಣಯ ಸೇವೆಗಳು",
    ],
    servicesHi: [
      "सामान्य चिकित्सा देखभाल",
      "आपातकालीन देखभाल",
      "नैदानिक सेवाएँ",
    ],
    victimSupport: [
      "Medical treatment following injury",
      "Emergency assessment",
    ],
    victimSupportKn: [
      "ಗಾಯಗಳ ನಂತರ ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ",
      "ತುರ್ತು ವೈದ್ಯಕೀಯ ಮೌಲ್ಯಮಾಪನ",
    ],
    victimSupportHi: [
      "चोटों के बाद चिकित्सा उपचार",
      "आपातकालीन चिकित्सा मूल्यांकन",
    ],
    officialSource: "Karnataka Health & Family Welfare / ORS",
    lastVerified: "5 October 2026",
  },

  {
    id: "belagavi",
    name: "District Hospital, Belagavi",
    nameKn: "ಬೆಳಗಾವಿ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ",
    nameHi: "बेलगावी जिला अस्पताल",
    district: "Belagavi",
    districtKn: "ಬೆಳಗಾವಿ",
    districtHi: "बेलगावी",
    type: "Government District Hospital",
    typeKn: "ಸರ್ಕಾರಿ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ",
    typeHi: "सरकारी जिला अस्पताल",
    address: "District Hospital, Belagavi, Karnataka",
    addressKn: "ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ, ಬೆಳಗಾವಿ, ಕರ್ನಾಟಕ",
    addressHi: "जिला अस्पताल, बेलगावी, कर्नाटक",
    phone: "0831-2420320",
    services: [
      "Medicine",
      "Surgery",
      "Paediatrics",
      "Maternity and gynaecology",
      "ENT",
      "Psychiatry",
      "Dentistry",
    ],
    servicesKn: [
      "ಸಾಮಾನ್ಯ ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ",
      "ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
      "ಮಕ್ಕಳ ವೈದ್ಯಕೀಯ ಸೇವೆಗಳು",
      "ಪ್ರಸೂತಿ ಮತ್ತು ಸ್ತ್ರೀರೋಗ ಚಿಕಿತ್ಸೆ",
      "ಕಿವಿ-ಮೂಗು-ಗಂಟಲು ಚಿಕಿತ್ಸೆ",
      "ಮನೋವೈದ್ಯಕೀಯ ಸೇವೆಗಳು",
      "ದಂತ ಚಿಕಿತ್ಸೆ",
    ],
    servicesHi: [
      "चिकित्सा",
      "शल्य चिकित्सा",
      "बाल चिकित्सा",
      "प्रसूति एवं स्त्रीरोग",
      "कान-नाक-गला उपचार",
      "मनोचिकित्सा",
      "दंत चिकित्सा",
    ],
    victimSupport: [
      "Injury treatment",
      "Emergency medical assessment",
      "Mental-health care",
      "Specialist referral",
    ],
    victimSupportKn: [
      "ಗಾಯಗಳ ಚಿಕಿತ್ಸೆ",
      "ತುರ್ತು ವೈದ್ಯಕೀಯ ಮೌಲ್ಯಮಾಪನ",
      "ಮಾನಸಿಕ ಆರೋಗ್ಯ ಆರೈಕೆ",
      "ತಜ್ಞ ವೈದ್ಯಕೀಯ ರೆಫರಲ್",
    ],
    victimSupportHi: [
      "चोटों का उपचार",
      "आपातकालीन चिकित्सा मूल्यांकन",
      "मानसिक स्वास्थ्य देखभाल",
      "विशेषज्ञ चिकित्सा रेफरल",
    ],
    officialSource: "Belagavi District Government",
    lastVerified: "5 October 2026",
  },

  {
    id: "ballari",
    name: "District Hospital, Ballari",
    nameKn: "ಬಳ್ಳಾರಿ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ",
    nameHi: "बल्लारी जिला अस्पताल",
    district: "Ballari",
    districtKn: "ಬಳ್ಳಾರಿ",
    districtHi: "बल्लारी",
    type: "Government District Hospital",
    typeKn: "ಸರ್ಕಾರಿ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ",
    typeHi: "सरकारी जिला अस्पताल",
    address:
      "Anantapur Road, Ballari, Karnataka 583101",
    addressKn:
      "ಅನಂತಪುರ ರಸ್ತೆ, ಬಳ್ಳಾರಿ, ಕರ್ನಾಟಕ 583101",
    addressHi:
      "अनंतपुर रोड, बल्लारी, कर्नाटक 583101",
    phone: "08392-275255",
    services: [
      "Medicine",
      "Obstetrics and gynaecology",
      "Orthopaedics",
      "ENT",
      "Radiology",
      "Surgery",
      "Ophthalmology",
      "Paediatrics",
      "Psychiatry",
      "Pathology",
    ],
    servicesKn: [
      "ಸಾಮಾನ್ಯ ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ",
      "ಪ್ರಸೂತಿ ಮತ್ತು ಸ್ತ್ರೀರೋಗ ಚಿಕಿತ್ಸೆ",
      "ಅಸ್ಥಿರೋಗ ಚಿಕಿತ್ಸೆ",
      "ಕಿವಿ-ಮೂಗು-ಗಂಟಲು ಚಿಕಿತ್ಸೆ",
      "ರೇಡಿಯಾಲಜಿ",
      "ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
      "ನೇತ್ರ ಚಿಕಿತ್ಸೆ",
      "ಮಕ್ಕಳ ವೈದ್ಯಕೀಯ ಸೇವೆಗಳು",
      "ಮನೋವೈದ್ಯಕೀಯ ಸೇವೆಗಳು",
      "ಪ್ಯಾಥಾಲಜಿ",
    ],
    servicesHi: [
      "चिकित्सा",
      "प्रसूति एवं स्त्रीरोग",
      "हड्डी एवं जोड़ उपचार",
      "कान-नाक-गला उपचार",
      "रेडियोलॉजी",
      "शल्य चिकित्सा",
      "नेत्र चिकित्सा",
      "बाल चिकित्सा",
      "मनोचिकित्सा",
      "पैथोलॉजी",
    ],
    victimSupport: [
      "Injury treatment",
      "Emergency assessment",
      "Psychiatric care",
      "Blood bank access",
      "Specialist referral",
    ],
    victimSupportKn: [
      "ಗಾಯಗಳ ಚಿಕಿತ್ಸೆ",
      "ತುರ್ತು ವೈದ್ಯಕೀಯ ಮೌಲ್ಯಮಾಪನ",
      "ಮನೋವೈದ್ಯಕೀಯ ಆರೈಕೆ",
      "ರಕ್ತ ಬ್ಯಾಂಕ್ ಸೇವೆ",
      "ತಜ್ಞ ವೈದ್ಯಕೀಯ ರೆಫರಲ್",
    ],
    victimSupportHi: [
      "चोटों का उपचार",
      "आपातकालीन चिकित्सा मूल्यांकन",
      "मनोचिकित्सकीय देखभाल",
      "ब्लड बैंक सुविधा",
      "विशेषज्ञ चिकित्सा रेफरल",
    ],
    officialSource: "Ballari District Government",
    lastVerified: "5 October 2026",
  },

  {
    id: "kalaburagi",
    name: "District Hospital, Kalaburagi",
    nameKn: "ಕಲಬುರಗಿ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ",
    nameHi: "कलाबुरगी जिला अस्पताल",
    district: "Kalaburagi",
    districtKn: "ಕಲಬುರಗಿ",
    districtHi: "कलाबुरगी",
    type: "Government District Hospital",
    typeKn: "ಸರ್ಕಾರಿ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ",
    typeHi: "सरकारी जिला अस्पताल",
    address: "District Hospital, Kalaburagi, Karnataka 585101",
    addressKn: "ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ, ಕಲಬುರಗಿ, ಕರ್ನಾಟಕ 585101",
    addressHi: "जिला अस्पताल, कलाबुरगी, कर्नाटक 585101",
    phone: "08472-278644",
    services: [
      "General medicine",
      "Surgery",
      "Orthopaedics",
      "Obstetrics and gynaecology",
      "Paediatrics",
      "Psychiatry",
      "Diagnostic services",
    ],
    servicesKn: [
      "ಸಾಮಾನ್ಯ ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ",
      "ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
      "ಅಸ್ಥಿರೋಗ ಚಿಕಿತ್ಸೆ",
      "ಪ್ರಸೂತಿ ಮತ್ತು ಸ್ತ್ರೀರೋಗ ಚಿಕಿತ್ಸೆ",
      "ಮಕ್ಕಳ ವೈದ್ಯಕೀಯ ಸೇವೆಗಳು",
      "ಮನೋವೈದ್ಯಕೀಯ ಸೇವೆಗಳು",
      "ರೋಗನಿರ್ಣಯ ಸೇವೆಗಳು",
    ],
    servicesHi: [
      "सामान्य चिकित्सा",
      "शल्य चिकित्सा",
      "हड्डी एवं जोड़ उपचार",
      "प्रसूति एवं स्त्रीरोग",
      "बाल चिकित्सा",
      "मनोचिकित्सा",
      "नैदानिक सेवाएँ",
    ],
    victimSupport: [
      "Injury treatment",
      "Emergency assessment",
      "Mental-health care",
      "Specialist referral",
    ],
    victimSupportKn: [
      "ಗಾಯಗಳ ಚಿಕಿತ್ಸೆ",
      "ತುರ್ತು ವೈದ್ಯಕೀಯ ಮೌಲ್ಯಮಾಪನ",
      "ಮಾನಸಿಕ ಆರೋಗ್ಯ ಆರೈಕೆ",
      "ತಜ್ಞ ವೈದ್ಯಕೀಯ ರೆಫರಲ್",
    ],
    victimSupportHi: [
      "चोटों का उपचार",
      "आपातकालीन चिकित्सा मूल्यांकन",
      "मानसिक स्वास्थ्य देखभाल",
      "विशेषज्ञ चिकित्सा रेफरल",
    ],
    officialSource: "Karnataka ORS / Health Department",
    lastVerified: "5 October 2026",
  },

  {
    id: "mysuru",
    name: "K.R. Hospital / District Hospital, Mysuru",
    nameKn: "ಕೆ.ಆರ್. ಆಸ್ಪತ್ರೆ / ಮೈಸೂರು ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ",
    nameHi: "के.आर. अस्पताल / मैसूरु जिला अस्पताल",
    district: "Mysuru",
    districtKn: "ಮೈಸೂರು",
    districtHi: "मैसूरु",
    type: "Government District Hospital",
    typeKn: "ಸರ್ಕಾರಿ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ",
    typeHi: "सरकारी जिला अस्पताल",
    address: "Mysuru, Karnataka",
    addressKn: "ಮೈಸೂರು, ಕರ್ನಾಟಕ",
    addressHi: "मैसूरु, कर्नाटक",
    phone: "0821-2497303",
    services: [
      "General medicine",
      "Surgery",
      "Orthopaedics",
      "Obstetrics and gynaecology",
      "Paediatrics",
      "Psychiatry",
      "Diagnostic services",
    ],
    servicesKn: [
      "ಸಾಮಾನ್ಯ ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ",
      "ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
      "ಅಸ್ಥಿರೋಗ ಚಿಕಿತ್ಸೆ",
      "ಪ್ರಸೂತಿ ಮತ್ತು ಸ್ತ್ರೀರೋಗ ಚಿಕಿತ್ಸೆ",
      "ಮಕ್ಕಳ ವೈದ್ಯಕೀಯ ಸೇವೆಗಳು",
      "ಮನೋವೈದ್ಯಕೀಯ ಸೇವೆಗಳು",
      "ರೋಗನಿರ್ಣಯ ಸೇವೆಗಳು",
    ],
    servicesHi: [
      "सामान्य चिकित्सा",
      "शल्य चिकित्सा",
      "हड्डी एवं जोड़ उपचार",
      "प्रसूति एवं स्त्रीरोग",
      "बाल चिकित्सा",
      "मनोचिकित्सा",
      "नैदानिक सेवाएँ",
    ],
    victimSupport: [
      "Injury treatment",
      "Emergency assessment",
      "Mental-health care",
      "Specialist referral",
    ],
    victimSupportKn: [
      "ಗಾಯಗಳ ಚಿಕಿತ್ಸೆ",
      "ತುರ್ತು ವೈದ್ಯಕೀಯ ಮೌಲ್ಯಮಾಪನ",
      "ಮಾನಸಿಕ ಆರೋಗ್ಯ ಆರೈಕೆ",
      "ತಜ್ಞ ವೈದ್ಯಕೀಯ ರೆಫರಲ್",
    ],
    victimSupportHi: [
      "चोटों का उपचार",
      "आपातकालीन चिकित्सा मूल्यांकन",
      "मानसिक स्वास्थ्य देखभाल",
      "विशेषज्ञ चिकित्सा रेफरल",
    ],
    officialSource: "Karnataka Health & Family Welfare Department",
    lastVerified: "5 October 2026",
  },

  {
    id: "wenlock",
    name: "Wenlock District Hospital",
    nameKn: "ವೆನ್‌ಲಾಕ್ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ",
    nameHi: "वेनलॉक जिला अस्पताल",
    district: "Dakshina Kannada",
    districtKn: "ದಕ್ಷಿಣ ಕನ್ನಡ",
    districtHi: "दक्षिण कन्नड़",
    type: "Government District Hospital",
    typeKn: "ಸರ್ಕಾರಿ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ",
    typeHi: "सरकारी जिला अस्पताल",
    address:
      "Hampankatta, Mangaluru, Karnataka 575001",
    addressKn:
      "ಹಂಪನಕಟ್ಟಾ, ಮಂಗಳೂರು, ಕರ್ನಾಟಕ 575001",
    addressHi:
      "हंपनकट्टा, मंगलुरु, कर्नाटक 575001",
    phone: "0824-2413208",
    services: [
      "General medical care",
      "Emergency care",
      "Surgery",
      "Specialist care",
      "Diagnostic services",
    ],
    servicesKn: [
      "ಸಾಮಾನ್ಯ ವೈದ್ಯಕೀಯ ಆರೈಕೆ",
      "ತುರ್ತು ಆರೈಕೆ",
      "ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
      "ತಜ್ಞ ವೈದ್ಯಕೀಯ ಆರೈಕೆ",
      "ರೋಗನಿರ್ಣಯ ಸೇವೆಗಳು",
    ],
    servicesHi: [
      "सामान्य चिकित्सा देखभाल",
      "आपातकालीन देखभाल",
      "शल्य चिकित्सा",
      "विशेषज्ञ चिकित्सा देखभाल",
      "नैदानिक सेवाएँ",
    ],
    victimSupport: [
      "Injury treatment",
      "Emergency assessment",
      "Specialist referral",
    ],
    victimSupportKn: [
      "ಗಾಯಗಳ ಚಿಕಿತ್ಸೆ",
      "ತುರ್ತು ವೈದ್ಯಕೀಯ ಮೌಲ್ಯಮಾಪನ",
      "ತಜ್ಞ ವೈದ್ಯಕೀಯ ರೆಫರಲ್",
    ],
    victimSupportHi: [
      "चोटों का उपचार",
      "आपातकालीन चिकित्सा मूल्यांकन",
      "विशेषज्ञ चिकित्सा रेफरल",
    ],
    officialSource: "Karnataka ORS / District information",
    lastVerified: "5 October 2026",
  },

  {
    id: "chigateri",
    name: "Chigateri District Hospital",
    nameKn: "ಚಿಗಟೇರಿ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ",
    nameHi: "चिगटेरी जिला अस्पताल",
    district: "Davanagere",
    districtKn: "ದಾವಣಗೆರೆ",
    districtHi: "दावणगेरे",
    type: "Government District Hospital",
    typeKn: "ಸರ್ಕಾರಿ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ",
    typeHi: "सरकारी जिला अस्पताल",
    address: "Davanagere, Karnataka",
    addressKn: "ದಾವಣಗೆರೆ, ಕರ್ನಾಟಕ",
    addressHi: "दावणगेरे, कर्नाटक",
    phone: "08192-259050",
    services: [
      "General medical care",
      "Surgery",
      "Emergency care",
      "Specialist services",
    ],
    servicesKn: [
      "ಸಾಮಾನ್ಯ ವೈದ್ಯಕೀಯ ಆರೈಕೆ",
      "ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
      "ತುರ್ತು ಆರೈಕೆ",
      "ತಜ್ಞ ವೈದ್ಯಕೀಯ ಸೇವೆಗಳು",
    ],
    servicesHi: [
      "सामान्य चिकित्सा देखभाल",
      "शल्य चिकित्सा",
      "आपातकालीन देखभाल",
      "विशेषज्ञ चिकित्सा सेवाएँ",
    ],
    victimSupport: [
      "Injury treatment",
      "Emergency assessment",
      "Specialist referral",
    ],
    victimSupportKn: [
      "ಗಾಯಗಳ ಚಿಕಿತ್ಸೆ",
      "ತುರ್ತು ವೈದ್ಯಕೀಯ ಮೌಲ್ಯಮಾಪನ",
      "ತಜ್ಞ ವೈದ್ಯಕೀಯ ರೆಫರಲ್",
    ],
    victimSupportHi: [
      "चोटों का उपचार",
      "आपातकालीन चिकित्सा मूल्यांकन",
      "विशेषज्ञ चिकित्सा रेफरल",
    ],
    officialSource: "Karnataka ORS / District information",
    lastVerified: "5 October 2026",
  },

  {
    id: "chitradurga",
    name: "District Hospital, Chitradurga",
    nameKn: "ಚಿತ್ರದುರ್ಗ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ",
    nameHi: "चित्रदुर्ग जिला अस्पताल",
    district: "Chitradurga",
    districtKn: "ಚಿತ್ರದುರ್ಗ",
    districtHi: "चित्रदुर्ग",
    type: "Government District Hospital",
    typeKn: "ಸರ್ಕಾರಿ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ",
    typeHi: "सरकारी जिला अस्पताल",
    address: "Chitradurga, Karnataka",
    addressKn: "ಚಿತ್ರದುರ್ಗ, ಕರ್ನಾಟಕ",
    addressHi: "चित्रदुर्ग, कर्नाटक",
    phone: "08194-234710",
    services: [
      "General medical care",
      "Surgery",
      "Emergency care",
      "Diagnostic services",
    ],
    servicesKn: [
      "ಸಾಮಾನ್ಯ ವೈದ್ಯಕೀಯ ಆರೈಕೆ",
      "ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
      "ತುರ್ತು ಆರೈಕೆ",
      "ರೋಗನಿರ್ಣಯ ಸೇವೆಗಳು",
    ],
    servicesHi: [
      "सामान्य चिकित्सा देखभाल",
      "शल्य चिकित्सा",
      "आपातकालीन देखभाल",
      "नैदानिक सेवाएँ",
    ],
    victimSupport: [
      "Injury treatment",
      "Emergency assessment",
      "Specialist referral",
    ],
    victimSupportKn: [
      "ಗಾಯಗಳ ಚಿಕಿತ್ಸೆ",
      "ತುರ್ತು ವೈದ್ಯಕೀಯ ಮೌಲ್ಯಮಾಪನ",
      "ತಜ್ಞ ವೈದ್ಯಕೀಯ ರೆಫರಲ್",
    ],
    victimSupportHi: [
      "चोटों का उपचार",
      "आपातकालीन चिकित्सा मूल्यांकन",
      "विशेषज्ञ चिकित्सा रेफरल",
    ],
    officialSource: "Karnataka ORS / Chitradurga District Government",
    lastVerified: "5 October 2026",
  },

  {
    id: "hassan",
    name: "District Hospital, Hassan",
    nameKn: "ಹಾಸನ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ",
    nameHi: "हासन जिला अस्पताल",
    district: "Hassan",
    districtKn: "ಹಾಸನ",
    districtHi: "हासन",
    type: "Government District Hospital",
    typeKn: "ಸರ್ಕಾರಿ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ",
    typeHi: "सरकारी जिला अस्पताल",
    address: "Hassan, Karnataka 573201",
    addressKn: "ಹಾಸನ, ಕರ್ನಾಟಕ 573201",
    addressHi: "हासन, कर्नाटक 573201",
    phone: "08172-250330",
    services: [
      "General medical care",
      "Surgery",
      "Emergency care",
      "Obstetrics and gynaecology",
      "Psychiatric care",
    ],
    servicesKn: [
      "ಸಾಮಾನ್ಯ ವೈದ್ಯಕೀಯ ಆರೈಕೆ",
      "ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
      "ತುರ್ತು ಆರೈಕೆ",
      "ಪ್ರಸೂತಿ ಮತ್ತು ಸ್ತ್ರೀರೋಗ ಚಿಕಿತ್ಸೆ",
      "ಮನೋವೈದ್ಯಕೀಯ ಆರೈಕೆ",
    ],
    servicesHi: [
      "सामान्य चिकित्सा देखभाल",
      "शल्य चिकित्सा",
      "आपातकालीन देखभाल",
      "प्रसूति एवं स्त्रीरोग सेवाएँ",
      "मनोचिकित्सकीय देखभाल",
    ],
    victimSupport: [
      "Injury treatment",
      "Emergency assessment",
      "Mental-health care",
      "Specialist referral",
    ],
    victimSupportKn: [
      "ಗಾಯಗಳ ಚಿಕಿತ್ಸೆ",
      "ತುರ್ತು ವೈದ್ಯಕೀಯ ಮೌಲ್ಯಮಾಪನ",
      "ಮಾನಸಿಕ ಆರೋಗ್ಯ ಆರೈಕೆ",
      "ತಜ್ಞ ವೈದ್ಯಕೀಯ ರೆಫರಲ್",
    ],
    victimSupportHi: [
      "चोटों का उपचार",
      "आपातकालीन चिकित्सा मूल्यांकन",
      "मानसिक स्वास्थ्य देखभाल",
      "विशेषज्ञ चिकित्सा रेफरल",
    ],
    officialSource: "Karnataka Health & Family Welfare Department",
    lastVerified: "5 October 2026",
  },

  {
    id: "shivamogga",
    name: "McGann District Hospital, SIMS",
    nameKn: "ಮ್ಯಾಕ್‌ಗ್ಯಾನ್ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ, SIMS",
    nameHi: "मैकगैन जिला अस्पताल, SIMS",
    district: "Shivamogga",
    districtKn: "ಶಿವಮೊಗ್ಗ",
    districtHi: "शिवमोग्गा",
    type: "Government District Hospital",
    typeKn: "ಸರ್ಕಾರಿ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ",
    typeHi: "सरकारी जिला अस्पताल",
    address:
      "NH 206, Sagar Road, opposite SP Office, Shivamogga, Karnataka",
    addressKn:
      "NH 206, ಸಾಗರ ರಸ್ತೆ, ಎಸ್‌ಪಿ ಕಚೇರಿ ಎದುರು, ಶಿವಮೊಗ್ಗ, ಕರ್ನಾಟಕ",
    addressHi:
      "NH 206, सागर रोड, एसपी कार्यालय के सामने, शिवमोग्गा, कर्नाटक",
    phone: "08182-271566",
    services: [
      "General medical care",
      "Emergency care",
      "Surgery",
      "Specialist services",
      "Diagnostic services",
    ],
    servicesKn: [
      "ಸಾಮಾನ್ಯ ವೈದ್ಯಕೀಯ ಆರೈಕೆ",
      "ತುರ್ತು ಆರೈಕೆ",
      "ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
      "ತಜ್ಞ ವೈದ್ಯಕೀಯ ಸೇವೆಗಳು",
      "ರೋಗನಿರ್ಣಯ ಸೇವೆಗಳು",
    ],
    servicesHi: [
      "सामान्य चिकित्सा देखभाल",
      "आपातकालीन देखभाल",
      "शल्य चिकित्सा",
      "विशेषज्ञ चिकित्सा सेवाएँ",
      "नैदानिक सेवाएँ",
    ],
    victimSupport: [
      "Injury treatment",
      "Emergency assessment",
      "Specialist referral",
    ],
    victimSupportKn: [
      "ಗಾಯಗಳ ಚಿಕಿತ್ಸೆ",
      "ತುರ್ತು ವೈದ್ಯಕೀಯ ಮೌಲ್ಯಮಾಪನ",
      "ತಜ್ಞ ವೈದ್ಯಕೀಯ ರೆಫರಲ್",
    ],
    victimSupportHi: [
      "चोटों का उपचार",
      "आपातकालीन चिकित्सा मूल्यांकन",
      "विशेषज्ञ चिकित्सा रेफरल",
    ],
    officialSource: "Shivamogga District Government",
    lastVerified: "5 October 2026",
  },

  {
    id: "tumakuru",
    name: "District Hospital, Tumakuru",
    nameKn: "ತುಮಕೂರು ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ",
    nameHi: "तुमकुरु जिला अस्पताल",
    district: "Tumakuru",
    districtKn: "ತುಮಕೂರು",
    districtHi: "तुमकुरु",
    type: "Government District Hospital",
    typeKn: "ಸರ್ಕಾರಿ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ",
    typeHi: "सरकारी जिला अस्पताल",
    address:
      "Ward No. 18, Tumakuru, Karnataka 572101",
    addressKn:
      "ವಾರ್ಡ್ ಸಂಖ್ಯೆ 18, ತುಮಕೂರು, ಕರ್ನಾಟಕ 572101",
    addressHi:
      "वार्ड नंबर 18, तुमकुरु, कर्नाटक 572101",
    phone: "0816-2251250",
    services: [
      "General medical care",
      "Emergency care",
      "Surgery",
      "Specialist services",
    ],
    servicesKn: [
      "ಸಾಮಾನ್ಯ ವೈದ್ಯಕೀಯ ಆರೈಕೆ",
      "ತುರ್ತು ಆರೈಕೆ",
      "ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
      "ತಜ್ಞ ವೈದ್ಯಕೀಯ ಸೇವೆಗಳು",
    ],
    servicesHi: [
      "सामान्य चिकित्सा देखभाल",
      "आपातकालीन देखभाल",
      "शल्य चिकित्सा",
      "विशेषज्ञ चिकित्सा सेवाएँ",
    ],
    victimSupport: [
      "Injury treatment",
      "Emergency assessment",
      "Specialist referral",
    ],
    victimSupportKn: [
      "ಗಾಯಗಳ ಚಿಕಿತ್ಸೆ",
      "ತುರ್ತು ವೈದ್ಯಕೀಯ ಮೌಲ್ಯಮಾಪನ",
      "ತಜ್ಞ ವೈದ್ಯಕೀಯ ರೆಫರಲ್",
    ],
    victimSupportHi: [
      "चोटों का उपचार",
      "आपातकालीन चिकित्सा मूल्यांकन",
      "विशेषज्ञ चिकित्सा रेफरल",
    ],
    officialSource: "Tumakuru District Government",
    lastVerified: "5 October 2026",
  },

  {
    id: "kolar",
    name: "Sri Narasimha Raja District Hospital",
    nameKn: "ಶ್ರೀ ನರಸಿಂಹ ರಾಜ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ",
    nameHi: "श्री नरसिम्हा राजा जिला अस्पताल",
    district: "Kolar",
    districtKn: "ಕೋಲಾರ",
    districtHi: "कोलार",
    type: "Government District Hospital",
    typeKn: "ಸರ್ಕಾರಿ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ",
    typeHi: "सरकारी जिला अस्पताल",
    address: "Kolar, Karnataka 563101",
    addressKn: "ಕೋಲಾರ, ಕರ್ನಾಟಕ 563101",
    addressHi: "कोलार, कर्नाटक 563101",
    phone: "08152-222035",
    services: [
      "General medical care",
      "Emergency care",
      "Surgery",
      "Obstetrics and gynaecology",
      "Paediatrics",
      "Psychiatric care",
    ],
    servicesKn: [
      "ಸಾಮಾನ್ಯ ವೈದ್ಯಕೀಯ ಆರೈಕೆ",
      "ತುರ್ತು ಆರೈಕೆ",
      "ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
      "ಪ್ರಸೂತಿ ಮತ್ತು ಸ್ತ್ರೀರೋಗ ಚಿಕಿತ್ಸೆ",
      "ಮಕ್ಕಳ ವೈದ್ಯಕೀಯ ಸೇವೆಗಳು",
      "ಮನೋವೈದ್ಯಕೀಯ ಆರೈಕೆ",
    ],
    servicesHi: [
      "सामान्य चिकित्सा देखभाल",
      "आपातकालीन देखभाल",
      "शल्य चिकित्सा",
      "प्रसूति एवं स्त्रीरोग सेवाएँ",
      "बाल चिकित्सा सेवाएँ",
      "मनोचिकित्सकीय देखभाल",
    ],
    victimSupport: [
      "Injury treatment",
      "Emergency assessment",
      "Mental-health care",
      "Specialist referral",
    ],
    victimSupportKn: [
      "ಗಾಯಗಳ ಚಿಕಿತ್ಸೆ",
      "ತುರ್ತು ವೈದ್ಯಕೀಯ ಮೌಲ್ಯಮಾಪನ",
      "ಮಾನಸಿಕ ಆರೋಗ್ಯ ಆರೈಕೆ",
      "ತಜ್ಞ ವೈದ್ಯಕೀಯ ರೆಫರಲ್",
    ],
    victimSupportHi: [
      "चोटों का उपचार",
      "आपातकालीन चिकित्सा मूल्यांकन",
      "मानसिक स्वास्थ्य देखभाल",
      "विशेषज्ञ चिकित्सा रेफरल",
    ],
    officialSource: "Karnataka Health & Family Welfare Department",
    lastVerified: "5 October 2026",
  },

  {
    id: "mandya",
    name: "District Hospital (MIMS), Mandya",
    nameKn: "ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ (MIMS), ಮಂಡ್ಯ",
    nameHi: "जिला अस्पताल (MIMS), मांड्या",
    district: "Mandya",
    districtKn: "ಮಂಡ್ಯ",
    districtHi: "मांड्या",
    type: "Government District Hospital",
    typeKn: "ಸರ್ಕಾರಿ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ",
    typeHi: "सरकारी जिला अस्पताल",
    address: "Mandya, Karnataka 571401",
    addressKn: "ಮಂಡ್ಯ, ಕರ್ನಾಟಕ 571401",
    addressHi: "मांड्या, कर्नाटक 571401",
    phone: "08232-224040",
    services: [
      "General medical care",
      "Emergency care",
      "Surgery",
      "Obstetrics and gynaecology",
      "Specialist services",
    ],
    servicesKn: [
      "ಸಾಮಾನ್ಯ ವೈದ್ಯಕೀಯ ಆರೈಕೆ",
      "ತುರ್ತು ಆರೈಕೆ",
      "ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
      "ಪ್ರಸೂತಿ ಮತ್ತು ಸ್ತ್ರೀರೋಗ ಚಿಕಿತ್ಸೆ",
      "ತಜ್ಞ ವೈದ್ಯಕೀಯ ಸೇವೆಗಳು",
    ],
    servicesHi: [
      "सामान्य चिकित्सा देखभाल",
      "आपातकालीन देखभाल",
      "शल्य चिकित्सा",
      "प्रसूति एवं स्त्रीरोग सेवाएँ",
      "विशेषज्ञ चिकित्सा सेवाएँ",
    ],
    victimSupport: [
      "Injury treatment",
      "Emergency assessment",
      "Specialist referral",
    ],
    victimSupportKn: [
      "ಗಾಯಗಳ ಚಿಕಿತ್ಸೆ",
      "ತುರ್ತು ವೈದ್ಯಕೀಯ ಮೌಲ್ಯಮಾಪನ",
      "ತಜ್ಞ ವೈದ್ಯಕೀಯ ರೆಫರಲ್",
    ],
    victimSupportHi: [
      "चोटों का उपचार",
      "आपातकालीन चिकित्सा मूल्यांकन",
      "विशेषज्ञ चिकित्सा रेफरल",
    ],
    officialSource: "Karnataka Health & Family Welfare Department",
    lastVerified: "5 October 2026",
  },
];

const ui = {
  en: {
    title: "Medical Help",
    subtitle:
      "Find government and public hospitals that can provide medical care following injury, abuse or other emergencies.",
    search: "Search hospitals",
    searchPlaceholder: "Search by hospital, district or service...",
    district: "District",
    allDistricts: "All districts",
    type: "Hospital type",
    allTypes: "All types",
    results: "hospitals found",
    clear: "Clear filters",
    services: "Medical services",
    victimSupport: "Relevant for victims",
    contact: "Hospital contact",
    call: "Call Hospital",
    noPhone: "No publicly verified phone number",
    directions: "Get Directions",
    officialSource: "Official source",
    lastVerified: "Last verified",
    government: "Government",
    verified: "Government-verified",
    emergencyTitle: "If you need immediate emergency help",
    emergencyText:
      "For immediate danger or a life-threatening emergency in India, call 112.",
    emergencyButton: "Emergency Help",
    back: "Back to Support",
    note:
      "Hospital services and contact details can change. AVA displays information based on the cited sources and does not guarantee availability.",
  },

  kn: {
    title: "ವೈದ್ಯಕೀಯ ಸಹಾಯ",
    subtitle:
      "ಗಾಯ, ಹಿಂಸೆ ಅಥವಾ ಇತರ ತುರ್ತು ಪರಿಸ್ಥಿತಿಗಳ ನಂತರ ವೈದ್ಯಕೀಯ ಆರೈಕೆ ನೀಡಬಹುದಾದ ಸರ್ಕಾರಿ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಆಸ್ಪತ್ರೆಗಳನ್ನು ಹುಡುಕಿ.",
    search: "ಆಸ್ಪತ್ರೆಗಳನ್ನು ಹುಡುಕಿ",
    searchPlaceholder: "ಆಸ್ಪತ್ರೆ, ಜಿಲ್ಲೆ ಅಥವಾ ಸೇವೆಯ ಮೂಲಕ ಹುಡುಕಿ...",
    district: "ಜಿಲ್ಲೆ",
    allDistricts: "ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು",
    type: "ಆಸ್ಪತ್ರೆಯ ಪ್ರಕಾರ",
    allTypes: "ಎಲ್ಲಾ ಪ್ರಕಾರಗಳು",
    results: "ಆಸ್ಪತ್ರೆಗಳು ಕಂಡುಬಂದಿವೆ",
    clear: "ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ",
    services: "ವೈದ್ಯಕೀಯ ಸೇವೆಗಳು",
    victimSupport: "ಬಾಧಿತರಿಗೆ ಸಂಬಂಧಿಸಿದ ಸಹಾಯ",
    contact: "ಆಸ್ಪತ್ರೆಯ ಸಂಪರ್ಕ",
    call: "ಆಸ್ಪತ್ರೆಗೆ ಕರೆ ಮಾಡಿ",
    noPhone: "ಸಾರ್ವಜನಿಕವಾಗಿ ಪರಿಶೀಲಿಸಿದ ಫೋನ್ ಸಂಖ್ಯೆ ಲಭ್ಯವಿಲ್ಲ",
    directions: "ದಿಕ್ಕುಗಳನ್ನು ಪಡೆಯಿರಿ",
    officialSource: "ಅಧಿಕೃತ ಮೂಲ",
    lastVerified: "ಕೊನೆಯದಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
    government: "ಸರ್ಕಾರಿ",
    verified: "ಸರ್ಕಾರಿ ಮೂಲದಿಂದ ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
    emergencyTitle: "ತಕ್ಷಣದ ತುರ್ತು ಸಹಾಯ ಬೇಕಾದರೆ",
    emergencyText:
      "ಭಾರತದಲ್ಲಿ ತಕ್ಷಣದ ಅಪಾಯ ಅಥವಾ ಜೀವಕ್ಕೆ ಅಪಾಯವಿರುವ ತುರ್ತು ಪರಿಸ್ಥಿತಿಯಲ್ಲಿ 112ಕ್ಕೆ ಕರೆ ಮಾಡಿ.",
    emergencyButton: "ತುರ್ತು ಸಹಾಯ",
    back: "ಸಹಾಯಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    note:
      "ಆಸ್ಪತ್ರೆಯ ಸೇವೆಗಳು ಮತ್ತು ಸಂಪರ್ಕ ವಿವರಗಳು ಬದಲಾಗಬಹುದು. AVA ಉಲ್ಲೇಖಿಸಿದ ಮೂಲಗಳ ಆಧಾರದ ಮೇಲೆ ಮಾಹಿತಿಯನ್ನು ಪ್ರದರ್ಶಿಸುತ್ತದೆ ಮತ್ತು ಸೇವೆ ಲಭ್ಯತೆಯನ್ನು ಖಾತರಿಪಡಿಸುವುದಿಲ್ಲ.",
  },

  hi: {
    title: "चिकित्सा सहायता",
    subtitle:
      "चोट, हिंसा या अन्य आपात स्थितियों के बाद चिकित्सा देखभाल प्रदान करने वाले सरकारी और सार्वजनिक अस्पताल खोजें।",
    search: "अस्पताल खोजें",
    searchPlaceholder: "अस्पताल, जिले या सेवा के अनुसार खोजें...",
    district: "जिला",
    allDistricts: "सभी जिले",
    type: "अस्पताल का प्रकार",
    allTypes: "सभी प्रकार",
    results: "अस्पताल मिले",
    clear: "फ़िल्टर साफ़ करें",
    services: "चिकित्सा सेवाएँ",
    victimSupport: "पीड़ितों के लिए प्रासंगिक सहायता",
    contact: "अस्पताल संपर्क",
    call: "अस्पताल को कॉल करें",
    noPhone: "सार्वजनिक रूप से सत्यापित फोन नंबर उपलब्ध नहीं है",
    directions: "दिशा-निर्देश प्राप्त करें",
    officialSource: "आधिकारिक स्रोत",
    lastVerified: "अंतिम सत्यापन",
    government: "सरकारी",
    verified: "सरकारी स्रोत से सत्यापित",
    emergencyTitle: "यदि आपको तत्काल आपातकालीन सहायता चाहिए",
    emergencyText:
      "भारत में तत्काल खतरे या जीवन-घातक आपात स्थिति में 112 पर कॉल करें।",
    emergencyButton: "आपातकालीन सहायता",
    back: "सहायता पर वापस जाएँ",
    note:
      "अस्पताल की सेवाएँ और संपर्क विवरण बदल सकते हैं। AVA उद्धृत स्रोतों के आधार पर जानकारी दिखाता है और उपलब्धता की गारंटी नहीं देता।",
  },
};

function localizedHospitalName(hospital: Hospital, language: Language) {
  if (language === "kn") return hospital.nameKn;
  if (language === "hi") return hospital.nameHi;
  return hospital.name;
}

function localizedDistrict(hospital: Hospital, language: Language) {
  if (language === "kn") return hospital.districtKn;
  if (language === "hi") return hospital.districtHi;
  return hospital.district;
}

function localizedType(hospital: Hospital, language: Language) {
  if (language === "kn") return hospital.typeKn;
  if (language === "hi") return hospital.typeHi;
  return hospital.type;
}

function localizedAddress(hospital: Hospital, language: Language) {
  if (language === "kn") return hospital.addressKn;
  if (language === "hi") return hospital.addressHi;
  return hospital.address;
}

function localizedServices(hospital: Hospital, language: Language) {
  if (language === "kn") return hospital.servicesKn;
  if (language === "hi") return hospital.servicesHi;
  return hospital.services;
}

function localizedVictimSupport(hospital: Hospital, language: Language) {
  if (language === "kn") return hospital.victimSupportKn;
  if (language === "hi") return hospital.victimSupportHi;
  return hospital.victimSupport;
}

export default function MedicalSupportPage() {
  const { language } = useLanguage() as { language: Language };
  const t = ui[language];

  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("all");
  const [type, setType] = useState("all");

  const districts = useMemo(
    () => Array.from(new Set(hospitals.map((hospital) => hospital.district))),
    []
  );

  const types = useMemo(
    () => Array.from(new Set(hospitals.map((hospital) => hospital.type))),
    []
  );

  const filteredHospitals = useMemo(() => {
    const query = search.trim().toLowerCase();

    return hospitals.filter((hospital) => {
      const matchesDistrict =
        district === "all" || hospital.district === district;

      const matchesType = type === "all" || hospital.type === type;

      const searchable = [
        hospital.name,
        hospital.nameKn,
        hospital.nameHi,
        hospital.district,
        hospital.districtKn,
        hospital.districtHi,
        hospital.address,
        hospital.addressKn,
        hospital.addressHi,
        ...hospital.services,
        ...hospital.servicesKn,
        ...hospital.servicesHi,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchable.includes(query);

      return matchesDistrict && matchesType && matchesSearch;
    });
  }, [search, district, type]);

  return (
    <main className="min-h-screen bg-ava-cream text-ava-charcoal">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/support"
          className="mb-6 inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-medium text-ava-slate hover:bg-ava-mist focus:outline-none focus:ring-2 focus:ring-ava-rose"
        >
          ← {t.back}
        </Link>

        <header className="mb-8 max-w-3xl">
          <div className="mb-3 inline-flex items-center rounded-full bg-ava-mist px-3 py-1 text-sm font-semibold text-ava-slate">
            {t.government}
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t.title}
          </h1>

          <p className="mt-3 text-base leading-7 text-ava-slate">
            {t.subtitle}
          </p>
        </header>

        <section className="mb-8 rounded-2xl border border-ava-mist bg-white p-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label
                htmlFor="hospital-search"
                className="mb-2 block text-sm font-semibold"
              >
                {t.search}
              </label>

              <input
                id="hospital-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t.searchPlaceholder}
                className="min-h-11 w-full rounded-xl border border-ava-mist bg-ava-cream px-4 text-base outline-none focus:border-ava-rose focus:ring-2 focus:ring-ava-rose/30"
              />
            </div>

            <div>
              <label
                htmlFor="district-filter"
                className="mb-2 block text-sm font-semibold"
              >
                {t.district}
              </label>

              <select
                id="district-filter"
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
                className="min-h-11 w-full rounded-xl border border-ava-mist bg-ava-cream px-4 text-base outline-none focus:border-ava-rose focus:ring-2 focus:ring-ava-rose/30"
              >
                <option value="all">{t.allDistricts}</option>

                {districts.map((item) => {
                  const hospital = hospitals.find(
                    (entry) => entry.district === item
                  );

                  return (
                    <option key={item} value={item}>
                      {hospital ? localizedDistrict(hospital, language) : item}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label
                htmlFor="type-filter"
                className="mb-2 block text-sm font-semibold"
              >
                {t.type}
              </label>

              <select
                id="type-filter"
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="min-h-11 w-full rounded-xl border border-ava-mist bg-ava-cream px-4 text-base outline-none focus:border-ava-rose focus:ring-2 focus:ring-ava-rose/30"
              >
                <option value="all">{t.allTypes}</option>

                {types.map((item) => {
                  const hospital = hospitals.find(
                    (entry) => entry.type === item
                  );

                  return (
                    <option key={item} value={item}>
                      {hospital ? localizedType(hospital, language) : item}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-ava-slate" aria-live="polite">
              <strong className="text-ava-charcoal">
                {filteredHospitals.length}
              </strong>{" "}
              {t.results}
            </p>

            {(search || district !== "all" || type !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setDistrict("all");
                  setType("all");
                }}
                className="min-h-11 rounded-xl border border-ava-mist px-4 text-sm font-semibold text-ava-slate hover:bg-ava-mist focus:outline-none focus:ring-2 focus:ring-ava-rose"
              >
                {t.clear}
              </button>
            )}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          {filteredHospitals.map((hospital) => {
            const services = localizedServices(hospital, language);
            const victimSupport = localizedVictimSupport(
              hospital,
              language
            );

            return (
              <article
                key={hospital.id}
                className="rounded-2xl border border-ava-mist bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold">
                      {localizedHospitalName(hospital, language)}
                    </h2>

                    <p className="mt-1 text-sm font-medium text-ava-slate">
                      {localizedType(hospital, language)}
                    </p>
                  </div>

                  <span className="rounded-full bg-ava-mist px-3 py-1 text-xs font-bold text-ava-slate">
                    ✓ {t.verified}
                  </span>
                </div>

                <div className="mt-5 space-y-4 text-sm">
                  <div>
                    <p className="mb-1 font-semibold text-ava-charcoal">
                      📍 {localizedDistrict(hospital, language)}
                    </p>

                    <p className="leading-6 text-ava-slate">
                      {localizedAddress(hospital, language)}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 font-semibold">{t.services}</p>

                    <div className="flex flex-wrap gap-2">
                      {services.map((service) => (
                        <span
                          key={service}
                          className="rounded-lg bg-ava-mist/60 px-2.5 py-1.5 text-xs text-ava-slate"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl bg-ava-cream p-4">
                    <p className="mb-2 font-semibold">
                      {t.victimSupport}
                    </p>

                    <ul className="space-y-1.5 text-sm leading-6 text-ava-slate">
                      {victimSupport.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="mb-1 font-semibold">{t.contact}</p>

                    {hospital.phone ? (
                      <a
                        href={`tel:${hospital.phone.replace(/[^0-9+]/g, "")}`}
                        className="inline-flex min-h-11 items-center rounded-xl bg-ava-rose px-4 font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ava-rose"
                      >
                        ☎ {t.call}
                      </a>
                    ) : (
                      <p className="text-sm text-ava-slate">
                        {t.noPhone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3 border-t border-ava-mist pt-4">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${hospital.name}, ${hospital.address}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center rounded-xl border border-ava-slate px-4 text-sm font-semibold text-ava-slate hover:bg-ava-mist focus:outline-none focus:ring-2 focus:ring-ava-rose"
                  >
                    📍 {t.directions}
                  </a>
                </div>

                <div className="mt-4 text-xs leading-5 text-ava-slate">
                  <p>
                    <strong>{t.officialSource}:</strong>{" "}
                    {hospital.officialSource}
                  </p>

                  <p>
                    <strong>{t.lastVerified}:</strong>{" "}
                    {hospital.lastVerified}
                  </p>
                </div>
              </article>
            );
          })}
        </section>

        {filteredHospitals.length === 0 && (
          <div className="rounded-2xl border border-ava-mist bg-white p-8 text-center">
            <p className="font-semibold">
              No hospitals match your search.
            </p>
          </div>
        )}

        <section className="mt-8 rounded-2xl border border-ava-rose/30 bg-ava-rose/10 p-5">
          <h2 className="text-lg font-bold">{t.emergencyTitle}</h2>

          <p className="mt-2 text-sm leading-6 text-ava-slate">
            {t.emergencyText}
          </p>

          <Link
            href="/emergency"
            className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-ava-rose px-5 font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ava-rose"
          >
            {t.emergencyButton}
          </Link>
        </section>

        <p className="mt-6 text-center text-xs leading-5 text-ava-slate">
          {t.note}
        </p>
      </div>

      <QuickExit />
    </main>
  );
}