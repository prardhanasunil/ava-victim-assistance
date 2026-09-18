"use client";

import Link from "next/link";
import QuickExit from "@/components/QuickExit";
import { useLanguage } from "@/components/LanguageProvider";

export default function PrivacyPage() {
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

      {/* Page Intro */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-ava-rose">
          {t("privacyLabel")}
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {t("privacyTitle")}
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-ava-slate">
          {t("privacyIntro")}
        </p>
      </section>

      {/* Privacy Principles */}
      <section className="mx-auto max-w-4xl px-6 pb-12">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-ava-rose/25 bg-ava-white p-6">
            <h2 className="text-lg font-bold text-ava-charcoal">
              {t("privacyMinimisationTitle")}
            </h2>

            <p className="mt-3 text-sm leading-6 text-ava-slate">
              {t("privacyMinimisationText")}
            </p>
          </div>

          <div className="rounded-2xl border border-ava-mist bg-ava-white p-6">
            <h2 className="text-lg font-bold text-ava-charcoal">
              {t("privacyPublicAccessTitle")}
            </h2>

            <p className="mt-3 text-sm leading-6 text-ava-slate">
              {t("privacyPublicAccessText")}
            </p>
          </div>

          <div className="rounded-2xl border border-ava-mist bg-ava-white p-6">
            <h2 className="text-lg font-bold text-ava-charcoal">
              {t("privacyConfidentialityTitle")}
            </h2>

            <p className="mt-3 text-sm leading-6 text-ava-slate">
              {t("privacyConfidentialityText")}
            </p>
          </div>

          <div className="rounded-2xl border border-ava-rose/25 bg-ava-white p-6">
            <h2 className="text-lg font-bold text-ava-charcoal">
              {t("privacySecurityTitle")}
            </h2>

            <p className="mt-3 text-sm leading-6 text-ava-slate">
              {t("privacySecurityText")}
            </p>
          </div>
        </div>
      </section>

      {/* Information We Handle */}
      <section className="border-t border-ava-mist bg-ava-white">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <h2 className="text-2xl font-bold text-ava-charcoal">
            {t("privacyInformationTitle")}
          </h2>

          <p className="mt-4 text-sm leading-7 text-ava-slate">
            {t("privacyInformationText")}
          </p>

          <div className="mt-6 rounded-2xl border border-ava-mist bg-ava-mist/50 p-6">
            <h3 className="font-semibold text-ava-charcoal">
              {t("privacyPublicUseTitle")}
            </h3>

            <p className="mt-2 text-sm leading-6 text-ava-slate">
              {t("privacyPublicUseText")}
            </p>
          </div>
        </div>
      </section>

      {/* My Case */}
      <section className="border-t border-ava-mist bg-ava-cream">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <h2 className="text-2xl font-bold text-ava-charcoal">
            {t("privacyMyCaseTitle")}
          </h2>

          <p className="mt-4 text-sm leading-7 text-ava-slate">
            {t("privacyMyCaseText")}
          </p>
        </div>
      </section>

      {/* Safety and Exit */}
      <section className="border-t border-ava-mist bg-ava-white">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <h2 className="text-2xl font-bold text-ava-charcoal">
            {t("privacySafetyTitle")}
          </h2>

          <p className="mt-4 text-sm leading-7 text-ava-slate">
            {t("privacySafetyText")}
          </p>

          <div className="mt-6 rounded-2xl border border-ava-rose/30 bg-ava-rose/10 p-6">
            <h3 className="font-semibold text-ava-charcoal">
              {t("privacyQuickExitTitle")}
            </h3>

            <p className="mt-2 text-sm leading-6 text-ava-slate">
              {t("privacyQuickExitText")}
            </p>
          </div>
        </div>
      </section>

      {/* Prototype Notice */}
      <section className="border-t border-ava-mist bg-ava-cream">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <div className="rounded-2xl border border-ava-mist bg-ava-white p-6">
            <h2 className="font-semibold text-ava-charcoal">
              {t("privacyPrototypeTitle")}
            </h2>

            <p className="mt-2 text-sm leading-6 text-ava-slate">
              {t("privacyPrototypeText")}
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