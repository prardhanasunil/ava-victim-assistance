"use client";

import Link from "next/link";
import QuickExit from "@/components/QuickExit";
import { useLanguage } from "@/components/LanguageProvider";

export default function AboutPage() {
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

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-14">
        <p className="text-sm font-semibold uppercase tracking-wider text-ava-rose">
          {t("aboutLabel")}
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {t("aboutTitle")}
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-ava-slate">
          {t("aboutIntro")}
        </p>
      </section>

      {/* What is AVA? */}
      <section className="border-t border-ava-mist bg-ava-white">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <h2 className="text-2xl font-bold text-ava-charcoal">
            {t("aboutWhatIsTitle")}
          </h2>

          <p className="mt-4 text-sm leading-7 text-ava-slate">
            {t("aboutWhatIsText")}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-ava-rose/25 bg-ava-rose/10 p-6">
              <h3 className="font-semibold text-ava-charcoal">
                {t("aboutInformationTitle")}
              </h3>

              <p className="mt-2 text-sm leading-6 text-ava-slate">
                {t("aboutInformationText")}
              </p>
            </div>

            <div className="rounded-2xl border border-ava-mist bg-ava-cream p-6">
              <h3 className="font-semibold text-ava-charcoal">
                {t("aboutSupportTitle")}
              </h3>

              <p className="mt-2 text-sm leading-6 text-ava-slate">
                {t("aboutSupportText")}
              </p>
            </div>

            <div className="rounded-2xl border border-ava-mist bg-ava-cream p-6">
              <h3 className="font-semibold text-ava-charcoal">
                {t("aboutAutonomyTitle")}
              </h3>

              <p className="mt-2 text-sm leading-6 text-ava-slate">
                {t("aboutAutonomyText")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why AVA */}
      <section className="border-t border-ava-mist bg-ava-cream">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <h2 className="text-2xl font-bold text-ava-charcoal">
            {t("aboutWhyTitle")}
          </h2>

          <p className="mt-4 text-sm leading-7 text-ava-slate">
            {t("aboutWhyText")}
          </p>

          <div className="mt-8 rounded-2xl border border-ava-mist bg-ava-mist/50 p-6">
            <h3 className="font-semibold text-ava-charcoal">
              {t("aboutVictimCentredTitle")}
            </h3>

            <p className="mt-2 text-sm leading-6 text-ava-slate">
              {t("aboutVictimCentredText")}
            </p>
          </div>
        </div>
      </section>

      {/* What AVA provides */}
      <section className="border-t border-ava-mist bg-ava-white">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <h2 className="text-2xl font-bold text-ava-charcoal">
            {t("aboutProvidesTitle")}
          </h2>

          <p className="mt-4 text-sm leading-7 text-ava-slate">
            {t("aboutProvidesText")}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-ava-mist bg-ava-white p-5">
              <h3 className="font-semibold text-ava-charcoal">
                {t("aboutLegalSupport")}
              </h3>

              <p className="mt-2 text-sm text-ava-slate">
                {t("aboutLegalSupportText")}
              </p>
            </div>

            <div className="rounded-2xl border border-ava-mist bg-ava-white p-5">
              <h3 className="font-semibold text-ava-charcoal">
                {t("aboutMedicalSupport")}
              </h3>

              <p className="mt-2 text-sm text-ava-slate">
                {t("aboutMedicalSupportText")}
              </p>
            </div>

            <div className="rounded-2xl border border-ava-mist bg-ava-white p-5">
              <h3 className="font-semibold text-ava-charcoal">
                {t("aboutPsychologicalSupport")}
              </h3>

              <p className="mt-2 text-sm text-ava-slate">
                {t("aboutPsychologicalSupportText")}
              </p>
            </div>

            <div className="rounded-2xl border border-ava-rose/25 bg-ava-rose/10 p-5">
              <h3 className="font-semibold text-ava-charcoal">
                {t("aboutRightsProcess")}
              </h3>

              <p className="mt-2 text-sm text-ava-slate">
                {t("aboutRightsProcessText")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Design Principles */}
      <section className="border-t border-ava-mist bg-ava-cream">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <h2 className="text-2xl font-bold text-ava-charcoal">
            {t("aboutPrinciplesTitle")}
          </h2>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-ava-rose/25 bg-ava-white p-6">
              <h3 className="font-semibold text-ava-charcoal">
                {t("aboutAccessibilityTitle")}
              </h3>

              <p className="mt-2 text-sm leading-6 text-ava-slate">
                {t("aboutAccessibilityText")}
              </p>
            </div>

            <div className="rounded-2xl border border-ava-mist bg-ava-white p-6">
              <h3 className="font-semibold text-ava-charcoal">
                {t("aboutPrivacyTitle")}
              </h3>

              <p className="mt-2 text-sm leading-6 text-ava-slate">
                {t("aboutPrivacyText")}
              </p>
            </div>

            <div className="rounded-2xl border border-ava-mist bg-ava-white p-6">
              <h3 className="font-semibold text-ava-charcoal">
                {t("aboutAccuracyTitle")}
              </h3>

              <p className="mt-2 text-sm leading-6 text-ava-slate">
                {t("aboutAccuracyText")}
              </p>
            </div>

            <div className="rounded-2xl border border-ava-rose/25 bg-ava-white p-6">
              <h3 className="font-semibold text-ava-charcoal">
                {t("aboutChoiceTitle")}
              </h3>

              <p className="mt-2 text-sm leading-6 text-ava-slate">
                {t("aboutChoiceText")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className="border-t border-ava-mist bg-ava-white">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <h2 className="text-2xl font-bold text-ava-charcoal">
            {t("aboutScopeTitle")}
          </h2>

          <p className="mt-4 text-sm leading-7 text-ava-slate">
            {t("aboutScopeText")}
          </p>

          <div className="mt-6 rounded-2xl border border-ava-mist bg-ava-mist/50 p-6">
            <h3 className="font-semibold text-ava-charcoal">
              {t("aboutLanguagesTitle")}
            </h3>

            <p className="mt-2 text-sm leading-6 text-ava-slate">
              {t("aboutLanguagesText")}
            </p>
          </div>
        </div>
      </section>

      {/* Prototype */}
      <section className="border-t border-ava-mist bg-ava-cream">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <div className="rounded-2xl border border-ava-rose/30 bg-ava-rose/10 p-6">
            <h2 className="font-semibold text-ava-charcoal">
              {t("aboutPrototypeTitle")}
            </h2>

            <p className="mt-2 text-sm leading-6 text-ava-slate">
              {t("aboutPrototypeText")}
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

          <div className="mt-5 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="transition-colors hover:text-ava-white hover:underline"
            >
              {t("about")}
            </Link>

            <Link
              href="/privacy"
              className="transition-colors hover:text-ava-white hover:underline"
            >
              {t("privacy")}
            </Link>

            <Link
              href="/disclaimer"
              className="transition-colors hover:text-ava-white hover:underline"
            >
              {t("disclaimerLabel")}
            </Link>

            <Link
              href="/report"
              className="transition-colors hover:text-ava-white hover:underline"
            >
              {t("reportIncorrect")}
            </Link>
          </div>
        </div>
      </footer>

      <QuickExit />
    </main>
  );
}