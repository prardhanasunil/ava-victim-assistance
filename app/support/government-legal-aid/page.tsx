"use client";

import Link from "next/link";
import { useState } from "react";
import QuickExit from "@/components/QuickExit";
import { useLanguage } from "@/components/LanguageProvider";

type DlsaRecord = {
  id: string;
  name: string;
  district: string;
  address: string;
  phones: string[];
  email: string;
  designation: string;
  services: string;
  officialSource: string;
  lastVerified: string;
};

const dlsaRecords: DlsaRecord[] = [
  {
    id: "dlsa-01",
    name: "District Legal Services Authority, Bengaluru Urban",
    district: "Bengaluru Urban",
    address: "Ground Floor, City Civil Court Complex, Bengaluru–560009",
    phones: ["080-22215143", "9141193926"],
    email: "dlsabangaloreurban2@gmail.com",
    designation: "DLSA; TLSCs at taluka level",
    services:
      "Free legal aid, legal-awareness programmes, Lok Adalat, mediation, legal-aid clinics, victim-related assistance, Legal Aid Defence Counsel services",
    officialSource: "https://bengaluru.dcourts.gov.in/dlsa/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-02",
    name: "District Legal Services Authority, Bengaluru Rural",
    district: "Bengaluru Rural",
    address:
      "City Civil Court Complex, 2nd Floor, Bengaluru; TLSCs operate in respective taluka court complexes",
    phones: ["080-22222919", "9141193927"],
    email: "dlsablrrural@gmail.com",
    designation:
      "DLSA; TLSCs: Devanahalli, Anekal, Nelamangala, Hosakote, Doddaballapura",
    services:
      "Free legal aid, legal-aid clinics, Lok Adalat, mediation, victim compensation, legal awareness, Legal Aid Defence Counsel",
    officialSource: "https://bengalururural.dcourts.gov.in/dlsa-tlsc/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-03",
    name: "District Legal Services Authority, Bagalkot",
    district: "Bagalkot",
    address: "District Court complex, Bagalkot",
    phones: ["08354-235876", "9141193928"],
    email: "dlsabagalkot@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource:
      "https://karnataka.nalsa.gov.in/district-legal-services-authority/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-04",
    name: "District Legal Services Authority, Ballari",
    district: "Ballari",
    address: "District Court complex, Ballari",
    phones: ["08392-278077", "9141193929"],
    email: "ballari.dlsa@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource:
      "https://karnataka.nalsa.gov.in/district-legal-services-authority/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-05",
    name: "District Legal Services Authority, Belagavi",
    district: "Belagavi",
    address: "District Court complex, Belagavi",
    phones: ["0831-2423216", "9141193930"],
    email: "dlsa.belgaum2@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource: "https://belagavi.dcourts.gov.in/dlsa-tlsa/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-06",
    name: "District Legal Services Authority, Bidar",
    district: "Bidar",
    address: "District Court complex, Bidar",
    phones: ["08482-226116", "9141193931"],
    email: "dlsabdr@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource:
      "https://karnataka.nalsa.gov.in/district-legal-services-authority/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-07",
    name: "District Legal Services Authority, Chamarajanagar",
    district: "Chamarajanagar",
    address: "District Court Complex, Chamarajanagar",
    phones: ["08226-226022", "9141193932"],
    email: "dlsachnagar2021@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, Legal Aid Defence Counsel, Lok Adalat, mediation, legal awareness",
    officialSource:
      "https://chamarajanagara.dcourts.gov.in/dlsa-chamarajanagara/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-08",
    name: "District Legal Services Authority, Chikkaballapur",
    district: "Chikkaballapur",
    address: "District Court complex, Chikkaballapur",
    phones: ["08156-275080", "9141193933"],
    email: "cbp.dlsa@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource: "https://chikkaballapur.dcourts.gov.in/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-09",
    name: "District Legal Services Authority, Chikkamagaluru",
    district: "Chikkamagaluru",
    address: "District Court complex, Chikkamagaluru",
    phones: ["08262-295321", "9141193934"],
    email: "dlsa.chikkamagaluru@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource:
      "https://karnataka.nalsa.gov.in/district-legal-services-authority/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-10",
    name: "District Legal Services Authority, Chitradurga",
    district: "Chitradurga",
    address: "District Court complex, Chitradurga",
    phones: ["08194-222322", "9141193935"],
    email: "dlsachitradurga3@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, Lok Adalat, mediation, legal awareness, legal-aid services",
    officialSource: "https://chitradurga.dcourts.gov.in/dlsa-tlsa/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-11",
    name: "District Legal Services Authority, Dakshina Kannada",
    district: "Dakshina Kannada",
    address: "District & Sessions Court complex, Mangaluru",
    phones: ["0824-2448111", "9141193936"],
    email: "dlsa.mangaluru@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource: "https://dk.dcourts.gov.in/dlsa-tlsc/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-12",
    name: "District Legal Services Authority, Davanagere",
    district: "Davanagere",
    address: "District Court complex, Davanagere",
    phones: ["08192-296364", "9141193937"],
    email: "dlsadavangere4@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource:
      "https://karnataka.nalsa.gov.in/district-legal-services-authority/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-13",
    name: "District Legal Services Authority, Dharwad",
    district: "Dharwad",
    address: "District Court complex, Dharwad",
    phones: ["0836-2740128", "9141193938"],
    email: "dlsa.dwd2@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource:
      "https://karnataka.nalsa.gov.in/district-legal-services-authority/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-14",
    name: "District Legal Services Authority, Gadag",
    district: "Gadag",
    address: "District Court complex, Gadag",
    phones: ["08372-232534", "9141193940"],
    email: "dlsa.gadag1@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, Legal Aid Defence Counsel, Lok Adalat, mediation, legal awareness",
    officialSource:
      "https://karnataka.nalsa.gov.in/district-legal-services-authority/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-15",
    name: "District Legal Services Authority, Hassan",
    district: "Hassan",
    address: "District Court complex, Hassan",
    phones: ["08172-268356", "9141193942"],
    email: "dlsa.hassan@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource:
      "https://karnataka.nalsa.gov.in/district-legal-services-authority/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-16",
    name: "District Legal Services Authority, Haveri",
    district: "Haveri",
    address: "District Court complex, Haveri",
    phones: ["08375-233939", "9141193943"],
    email: "dlsahaveri2@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource:
      "https://karnataka.nalsa.gov.in/district-legal-services-authority/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-17",
    name: "District Legal Services Authority, Kalaburagi",
    district: "Kalaburagi",
    address: "District Court complex, Kalaburagi",
    phones: ["08472-253370", "9141193944"],
    email: "dlsakalaburagi@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource:
      "https://karnataka.nalsa.gov.in/district-legal-services-authority/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-18",
    name: "District Legal Services Authority, Kodagu",
    district: "Kodagu",
    address: "District Court complex, Madikeri",
    phones: ["08272-222373", "9141193945"],
    email: "dlsamadikeri@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource:
      "https://karnataka.nalsa.gov.in/district-legal-services-authority/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-19",
    name: "District Legal Services Authority, Kolar",
    district: "Kolar",
    address: "District Sessions Court complex, Kolar",
    phones: ["08152-228811", "9141193948"],
    email: "dlsa.kolar3@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource:
      "https://karnataka.nalsa.gov.in/district-legal-services-authority/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-20",
    name: "District Legal Services Authority, Koppal",
    district: "Koppal",
    address: "District Court complex, Koppal",
    phones: ["08539-220233", "9141193951"],
    email: "koppaldlsa@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource:
      "https://karnataka.nalsa.gov.in/district-legal-services-authority/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-21",
    name: "District Legal Services Authority, Mandya",
    district: "Mandya",
    address: "District Court complex, Mandya",
    phones: ["08232-229345", "9141193952"],
    email: "dlsa.mandya@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource: "https://mandya.dcourts.gov.in/Judges/dlsa-tlsc/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-22",
    name: "District Legal Services Authority, Mysuru",
    district: "Mysuru",
    address: "District Court complex, Mysuru",
    phones: ["0821-2330040", "0821-2330130", "9141193953"],
    email: "mysurudlsa@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource:
      "https://karnataka.nalsa.gov.in/district-legal-services-authority/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-23",
    name: "District Legal Services Authority, Raichur",
    district: "Raichur",
    address: "District Court complex, Raichur",
    phones: ["08532-228476", "9141193954"],
    email: "rcrdlsa@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource:
      "https://karnataka.nalsa.gov.in/district-legal-services-authority/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-24",
    name: "District Legal Services Authority, Ramanagara",
    district: "Ramanagara",
    address: "District Court complex, Ramanagara",
    phones: ["080-27273445", "9141193957"],
    email: "msdlsaramanagara03@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource:
      "https://karnataka.nalsa.gov.in/district-legal-services-authority/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-25",
    name: "District Legal Services Authority, Shivamogga",
    district: "Shivamogga",
    address: "District Court complex, Shivamogga",
    phones: ["08182-222218", "9141193958"],
    email: "dlsashivamogga@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource:
      "https://karnataka.nalsa.gov.in/district-legal-services-authority/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-26",
    name: "District Legal Services Authority, Tumakuru",
    district: "Tumakuru",
    address: "District Court complex, Tumakuru",
    phones: ["0816-2255133", "9141193959"],
    email: "dlsatumkur1@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource:
      "https://karnataka.nalsa.gov.in/district-legal-services-authority/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-27",
    name: "District Legal Services Authority, Udupi",
    district: "Udupi",
    address: "District Court complex, Udupi",
    phones: ["0820-2523355", "9141193960"],
    email: "dlsaudupi@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource:
      "https://karnataka.nalsa.gov.in/district-legal-services-authority/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-28",
    name: "District Legal Services Authority, Uttara Kannada",
    district: "Uttara Kannada",
    address: "District Court complex, Karwar",
    phones: ["08382-222990", "9141193961"],
    email: "dlsa.karwar2023@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource:
      "https://karnataka.nalsa.gov.in/district-legal-services-authority/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-29",
    name: "District Legal Services Authority, Vijayapura",
    district: "Vijayapura",
    address: "District Court complex, Vijayapura",
    phones: ["08352-276150", "9141193923"],
    email: "dlsavjp@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource:
      "https://karnataka.nalsa.gov.in/district-legal-services-authority/",
    lastVerified: "28 Sep 2026",
  },
  {
    id: "dlsa-30",
    name: "District Legal Services Authority, Yadgir",
    district: "Yadgir",
    address: "District Court complex, Yadgir",
    phones: ["08473-253243", "08473-252325", "9141193924"],
    email: "yadgirdlsa@gmail.com",
    designation: "DLSA; TLSCs under the DLSA",
    services:
      "Free legal aid, legal advice, Lok Adalat, mediation, legal awareness, victim compensation",
    officialSource:
      "https://karnataka.nalsa.gov.in/district-legal-services-authority/",
    lastVerified: "28 Sep 2026",
  },
];

