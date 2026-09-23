"use client";

import Link from "next/link";
import QuickExit from "@/components/QuickExit";
import { useLanguage } from "@/components/LanguageProvider";

const emergencyServices = [
  {
    icon: "🚨",
    titleKey: "policeEmergency",
    descriptionKey: "policeEmergencyDescription",
    contacts: [
      {
        number: "112",
        labelKey: "emergencyServices",
        sourceKey: "emergencySource112",
      },
    ],
  },
  {
    icon: "🏥",
    titleKey: "medicalEmergency",
    descriptionKey: "medicalEmergencyDescription",
    contacts: [
      {
        number: "112",
        labelKey: "emergencyServices",
        sourceKey: "emergencySource112",
      },
    ],
  },
  {
    icon: "👩",
    titleKey: "womenChildSupport",
    descriptionKey: "womenChildSupportDescription",
    contacts: [
      {
        number: "181",
        labelKey: "womenHelpline",
        sourceKey: "emergencySource181",
      },
      {
        number: "1098",
        labelKey: "childHelpline",
        sourceKey: "emergencySource1098",
      },
    ],
  },
  {
    icon: "💻",
    titleKey: "cybercrimeSupport",
    descriptionKey: "cybercrimeSupportDescription",
    contacts: [
      {
        number: "1930",
        labelKey: "cyberFinancialFraud",
        sourceKey: "emergencySource1930",
      },
    ],
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

              {/* Verified contacts */}
              <div className="mt-6 space-y-4">
                {service.contacts.map((contact) => (
                  <div
                    key={contact.number}
                    className="rounded-xl border border-ava-mist bg-ava-mist/50 p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-ava-slate">
                          {t(contact.labelKey)}
                        </p>

                        <p className="mt-1 text-2xl font-bold tracking-wide text-ava-charcoal">
                          {contact.number}
                        </p>
                      </div>

                      <a
                        href={`tel:${contact.number}`}
                        className="flex min-h-11 items-center justify-center rounded-xl bg-ava-rose px-5 py-3 text-sm font-semibold text-white transition hover:bg-ava-slate focus:outline-none focus:ring-2 focus:ring-ava-rose focus:ring-offset-2"
                        aria-label={`${t("callNow")} ${contact.number}`}
                      >
                        📞 {t("callNow")}
                      </a>
                    </div>

                    <div className="mt-3 border-t border-ava-dusty/30 pt-3">
                      <p className="text-xs leading-5 text-ava-slate">
                        ✓ {t("verifiedContact")}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-ava-slate">
                        {t(contact.sourceKey)}
                      </p>
                    </div>
                  </div>
                ))}
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

          <p className="mt-2">{t("footerDescription")}</p>
        </div>
      </footer>

      <QuickExit />
    </main>
  );
}