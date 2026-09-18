"use client";

import Link from "next/link";
import QuickExit from "@/components/QuickExit";
import { useLanguage } from "@/components/LanguageProvider";

const rights = [
  {
    titleKey: "rightToReport",
    descriptionKey: "rightToReportDescription",
  },
  {
    titleKey: "rightToInformation",
    descriptionKey: "rightToInformationDescription",
  },
  {
    titleKey: "rightToLegalAid",
    descriptionKey: "rightToLegalAidDescription",
  },
  {
    titleKey: "rightToMedicalSupport",
    descriptionKey: "rightToMedicalSupportDescription",
  },
  {
    titleKey: "rightToPsychologicalSupport",
    descriptionKey: "rightToPsychologicalSupportDescription",
  },
  {
    titleKey: "rightToPrivacy",
    descriptionKey: "rightToPrivacyDescription",
  },
  {
    titleKey: "rightToCompensation",
    descriptionKey: "rightToCompensationDescription",
  },
  {
    titleKey: "rightToProtection",
    descriptionKey: "rightToProtectionDescription",
  },
] as const;

export default function RightsPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-ava-cream text-ava-charcoal">
      {/* Header */}
      <header className="border-b border-ava-mist bg-ava-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-sm font-medium text-ava-slate transition-colors hover:text-ava-rose"
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

      {/* Demo warning */}
      <div className="border-b border-ava-rose/20 bg-ava-rose/10 px-6 py-3">
        <div className="mx-auto max-w-6xl text-center text-sm font-medium text-ava-slate">
          {t("demoData")}
        </div>
      </div>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-ava-rose">
          {t("victimInformation")}
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {t("rights")}
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-ava-slate">
          {t("rightsIntro")}
        </p>

        <div className="mt-8 rounded-2xl border border-ava-mist bg-ava-mist/50 p-6">
          <h2 className="font-semibold text-ava-charcoal">
            {t("importantInformation")}
          </h2>

          <p className="mt-2 text-sm leading-6 text-ava-slate">
            {t("rightsImportantText")}
          </p>
        </div>
      </section>

      {/* Rights */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="grid gap-5 md:grid-cols-2">
          {rights.map((right, index) => (
            <article
              key={right.titleKey}
              className={`rounded-2xl border p-7 transition-colors ${
                index === 0 || index === 5
                  ? "border-ava-rose/30 bg-ava-white"
                  : "border-ava-mist bg-ava-white"
              }`}
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    index === 0 || index === 5
                      ? "bg-ava-rose/15 text-ava-rose"
                      : "bg-ava-mist text-ava-slate"
                  }`}
                >
                  {index + 1}
                </span>

                <h2 className="text-xl font-bold text-ava-charcoal">
                  {t(right.titleKey)}
                </h2>
              </div>

              <p className="leading-7 text-ava-slate">
                {t(right.descriptionKey)}
              </p>

              <div className="mt-5 border-t border-ava-mist pt-4">
                <p className="text-xs font-medium uppercase tracking-wide text-ava-dusty">
                  {t("source")}
                </p>

                <p className="mt-1 text-sm text-ava-dusty">
                  {t("demoLegalRecord")}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-ava-mist bg-ava-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="rounded-2xl border border-ava-mist bg-ava-cream p-6">
            <h2 className="font-semibold text-ava-charcoal">
              {t("beforeRelyingOnInformation")}
            </h2>

            <p className="mt-2 text-sm leading-6 text-ava-slate">
              {t("legalInformationChange")}
            </p>
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