const districtTranslations: Record<
  string,
  { kn: string; hi: string }
> = {
  "Bengaluru Urban": {
    kn: "ಬೆಂಗಳೂರು ನಗರ",
    hi: "बेंगलुरु शहरी",
  },
  "Bengaluru Rural": {
    kn: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ",
    hi: "बेंगलुरु ग्रामीण",
  },
  Bagalkot: {
    kn: "ಬಾಗಲಕೋಟೆ",
    hi: "बागलकोट",
  },
  Ballari: {
    kn: "ಬಳ್ಳಾರಿ",
    hi: "बल्लारी",
  },
  Belagavi: {
    kn: "ಬೆಳಗಾವಿ",
    hi: "बेलगावी",
  },
  Bidar: {
    kn: "ಬೀದರ್",
    hi: "बीदर",
  },
  Chamarajanagar: {
    kn: "ಚಾಮರಾಜನಗರ",
    hi: "चामराजनगर",
  },
  Chikkaballapur: {
    kn: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ",
    hi: "चिक्कबल्लापुर",
  },
  Chikkamagaluru: {
    kn: "ಚಿಕ್ಕಮಗಳೂರು",
    hi: "चिक्कमगलूरु",
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
    hi: "गदग",
  },
  Hassan: {
    kn: "ಹಾಸನ",
    hi: "हासन",
  },
  Haveri: {
    kn: "ಹಾವೇರಿ",
    hi: "हावेरी",
  },
  Kalaburagi: {
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
  Mysuru: {
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
  Shivamogga: {
    kn: "ಶಿವಮೊಗ್ಗ",
    hi: "शिवमोग्गा",
  },
  Tumakuru: {
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
  Vijayapura: {
    kn: "ವಿಜಯಪುರ",
    hi: "विजयपुर",
  },
  Yadgir: {
    kn: "ಯಾದಗಿರಿ",
    hi: "यादगीर",
  },
};

function getDistrictName(district: string, language: string) {
  if (language === "kn") {
    return districtTranslations[district]?.kn ?? district;
  }

  if (language === "hi") {
    return districtTranslations[district]?.hi ?? district;
  }

  return district;
}

function getDlsaName(district: string, language: string) {
  const localizedDistrict = getDistrictName(district, language);

  if (language === "kn") {
    return `ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ${localizedDistrict}`;
  }

  if (language === "hi") {
    return `जिला विधिक सेवा प्राधिकरण, ${localizedDistrict}`;
  }

  return `District Legal Services Authority, ${localizedDistrict}`;
}

function getAddress(address: string, district: string, language: string) {
  if (language === "en") {
    return address;
  }

  if (address.includes("City Civil Court Complex")) {
    if (language === "kn") {
      return "ನಗರ ಸಿವಿಲ್ ನ್ಯಾಯಾಲಯ ಸಂಕೀರ್ಣ, 2ನೇ ಮಹಡಿ, ಬೆಂಗಳೂರು; TLSCಗಳು ಸಂಬಂಧಿತ ತಾಲ್ಲೂಕು ನ್ಯಾಯಾಲಯ ಸಂಕೀರ್ಣಗಳಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತವೆ";
    }

    return "सिटी सिविल कोर्ट कॉम्प्लेक्स, दूसरी मंज़िल, बेंगलुरु; TLSC संबंधित तालुका न्यायालय परिसरों में कार्य करते हैं";
  }

  if (address.includes("District & Sessions Court")) {
    return language === "kn"
      ? "ಜಿಲ್ಲಾ ಮತ್ತು ಸೆಷನ್ಸ್ ನ್ಯಾಯಾಲಯ ಸಂಕೀರ್ಣ, ಮಂಗಳೂರು"
      : "जिला एवं सत्र न्यायालय परिसर, मंगलुरु";
  }

  if (address.includes("District Sessions Court")) {
    return language === "kn"
      ? `ಜಿಲ್ಲಾ ಸೆಷನ್ಸ್ ನ್ಯಾಯಾಲಯ ಸಂಕೀರ್ಣ, ${getDistrictName(district, language)}`
      : `जिला सत्र न्यायालय परिसर, ${getDistrictName(district, language)}`;
  }

  if (address.includes("Ground Floor")) {
    return language === "kn"
      ? "ಸಿಟಿ ಸಿವಿಲ್ ನ್ಯಾಯಾಲಯ ಸಂಕೀರ್ಣದ ನೆಲ ಮಹಡಿ, ಬೆಂಗಳೂರು–560009"
      : "सिटी सिविल कोर्ट कॉम्प्लेक्स, भूतल, बेंगलुरु–560009";
  }

  const localizedDistrict = getDistrictName(district, language);

  return language === "kn"
    ? `ಜಿಲ್ಲಾ ನ್ಯಾಯಾಲಯ ಸಂಕೀರ್ಣ, ${localizedDistrict}`
    : `जिला न्यायालय परिसर, ${localizedDistrict}`;
}

function getDesignation(designation: string, language: string) {
  if (language === "en") {
    return designation;
  }

  if (designation.includes("TLSCs:")) {
    if (language === "kn") {
      return "DLSA; TLSCಗಳು: ದೇವನಹಳ್ಳಿ, ಆನೇಕಲ್, ನೆಲಮಂಗಲ, ಹೊಸಕೋಟೆ, ದೊಡ್ಡಬಳ್ಳಾಪುರ";
    }

    return "DLSA; TLSC: देवनहल्ली, अनेकल, नेलमंगला, होसकोटे, डोड्डबल्लापुर";
  }

  if (language === "kn") {
    return "DLSA; DLSA ಅಡಿಯಲ್ಲಿ TLSCಗಳು";
  }

  return "DLSA; DLSA के अंतर्गत TLSC";
}

function getServices(services: string, language: string) {
  if (language === "en") {
    return services;
  }

  const isDefenceCounsel = services.includes("Legal Aid Defence Counsel");
  const hasVictimCompensation = services.includes("victim compensation");
  const hasVictimAssistance = services.includes("victim-related assistance");
  const hasLegalAdvice = services.includes("legal advice");
  const hasClinics = services.includes("legal-aid clinics");
  const hasAwareness = services.includes("legal awareness");
  const hasLokAdalat = services.includes("Lok Adalat");
  const hasMediation = services.includes("mediation");
  const hasFreeAid = services.includes("Free legal aid");

  if (language === "kn") {
    const parts = [];

    if (hasFreeAid) parts.push("ಉಚಿತ ಕಾನೂನು ಸಹಾಯ");
    if (hasLegalAdvice) parts.push("ಕಾನೂನು ಸಲಹೆ");
    if (services.includes("legal-awareness programmes")) {
      parts.push("ಕಾನೂನು ಜಾಗೃತಿ ಕಾರ್ಯಕ್ರಮಗಳು");
    }
    if (hasAwareness) parts.push("ಕಾನೂನು ಜಾಗೃತಿ");
    if (hasLokAdalat) parts.push("ಲೋಕ್ ಅದಾಲತ್");
    if (hasMediation) parts.push("ಮಧ್ಯಸ್ಥಿಕೆ");
    if (hasClinics) parts.push("ಕಾನೂನು ಸಹಾಯ ಚಿಕಿತ್ಸಾಲಯಗಳು");
    if (hasVictimAssistance) parts.push("ಬಲಿಪಶುಗಳಿಗೆ ಸಂಬಂಧಿಸಿದ ಸಹಾಯ");
    if (hasVictimCompensation) parts.push("ಬಲಿಪಶು ಪರಿಹಾರ");
    if (isDefenceCounsel) parts.push("ಕಾನೂನು ಸಹಾಯ ರಕ್ಷಣಾ ವಕೀಲರ ಸೇವೆಗಳು");
    if (services.includes("legal-aid services")) {
      parts.push("ಕಾನೂನು ಸಹಾಯ ಸೇವೆಗಳು");
    }

    return parts.join(", ");
  }

  const parts = [];

  if (hasFreeAid) parts.push("निःशुल्क कानूनी सहायता");
  if (hasLegalAdvice) parts.push("कानूनी सलाह");
  if (services.includes("legal-awareness programmes")) {
    parts.push("कानूनी जागरूकता कार्यक्रम");
  }
  if (hasAwareness) parts.push("कानूनी जागरूकता");
  if (hasLokAdalat) parts.push("लोक अदालत");
  if (hasMediation) parts.push("मध्यस्थता");
  if (hasClinics) parts.push("कानूनी सहायता क्लिनिक");
  if (hasVictimAssistance) parts.push("पीड़ितों से संबंधित सहायता");
  if (hasVictimCompensation) parts.push("पीड़ित मुआवजा");
  if (isDefenceCounsel) parts.push("कानूनी सहायता रक्षा वकील सेवाएँ");
  if (services.includes("legal-aid services")) {
    parts.push("कानूनी सहायता सेवाएँ");
  }

  return parts.join(", ");
}

function getUiText(language: string) {
  if (language === "kn") {
    return {
      verifiedDirectory: "ಪರಿಶೀಲಿಸಲಾದ DLSA ಡೈರೆಕ್ಟರಿ",
      directoryNote:
        "ಈ ಡೈರೆಕ್ಟರಿಯಲ್ಲಿ ಕರ್ನಾಟಕದ ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರಗಳ ಮಾಹಿತಿಯನ್ನು ನೀಡಲಾಗಿದೆ. ವಿವರಗಳು ದಾಖಲಿಸಲಾದ ಅಧಿಕೃತ ಮೂಲಗಳನ್ನು ಆಧರಿಸಿವೆ.",
      search: "ಹುಡುಕಿ",
      searchPlaceholder: "DLSA, ಜಿಲ್ಲೆ, ವಿಳಾಸ ಅಥವಾ ಸೇವೆಯ ಮೂಲಕ ಹುಡುಕಿ",
      district: "ಜಿಲ್ಲೆ",
      allDistricts: "ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು",
      directory: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರಗಳು",
      results: "ಫಲಿತಾಂಶಗಳು",
      verified: "ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
      officialSource: "ಅಧಿಕೃತ ಮೂಲ ↗",
      address: "ವಿಳಾಸ",
      designation: "ಹುದ್ದೆ / ರಚನೆ",
      services: "ಸೇವೆಗಳು",
      contact: "ಸಂಪರ್ಕ",
      lastVerified: "ಕೊನೆಯದಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
      status:
        "ಕೆಳಗಿನ DLSA ದಾಖಲೆಗಳನ್ನು AVA ಗಾಗಿ ದಾಖಲಿಸಲಾದ ಅಧಿಕೃತ ಮಾಹಿತಿಯಿಂದ ಪಡೆಯಲಾಗಿದೆ ಮತ್ತು 28 ಸೆಪ್ಟೆಂಬರ್ 2026 ರಂದು ಪರಿಶೀಲಿಸಲಾಗಿದೆ.",
    };
  }

  if (language === "hi") {
    return {
      verifiedDirectory: "सत्यापित DLSA निर्देशिका",
      directoryNote:
        "इस निर्देशिका में कर्नाटक के जिला विधिक सेवा प्राधिकरणों की जानकारी दी गई है। विवरण दर्ज किए गए आधिकारिक स्रोतों पर आधारित हैं।",
      search: "खोजें",
      searchPlaceholder: "DLSA, जिले, पते या सेवा के आधार पर खोजें",
      district: "जिला",
      allDistricts: "सभी जिले",
      directory: "जिला विधिक सेवा प्राधिकरण",
      results: "परिणाम",
      verified: "सत्यापित",
      officialSource: "आधिकारिक स्रोत ↗",
      address: "पता",
      designation: "पद / संरचना",
      services: "सेवाएँ",
      contact: "संपर्क",
      lastVerified: "अंतिम सत्यापन",
      status:
        "नीचे दिए गए DLSA रिकॉर्ड AVA के लिए दर्ज आधिकारिक जानकारी से लिए गए हैं और 28 सितंबर 2026 को सत्यापित किए गए हैं।",
    };
  }

  return {
    verifiedDirectory: "Verified DLSA Directory",
    directoryNote:
      "This directory contains District Legal Services Authority information for Karnataka. Details are based on the official sources recorded for each DLSA.",
    search: "Search",
    searchPlaceholder: "Search by DLSA, district, address or service",
    district: "District",
    allDistricts: "All districts",
    directory: "District Legal Services Authorities",
    results: "results",
    verified: "Verified",
    officialSource: "Official source ↗",
    address: "Address",
    designation: "Designation / structure",
    services: "Services",
    contact: "Contact",
    lastVerified: "Last verified",
    status:
      "The DLSA records below are sourced from the official information recorded for AVA and were verified on 28 Sep 2026.",
  };
}

export default function GovernmentLegalAidPage() {
  const { language, t } = useLanguage();
  const ui = getUiText(language);

  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("All districts");

  const districts = [
    "All districts",
    ...Array.from(new Set(dlsaRecords.map((x) => x.district))),
  ];

  const localizedRecords = dlsaRecords.map((record) => ({
    ...record,
    displayName: getDlsaName(record.district, language),
    displayDistrict: getDistrictName(record.district, language),
    displayAddress: getAddress(record.address, record.district, language),
    displayDesignation: getDesignation(record.designation, language),
    displayServices: getServices(record.services, language),
  }));

  const q = search.trim().toLowerCase();

  const filtered = localizedRecords.filter((x) => {
    const matchesDistrict =
      district === "All districts" || x.district === district;

    const searchableText = [
      x.displayName,
      x.displayDistrict,
      x.displayAddress,
      x.displayDesignation,
      x.displayServices,
      x.name,
      x.district,
      x.address,
      x.designation,
      x.services,
    ]
      .join(" ")
      .toLowerCase();

    return matchesDistrict && (!q || searchableText.includes(q));
  });

  return (
    <main className="min-h-screen bg-ava-cream text-ava-charcoal">
      <header className="border-b border-ava-mist bg-ava-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/support"
            className="text-sm font-medium text-ava-slate transition hover:text-ava-rose"
          >
            ← {t("backToSupport")}
          </Link>

          <div className="text-right">
            <p className="text-xl font-bold text-ava-slate">{t("appName")}</p>
            <p className="text-xs text-ava-dusty">{t("tagline")}</p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-ava-rose">
          {t("legalSupport")}
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {t("governmentLegalSupport")}
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-ava-slate">
          {t("governmentLegalSupportDescription")}
        </p>

        <div className="mt-8 rounded-2xl border border-ava-dusty/30 bg-ava-mist/50 p-5">
          <p className="font-semibold">✓ {ui.verifiedDirectory}</p>
          <p className="mt-2 text-sm leading-6 text-ava-slate">
            {ui.directoryNote}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-[1fr_280px]">
          <div>
            <label htmlFor="dlsa-search" className="text-sm font-semibold">
              {ui.search}
            </label>

            <input
              id="dlsa-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={ui.searchPlaceholder}
              className="mt-2 w-full rounded-xl border border-ava-mist bg-ava-white px-5 py-4 outline-none focus:border-ava-rose"
            />
          </div>

          <div>
            <label htmlFor="dlsa-district" className="text-sm font-semibold">
              {ui.district}
            </label>

            <select
              id="dlsa-district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="mt-2 w-full rounded-xl border border-ava-mist bg-ava-white px-4 py-3 outline-none focus:border-ava-rose"
            >
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d === "All districts"
                    ? ui.allDistricts
                    : getDistrictName(d, language)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">{ui.directory}</h2>

            <p className="mt-1 text-sm text-ava-dusty">
              {ui.lastVerified}: 28 Sep 2026
            </p>
          </div>

          <p className="text-sm text-ava-dusty">
            {filtered.length} {ui.results}
          </p>
        </div>

        <div className="mt-6 space-y-5">
          {filtered.map((x) => (
            <article
              key={x.id}
              className="rounded-2xl border border-ava-mist bg-ava-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-semibold">
                      {x.displayName}
                    </h3>

                    <span className="rounded-full bg-ava-rose/15 px-3 py-1 text-xs font-semibold text-ava-rose">
                      ✓ {ui.verified}
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-medium text-ava-slate">
                    📍 {x.displayDistrict}
                  </p>
                </div>

                <a
                  href={x.officialSource}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-ava-dusty px-4 py-3 text-sm font-semibold text-ava-slate hover:border-ava-rose hover:text-ava-rose"
                >
                  {ui.officialSource}
                </a>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-ava-cream p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ava-dusty">
                    {ui.address}
                  </p>

                  <p className="mt-1 text-sm leading-6">
                    {x.displayAddress}
                  </p>
                </div>

                <div className="rounded-xl bg-ava-cream p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ava-dusty">
                    {ui.designation}
                  </p>

                  <p className="mt-1 text-sm leading-6">
                    {x.displayDesignation}
                  </p>
                </div>

                <div className="rounded-xl bg-ava-cream p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ava-dusty">
                    {ui.services}
                  </p>

                  <p className="mt-1 text-sm leading-6">
                    {x.displayServices}
                  </p>
                </div>

                <div className="rounded-xl bg-ava-cream p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ava-dusty">
                    {ui.contact}
                  </p>

                  <div className="mt-2 space-y-2">
                    {x.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                        className="block text-sm font-semibold text-ava-slate hover:text-ava-rose"
                      >
                        📞 {phone}
                      </a>
                    ))}

                    <a
                      href={`mailto:${x.email}`}
                      className="block break-all text-sm text-ava-slate hover:text-ava-rose"
                    >
                      ✉️ {x.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-ava-mist pt-4 text-xs text-ava-dusty">
                ✓ {ui.lastVerified}: {x.lastVerified}
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="bg-ava-slate">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-ava-mist">
          <p className="font-semibold text-ava-white">
            {t("appName")} — {t("tagline")}
          </p>

          <p className="mt-2">{t("footerDescription")}</p>
        </div>
      </footer>

      <QuickExit />
    </main>
  );
}