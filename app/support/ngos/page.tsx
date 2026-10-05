"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import QuickExit from "@/components/QuickExit";
import { useLanguage } from "@/components/LanguageProvider";

type NgoRecord = {
  id: string;
  name: string;
  districts: string[];
  organisationType: string;
  supportAreas: string[];
  services: string[];
  whoTheySupport: string[];
  languages: string[];
  phone: string;
  email: string;
  website: string;
  address: string;
  availability: string;
  accessibility: string;
  officialSource: string;
  lastVerified: string;
  verificationStatus: "VERIFIED" | "REQUIRES REVIEW";
  howAvaCanHelp: string;
};


type DataLanguage = "en" | "kn" | "hi";

type DataTranslation = {
  kn: string;
  hi: string;
};

const dataTranslations: Record<string, DataTranslation> = {
  // Districts / locations
  "Mysuru": { kn: "ಮೈಸೂರು", hi: "मैसूरु" },
  "Bengaluru Urban": { kn: "ಬೆಂಗಳೂರು ನಗರ", hi: "बेंगलुरु शहरी" },
  "Bengaluru Rural": { kn: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ", hi: "बेंगलुरु ग्रामीण" },
  "Ramanagara": { kn: "ರಾಮನಗರ", hi: "रामनगर" },
  "Hassan": { kn: "ಹಾಸನ", hi: "हासन" },
  "Karnataka": { kn: "ಕರ್ನಾಟಕ", hi: "कर्नाटक" },
  "Mysuru, Karnataka": { kn: "ಮೈಸೂರು, ಕರ್ನಾಟಕ", hi: "मैसूरु, कर्नाटक" },
  "Bengaluru, Karnataka": { kn: "ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ", hi: "बेंगलुरु, कर्नाटक" },
  "Bengaluru Rural, Karnataka": { kn: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ, ಕರ್ನಾಟಕ", hi: "बेंगलुरु ग्रामीण, कर्नाटक" },

  // Organisation types
  "NGO": { kn: "ಎನ್‌ಜಿಒ", hi: "एनजीओ" },
  "Charitable Organisation": { kn: "ಚಾರಿಟಬಲ್ ಸಂಸ್ಥೆ", hi: "धर्मार्थ संगठन" },
  "Community Organisation": { kn: "ಸಮುದಾಯ ಸಂಸ್ಥೆ", hi: "सामुदायिक संगठन" },
  "Peer Support Group": { kn: "ಸಹಾಯ ಗುಂಪು", hi: "सहायता समूह" },

  // Support areas
  "Sexual Violence Survivors": { kn: "ಲೈಂಗಿಕ ಹಿಂಸೆಯಿಂದ ಬದುಕುಳಿದವರು", hi: "यौन हिंसा से बचे लोग" },
  "Human Trafficking": { kn: "ಮಾನವ ಕಳ್ಳಸಾಗಣೆ", hi: "मानव तस्करी" },
  "Child & Adolescent Support": { kn: "ಮಕ್ಕಳು ಮತ್ತು ಕಿಶೋರರಿಗೆ ಬೆಂಬಲ", hi: "बच्चों और किशोरों के लिए सहायता" },
  "Domestic Violence Support": { kn: "ಕೌಟುಂಬಿಕ ಹಿಂಸೆ ಬೆಂಬಲ", hi: "घरेलू हिंसा सहायता" },
  "Women & Gender-Based Violence": { kn: "ಮಹಿಳೆಯರು ಮತ್ತು ಲಿಂಗಾಧಾರಿತ ಹಿಂಸೆ", hi: "महिलाएँ और लैंगिक हिंसा" },
  "LGBTQ+ Support": { kn: "LGBTQ+ ಬೆಂಬಲ", hi: "LGBTQ+ सहायता" },
  "Mental Health & Trauma": { kn: "ಮಾನಸಿಕ ಆರೋಗ್ಯ ಮತ್ತು ಆಘಾತ", hi: "मानसिक स्वास्थ्य और आघात" },
  "Migrant / Interstate Worker Support": { kn: "ವಲಸೆ / ಅಂತರರಾಜ್ಯ ಕಾರ್ಮಿಕರ ಬೆಂಬಲ", hi: "प्रवासी / अंतरराज्यीय श्रमिक सहायता" },
  "Disability & Vulnerable Victims": { kn: "ವಿಕಲಚೇತನರು ಮತ್ತು ದುರ್ಬಲ ಬಾಧಿತರಿಗೆ ಬೆಂಬಲ", hi: "दिव्यांग और संवेदनशील पीड़ितों के लिए सहायता" },
  "Elder Abuse": { kn: "ವೃದ್ಧರ ಮೇಲಿನ ದೌರ್ಜನ್ಯ", hi: "वृद्धों के साथ दुर्व्यवहार" },

  // Services / support details
  "Rescue and rehabilitation": { kn: "ರಕ್ಷಣೆ ಮತ್ತು ಪುನರ್ವಸತಿ", hi: "बचाव और पुनर्वास" },
  "Shelter": { kn: "ಆಶ್ರಯ", hi: "आश्रय" },
  "Counselling": { kn: "ಸಮಾಲೋಚನೆ", hi: "परामर्श" },
  "Legal and prosecution support": { kn: "ಕಾನೂನು ಮತ್ತು ಅಭಿಯೋಜನಾ ಬೆಂಬಲ", hi: "कानूनी और अभियोजन सहायता" },
  "Reintegration": { kn: "ಮರುಸೇರ್ಪಡೆ", hi: "पुनःएकीकरण" },
  "Prevention and advocacy": { kn: "ತಡೆಗಟ್ಟುವಿಕೆ ಮತ್ತು ಹಕ್ಕುಗಳ ಪರ ವಕಾಲತ್ತು", hi: "रोकथाम और पैरवी" },
  "Education and vocational training": { kn: "ಶಿಕ್ಷಣ ಮತ್ತು ವೃತ್ತಿಪರ ತರಬೇತಿ", hi: "शिक्षा और व्यावसायिक प्रशिक्षण" },
  "Crisis support": { kn: "ಬಿಕ್ಕಟ್ಟು ಬೆಂಬಲ", hi: "संकट सहायता" },
  "Emotional support": { kn: "ಭಾವನಾತ್ಮಕ ಬೆಂಬಲ", hi: "भावनात्मक सहायता" },
  "Information and guidance": { kn: "ಮಾಹಿತಿ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ", hi: "जानकारी और मार्गदर्शन" },
  "Referrals": { kn: "ರೆಫರಲ್‌ಗಳು", hi: "रेफरल" },
  "Police referrals": { kn: "ಪೊಲೀಸ್ ಸೇವೆಗಳಿಗೆ ರೆಫರಲ್", hi: "पुलिस सेवाओं के लिए रेफरल" },
  "Legal referrals": { kn: "ಕಾನೂನು ಸೇವೆಗಳಿಗೆ ರೆಫರಲ್", hi: "कानूनी सेवाओं के लिए रेफरल" },
  "Shelter referrals": { kn: "ಆಶ್ರಯ ಸೇವೆಗಳಿಗೆ ರೆಫರಲ್", hi: "आश्रय सेवाओं के लिए रेफरल" },
  "Counselling referrals": { kn: "ಸಮಾಲೋಚನೆ ಸೇವೆಗಳಿಗೆ ರೆಫರಲ್", hi: "परामर्श सेवाओं के लिए रेफरल" },
  "Medical and mental-health referrals": { kn: "ವೈದ್ಯಕೀಯ ಮತ್ತು ಮಾನಸಿಕ ಆರೋಗ್ಯ ಸೇವೆಗಳಿಗೆ ರೆಫರಲ್", hi: "चिकित्सा और मानसिक स्वास्थ्य सेवाओं के लिए रेफरल" },
  "Vocational support referrals": { kn: "ವೃತ್ತಿಪರ ಬೆಂಬಲ ಸೇವೆಗಳಿಗೆ ರೆಫರಲ್", hi: "व्यावसायिक सहायता सेवाओं के लिए रेफरल" },
  "Crisis intervention": { kn: "ಬಿಕ್ಕಟ್ಟು ಹಸ್ತಕ್ಷೇಪ", hi: "संकट हस्तक्षेप" },
  "Pro bono legal aid": { kn: "ಉಚಿತ ಕಾನೂನು ನೆರವು", hi: "निःशुल्क कानूनी सहायता" },
  "Shelter support": { kn: "ಆಶ್ರಯ ಬೆಂಬಲ", hi: "आश्रय सहायता" },
  "Mental-health support": { kn: "ಮಾನಸಿಕ ಆರೋಗ್ಯ ಬೆಂಬಲ", hi: "मानसिक स्वास्थ्य सहायता" },
  "Medical referrals": { kn: "ವೈದ್ಯಕೀಯ ಸೇವೆಗಳಿಗೆ ರೆಫರಲ್", hi: "चिकित्सा सेवाओं के लिए रेफरल" },
  "Gender-affirming support": { kn: "ಲಿಂಗ ಗುರುತನ್ನು ಗೌರವಿಸುವ ಬೆಂಬಲ", hi: "लिंग-पुष्टि सहायता" },
  "Advocacy": { kn: "ಹಕ್ಕುಗಳ ಪರ ವಕಾಲತ್ತು", hi: "पैरवी" },
  "Community development": { kn: "ಸಮುದಾಯ ಅಭಿವೃದ್ಧಿ", hi: "सामुदायिक विकास" },
  "Family intervention": { kn: "ಕುಟುಂಬ ಹಸ್ತಕ್ಷೇಪ", hi: "परिवार हस्तक्षेप" },
  "GBV support": { kn: "ಲಿಂಗಾಧಾರಿತ ಹಿಂಸೆ ಬೆಂಬಲ", hi: "लैंगिक हिंसा सहायता" },
  "Legal consultations": { kn: "ಕಾನೂನು ಸಮಾಲೋಚನೆ", hi: "कानूनी परामर्श" },
  "Mental-health-related support": { kn: "ಮಾನಸಿಕ ಆರೋಗ್ಯ ಸಂಬಂಧಿತ ಬೆಂಬಲ", hi: "मानसिक स्वास्थ्य संबंधी सहायता" },
  "Digital safety": { kn: "ಡಿಜಿಟಲ್ ಸುರಕ್ಷತೆ", hi: "डिजिटल सुरक्षा" },
  "Research": { kn: "ಸಂಶೋಧನೆ", hi: "शोध" },
  "Awareness and prevention": { kn: "ಜಾಗೃತಿ ಮತ್ತು ತಡೆಗಟ್ಟುವಿಕೆ", hi: "जागरूकता और रोकथाम" },
  "Child sexual-abuse prevention": { kn: "ಮಕ್ಕಳ ಲೈಂಗಿಕ ದೌರ್ಜನ್ಯ ತಡೆಗಟ್ಟುವಿಕೆ", hi: "बाल यौन शोषण की रोकथाम" },
  "Healthcare access": { kn: "ಆರೋಗ್ಯ ಸೇವೆಗಳ ಪ್ರವೇಶ", hi: "स्वास्थ्य सेवाओं तक पहुँच" },
  "Learning and day-care support": { kn: "ಕಲಿಕೆ ಮತ್ತು ಡೇ-ಕೇರ್ ಬೆಂಬಲ", hi: "शिक्षा और डे-केयर सहायता" },
  "Gender and sexuality education": { kn: "ಲಿಂಗ ಮತ್ತು ಲೈಂಗಿಕತೆಯ ಶಿಕ್ಷಣ", hi: "लिंग और लैंगिकता शिक्षा" },
  "Mental-health care": { kn: "ಮಾನಸಿಕ ಆರೋಗ್ಯ ಆರೈಕೆ", hi: "मानसिक स्वास्थ्य देखभाल" },
  "Legal guidance": { kn: "ಕಾನೂನು ಮಾರ್ಗದರ್ಶನ", hi: "कानूनी मार्गदर्शन" },
  "Police assistance": { kn: "ಪೊಲೀಸ್ ಸಹಾಯ", hi: "पुलिस सहायता" },
  "Short-stay shelter": { kn: "ಅಲ್ಪಾವಧಿ ಆಶ್ರಯ", hi: "अल्पकालिक आश्रय" },
  "Healthcare": { kn: "ಆರೋಗ್ಯ ಸೇವೆ", hi: "स्वास्थ्य सेवा" },
  "Rehabilitation": { kn: "ಪುನರ್ವಸತಿ", hi: "पुनर्वास" },
  "Education and skills support": { kn: "ಶಿಕ್ಷಣ ಮತ್ತು ಕೌಶಲ್ಯ ಬೆಂಬಲ", hi: "शिक्षा और कौशल सहायता" },
  "Short-stay homes": { kn: "ಅಲ್ಪಾವಧಿ ವಸತಿ ಕೇಂದ್ರಗಳು", hi: "अल्पकालिक आवास" },
  "Emergency relief": { kn: "ತುರ್ತು ಪರಿಹಾರ", hi: "आपातकालीन राहत" },
  "Recovery support": { kn: "ಚೇತರಿಕೆ ಬೆಂಬಲ", hi: "पुनर्प्राप्ति सहायता" },
  "Disability rehabilitation": { kn: "ವಿಕಲಚೇತನರ ಪುನರ್ವಸತಿ", hi: "दिव्यांग पुनर्वास" },
  "Senior care": { kn: "ಹಿರಿಯರ ಆರೈಕೆ", hi: "वरिष्ठ नागरिक देखभाल" },
  "Child protection": { kn: "ಮಕ್ಕಳ ರಕ್ಷಣೆ", hi: "बाल संरक्षण" },
  "Rescue coordination": { kn: "ರಕ್ಷಣಾ ಕಾರ್ಯಗಳ ಸಮನ್ವಯ", hi: "बचाव कार्यों का समन्वय" },
  "Temporary shelter": { kn: "ತಾತ್ಕಾಲಿಕ ಆಶ್ರಯ", hi: "अस्थायी आश्रय" },
  "Long-term shelter": { kn: "ದೀರ್ಘಾವಧಿ ಆಶ್ರಯ", hi: "दीर्घकालिक आश्रय" },
  "Family restoration": { kn: "ಕುಟುಂಬ ಮರುಸೇರ್ಪಡೆ", hi: "परिवार पुनर्स्थापन" },
  "Psychosocial support": { kn: "ಮನೋಸಾಮಾಜಿಕ ಬೆಂಬಲ", hi: "मनोसामाजिक सहायता" },
  "Safe homes": { kn: "ಸುರಕ್ಷಿತ ವಸತಿ", hi: "सुरक्षित आवास" },
  "Residential care": { kn: "ವಸತಿ ಆರೈಕೆ", hi: "आवासीय देखभाल" },
  "Education": { kn: "ಶಿಕ್ಷಣ", hi: "शिक्षा" },
  "Family and community support": { kn: "ಕುಟುಂಬ ಮತ್ತು ಸಮುದಾಯ ಬೆಂಬಲ", hi: "परिवार और सामुदायिक सहायता" },
  "After-care": { kn: "ನಂತರದ ಆರೈಕೆ", hi: "अनुवर्ती देखभाल" },
  "Residential rehabilitation": { kn: "ವಸತಿ ಪುನರ್ವಸತಿ", hi: "आवासीय पुनर्वास" },
  "Food and clothing": { kn: "ಆಹಾರ ಮತ್ತು ಬಟ್ಟೆ", hi: "भोजन और कपड़े" },
  "Women’s empowerment": { kn: "ಮಹಿಳಾ ಸಬಲೀಕರಣ", hi: "महिला सशक्तिकरण" },
  "Support for children with disabilities": { kn: "ವಿಕಲಚೇತನ ಮಕ್ಕಳಿಗೆ ಬೆಂಬಲ", hi: "दिव्यांग बच्चों के लिए सहायता" },
  "Senior support": { kn: "ಹಿರಿಯರಿಗೆ ಬೆಂಬಲ", hi: "वरिष्ठ नागरिक सहायता" },
  "Elder-abuse intervention": { kn: "ವೃದ್ಧರ ಮೇಲಿನ ದೌರ್ಜನ್ಯದಲ್ಲಿ ಹಸ್ತಕ್ಷೇಪ", hi: "वृद्ध दुर्व्यवहार में हस्तक्षेप" },
  "Elders Helpline": { kn: "ಹಿರಿಯರ ಸಹಾಯವಾಣಿ", hi: "वरिष्ठ नागरिक हेल्पलाइन" },
  "Elder Line Karnataka": { kn: "ಕರ್ನಾಟಕ ಎಲ್ಡರ್ ಲೈನ್", hi: "कर्नाटक एल्डर लाइन" },
  "Geriatric support": { kn: "ವೃದ್ಧಾಪ್ಯ ಆರೈಕೆ ಬೆಂಬಲ", hi: "जेरियाट्रिक सहायता" },
  "Care services": { kn: "ಆರೈಕೆ ಸೇವೆಗಳು", hi: "देखभाल सेवाएँ" },
  "Mental-health first aid": { kn: "ಮಾನಸಿಕ ಆರೋಗ್ಯ ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ", hi: "मानसिक स्वास्थ्य प्राथमिक सहायता" },
  "Telephonic counselling": { kn: "ದೂರವಾಣಿ ಸಮಾಲೋಚನೆ", hi: "टेलीफोन परामर्श" },
  "Guidance": { kn: "ಮಾರ್ಗದರ್ಶನ", hi: "मार्गदर्शन" },
  "Psychosocial interventions": { kn: "ಮನೋಸಾಮಾಜಿಕ ಹಸ್ತಕ್ಷೇಪಗಳು", hi: "मनोसामाजिक हस्तक्षेप" },
  "Youth support": { kn: "ಯುವಕರ ಬೆಂಬಲ", hi: "युवा सहायता" },
  "Women’s support": { kn: "ಮಹಿಳೆಯರ ಬೆಂಬಲ", hi: "महिला सहायता" },
  "Crisis and suicide-prevention awareness": { kn: "ಬಿಕ್ಕಟ್ಟು ಮತ್ತು ಆತ್ಮಹತ್ಯೆ ತಡೆ ಜಾಗೃತಿ", hi: "संकट और आत्महत्या रोकथाम जागरूकता" },
  "Child-rights awareness": { kn: "ಮಕ್ಕಳ ಹಕ್ಕುಗಳ ಜಾಗೃತಿ", hi: "बाल अधिकार जागरूकता" },
  "Training": { kn: "ತರಬೇತಿ", hi: "प्रशिक्षण" },
  "Policy inputs": { kn: "ನೀತಿ ಸಲಹೆಗಳು", hi: "नीति सुझाव" },
  "Monitoring": { kn: "ಮೇಲ್ವಿಚಾರಣೆ", hi: "निगरानी" },
  "Legal-process support for children’s grievances": { kn: "ಮಕ್ಕಳ ದೂರುಗಳಿಗೆ ಕಾನೂನು ಪ್ರಕ್ರಿಯೆ ಬೆಂಬಲ", hi: "बच्चों की शिकायतों के लिए कानूनी प्रक्रिया सहायता" },
  "Early intervention": { kn: "ಆರಂಭಿಕ ಹಸ್ತಕ್ಷೇಪ", hi: "प्रारंभिक हस्तक्षेप" },
  "Therapy": { kn: "ಚಿಕಿತ್ಸಾ ಸೇವೆಗಳು", hi: "चिकित्सीय सेवाएँ" },
  "Assistive devices": { kn: "ಸಹಾಯಕ ಸಾಧನಗಳು", hi: "सहायक उपकरण" },
  "Adaptive devices": { kn: "ಅನುಗುಣ ಸಾಧನಗಳು", hi: "अनुकूलित उपकरण" },
  "Family support": { kn: "ಕುಟುಂಬ ಬೆಂಬಲ", hi: "परिवार सहायता" },
  "Social-security guidance": { kn: "ಸಾಮಾಜಿಕ ಭದ್ರತಾ ಯೋಜನೆಗಳ ಮಾರ್ಗದರ್ಶನ", hi: "सामाजिक सुरक्षा मार्गदर्शन" },
  "Inclusion support": { kn: "ಒಳಗೊಳ್ಳುವಿಕೆ ಬೆಂಬಲ", hi: "समावेशन सहायता" },
  "Inclusive development": { kn: "ಒಳಗೊಳ್ಳುವಿಕೆ ಆಧಾರಿತ ಅಭಿವೃದ್ಧಿ", hi: "समावेशी विकास" },
  "Support for children with intellectual and developmental disabilities": { kn: "ಬೌದ್ಧಿಕ ಮತ್ತು ಅಭಿವೃದ್ಧಿ ಸಂಬಂಧಿತ ವಿಕಲಚೇತನ ಮಕ್ಕಳಿಗೆ ಬೆಂಬಲ", hi: "बौद्धिक और विकासात्मक दिव्यांगता वाले बच्चों के लिए सहायता" },
  "Women’s entrepreneurship": { kn: "ಮಹಿಳಾ ಉದ್ಯಮಶೀಲತೆ", hi: "महिला उद्यमिता" },
  "Health support": { kn: "ಆರೋಗ್ಯ ಬೆಂಬಲ", hi: "स्वास्थ्य सहायता" },
  "Livelihood support": { kn: "ಜೀವನೋಪಾಯ ಬೆಂಬಲ", hi: "आजीविका सहायता" },

  // Who they support
  "Women": { kn: "ಮಹಿಳೆಯರು", hi: "महिलाएँ" },
  "Girls": { kn: "ಹುಡುಗಿಯರು", hi: "लड़कियाँ" },
  "Boys": { kn: "ಹುಡುಗರು", hi: "लड़के" },
  "Children": { kn: "ಮಕ್ಕಳು", hi: "बच्चे" },
  "Migrant workers": { kn: "ವಲಸೆ ಕಾರ್ಮಿಕರು", hi: "प्रवासी श्रमिक" },
  "Vulnerable women": { kn: "ದುರ್ಬಲ ಪರಿಸ್ಥಿತಿಯಲ್ಲಿರುವ ಮಹಿಳೆಯರು", hi: "संवेदनशील परिस्थितियों में महिलाएँ" },
  "People with disabilities": { kn: "ವಿಕಲಚೇತನರು", hi: "दिव्यांग लोग" },
  "Senior citizens": { kn: "ಹಿರಿಯ ನಾಗರಿಕರು", hi: "वरिष्ठ नागरिक" },
  "People in difficult circumstances": { kn: "ಕಷ್ಟಕರ ಪರಿಸ್ಥಿತಿಯಲ್ಲಿರುವವರು", hi: "कठिन परिस्थितियों में लोग" },
  "Children in distress": { kn: "ತೊಂದರೆಯಲ್ಲಿರುವ ಮಕ್ಕಳು", hi: "संकट में बच्चे" },
  "Children affected by trafficking": { kn: "ಕಳ್ಳಸಾಗಣೆಯಿಂದ ಬಾಧಿತ ಮಕ್ಕಳು", hi: "तस्करी से प्रभावित बच्चे" },
  "Children affected by abuse": { kn: "ದೌರ್ಜನ್ಯದಿಂದ ಬಾಧಿತ ಮಕ್ಕಳು", hi: "दुर्व्यवहार से प्रभावित बच्चे" },
  "Homeless children": { kn: "ನಿರಾಶ್ರಿತ ಮಕ್ಕಳು", hi: "बेघर बच्चे" },
  "Young people": { kn: "ಯುವಕರು", hi: "युवा" },
  "Vulnerable children": { kn: "ದುರ್ಬಲ ಪರಿಸ್ಥಿತಿಯಲ್ಲಿರುವ ಮಕ್ಕಳು", hi: "संवेदनशील परिस्थितियों में बच्चे" },
  "Elderly people": { kn: "ವೃದ್ಧರು", hi: "वृद्ध लोग" },
  "Elderly people in distress": { kn: "ತೊಂದರೆಯಲ್ಲಿರುವ ವೃದ್ಧರು", hi: "संकट में वृद्ध लोग" },
  "People experiencing distress": { kn: "ಮಾನಸಿಕ ಅಥವಾ ಭಾವನಾತ್ಮಕ ತೊಂದರೆ ಅನುಭವಿಸುವವರು", hi: "मानसिक या भावनात्मक परेशानी झेल रहे लोग" },
  "People experiencing emotional distress": { kn: "ಭಾವನಾತ್ಮಕ ತೊಂದರೆ ಅನುಭವಿಸುವವರು", hi: "भावनात्मक परेशानी झेल रहे लोग" },
  "Child-rights stakeholders": { kn: "ಮಕ್ಕಳ ಹಕ್ಕುಗಳೊಂದಿಗೆ ಸಂಬಂಧಿಸಿದವರು", hi: "बाल अधिकार से जुड़े हितधारक" },
  "Children with disabilities": { kn: "ವಿಕಲಚೇತನ ಮಕ್ಕಳು", hi: "दिव्यांग बच्चे" },
  "Families": { kn: "ಕುಟುಂಬಗಳು", hi: "परिवार" },
  "Vulnerable families": { kn: "ದುರ್ಬಲ ಪರಿಸ್ಥಿತಿಯಲ್ಲಿರುವ ಕುಟುಂಬಗಳು", hi: "संवेदनशील परिस्थितियों में परिवार" },
  "Trans men and transmasculine people": { kn: "ಟ್ರಾನ್ಸ್ ಪುರುಷರು ಮತ್ತು ಟ್ರಾನ್ಸ್‌ಮ್ಯಾಸ್ಕುಲೈನ್ ವ್ಯಕ್ತಿಗಳು", hi: "ट्रांस पुरुष और ट्रांसमास्कुलिन लोग" },
  "Queer, lesbian and bisexual women": { kn: "ಕ್ವಿಯರ್, ಲೆಸ್ಬಿಯನ್ ಮತ್ತು ದ್ವಿಲೈಂಗಿಕ ಮಹಿಳೆಯರು", hi: "क्वियर, लेस्बियन और उभयलिंगी महिलाएँ" },
  "Gender non-conforming people": { kn: "ಲಿಂಗ ಮಾನದಂಡಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗದ ವ್ಯಕ್ತಿಗಳು", hi: "जेंडर नॉन-कन्फॉर्मिंग लोग" },
  "Non-binary people": { kn: "ನಾನ್-ಬೈನರಿ ವ್ಯಕ್ತಿಗಳು", hi: "नॉन-बाइनरी लोग" },
  "Intersex people": { kn: "ಇಂಟರ್‌ಸೆಕ್ಸ್ ವ್ಯಕ್ತಿಗಳು", hi: "इंटरसेक्स लोग" },
  "Sexual minorities": { kn: "ಲೈಂಗಿಕ ಅಲ್ಪಸಂಖ್ಯಾತರು", hi: "यौन अल्पसंख्यक" },
  "Transgender people": { kn: "ಟ್ರಾನ್ಸ್‌ಜೆಂಡರ್ ವ್ಯಕ್ತಿಗಳು", hi: "ट्रांसजेंडर लोग" },
  "Vulnerable groups": { kn: "ದುರ್ಬಲ ಪರಿಸ್ಥಿತಿಯಲ್ಲಿರುವ ಗುಂಪುಗಳು", hi: "संवेदनशील समूह" },

  // Languages
  "English": { kn: "ಇಂಗ್ಲಿಷ್", hi: "अंग्रेज़ी" },
  "Kannada": { kn: "ಕನ್ನಡ", hi: "कन्नड़" },

  // Availability / source / misc.
  "Contact organisation": { kn: "ಸಂಸ್ಥೆಯನ್ನು ಸಂಪರ್ಕಿಸಿ", hi: "संगठन से संपर्क करें" },
  "Contact organisation for current availability": { kn: "ಪ್ರಸ್ತುತ ಲಭ್ಯತೆಗಾಗಿ ಸಂಸ್ಥೆಯನ್ನು ಸಂಪರ್ಕಿಸಿ", hi: "वर्तमान उपलब्धता के लिए संगठन से संपर्क करें" },
  "Contact organisation for accessibility arrangements.": { kn: "ಪ್ರವೇಶಸೌಲಭ್ಯಗಳ ವ್ಯವಸ್ಥೆಗಾಗಿ ಸಂಸ್ಥೆಯನ್ನು ಸಂಪರ್ಕಿಸಿ.", hi: "सुलभता की व्यवस्था के लिए संगठन से संपर्क करें।" },
  "Accessibility-focused services are available; confirm specific arrangements.": { kn: "ಪ್ರವೇಶಸೌಲಭ್ಯಕ್ಕೆ ಆದ್ಯತೆ ನೀಡುವ ಸೇವೆಗಳು ಲಭ್ಯವಿವೆ; ನಿರ್ದಿಷ್ಟ ವ್ಯವಸ್ಥೆಗಳನ್ನು ದೃಢೀಕರಿಸಿ.", hi: "सुलभता-केंद्रित सेवाएँ उपलब्ध हैं; विशेष व्यवस्थाओं की पुष्टि करें।" },
  "Official organisation website": { kn: "ಅಧಿಕೃತ ಸಂಸ್ಥೆಯ ವೆಬ್‌ಸೈಟ್", hi: "आधिकारिक संगठन की वेबसाइट" },
  "Authoritative organisation information": { kn: "ಅಧಿಕೃತ ಸಂಸ್ಥೆಯ ಮಾಹಿತಿ", hi: "प्रामाणिक संगठन जानकारी" },
};

const howAvaTranslations: Record<string, DataTranslation> = {
  "AVA helps you identify Odanadi as a specialised organisation for trafficking, sexual violence and related survivor support.": { kn: "ಕಳ್ಳಸಾಗಣೆ, ಲೈಂಗಿಕ ಹಿಂಸೆ ಮತ್ತು ಸಂಬಂಧಿತ ಬದುಕುಳಿದವರ ಬೆಂಬಲದಲ್ಲಿ ಪರಿಣತಿ ಹೊಂದಿರುವ ಸಂಸ್ಥೆಯಾಗಿ Odanadi ಅನ್ನು ಗುರುತಿಸಲು AVA ಸಹಾಯ ಮಾಡುತ್ತದೆ.", hi: "AVA आपको Odanadi को मानव तस्करी, यौन हिंसा और संबंधित survivor support के लिए विशेष संगठन के रूप में पहचानने में मदद करता है।" },
  "AVA helps connect survivors with a verified organisation offering crisis support, guidance and referrals.": { kn: "ಬಿಕ್ಕಟ್ಟು ಬೆಂಬಲ, ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ರೆಫರಲ್‌ಗಳನ್ನು ನೀಡುವ ಪರಿಶೀಲಿತ ಸಂಸ್ಥೆಯೊಂದಿಗೆ ಬದುಕುಳಿದವರನ್ನು ಸಂಪರ್ಕಿಸಲು AVA ಸಹಾಯ ಮಾಡುತ್ತದೆ.", hi: "AVA संकट सहायता, मार्गदर्शन और रेफरल देने वाले सत्यापित संगठन से survivors को जोड़ने में मदद करता है।" },
  "AVA helps users find specialised LGBTQIA+ crisis, legal, shelter, medical and mental-health support.": { kn: "ವಿಶೇಷ LGBTQIA+ ಬಿಕ್ಕಟ್ಟು, ಕಾನೂನು, ಆಶ್ರಯ, ವೈದ್ಯಕೀಯ ಮತ್ತು ಮಾನಸಿಕ ಆರೋಗ್ಯ ಬೆಂಬಲವನ್ನು ಹುಡುಕಲು AVA ಸಹಾಯ ಮಾಡುತ್ತದೆ.", hi: "AVA विशेष LGBTQIA+ संकट, कानूनी, आश्रय, चिकित्सा और मानसिक स्वास्थ्य सहायता खोजने में मदद करता है।" },
  "AVA helps users locate an organisation working across gender-based violence, child rights and sexual-minority rights.": { kn: "ಲಿಂಗಾಧಾರಿತ ಹಿಂಸೆ, ಮಕ್ಕಳ ಹಕ್ಕುಗಳು ಮತ್ತು ಲೈಂಗಿಕ ಅಲ್ಪಸಂಖ್ಯಾತರ ಹಕ್ಕುಗಳ ಕ್ಷೇತ್ರಗಳಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುವ ಸಂಸ್ಥೆಯನ್ನು ಹುಡುಕಲು AVA ಸಹಾಯ ಮಾಡುತ್ತದೆ.", hi: "AVA लैंगिक हिंसा, बाल अधिकार और यौन अल्पसंख्यक अधिकारों पर काम करने वाले संगठन को खोजने में मदद करता है।" },
  "AVA highlights the organisation's relevant support areas while directing users to confirm current services before visiting.": { kn: "ಸಂಸ್ಥೆಯ ಸಂಬಂಧಿತ ಬೆಂಬಲ ಕ್ಷೇತ್ರಗಳನ್ನು AVA ತೋರಿಸುತ್ತದೆ ಮತ್ತು ಭೇಟಿ ನೀಡುವ ಮೊದಲು ಪ್ರಸ್ತುತ ಸೇವೆಗಳನ್ನು ದೃಢೀಕರಿಸಲು ಸೂಚಿಸುತ್ತದೆ.", hi: "AVA संगठन के संबंधित सहायता क्षेत्रों को दिखाता है और उपयोगकर्ताओं को जाने से पहले वर्तमान सेवाओं की पुष्टि करने के लिए कहता है।" },
  "AVA helps users identify relevant support areas and provides a clear reminder to confirm current availability.": { kn: "ಸಂಬಂಧಿತ ಬೆಂಬಲ ಕ್ಷೇತ್ರಗಳನ್ನು ಗುರುತಿಸಲು AVA ಸಹಾಯ ಮಾಡುತ್ತದೆ ಮತ್ತು ಪ್ರಸ್ತುತ ಲಭ್ಯತೆಯನ್ನು ದೃಢೀಕರಿಸುವ ಸ್ಪಷ್ಟ ಸೂಚನೆಯನ್ನು ನೀಡುತ್ತದೆ.", hi: "AVA संबंधित सहायता क्षेत्रों की पहचान करने में मदद करता है और वर्तमान उपलब्धता की पुष्टि करने की स्पष्ट याद दिलाता है।" },
  "AVA helps users identify organisations serving vulnerable people across several support needs.": { kn: "ವಿವಿಧ ಬೆಂಬಲ ಅಗತ್ಯಗಳಿರುವ ದುರ್ಬಲ ಪರಿಸ್ಥಿತಿಯಲ್ಲಿರುವವರಿಗೆ ಸೇವೆ ನೀಡುವ ಸಂಸ್ಥೆಗಳನ್ನು ಗುರುತಿಸಲು AVA ಸಹಾಯ ಮಾಡುತ್ತದೆ.", hi: "AVA विभिन्न सहायता आवश्यकताओं वाले संवेदनशील लोगों की सेवा करने वाले संगठनों की पहचान करने में मदद करता है।" },
  "AVA helps identify child-protection support involving shelter, referrals, counselling and family restoration.": { kn: "ಆಶ್ರಯ, ರೆಫರಲ್‌ಗಳು, ಸಮಾಲೋಚನೆ ಮತ್ತು ಕುಟುಂಬ ಮರುಸೇರ್ಪಡೆಯಂತಹ ಮಕ್ಕಳ ರಕ್ಷಣಾ ಬೆಂಬಲವನ್ನು ಗುರುತಿಸಲು AVA ಸಹಾಯ ಮಾಡುತ್ತದೆ.", hi: "AVA आश्रय, रेफरल, परामर्श और परिवार पुनर्स्थापन से जुड़ी बाल संरक्षण सहायता पहचानने में मदद करता है।" },
  "AVA helps users locate a support organisation providing shelter, care, counselling and after-care services.": { kn: "ಆಶ್ರಯ, ಆರೈಕೆ, ಸಮಾಲೋಚನೆ ಮತ್ತು ನಂತರದ ಆರೈಕೆ ಸೇವೆಗಳನ್ನು ನೀಡುವ ಬೆಂಬಲ ಸಂಸ್ಥೆಯನ್ನು ಹುಡುಕಲು AVA ಸಹಾಯ ಮಾಡುತ್ತದೆ.", hi: "AVA आश्रय, देखभाल, परामर्श और अनुवर्ती सेवाएँ देने वाले सहायता संगठन को खोजने में मदद करता है।" },
  "AVA helps users identify support relevant to vulnerable children, women, older people and people with disabilities.": { kn: "ದುರ್ಬಲ ಪರಿಸ್ಥಿತಿಯಲ್ಲಿರುವ ಮಕ್ಕಳು, ಮಹಿಳೆಯರು, ಹಿರಿಯರು ಮತ್ತು ವಿಕಲಚೇತನರಿಗೆ ಸಂಬಂಧಿಸಿದ ಬೆಂಬಲವನ್ನು ಗುರುತಿಸಲು AVA ಸಹಾಯ ಮಾಡುತ್ತದೆ.", hi: "AVA संवेदनशील बच्चों, महिलाओं, बुजुर्गों और दिव्यांग लोगों के लिए प्रासंगिक सहायता पहचानने में मदद करता है।" },
  "AVA helps older people and caregivers identify dedicated elder-support and abuse-intervention services.": { kn: "ಹಿರಿಯರು ಮತ್ತು ಆರೈಕೆದಾರರು ಹಿರಿಯರಿಗಾಗಿ ವಿಶೇಷ ಬೆಂಬಲ ಮತ್ತು ದೌರ್ಜನ್ಯ ಹಸ್ತಕ್ಷೇಪ ಸೇವೆಗಳನ್ನು ಗುರುತಿಸಲು AVA ಸಹಾಯ ಮಾಡುತ್ತದೆ.", hi: "AVA बुजुर्गों और caregivers को विशेष elder-support और abuse-intervention सेवाएँ पहचानने में मदद करता है।" },
  "AVA helps users identify mental-health and psychosocial support options and encourages confirmation before contact.": { kn: "ಮಾನಸಿಕ ಆರೋಗ್ಯ ಮತ್ತು ಮನೋಸಾಮಾಜಿಕ ಬೆಂಬಲದ ಆಯ್ಕೆಗಳನ್ನು ಗುರುತಿಸಲು AVA ಸಹಾಯ ಮಾಡುತ್ತದೆ ಮತ್ತು ಸಂಪರ್ಕಿಸುವ ಮೊದಲು ದೃಢೀಕರಿಸಲು ಪ್ರೋತ್ಸಾಹಿಸುತ್ತದೆ.", hi: "AVA मानसिक स्वास्थ्य और मनोसामाजिक सहायता के विकल्प पहचानने में मदद करता है और संपर्क से पहले पुष्टि करने के लिए कहता है।" },
  "AVA helps users locate mental-health support and understand the type of assistance available.": { kn: "ಮಾನಸಿಕ ಆರೋಗ್ಯ ಬೆಂಬಲವನ್ನು ಹುಡುಕಲು ಮತ್ತು ಲಭ್ಯವಿರುವ ಸಹಾಯದ ಪ್ರಕಾರವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು AVA ಸಹಾಯ ಮಾಡುತ್ತದೆ.", hi: "AVA मानसिक स्वास्थ्य सहायता खोजने और उपलब्ध सहायता के प्रकार को समझने में मदद करता है।" },
  "AVA helps users find child-rights organisations that may assist with information, advocacy and grievances.": { kn: "ಮಾಹಿತಿ, ಹಕ್ಕುಗಳ ಪರ ವಕಾಲತ್ತು ಮತ್ತು ದೂರುಗಳಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಹುದಾದ ಮಕ್ಕಳ ಹಕ್ಕುಗಳ ಸಂಸ್ಥೆಗಳನ್ನು ಹುಡುಕಲು AVA ಸಹಾಯ ಮಾಡುತ್ತದೆ.", hi: "AVA बाल अधिकार संगठनों को खोजने में मदद करता है जो जानकारी, पैरवी और शिकायतों में सहायता कर सकते हैं।" },
  "AVA helps users identify disability-focused rehabilitation, therapy, assistive-device and inclusion support.": { kn: "ವಿಕಲಚೇತನರಿಗಾಗಿ ಪುನರ್ವಸತಿ, ಚಿಕಿತ್ಸಾ ಸೇವೆಗಳು, ಸಹಾಯಕ ಸಾಧನಗಳು ಮತ್ತು ಒಳಗೊಳ್ಳುವಿಕೆ ಬೆಂಬಲವನ್ನು ಗುರುತಿಸಲು AVA ಸಹಾಯ ಮಾಡುತ್ತದೆ.", hi: "AVA दिव्यांग लोगों के लिए पुनर्वास, चिकित्सा, सहायक उपकरण और समावेशन सहायता पहचानने में मदद करता है।" },
  "AVA helps users identify organisations supporting vulnerable children, women, families and people with disabilities.": { kn: "ದುರ್ಬಲ ಪರಿಸ್ಥಿತಿಯಲ್ಲಿರುವ ಮಕ್ಕಳು, ಮಹಿಳೆಯರು, ಕುಟುಂಬಗಳು ಮತ್ತು ವಿಕಲಚೇತನರಿಗೆ ಬೆಂಬಲ ನೀಡುವ ಸಂಸ್ಥೆಗಳನ್ನು ಗುರುತಿಸಲು AVA ಸಹಾಯ ಮಾಡುತ್ತದೆ.", hi: "AVA संवेदनशील बच्चों, महिलाओं, परिवारों और दिव्यांग लोगों को सहायता देने वाले संगठनों की पहचान करने में मदद करता है।" },
};

function translateData(value: string, language: DataLanguage): string {
  if (language === "en") return value;
  return dataTranslations[value]?.[language] ?? value;
}

function translateHowAva(value: string, language: DataLanguage): string {
  if (language === "en") return value;
  return howAvaTranslations[value]?.[language] ?? value;
}

function translateDataList(values: string[], language: DataLanguage): string[] {
  return values.map((value) => translateData(value, language));
}

const filterTranslations: Record<string, DataTranslation> = {
  "All districts": { kn: "ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು", hi: "सभी जिले" },
  "Bagalkot": { kn: "ಬಾಗಲಕೋಟೆ", hi: "बागलकोट" },
  "Bengaluru Rural": { kn: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ", hi: "बेंगलुरु ग्रामीण" },
  "Bengaluru Urban": { kn: "ಬೆಂಗಳೂರು ನಗರ", hi: "बेंगलुरು शहरी" },
  "Belagavi": { kn: "ಬೆಳಗಾವಿ", hi: "बेलगावी" },
  "Ballari": { kn: "ಬಳ್ಳಾರಿ", hi: "बल्लारी" },
  "Bidar": { kn: "ಬೀದರ್", hi: "बीदर" },
  "Chamarajanagar": { kn: "ಚಾಮರಾಜನಗರ", hi: "चामराजनगर" },
  "Chikkaballapur": { kn: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ", hi: "चिक्कबल्लापुर" },
  "Chikkamagaluru": { kn: "ಚಿಕ್ಕಮಗಳೂರು", hi: "चिक्कमगलूरु" },
  "Chitradurga": { kn: "ಚಿತ್ರದುರ್ಗ", hi: "चित्रदुर्ग" },
  "Dakshina Kannada": { kn: "ದಕ್ಷಿಣ ಕನ್ನಡ", hi: "दक्षिण कन्नड़" },
  "Davanagere": { kn: "ದಾವಣಗೆರೆ", hi: "दावणगेरे" },
  "Dharwad": { kn: "ಧಾರವಾಡ", hi: "धारवाड़" },
  "Gadag": { kn: "ಗದಗ", hi: "गदग" },
  "Hassan": { kn: "ಹಾಸನ", hi: "हासन" },
  "Haveri": { kn: "ಹಾವೇರಿ", hi: "हावेरी" },
  "Kalaburagi": { kn: "ಕಲಬುರಗಿ", hi: "कलाबुरगी" },
  "Kodagu": { kn: "ಕೊಡಗು", hi: "कोडगु" },
  "Kolar": { kn: "ಕೋಲಾರ", hi: "कोलार" },
  "Koppal": { kn: "ಕೊಪ್ಪಳ", hi: "कोप्पल" },
  "Mandya": { kn: "ಮಂಡ್ಯ", hi: "मांड्या" },
  "Mysuru": { kn: "ಮೈಸೂರು", hi: "मैसूरु" },
  "Raichur": { kn: "ರಾಯಚೂರು", hi: "रायचूर" },
  "Ramanagara": { kn: "ರಾಮನಗರ", hi: "रामनगर" },
  "Shivamogga": { kn: "ಶಿವಮೊಗ್ಗ", hi: "शिवमोग्गा" },
  "Tumakuru": { kn: "ತುಮಕೂರು", hi: "तुमकुरु" },
  "Udupi": { kn: "ಉಡುಪಿ", hi: "उडुपी" },
  "Uttara Kannada": { kn: "ಉತ್ತರ ಕನ್ನಡ", hi: "उत्तर कन्नड़" },
  "Vijayapura": { kn: "ವಿಜಯಪುರ", hi: "विजयपुरा" },
  "Yadgir": { kn: "ಯಾದಗಿರಿ", hi: "यादगिरि" },

  "All support areas": { kn: "ಎಲ್ಲಾ ಬೆಂಬಲ ಕ್ಷೇತ್ರಗಳು", hi: "सभी सहायता क्षेत्र" },
  "All organisation types": { kn: "ಎಲ್ಲಾ ಸಂಸ್ಥೆಗಳ ವಿಧಗಳು", hi: "सभी संगठन प्रकार" },
  "All availability": { kn: "ಎಲ್ಲಾ ಲಭ್ಯತೆ", hi: "सभी उपलब्धता" },
  "Contact organisation for current availability": {
    kn: "ಪ್ರಸ್ತುತ ಲಭ್ಯತೆಗಾಗಿ ಸಂಸ್ಥೆಯನ್ನು ಸಂಪರ್ಕಿಸಿ",
    hi: "वर्तमान उपलब्धता के लिए संगठन से संपर्क करें",
  },

  "Women & Gender-Based Violence": {
    kn: "ಮಹಿಳೆಯರು ಮತ್ತು ಲಿಂಗಾಧಾರಿತ ಹಿಂಸೆ",
    hi: "महिलाएँ और लैंगिक हिंसा",
  },
  "Child & Adolescent Support": {
    kn: "ಮಕ್ಕಳು ಮತ್ತು ಕಿಶೋರರಿಗೆ ಬೆಂಬಲ",
    hi: "बच्चों और किशोरों के लिए सहायता",
  },
  "LGBTQ+ Support": { kn: "LGBTQ+ ಬೆಂಬಲ", hi: "LGBTQ+ सहायता" },
  "Mental Health & Trauma": {
    kn: "ಮಾನಸಿಕ ಆರೋಗ್ಯ ಮತ್ತು ಆಘಾತ",
    hi: "मानसिक स्वास्थ्य और आघात",
  },
  "Sexual Violence Survivors": {
    kn: "ಲೈಂಗಿಕ ಹಿಂಸೆಯಿಂದ ಬದುಕುಳಿದವರು",
    hi: "यौन हिंसा से बचे लोग",
  },
  "Domestic Violence Support": {
    kn: "ಕೌಟುಂಬಿಕ ಹಿಂಸೆ ಬೆಂಬಲ",
    hi: "घरेलू हिंसा सहायता",
  },
  "Human Trafficking": { kn: "ಮಾನವ ಕಳ್ಳಸಾಗಣೆ", hi: "मानव तस्करी" },
  "Disability & Vulnerable Victims": {
    kn: "ವಿಕಲಚೇತನರು ಮತ್ತು ದುರ್ಬಲ ಬಾಧಿತರಿಗೆ ಬೆಂಬಲ",
    hi: "दिव्यांग और संवेदनशील पीड़ितों के लिए सहायता",
  },
  "Elder Abuse": { kn: "ವೃದ್ಧರ ಮೇಲಿನ ದೌರ್ಜನ್ಯ", hi: "वृद्धों के साथ दुर्व्यवहार" },
  "Migrant / Interstate Worker Support": {
    kn: "ವಲಸೆ / ಅಂತರರಾಜ್ಯ ಕಾರ್ಮಿಕರ ಬೆಂಬಲ",
    hi: "प्रवासी / अंतरराज्यीय श्रमिक सहायता",
  },
  "NGO": { kn: "ಎನ್‌ಜಿಒ", hi: "एनजीओ" },
  "Charitable Organisation": {
    kn: "ಚಾರಿಟಬಲ್ ಸಂಸ್ಥೆ",
    hi: "धर्मार्थ संगठन",
  },
  "Community Organisation": {
    kn: "ಸಮುದಾಯ ಸಂಸ್ಥೆ",
    hi: "सामुदायिक संगठन",
  },
  "Peer Support Group": {
    kn: "ಸಹಾಯ ಗುಂಪು",
    hi: "सहायता समूह",
  },
};

function translateFilterOption(value: string, language: DataLanguage): string {
  if (language === "en") return value;
  return filterTranslations[value]?.[language] ?? translateData(value, language);
}

const ngos: NgoRecord[] = [
  {
    id: "odanadi",
    name: "Odanadi Seva Samsthe",
    districts: ["Mysuru"],
    organisationType: "NGO",
    supportAreas: [
      "Sexual Violence Survivors",
      "Human Trafficking",
      "Child & Adolescent Support",
      "Domestic Violence Support",
    ],
    services: [
      "Rescue and rehabilitation",
      "Shelter",
      "Counselling",
      "Legal and prosecution support",
      "Reintegration",
      "Prevention and advocacy",
      "Education and vocational training",
    ],
    whoTheySupport: ["Women", "Girls", "Boys", "Children"],
    languages: ["English", "Kannada"],
    phone: "0821-2415000",
    email: "odanadi@odanadi.org",
    website: "https://odanadi.org",
    address: "Mysuru, Karnataka",
    availability: "Contact organisation for current availability",
    accessibility: "Contact organisation for accessibility arrangements.",
    officialSource: "Official organisation website",
    lastVerified: "5 October 2026",
    verificationStatus: "VERIFIED",
    howAvaCanHelp:
      "AVA helps you identify Odanadi as a specialised organisation for trafficking, sexual violence and related survivor support.",
  },
  {
    id: "bembala",
    name: "Bembala Foundation",
    districts: ["Bengaluru Urban"],
    organisationType: "NGO",
    supportAreas: [
      "Domestic Violence Support",
      "Women & Gender-Based Violence",
      "Child & Adolescent Support",
    ],
    services: [
      "Crisis support",
      "Emotional support",
      "Information and guidance",
      "Referrals",
      "Police referrals",
      "Legal referrals",
      "Shelter referrals",
      "Counselling referrals",
      "Medical and mental-health referrals",
      "Vocational support referrals",
    ],
    whoTheySupport: ["Women", "Children"],
    languages: ["English", "Kannada"],
    phone: "Contact organisation",
    email: "Contact organisation",
    website: "https://bembala.org",
    address: "Bengaluru, Karnataka",
    availability: "Contact organisation for current availability",
    accessibility: "Contact organisation for accessibility arrangements.",
    officialSource: "Official organisation website",
    lastVerified: "5 October 2026",
    verificationStatus: "VERIFIED",
    howAvaCanHelp:
      "AVA helps connect survivors with a verified organisation offering crisis support, guidance and referrals.",
  },
  {
    id: "raahi",
    name: "RAAHI: A Journey Towards Dignity",
    districts: ["Bengaluru Urban", "Bengaluru Rural"],
    organisationType: "NGO",
    supportAreas: [
      "LGBTQ+ Support",
      "Women & Gender-Based Violence",
      "Mental Health & Trauma",
    ],
    services: [
      "Crisis intervention",
      "Pro bono legal aid",
      "Shelter support",
      "Mental-health support",
      "Medical referrals",
      "Gender-affirming support",
      "Advocacy",
    ],
    whoTheySupport: [
      "Trans men and transmasculine people",
      "Queer, lesbian and bisexual women",
      "Gender non-conforming people",
      "Non-binary people",
      "Intersex people",
    ],
    languages: ["English", "Kannada"],
    phone: "Contact organisation",
    email: "Contact organisation",
    website: "https://raahi.org.in",
    address: "Bengaluru, Karnataka",
    availability: "Contact organisation for current availability",
    accessibility: "Contact organisation for accessibility arrangements.",
    officialSource: "Official organisation website",
    lastVerified: "5 October 2026",
    verificationStatus: "VERIFIED",
    howAvaCanHelp:
      "AVA helps users find specialised LGBTQIA+ crisis, legal, shelter, medical and mental-health support.",
  },
  {
    id: "ondede",
    name: "Ondede",
    districts: ["Bengaluru Urban"],
    organisationType: "NGO",
    supportAreas: [
      "Women & Gender-Based Violence",
      "LGBTQ+ Support",
      "Child & Adolescent Support",
    ],
    services: [
      "Community development",
      "Family intervention",
      "GBV support",
      "Legal consultations",
      "Mental-health-related support",
      "Digital safety",
      "Advocacy",
      "Research",
    ],
    whoTheySupport: [
      "Children",
      "Women",
      "Sexual minorities",
      "Transgender people",
      "Gender non-conforming people",
      "Vulnerable groups",
    ],
    languages: ["English", "Kannada"],
    phone: "Contact organisation",
    email: "Contact organisation",
    website: "https://ondede.co.in",
    address: "Bengaluru, Karnataka",
    availability: "Contact organisation for current availability",
    accessibility: "Contact organisation for accessibility arrangements.",
    officialSource: "Official organisation website",
    lastVerified: "5 October 2026",
    verificationStatus: "VERIFIED",
    howAvaCanHelp:
      "AVA helps users locate an organisation working across gender-based violence, child rights and sexual-minority rights.",
  },
  {
    id: "garima-trust",
    name: "Garima Trust",
    districts: ["Bengaluru Urban"],
    organisationType: "NGO",
    supportAreas: [
      "Women & Gender-Based Violence",
      "Child & Adolescent Support",
      "Migrant / Interstate Worker Support",
    ],
    services: [
      "Awareness and prevention",
      "Child sexual-abuse prevention",
      "Healthcare access",
      "Learning and day-care support",
      "Gender and sexuality education",
    ],
    whoTheySupport: ["Women", "Children", "Migrant workers"],
    languages: ["English", "Kannada"],
    phone: "Contact organisation",
    email: "Contact organisation",
    website: "Contact organisation",
    address: "Bengaluru, Karnataka",
    availability: "Contact organisation for current availability",
    accessibility: "Contact organisation for accessibility arrangements.",
    officialSource: "Authoritative organisation information",
    lastVerified: "5 October 2026",
    verificationStatus: "REQUIRES REVIEW",
    howAvaCanHelp:
      "AVA highlights the organisation's relevant support areas while directing users to confirm current services before visiting.",
  },
  {
    id: "saraswathi-charitable-trust",
    name: "Saraswathi Charitable Trust (R)",
    districts: ["Mysuru"],
    organisationType: "Charitable Organisation",
    supportAreas: [
      "Women & Gender-Based Violence",
      "Mental Health & Trauma",
      "Domestic Violence Support",
    ],
    services: [
      "Mental-health care",
      "Counselling",
      "Legal guidance",
      "Police assistance",
      "Short-stay shelter",
      "Healthcare",
      "Rehabilitation",
      "Education and skills support",
    ],
    whoTheySupport: ["Women", "Girls", "Vulnerable women"],
    languages: ["English", "Kannada"],
    phone: "Contact organisation",
    email: "Contact organisation",
    website: "Contact organisation",
    address: "Mysuru, Karnataka",
    availability: "Contact organisation for current availability",
    accessibility: "Contact organisation for accessibility arrangements.",
    officialSource: "Authoritative organisation information",
    lastVerified: "5 October 2026",
    verificationStatus: "REQUIRES REVIEW",
    howAvaCanHelp:
      "AVA helps users identify relevant support areas and provides a clear reminder to confirm current availability.",
  },
  {
    id: "gass",
    name: "Gramina Abyuday Seva Samsthe (GASS)",
    districts: ["Bengaluru Rural"],
    organisationType: "NGO",
    supportAreas: [
      "Women & Gender-Based Violence",
      "Child & Adolescent Support",
      "Disability & Vulnerable Victims",
      "Mental Health & Trauma",
      "Elder Abuse",
    ],
    services: [
      "Short-stay homes",
      "Counselling",
      "Rehabilitation",
      "Emergency relief",
      "Recovery support",
      "Disability rehabilitation",
      "Senior care",
    ],
    whoTheySupport: [
      "Women",
      "Children",
      "People with disabilities",
      "Senior citizens",
      "People in difficult circumstances",
    ],
    languages: ["English", "Kannada"],
    phone: "Contact organisation",
    email: "Contact organisation",
    website: "Contact organisation",
    address: "Bengaluru Rural, Karnataka",
    availability: "Contact organisation for current availability",
    accessibility: "Contact organisation for accessibility arrangements.",
    officialSource: "Authoritative organisation information",
    lastVerified: "5 October 2026",
    verificationStatus: "REQUIRES REVIEW",
    howAvaCanHelp:
      "AVA helps users identify organisations serving vulnerable people across several support needs.",
  },
  {
    id: "apsa",
    name: "APSA — Association for Promoting Social Action",
    districts: ["Bengaluru Urban"],
    organisationType: "NGO",
    supportAreas: [
      "Child & Adolescent Support",
      "Human Trafficking",
      "Sexual Violence Survivors",
    ],
    services: [
      "Child protection",
      "Rescue coordination",
      "Medical referrals",
      "Legal referrals",
      "Temporary shelter",
      "Long-term shelter",
      "Family restoration",
      "Counselling",
      "Psychosocial support",
    ],
    whoTheySupport: [
      "Children",
      "Children in distress",
      "Children affected by trafficking",
      "Children affected by abuse",
      "Homeless children",
    ],
    languages: ["English", "Kannada"],
    phone: "Contact organisation",
    email: "Contact organisation",
    website: "https://apsaindia.org",
    address: "Bengaluru, Karnataka",
    availability: "Contact organisation for current availability",
    accessibility: "Contact organisation for accessibility arrangements.",
    officialSource: "Official organisation website",
    lastVerified: "5 October 2026",
    verificationStatus: "VERIFIED",
    howAvaCanHelp:
      "AVA helps identify child-protection support involving shelter, referrals, counselling and family restoration.",
  },
  {
    id: "sparsha-trust",
    name: "Sparsha Trust",
    districts: ["Bengaluru Urban"],
    organisationType: "NGO",
    supportAreas: [
      "Child & Adolescent Support",
      "Disability & Vulnerable Victims",
    ],
    services: [
      "Safe homes",
      "Residential care",
      "Education",
      "Healthcare",
      "Counselling",
      "Family and community support",
      "After-care",
      "Shelter",
    ],
    whoTheySupport: [
      "Children",
      "Young people",
      "Women",
      "Senior citizens",
      "People in difficult circumstances",
    ],
    languages: ["English", "Kannada"],
    phone: "Contact organisation",
    email: "Contact organisation",
    website: "https://sparshatrust.org",
    address: "Bengaluru, Karnataka",
    availability: "Contact organisation for current availability",
    accessibility: "Contact organisation for accessibility arrangements.",
    officialSource: "Official organisation website",
    lastVerified: "5 October 2026",
    verificationStatus: "VERIFIED",
    howAvaCanHelp:
      "AVA helps users locate a support organisation providing shelter, care, counselling and after-care services.",
  },
  {
    id: "vidyaranya",
    name: "Vidyaranya",
    districts: ["Bengaluru Urban", "Ramanagara", "Hassan"],
    organisationType: "NGO",
    supportAreas: [
      "Child & Adolescent Support",
      "Women & Gender-Based Violence",
      "Elder Abuse",
      "Disability & Vulnerable Victims",
    ],
    services: [
      "Residential rehabilitation",
      "Shelter",
      "Food and clothing",
      "Education",
      "Women’s empowerment",
      "Support for children with disabilities",
      "Senior support",
    ],
    whoTheySupport: [
      "Vulnerable children",
      "Women",
      "Elderly people",
      "People with disabilities",
    ],
    languages: ["English", "Kannada"],
    phone: "Contact organisation",
    email: "Contact organisation",
    website: "Contact organisation",
    address: "Karnataka",
    availability: "Contact organisation for current availability",
    accessibility: "Contact organisation for accessibility arrangements.",
    officialSource: "Authoritative organisation information",
    lastVerified: "5 October 2026",
    verificationStatus: "REQUIRES REVIEW",
    howAvaCanHelp:
      "AVA helps users identify support relevant to vulnerable children, women, older people and people with disabilities.",
  },
  {
    id: "nightingales",
    name: "Nightingales Medical Trust",
    districts: ["Bengaluru Urban"],
    organisationType: "NGO",
    supportAreas: ["Elder Abuse", "Disability & Vulnerable Victims"],
    services: [
      "Elder-abuse intervention",
      "Elders Helpline",
      "Elder Line Karnataka",
      "Residential care",
      "Geriatric support",
      "Counselling",
      "Care services",
    ],
    whoTheySupport: ["Senior citizens", "Elderly people in distress"],
    languages: ["English", "Kannada"],
    phone: "1090 / 14567",
    email: "Contact organisation",
    website: "https://nightingaleseldercare.com",
    address: "Bengaluru, Karnataka",
    availability: "Contact organisation for current availability",
    accessibility: "Contact organisation for accessibility arrangements.",
    officialSource: "Official organisation website",
    lastVerified: "5 October 2026",
    verificationStatus: "VERIFIED",
    howAvaCanHelp:
      "AVA helps older people and caregivers identify dedicated elder-support and abuse-intervention services.",
  },
  {
    id: "sa-mudra",
    name: "SA-MUDRA Foundation",
    districts: ["Bengaluru Urban"],
    organisationType: "NGO",
    supportAreas: ["Mental Health & Trauma", "Women & Gender-Based Violence"],
    services: [
      "Mental-health first aid",
      "Telephonic counselling",
      "Guidance",
      "Psychosocial interventions",
      "Youth support",
      "Women’s support",
      "Crisis and suicide-prevention awareness",
    ],
    whoTheySupport: [
      "Young people",
      "Women",
      "People experiencing distress",
    ],
    languages: ["English", "Kannada"],
    phone: "Contact organisation",
    email: "Contact organisation",
    website: "Contact organisation",
    address: "Bengaluru, Karnataka",
    availability: "Contact organisation for current availability",
    accessibility: "Contact organisation for accessibility arrangements.",
    officialSource: "Authoritative organisation information",
    lastVerified: "5 October 2026",
    verificationStatus: "REQUIRES REVIEW",
    howAvaCanHelp:
      "AVA helps users identify mental-health and psychosocial support options and encourages confirmation before contact.",
  },
  {
    id: "vishwas",
    name: "VISHWAS Society for Mental Health",
    districts: ["Bengaluru Urban"],
    organisationType: "NGO",
    supportAreas: ["Mental Health & Trauma"],
    services: ["Counselling", "Mental-health support"],
    whoTheySupport: ["People experiencing emotional distress"],
    languages: ["English", "Kannada"],
    phone: "Contact organisation",
    email: "Contact organisation",
    website: "Contact organisation",
    address: "Bengaluru, Karnataka",
    availability: "Contact organisation for current availability",
    accessibility: "Contact organisation for accessibility arrangements.",
    officialSource: "Authoritative organisation information",
    lastVerified: "5 October 2026",
    verificationStatus: "REQUIRES REVIEW",
    howAvaCanHelp:
      "AVA helps users locate mental-health support and understand the type of assistance available.",
  },
  {
    id: "child-rights-trust",
    name: "Child Rights Trust",
    districts: ["Bengaluru Urban"],
    organisationType: "NGO",
    supportAreas: ["Child & Adolescent Support"],
    services: [
      "Child-rights awareness",
      "Training",
      "Policy inputs",
      "Monitoring",
      "Research",
      "Legal-process support for children’s grievances",
    ],
    whoTheySupport: ["Children", "Young people", "Child-rights stakeholders"],
    languages: ["English", "Kannada"],
    phone: "Contact organisation",
    email: "Contact organisation",
    website: "Contact organisation",
    address: "Bengaluru, Karnataka",
    availability: "Contact organisation for current availability",
    accessibility: "Contact organisation for accessibility arrangements.",
    officialSource: "Authoritative organisation information",
    lastVerified: "5 October 2026",
    verificationStatus: "REQUIRES REVIEW",
    howAvaCanHelp:
      "AVA helps users find child-rights organisations that may assist with information, advocacy and grievances.",
  },
  {
    id: "apd",
    name: "Association for People with Disability (APD)",
    districts: ["Bengaluru Urban"],
    organisationType: "NGO",
    supportAreas: ["Disability & Vulnerable Victims"],
    services: [
      "Early intervention",
      "Rehabilitation",
      "Therapy",
      "Assistive devices",
      "Adaptive devices",
      "Family support",
      "Social-security guidance",
      "Inclusion support",
    ],
    whoTheySupport: [
      "People with disabilities",
      "Children with disabilities",
      "Families",
    ],
    languages: ["English", "Kannada"],
    phone: "Contact organisation",
    email: "Contact organisation",
    website: "https://apd-india.org",
    address: "Bengaluru, Karnataka",
    availability: "Contact organisation for current availability",
    accessibility: "Accessibility-focused services are available; confirm specific arrangements.",
    officialSource: "Official organisation website",
    lastVerified: "5 October 2026",
    verificationStatus: "VERIFIED",
    howAvaCanHelp:
      "AVA helps users identify disability-focused rehabilitation, therapy, assistive-device and inclusion support.",
  },
  {
    id: "maya",
    name: "MAYA",
    districts: ["Bengaluru Urban"],
    organisationType: "NGO",
    supportAreas: [
      "Child & Adolescent Support",
      "Disability & Vulnerable Victims",
      "Women & Gender-Based Violence",
    ],
    services: [
      "Inclusive development",
      "Support for children with intellectual and developmental disabilities",
      "Women’s entrepreneurship",
      "Health support",
      "Livelihood support",
    ],
    whoTheySupport: [
      "Children",
      "People with disabilities",
      "Women",
      "Vulnerable families",
    ],
    languages: ["English", "Kannada"],
    phone: "Contact organisation",
    email: "Contact organisation",
    website: "Contact organisation",
    address: "Bengaluru, Karnataka",
    availability: "Contact organisation for current availability",
    accessibility: "Contact organisation for accessibility arrangements.",
    officialSource: "Authoritative organisation information",
    lastVerified: "5 October 2026",
    verificationStatus: "REQUIRES REVIEW",
    howAvaCanHelp:
      "AVA helps users identify organisations supporting vulnerable children, women, families and people with disabilities.",
  },
];

const supportAreas = [
  "All support areas",
  "Women & Gender-Based Violence",
  "Child & Adolescent Support",
  "LGBTQ+ Support",
  "Mental Health & Trauma",
  "Sexual Violence Survivors",
  "Domestic Violence Support",
  "Human Trafficking",
  "Disability & Vulnerable Victims",
  "Elder Abuse",
  "Migrant / Interstate Worker Support",
];

const organisationTypes = [
  "All organisation types",
  "NGO",
  "Charitable Organisation",
  "Community Organisation",
  "Peer Support Group",
];

const districts = [
  "All districts",
  "Bagalkot",
  "Bengaluru Rural",
  "Bengaluru Urban",
  "Belagavi",
  "Ballari",
  "Bidar",
  "Chamarajanagar",
  "Chikkaballapur",
  "Chikkamagaluru",
  "Chitradurga",
  "Dakshina Kannada",
  "Davanagere",
  "Dharwad",
  "Gadag",
  "Hassan",
  "Haveri",
  "Kalaburagi",
  "Kodagu",
  "Kolar",
  "Koppal",
  "Mandya",
  "Mysuru",
  "Raichur",
  "Ramanagara",
  "Shivamogga",
  "Tumakuru",
  "Udupi",
  "Uttara Kannada",
  "Vijayapura",
  "Yadgir",
];

const availabilityOptions = [
  "All availability",
  "Contact organisation for current availability",
];

export default function NgoDirectoryPage() {
  const { language } = useLanguage();
  const dataLanguage = language as DataLanguage;

  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("All districts");
  const [supportArea, setSupportArea] = useState("All support areas");
  const [organisationType, setOrganisationType] = useState(
    "All organisation types",
  );
  const [availability, setAvailability] = useState("All availability");

  const ui = {
    en: {
      title: "NGOs & Support Groups",
      subtitle:
        "Find organisations and community services that may support victims, survivors and vulnerable people across Karnataka.",
      noticeTitle: "About this directory",
      notice:
        "AVA includes organisations researched against available authoritative sources. Always confirm current services, contact details and availability before relying on them.",
      search: "Search organisations, services or support areas",
      district: "District",
      supportArea: "Support area",
      organisationType: "Organisation type",
      availability: "Availability",
      results: "organisations found",
      clear: "Clear filters",
      verified: "Verified",
      requiresReview: "Requires review",
      supportAreas: "Support areas",
      services: "Services",
      who: "Who they support",
      languages: "Languages",
      contact: "Contact",
      address: "Location",
      availabilityLabel: "Availability",
      accessibility: "Accessibility",
      source: "Source",
      lastVerified: "Last researched",
      howAvaHelps: "How AVA can help",
      website: "Website",
      email: "Email",
      phone: "Phone",
      back: "Back to support",
      karnatakaDirectory: "Karnataka Directory",
      avaSupportDirectory: "AVA Support Directory",
      about: "About",
      privacy: "Privacy",
      disclaimer: "Disclaimer",
      reportIncorrect: "Report Incorrect Information",
      noResults: "No organisations match your filters.",
      reviewNotice:
        "Please confirm current services and contact details directly with the organisation.",
    },
    kn: {
      title: "ಎನ್‌ಜಿಒಗಳು ಮತ್ತು ಬೆಂಬಲ ಗುಂಪುಗಳು",
      subtitle:
        "ಕರ್ನಾಟಕದಾದ್ಯಂತ ಬಾಧಿತರು, ಬದುಕುಳಿದವರು ಮತ್ತು ದುರ್ಬಲ ವ್ಯಕ್ತಿಗಳಿಗೆ ಬೆಂಬಲ ನೀಡಬಹುದಾದ ಸಂಸ್ಥೆಗಳು ಮತ್ತು ಸಮುದಾಯ ಸೇವೆಗಳನ್ನು ಹುಡುಕಿ.",
      noticeTitle: "ಈ ಡೈರೆಕ್ಟರಿ ಬಗ್ಗೆ",
      notice:
        "ಲಭ್ಯವಿರುವ ಅಧಿಕೃತ ಮೂಲಗಳ ಆಧಾರದ ಮೇಲೆ AVA ಸಂಸ್ಥೆಗಳ ಮಾಹಿತಿಯನ್ನು ಸಂಶೋಧಿಸಿದೆ. ಸೇವೆಗಳು, ಸಂಪರ್ಕ ವಿವರಗಳು ಮತ್ತು ಲಭ್ಯತೆಯನ್ನು ಬಳಸುವ ಮೊದಲು ನೇರವಾಗಿ ದೃಢೀಕರಿಸಿ.",
      search: "ಸಂಸ್ಥೆಗಳು, ಸೇವೆಗಳು ಅಥವಾ ಬೆಂಬಲ ಕ್ಷೇತ್ರಗಳನ್ನು ಹುಡುಕಿ",
      district: "ಜಿಲ್ಲೆ",
      supportArea: "ಬೆಂಬಲ ಕ್ಷೇತ್ರ",
      organisationType: "ಸಂಸ್ಥೆಯ ಪ್ರಕಾರ",
      availability: "ಲಭ್ಯತೆ",
      results: "ಸಂಸ್ಥೆಗಳು ಕಂಡುಬಂದಿವೆ",
      clear: "ಫಿಲ್ಟರ್‌ಗಳನ್ನು ತೆರವುಗೊಳಿಸಿ",
      verified: "ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
      requiresReview: "ಪುನಃ ಪರಿಶೀಲನೆ ಅಗತ್ಯ",
      supportAreas: "ಬೆಂಬಲ ಕ್ಷೇತ್ರಗಳು",
      services: "ಸೇವೆಗಳು",
      who: "ಯಾರಿಗೆ ಬೆಂಬಲ",
      languages: "ಭಾಷೆಗಳು",
      contact: "ಸಂಪರ್ಕ",
      address: "ಸ್ಥಳ",
      availabilityLabel: "ಲಭ್ಯತೆ",
      accessibility: "ಪ್ರವೇಶಸೌಲಭ್ಯ",
      source: "ಮೂಲ",
      lastVerified: "ಕೊನೆಯ ಸಂಶೋಧನೆ",
      howAvaHelps: "AVA ಹೇಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ",
      website: "ವೆಬ್‌ಸೈಟ್",
      email: "ಇಮೇಲ್",
      phone: "ಫೋನ್",
      back: "ಬೆಂಬಲಕ್ಕೆ ಹಿಂತಿರುಗಿ",
      karnatakaDirectory: "ಕರ್ನಾಟಕ ಡೈರೆಕ್ಟರಿ",
      avaSupportDirectory: "AVA ಬೆಂಬಲ ಡೈರೆಕ್ಟರಿ",
      about: "AVA ಬಗ್ಗೆ",
      privacy: "ಗೌಪ್ಯತೆ",
      disclaimer: "ಹಕ್ಕುತ್ಯಾಗ",
      reportIncorrect: "ತಪ್ಪಾದ ಮಾಹಿತಿಯನ್ನು ವರದಿ ಮಾಡಿ",
      noResults: "ನಿಮ್ಮ ಫಿಲ್ಟರ್‌ಗಳಿಗೆ ಯಾವುದೇ ಸಂಸ್ಥೆಗಳು ಹೊಂದಿಕೆಯಾಗಲಿಲ್ಲ.",
      reviewNotice:
        "ಪ್ರಸ್ತುತ ಸೇವೆಗಳು ಮತ್ತು ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ಸಂಸ್ಥೆಯೊಂದಿಗೆ ನೇರವಾಗಿ ದೃಢೀಕರಿಸಿ.",
    },
    hi: {
      title: "एनजीओ और सहायता समूह",
      subtitle:
        "कर्नाटक में पीड़ितों, बचे हुए लोगों और संवेदनशील व्यक्तियों की सहायता करने वाले संगठनों और सामुदायिक सेवाओं को खोजें।",
      noticeTitle: "इस निर्देशिका के बारे में",
      notice:
        "AVA उपलब्ध आधिकारिक स्रोतों के आधार पर संगठनों की जानकारी शामिल करता है। सेवाओं, संपर्क विवरण और उपलब्धता पर भरोसा करने से पहले सीधे पुष्टि करें।",
      search: "संगठन, सेवाएँ या सहायता क्षेत्र खोजें",
      district: "जिला",
      supportArea: "सहायता क्षेत्र",
      organisationType: "संगठन का प्रकार",
      availability: "उपलब्धता",
      results: "संगठन मिले",
      clear: "फ़िल्टर साफ़ करें",
      verified: "सत्यापित",
      requiresReview: "पुनः समीक्षा आवश्यक",
      supportAreas: "सहायता क्षेत्र",
      services: "सेवाएँ",
      who: "किसके लिए",
      languages: "भाषाएँ",
      contact: "संपर्क",
      address: "स्थान",
      availabilityLabel: "उपलब्धता",
      accessibility: "सुलभता",
      source: "स्रोत",
      lastVerified: "अंतिम शोध",
      howAvaHelps: "AVA कैसे मदद कर सकता है",
      website: "वेबसाइट",
      email: "ईमेल",
      phone: "फ़ोन",
      back: "सहायता पर वापस जाएँ",
      karnatakaDirectory: "कर्नाटक निर्देशिका",
      avaSupportDirectory: "AVA सहायता निर्देशिका",
      about: "AVA के बारे में",
      privacy: "गोपनीयता",
      disclaimer: "अस्वीकरण",
      reportIncorrect: "गलत जानकारी की रिपोर्ट करें",
      noResults: "आपके फ़िल्टर से कोई संगठन मेल नहीं खाता।",
      reviewNotice:
        "वर्तमान सेवाओं और संपर्क विवरण की सीधे संगठन से पुष्टि करें।",
    },
  }[language];

  const filteredNgos = useMemo(() => {
    const query = search.trim().toLowerCase();

    return ngos.filter((ngo) => {
      const searchableText = [
        ngo.name,
        ...ngo.districts,
        ngo.organisationType,
        ...ngo.supportAreas,
        ...ngo.services,
        ...ngo.whoTheySupport,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      const matchesDistrict =
        district === "All districts" || ngo.districts.includes(district);

      const matchesArea =
        supportArea === "All support areas" ||
        ngo.supportAreas.includes(supportArea);

      const matchesType =
        organisationType === "All organisation types" ||
        ngo.organisationType === organisationType;

      const matchesAvailability =
        availability === "All availability" ||
        ngo.availability === availability;

      return (
        matchesSearch &&
        matchesDistrict &&
        matchesArea &&
        matchesType &&
        matchesAvailability
      );
    });
  }, [search, district, supportArea, organisationType, availability]);

  const clearFilters = () => {
    setSearch("");
    setDistrict("All districts");
    setSupportArea("All support areas");
    setOrganisationType("All organisation types");
    setAvailability("All availability");
  };

  const hasFilters =
    search ||
    district !== "All districts" ||
    supportArea !== "All support areas" ||
    organisationType !== "All organisation types" ||
    availability !== "All availability";

  return (
    <main className="min-h-screen bg-ava-cream text-ava-charcoal">
      <header className="border-b border-ava-mist bg-white/80">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/support"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ava-slate hover:text-ava-charcoal"
            >
              ← {ui.back}
            </Link>

            <div className="rounded-full bg-ava-rose/15 px-4 py-2 text-xs font-bold text-ava-slate">
              {ui.karnatakaDirectory}
            </div>
          </div>

          <div className="mt-8 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-ava-rose">
              {ui.avaSupportDirectory}
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-ava-charcoal sm:text-4xl">
              {ui.title}
            </h1>

            <p className="mt-4 text-base leading-7 text-ava-slate sm:text-lg">
              {ui.subtitle}
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
        <div className="rounded-2xl border border-ava-rose/30 bg-ava-rose/10 p-5">
          <h2 className="font-semibold text-ava-charcoal">
            {ui.noticeTitle}
          </h2>

          <p className="mt-2 max-w-4xl text-sm leading-6 text-ava-slate">
            {ui.notice}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
        <div className="rounded-2xl border border-ava-mist bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-ava-charcoal">
                {ui.search}
              </label>

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={ui.search}
                className="w-full rounded-xl border border-ava-mist bg-ava-cream px-4 py-3 text-base outline-none transition focus:border-ava-rose focus:ring-2 focus:ring-ava-rose/20"
              />
            </div>

            <FilterSelect
              label={ui.district}
              value={district}
              onChange={setDistrict}
              options={districts}
              language={dataLanguage}
            />

            <FilterSelect
              label={ui.supportArea}
              value={supportArea}
              onChange={setSupportArea}
              options={supportAreas}
              language={dataLanguage}
            />

            <FilterSelect
              label={ui.organisationType}
              value={organisationType}
              onChange={setOrganisationType}
              options={organisationTypes}
              language={dataLanguage}
            />

            <FilterSelect
              label={ui.availability}
              value={availability}
              onChange={setAvailability}
              options={availabilityOptions}
              language={dataLanguage}
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-ava-mist pt-5">
            <p className="text-sm text-ava-slate">
              <span className="font-bold text-ava-charcoal">
                {filteredNgos.length}
              </span>{" "}
              {ui.results}
            </p>

            {hasFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-xl bg-ava-slate px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ava-charcoal"
              >
                {ui.clear}
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        {filteredNgos.length === 0 ? (
          <div className="rounded-2xl border border-ava-mist bg-white p-10 text-center">
            <p className="font-semibold text-ava-charcoal">
              {ui.noResults}
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 rounded-xl bg-ava-rose px-5 py-3 text-sm font-semibold text-white"
            >
              {ui.clear}
            </button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredNgos.map((ngo) => (
              <article
                key={ngo.id}
                className="overflow-hidden rounded-2xl border border-ava-mist bg-white shadow-sm"
              >
                <div className="border-b border-ava-mist bg-ava-slate p-6 text-white">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-bold">{ngo.name}</h2>

                      <p className="mt-1 text-sm text-white/80">
                        {translateDataList(ngo.districts, dataLanguage).join(" • ")} ·{" "}
                        {translateData(ngo.organisationType, dataLanguage)}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                        ngo.verificationStatus === "VERIFIED"
                          ? "bg-white text-ava-slate"
                          : "bg-ava-rose text-white"
                      }`}
                    >
                      {ngo.verificationStatus === "VERIFIED"
                        ? `✓ ${ui.verified}`
                        : ui.requiresReview}
                    </span>
                  </div>
                </div>

                <div className="space-y-6 p-6">
                  <InfoSection title={ui.supportAreas}>
                    <div className="flex flex-wrap gap-2">
                      {ngo.supportAreas.map((area) => (
                        <span
                          key={area}
                          className="rounded-full bg-ava-mist px-3 py-1.5 text-xs font-semibold text-ava-slate"
                        >
                          {translateData(area, dataLanguage)}
                        </span>
                      ))}
                    </div>
                  </InfoSection>

                  <InfoSection title={ui.services}>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {ngo.services.map((service) => (
                        <li
                          key={service}
                          className="text-sm leading-5 text-ava-slate"
                        >
                          <span className="mr-2 text-ava-rose">•</span>
                          {translateData(service, dataLanguage)}
                        </li>
                      ))}
                    </ul>
                  </InfoSection>

                  <InfoSection title={ui.who}>
                    <p className="text-sm leading-6 text-ava-slate">
                      {translateDataList(ngo.whoTheySupport, dataLanguage).join(" • ")}
                    </p>
                  </InfoSection>

                  <div className="grid gap-5 border-t border-ava-mist pt-5 sm:grid-cols-2">
                    <Detail
                      label={ui.languages}
                      value={translateDataList(ngo.languages, dataLanguage).join(" • ")}
                    />

                    <Detail
                      label={ui.address}
                      value={translateData(ngo.address, dataLanguage)}
                    />

                    <Detail
                      label={ui.availabilityLabel}
                      value={translateData(ngo.availability, dataLanguage)}
                    />

                    <Detail
                      label={ui.accessibility}
                      value={translateData(ngo.accessibility, dataLanguage)}
                    />
                  </div>

                  <InfoSection title={ui.contact}>
                    <div className="space-y-2 text-sm text-ava-slate">
                      <p>
                        <strong className="text-ava-charcoal">
                          {ui.phone}:
                        </strong>{" "}
                        {ngo.phone}
                      </p>

                      <p className="break-all">
                        <strong className="text-ava-charcoal">
                          {ui.email}:
                        </strong>{" "}
                        {ngo.email}
                      </p>

                      <p className="break-all">
                        <strong className="text-ava-charcoal">
                          {ui.website}:
                        </strong>{" "}
                        {ngo.website}
                      </p>
                    </div>
                  </InfoSection>

                  <div className="rounded-xl bg-ava-rose/10 p-4">
                    <h3 className="text-sm font-bold text-ava-charcoal">
                      {ui.howAvaHelps}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-ava-slate">
                      {translateHowAva(ngo.howAvaCanHelp, dataLanguage)}
                    </p>
                  </div>

                  {ngo.verificationStatus === "REQUIRES REVIEW" ? (
                    <p className="rounded-xl border border-ava-rose/30 bg-ava-rose/10 p-4 text-xs leading-5 text-ava-slate">
                      {ui.reviewNotice}
                    </p>
                  ) : null}

                  <div className="border-t border-ava-mist pt-4 text-xs leading-5 text-ava-slate">
                    <p>
                      <strong className="text-ava-charcoal">
                        {ui.source}:
                      </strong>{" "}
                      {translateData(ngo.officialSource, dataLanguage)}
                    </p>

                    <p className="mt-1">
                      <strong className="text-ava-charcoal">
                        {ui.lastVerified}:
                      </strong>{" "}
                      {ngo.lastVerified}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-ava-mist bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 text-xs text-ava-slate sm:px-8">
          <p>AVA — App for Victim Assistance</p>

          <div className="flex flex-wrap gap-4">
            <Link href="/about" className="hover:text-ava-charcoal">
              {ui.about}
            </Link>
            <Link href="/privacy" className="hover:text-ava-charcoal">
              {ui.privacy}
            </Link>
            <Link href="/disclaimer" className="hover:text-ava-charcoal">
              {ui.disclaimer}
            </Link>
            <Link href="/report" className="hover:text-ava-charcoal">
              {ui.reportIncorrect}
            </Link>
          </div>
        </div>
      </footer>

      <QuickExit />
    </main>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  language,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  language: DataLanguage;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-ava-charcoal">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-ava-mist bg-ava-cream px-4 py-3 text-base outline-none focus:border-ava-rose focus:ring-2 focus:ring-ava-rose/20"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {translateFilterOption(option, language)}
          </option>
        ))}
      </select>
    </div>
  );
}

function InfoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-3 text-sm font-bold text-ava-charcoal">{title}</h3>
      {children}
    </section>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-ava-dusty">
        {label}
      </p>
      <p className="mt-1 text-sm leading-5 text-ava-slate">{value}</p>
    </div>
  );
}