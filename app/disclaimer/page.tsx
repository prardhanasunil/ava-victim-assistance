"use client";

import Link from "next/link";
import QuickExit from "@/components/QuickExit";
import { useLanguage } from "@/components/LanguageProvider";

export default function DisclaimerPage() {
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
      <section className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-ava-rose">
          {t("importantInformation")}
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {t("disclaimerTitle")}
        </h1>

        <p className="mt-5 text-lg leading-8 text-ava-slate">
          {t("disclaimerIntro")}
        </p>

        {/* General information */}
        <div className="mt-10 space-y-5">
          <section className="rounded-2xl border border-ava-mist bg-ava-white p-6">
            <h2 className="text-xl font-bold text-ava-charcoal">
              {t("generalInformation")}
            </h2>

            <p className="mt-3 leading-7 text-ava-slate">
              {t("generalInformationText")}
            </p>
          </section>

          {/* Legal information */}
          <section className="rounded-2xl border border-ava-mist bg-ava-white p-6">
            <h2 className="text-xl font-bold text-ava-charcoal">
              {t("legalInformation")}
            </h2>

            <p className="mt-3 leading-7 text-ava-slate">
              {t("legalInformationText")}
            </p>
          </section>

          {/* Medical and psychological */}
          <section className="rounded-2xl border border-ava-mist bg-ava-white p-6">
            <h2 className="text-xl font-bold text-ava-charcoal">
              {t("medicalPsychologicalInformation")}
            </h2>

            <p className="mt-3 leading-7 text-ava-slate">
              {t("medicalPsychologicalInformationText")}
            </p>
          </section>

          {/* Service information */}
          <section className="rounded-2xl border border-ava-mist bg-ava-white p-6">
            <h2 className="text-xl font-bold text-ava-charcoal">
              {t("serviceInformation")}
            </h2>

            <p className="mt-3 leading-7 text-ava-slate">
              {t("serviceInformationText")}
            </p>
          </section>

          {/* Privacy */}
          <section className="rounded-2xl border border-ava-mist bg-ava-white p-6">
            <h2 className="text-xl font-bold text-ava-charcoal">
              {t("privacyConfidentiality")}
            </h2>

            <p className="mt-3 leading-7 text-ava-slate">
              {t("privacyConfidentialityText")}
            </p>
          </section>
        </div>

        {/* Emergency notice */}
        <section className="mt-8 rounded-2xl border border-ava-rose/40 bg-ava-rose/10 p-6">
          <h2 className="text-xl font-bold text-ava-charcoal">
            {t("emergencySituations")}
          </h2>

          <p className="mt-3 leading-7 text-ava-slate">
            {t("emergencySituationsText")}
          </p>
        </section>

        {/* Prototype notice */}
        <section className="mt-8 rounded-2xl border border-ava-mist bg-ava-mist/50 p-6">
          <h2 className="text-xl font-bold text-ava-charcoal">
            {t("prototypeNotice")}
          </h2>

          <p className="mt-3 leading-7 text-ava-slate">
            {t("prototypeNoticeText")}
          </p>

          <p className="mt-4 text-sm font-bold uppercase tracking-wide text-ava-rose">
            {t("demoNotForRealWorld")}
          </p>
        </section>
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