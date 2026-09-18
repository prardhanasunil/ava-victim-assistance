"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const services = [
  {
    key: "emergency",
    descriptionKey: "emergencyDescription",
    icon: "🆘",
    href: "/emergency",
  },
  {
    key: "legalHelp",
    descriptionKey: "legalHelpDescription",
    icon: "⚖️",
    href: "/support",
  },
  {
    key: "medicalHelp",
    descriptionKey: "medicalHelpDescription",
    icon: "🏥",
    href: "/support",
  },
  {
    key: "psychologicalSupport",
    descriptionKey: "psychologicalDescription",
    icon: "💙",
    href: "/support",
  },
  {
    key: "ngos",
    descriptionKey: "ngosDescription",
    icon: "🤝",
    href: "/support",
  },
  {
    key: "compensation",
    descriptionKey: "compensationDescription",
    icon: "📄",
    href: "/compensation",
  },
  {
    key: "rights",
    descriptionKey: "rightsDescription",
    icon: "📚",
    href: "/rights",
  },
  {
    key: "process",
    descriptionKey: "processDescription",
    icon: "🔎",
    href: "/process",
  },
] as const;

export default function Home() {
  const { language, setLanguage, t } = useLanguage();
  const [languageOpen, setLanguageOpen] = useState(false);

  return (
    <main className="min-h-screen bg-ava-cream text-ava-charcoal">
      {/* Navigation */}
      <nav className="border-b border-ava-mist bg-ava-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="block">
            <h1 className="text-2xl font-bold tracking-tight text-ava-slate">
              {t("appName")}
            </h1>

            <p className="text-xs text-ava-dusty">
              {t("tagline")}
            </p>
          </Link>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLanguageOpen(!languageOpen)}
                className="rounded-lg border border-ava-mist bg-ava-white px-4 py-2 text-sm text-ava-charcoal transition hover:border-ava-dusty hover:bg-ava-mist/40"
                aria-expanded={languageOpen}
                aria-haspopup="listbox"
              >
                {language === "en"
                  ? "English"
                  : language === "kn"
                    ? "ಕನ್ನಡ"
                    : "हिन्दी"}{" "}
                ▾
              </button>

              {languageOpen && (
                <div
                  className="absolute right-0 z-20 mt-2 w-36 rounded-xl border border-ava-mist bg-ava-white p-1 shadow-lg"
                  role="listbox"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setLanguage("en");
                      setLanguageOpen(false);
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-ava-mist/60"
                  >
                    English
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLanguage("kn");
                      setLanguageOpen(false);
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-ava-mist/60"
                  >
                    ಕನ್ನಡ
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLanguage("hi");
                      setLanguageOpen(false);
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-ava-mist/60"
                  >
                    हिन्दी
                  </button>
                </div>
              )}
            </div>

            <Link
              href="/my-case"
              className="rounded-lg bg-ava-slate px-4 py-2 text-sm font-medium text-ava-white transition hover:bg-ava-charcoal"
            >
              {t("myCase")}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-ava-rose">
            {t("homeLabel")}
          </p>

          <h2 className="text-4xl font-bold leading-tight tracking-tight text-ava-charcoal sm:text-5xl">
            {t("heroTitle")}
            <br />
            <span className="text-ava-slate">
              {t("heroHighlight")}
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-ava-slate">
            {t("heroDescription")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/emergency"
              className="rounded-xl bg-ava-rose px-6 py-4 text-center font-semibold text-ava-white shadow-sm transition hover:bg-ava-slate"
            >
              {t("needHelpNow")}
            </Link>

            <Link
              href="/support"
              className="rounded-xl border border-ava-dusty bg-ava-white px-6 py-4 text-center font-semibold text-ava-slate transition hover:border-ava-slate hover:bg-ava-mist/50"
            >
              {t("findSupport")}
            </Link>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/rights"
              className="rounded-xl border border-ava-mist bg-ava-white px-5 py-3 text-sm font-medium text-ava-slate transition hover:border-ava-dusty hover:bg-ava-mist/50"
            >
              {t("rights")}
            </Link>

            <Link
              href="/process"
              className="rounded-xl border border-ava-mist bg-ava-white px-5 py-3 text-sm font-medium text-ava-slate transition hover:border-ava-dusty hover:bg-ava-mist/50"
            >
              {t("process")}
            </Link>
          </div>
        </div>
      </section>

      {/* Registration Notice */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="rounded-2xl border border-ava-mist bg-ava-mist/60 p-6">
          <h3 className="font-semibold text-ava-charcoal">
            {t("noRegistrationTitle")}
          </h3>

          <p className="mt-2 text-sm leading-6 text-ava-slate">
            {t("noRegistrationText")}
          </p>
        </div>
      </section>

      {/* Updates & Notifications */}
      <section className="mx-auto max-w-7xl px-6 pt-10">
        <Link
          href="/updates"
          className="block rounded-2xl border border-ava-rose/30 bg-ava-rose/10 p-6 transition hover:border-ava-rose/50 hover:bg-ava-rose/15"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl" aria-hidden="true">
                  🔔
                </span>

                <h3 className="text-lg font-bold text-ava-charcoal">
                  {t("updatesTitle")}
                </h3>

                <span className="rounded-full bg-ava-rose px-2 py-0.5 text-xs font-semibold text-ava-white">
                  4
                </span>
              </div>

              <p className="mt-2 text-sm leading-6 text-ava-slate">
                {t("updatesIntro")}
              </p>
            </div>

            <span
              className="shrink-0 text-xl text-ava-rose"
              aria-hidden="true"
            >
              →
            </span>
          </div>
        </Link>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-ava-charcoal">
            {t("howCanWeHelp")}
          </h3>

          <p className="mt-2 text-ava-slate">
            {t("chooseSupport")}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={service.key}
              className={`rounded-2xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                index === 0
                  ? "border-ava-rose/40 bg-ava-rose/10"
                  : "border-ava-mist bg-ava-white"
              }`}
            >
              <div className="text-3xl">{service.icon}</div>

              <h4 className="mt-4 text-lg font-semibold text-ava-charcoal">
                {t(service.key)}
              </h4>

              <p className="mt-2 text-sm leading-6 text-ava-slate">
                {t(service.descriptionKey)}
              </p>

              <Link
                href={service.href}
                className={`mt-5 inline-block text-sm font-semibold transition ${
                  index === 0
                    ? "text-ava-rose hover:text-ava-slate"
                    : "text-ava-slate hover:text-ava-rose"
                }`}
              >
                {t("learnMore")} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-ava-mist bg-ava-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="text-xs leading-5 text-ava-dusty">
            {t("disclaimer")}
          </p>

          <Link
            href="/disclaimer"
            className="mt-3 inline-block text-xs font-semibold text-ava-slate transition hover:text-ava-rose"
          >
            {t("disclaimerLabel")} →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ava-slate text-ava-mist">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="font-semibold text-ava-white">
            {t("appName")} — {t("tagline")}
          </p>

          <p className="mt-2 text-sm">
            {t("footerDescription")}
          </p>

          <div className="mt-5 flex flex-wrap gap-4 text-sm">
            <Link
              href="/about"
              className="transition hover:text-ava-white hover:underline"
            >
              {t("about")}
            </Link>

            <Link
              href="/privacy"
              className="transition hover:text-ava-white hover:underline"
            >
              {t("privacy")}
            </Link>

            <Link
              href="/disclaimer"
              className="transition hover:text-ava-white hover:underline"
            >
              {t("disclaimerLabel")}
            </Link>

            <Link
              href="/report"
              className="transition hover:text-ava-white hover:underline"
            >
              {t("reportIncorrect")}
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}