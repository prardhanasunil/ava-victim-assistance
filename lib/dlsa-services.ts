import type { Coordinates } from "./distance";

export type DlsaService = { 
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

const source =
  "https://karnataka.nalsa.gov.in/district-legal-services-authority/";

export const dlsaServices: DlsaService[] = [
  {
    id: "bengaluru-urban",
    name: "District Legal Services Authority, Bengaluru Urban",
    district: "Bengaluru Urban",
    localizedName: {
      en: "District Legal Services Authority, Bengaluru Urban",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಬೆಂಗಳೂರು ನಗರ",
      hi: "जिला विधिक सेवा प्राधिकरण, बेंगलुरु शहरी",
    },
    address: "City Civil Court Complex, Bengaluru Urban District",
    phones: ["080-22215143", "9141193926"],
    officialSource: source,
  },

  {
    id: "bengaluru-rural",
    name: "District Legal Services Authority, Bengaluru Rural",
    district: "Bengaluru Rural",
    localizedName: {
      en: "District Legal Services Authority, Bengaluru Rural",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ",
      hi: "जिला विधिक सेवा प्राधिकरण, बेंगलुरु ग्रामीण",
    },
    address: "City Civil Court Complex, Bengaluru Rural District",
    phones: ["080-22222919", "9141193927"],
    officialSource: source,
  },

  {
    id: "bagalkot",
    name: "District Legal Services Authority, Bagalkot",
    district: "Bagalkot",
    localizedName: {
      en: "District Legal Services Authority, Bagalkot",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಬಾಗಲಕೋಟೆ",
      hi: "जिला विधिक सेवा प्राधिकरण, बागलकोट",
    },
    address: "District Court Complex, Navanagar, Bagalkot",
    phones: ["08354-235876", "9141193928"],
    officialSource: source,
  },

  {
    id: "ballari",
    name: "District Legal Services Authority, Ballari",
    district: "Ballari",
    localizedName: {
      en: "District Legal Services Authority, Ballari",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಬಳ್ಳಾರಿ",
      hi: "जिला विधिक सेवा प्राधिकरण, बल्लारी",
    },
    address: "District Court Complex, Court Road, Ballari District",
    phones: ["08392-278077", "9141193929"],
    officialSource: source,
  },

  {
    id: "belagavi",
    name: "District Legal Services Authority, Belagavi",
    district: "Belagavi",
    localizedName: {
      en: "District Legal Services Authority, Belagavi",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಬೆಳಗಾವಿ",
      hi: "जिला विधिक सेवा प्राधिकरण, बेलगावी",
    },
    address: "District Court Complex, Belagavi District",
    phones: ["0831-2423216", "9141193930"],
    officialSource: source,
  },

  {
    id: "bidar",
    name: "District Legal Services Authority, Bidar",
    district: "Bidar",
    localizedName: {
      en: "District Legal Services Authority, Bidar",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಬೀದರ್",
      hi: "जिला विधिक सेवा प्राधिकरण, बीदर",
    },
    address: "District Court Complex, Bidar District",
    phones: ["08482-226116", "9141193931"],
    officialSource: source,
  },

  {
    id: "chamarajanagar",
    name: "District Legal Services Authority, Chamarajanagar",
    district: "Chamarajanagar",
    localizedName: {
      en: "District Legal Services Authority, Chamarajanagar",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಚಾಮರಾಜನಗರ",
      hi: "जिला विधिक सेवा प्राधिकरण, चामराजनगर",
    },
    address: "District Court Complex, Chamarajanagar District",
    phones: ["08226-226022", "9141193932"],
    officialSource: source,
  },

  {
    id: "chikkaballapur",
    name: "District Legal Services Authority, Chikkaballapur",
    district: "Chikkaballapur",
    localizedName: {
      en: "District Legal Services Authority, Chikkaballapur",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಚಿಕ್ಕಬಳ್ಳಾಪುರ",
      hi: "जिला विधिक सेवा प्राधिकरण, चिक्कबल्लापुर",
    },
    address: "District Court Complex, Chikkaballapur District",
    phones: ["08156-275080", "9141193933"],
    officialSource: source,
  },

  {
    id: "chikkamagaluru",
    name: "District Legal Services Authority, Chikkamagaluru",
    district: "Chikkamagaluru",
    localizedName: {
      en: "District Legal Services Authority, Chikkamagaluru",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಚಿಕ್ಕಮಗಳೂರು",
      hi: "जिला विधिक सेवा प्राधिकरण, चिक्कमगलुरु",
    },
    address: "District Court Complex, Chikkamagaluru District",
    phones: ["08262-295321", "9141193934"],
    officialSource: source,
  },

  {
    id: "chitradurga",
    name: "District Legal Services Authority, Chitradurga",
    district: "Chitradurga",
    localizedName: {
      en: "District Legal Services Authority, Chitradurga",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಚಿತ್ರದುರ್ಗ",
      hi: "जिला विधिक सेवा प्राधिकरण, चित्रदुर्ग",
    },
    address: "District Court Complex, Chitradurga District",
    phones: ["08194-222322", "9141193935"],
    officialSource: source,
  },

  {
    id: "dakshina-kannada",
    name: "District Legal Services Authority, Dakshina Kannada",
    district: "Dakshina Kannada",
    localizedName: {
      en: "District Legal Services Authority, Dakshina Kannada",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ದಕ್ಷಿಣ ಕನ್ನಡ",
      hi: "जिला विधिक सेवा प्राधिकरण, दक्षिण कन्नड़",
    },
    address: "District Court Complex, Mangaluru (D.K.) District",
    phones: ["0824-2448111", "9141193936"],
    officialSource: source,
  },

  {
    id: "davanagere",
    name: "District Legal Services Authority, Davanagere",
    district: "Davanagere",
    localizedName: {
      en: "District Legal Services Authority, Davanagere",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ದಾವಣಗೆರೆ",
      hi: "जिला विधिक सेवा प्राधिकरण, दावणगेरे",
    },
    address: "District Court Complex, Davanagere District",
    phones: ["08192-296364", "9141193937"],
    officialSource: source,
  },

  {
    id: "dharwad",
    name: "District Legal Services Authority, Dharwad",
    district: "Dharwad",
    localizedName: {
      en: "District Legal Services Authority, Dharwad",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಧಾರವಾಡ",
      hi: "जिला विधिक सेवा प्राधिकरण, धारवाड़",
    },
    address: "ADR Building, Civil Court Premises, P.B. Road, Dharwad",
    phones: ["0836-2740128", "9141193938"],
    officialSource: source,
  },

  {
    id: "gadag",
    name: "District Legal Services Authority, Gadag",
    district: "Gadag",
    localizedName: {
      en: "District Legal Services Authority, Gadag",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಗದಗ",
      hi: "जिला विधिक सेवा प्राधिकरण, गदग",
    },
    address: "District Court Complex, Gadag District",
    phones: ["08372-232534", "9141193940"],
    officialSource: source,
  },

  {
    id: "hassan",
    name: "District Legal Services Authority, Hassan",
    district: "Hassan",
    localizedName: {
      en: "District Legal Services Authority, Hassan",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಹಾಸನ",
      hi: "जिला विधिक सेवा प्राधिकरण, हासन",
    },
    address: "District Court Complex, Hassan District",
    phones: ["08172-268356", "9141193942"],
    officialSource: source,
  },

  {
    id: "haveri",
    name: "District Legal Services Authority, Haveri",
    district: "Haveri",
    localizedName: {
      en: "District Legal Services Authority, Haveri",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಹಾವೇರಿ",
      hi: "जिला विधिक सेवा प्राधिकरण, हावेरी",
    },
    address: "District Court Complex, Haveri District",
    phones: ["08375-233939", "9141193943"],
    officialSource: source,
  },

  {
    id: "kalaburagi",
    name: "District Legal Services Authority, Kalaburagi",
    district: "Kalaburagi",
    localizedName: {
      en: "District Legal Services Authority, Kalaburagi",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಕಲಬುರಗಿ",
      hi: "जिला विधिक सेवा प्राधिकरण, कलबुरगी",
    },
    address: "District Court Complex, Kalaburagi District",
    phones: ["08472-253370", "9141193944"],
    officialSource: source,
  },

  {
    id: "kodagu",
    name: "District Legal Services Authority, Kodagu",
    district: "Kodagu",
    localizedName: {
      en: "District Legal Services Authority, Kodagu",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಕೊಡಗು",
      hi: "जिला विधिक सेवा प्राधिकरण, कोडगु",
    },
    address: "District Court Complex, Kodagu District",
    phones: ["08272-222373", "9141193945"],
    officialSource: source,
  },

  {
    id: "kolar",
    name: "District Legal Services Authority, Kolar",
    district: "Kolar",
    localizedName: {
      en: "District Legal Services Authority, Kolar",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಕೋಲಾರ",
      hi: "जिला विधिक सेवा प्राधिकरण, कोलार",
    },
    address: "District Court Complex, Kolar District",
    phones: ["08152-228811", "9141193948"],
    officialSource: source,
  },

  {
    id: "koppal",
    name: "District Legal Services Authority, Koppal",
    district: "Koppal",
    localizedName: {
      en: "District Legal Services Authority, Koppal",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಕೊಪ್ಪಳ",
      hi: "जिला विधिक सेवा प्राधिकरण, कोप्पल",
    },
    address: "District Court Complex, Koppal District",
    phones: ["08539-220233", "9141193951"],
    officialSource: source,
  },

  {
    id: "mandya",
    name: "District Legal Services Authority, Mandya",
    district: "Mandya",
    localizedName: {
      en: "District Legal Services Authority, Mandya",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಮಂಡ್ಯ",
      hi: "जिला विधिक सेवा प्राधिकरण, मांड्या",
    },
    address: "District Court Complex, Mandya District",
    phones: ["08232-229345", "9141193952"],
    officialSource: source,
  },

  {
    id: "mysuru",
    name: "District Legal Services Authority, Mysuru",
    district: "Mysuru",
    localizedName: {
      en: "District Legal Services Authority, Mysuru",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಮೈಸೂರು",
      hi: "जिला विधिक सेवा प्राधिकरण, मैसूरु",
    },
    address: "ADR Building, 5th Cross, Jayanagar, Mysuru-14",
    phones: ["0821-2330040", "0821-2330130", "9141193953"],
    officialSource: source,
  },

  {
    id: "raichur",
    name: "District Legal Services Authority, Raichur",
    district: "Raichur",
    localizedName: {
      en: "District Legal Services Authority, Raichur",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ರಾಯಚೂರು",
      hi: "जिला विधिक सेवा प्राधिकरण, रायचूर",
    },
    address: "District Court Complex, Raichur District",
    phones: ["08532-228476", "9141193954"],
    officialSource: source,
  },

  {
    id: "ramanagara",
    name: "District Legal Services Authority, Ramanagara",
    district: "Ramanagara",
    localizedName: {
      en: "District Legal Services Authority, Ramanagara",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ರಾಮನಗರ",
      hi: "जिला विधिक सेवा प्राधिकरण, रामनगर",
    },
    address: "District Court Complex, Ramanagara District",
    phones: ["080-27273445", "9141193957"],
    officialSource: source,
  },

  {
    id: "shivamogga",
    name: "District Legal Services Authority, Shivamogga",
    district: "Shivamogga",
    localizedName: {
      en: "District Legal Services Authority, Shivamogga",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಶಿವಮೊಗ್ಗ",
      hi: "जिला विधिक सेवा प्राधिकरण, शिवमोग्गा",
    },
    address: "District Court Complex, Shivamogga District",
    phones: ["08182-222218", "9141193958"],
    officialSource: source,
  },

  {
    id: "tumakuru",
    name: "District Legal Services Authority, Tumakuru",
    district: "Tumakuru",
    localizedName: {
      en: "District Legal Services Authority, Tumakuru",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ತುಮಕೂರು",
      hi: "जिला विधिक सेवा प्राधिकरण, तुमकुरु",
    },
    address: "District Court Complex, Tumakuru District",
    phones: ["0816-2255133", "9141193959"],
    officialSource: source,
  },

  {
    id: "udupi",
    name: "District Legal Services Authority, Udupi",
    district: "Udupi",
    localizedName: {
      en: "District Legal Services Authority, Udupi",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಉಡುಪಿ",
      hi: "जिला विधिक सेवा प्राधिकरण, उडुपी",
    },
    address: "District Court Complex, Udupi District",
    phones: ["0820-2523355", "9141193960"],
    officialSource: source,
  },

  {
    id: "uttara-kannada",
    name: "District Legal Services Authority, Uttara Kannada",
    district: "Uttara Kannada",
    localizedName: {
      en: "District Legal Services Authority, Uttara Kannada",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಉತ್ತರ ಕನ್ನಡ",
      hi: "जिला विधिक सेवा प्राधिकरण, उत्तर कन्नड़",
    },
    address: "District Court Complex, Karwar (U.K.) District",
    phones: ["08382-222990", "9141193961"],
    officialSource: source,
  },

  {
    id: "vijayapura",
    name: "District Legal Services Authority, Vijayapura",
    district: "Vijayapura",
    localizedName: {
      en: "District Legal Services Authority, Vijayapura",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ವಿಜಯಪುರ",
      hi: "जिला विधिक सेवा प्राधिकरण, विजयपुरा",
    },
    address: "District Court Complex, Vijayapura District",
    phones: ["08352-276150", "9141193923"],
    officialSource: source,
  },

  {
    id: "yadgir",
    name: "District Legal Services Authority, Yadgir",
    district: "Yadgir",
    localizedName: {
      en: "District Legal Services Authority, Yadgir",
      kn: "ಜಿಲ್ಲಾ ಕಾನೂನು ಸೇವೆಗಳ ಪ್ರಾಧಿಕಾರ, ಯಾದಗಿರಿ",
      hi: "जिला विधिक सेवा प्राधिकरण, यादगीर",
    },
    address: "District Court Complex, Yadgir District",
    phones: ["08473-253243", "08473-252325", "9141193924"],
    officialSource: source,
  },
];