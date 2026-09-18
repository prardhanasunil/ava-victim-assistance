"use client";

import Link from "next/link";
import QuickExit from "@/components/QuickExit";
import { useLanguage } from "@/components/LanguageProvider";

const emergencyServices = [
  {
    icon: "🚨",
    titleKey: "policeEmergency",
    descriptionKey: "policeEmergencyDescription",
  },
  {
    icon: "🏥",
    titleKey: "medicalEmergency",
    descriptionKey: "medicalEmergencyDescription",
  },
  {
    icon: "👩",
    titleKey: "womenChildSupport",
    descriptionKey: "womenChildSupportDescription",
  },
  {
    icon: "💻",
    titleKey: "cybercrimeSupport",
    descriptionKey: "cybercrimeSupportDescription",
  },
] as const;

export default function EmergencyPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-ava-cream text-ava-charcoal">
      {/* Header */}
      <header className="border-b border-ava-mist bg-ava-white">
        <div className="mx-auto flex max-w-5xl items-center px-6 py-5">
          <Link
            href="/"
            className="text-sm font-medium text-ava-slate transition hover:text-ava-charcoal"
          >
            ← {t("backToAVA")}
          </Link>
        </div>
      </header>

      {/* Main content */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-ava-rose">
            {t("emergency")}
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ava-charcoal sm:text-5xl">
            {t("emergencyTitle")}
          </h1>

          <p className="mt-5 text-lg leading-8 text-ava-slate">
            {t("emergencyIntro")}
          </p>
        </div>

        {/* Demo warning */}
        <div className="mt-8 rounded-2xl border border-ava-rose/30 bg-ava-rose/10 p-5">
          <p className="font-semibold text-ava-charcoal">
            {t("demoData")}
          </p>

          <p className="mt-2 text-sm leading-6 text-ava-slate">
            {t("emergencyDemoText")}
          </p>
        </div>

        {/* Emergency services */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {emergencyServices.map((service) => (
            <div
              key={service.titleKey}
              className="rounded-2xl border border-ava-mist bg-ava-white p-6 shadow-sm"
            >
              <div className="text-3xl">{service.icon}</div>

              <h2 className="mt-4 text-xl font-semibold text-ava-charcoal">
                {t(service.titleKey)}
              </h2>

              <p className="mt-2 leading-6 text-ava-slate">
                {t(service.descriptionKey)}
              </p>

              <div className="mt-6 rounded-xl bg-ava-mist px-4 py-3 text-sm text-ava-slate">
                {t("noVerifiedContacts")}
              </div>
            </div>
          ))}
        </div>

        {/* Safety note */}
        <div className="mt-10 rounded-2xl border border-ava-mist bg-ava-white p-6">
          <h2 className="font-semibold text-ava-charcoal">
            {t("important")}
          </h2>

          <p className="mt-2 text-sm leading-6 text-ava-slate">
            {t("userChoice")}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10 bg-ava-slate">
        <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-ava-mist">
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