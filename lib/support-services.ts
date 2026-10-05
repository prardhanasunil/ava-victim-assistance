import type { Coordinates } from "./distance";

export type SupportService = {
  id: string;
  name: string;
  type: string;
  supportAreas: string[];
  address: string;
  coordinates: Coordinates;
  verified: boolean;
  officialSource: string;
  lastVerified: string;
};

export const supportServices: SupportService[] = [
  {
    id: "bembala-vydehi",
    name: "Bembala Foundation",
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
    coordinates: {
      latitude: 12.975526,
      longitude: 77.729297,
    },
    verified: true,
    officialSource: "https://www.bembalafoundation.org/contactus",
    lastVerified: "5 October 2026",
  },

  {
    id: "apsa-vimanapura",
    name: "APSA — Association for Promoting Social Action",
    type: "NGO / Child Protection",
    supportAreas: [
      "Child protection",
      "Children in distress",
      "Child rights",
      "Community support",
    ],
    address:
      "34, Annasandrapalya, Vimanapura Post, Bengaluru 560017",
    coordinates: {
      latitude: 12.967385,
      longitude: 77.673017,
    },
    verified: true,
    officialSource: "https://apsabangalore.org/contact-us/",
    lastVerified: "5 October 2026",
  },

  {
    id: "apd-lingarajapuram",
    name: "Association for People with Disability (APD) — Lingarajapuram",
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
    coordinates: {
      latitude: 13.007373,
      longitude: 77.6233297,
    },
    verified: true,
    officialSource: "https://www.apd-india.org/contact-us/",
    lastVerified: "5 October 2026",
  },

  {
    id: "apd-kyalasanahalli",
    name: "Association for People with Disability (APD) — Kyalasanahalli",
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
    coordinates: {
      latitude: 13.065739868649047,
      longitude: 77.66138096137546,
    },
    verified: true,
    officialSource: "https://www.apd-india.org/contact-us/",
    lastVerified: "5 October 2026",
  },

  {
    id: "nightingales-kasturinagar",
    name: "Nightingales Centre for Ageing & Alzheimer's",
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
    coordinates: {
      latitude: 13.0034654,
      longitude: 77.6580196,
    },
    verified: true,
    officialSource: "https://www.nightingaleseldercare.com/contact.html",
    lastVerified: "5 October 2026",
  },

  {
    id: "sparsha-mathikere",
    name: "Sparsha Trust",
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
    coordinates: {
      latitude: 13.0308281,
      longitude: 77.5610206,
    },
    verified: true,
    officialSource: "https://sparsha.org/contact-us/",
    lastVerified: "5 October 2026",
  },
];
