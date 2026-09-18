"use client";

import Link from "next/link";
import QuickExit from "@/components/QuickExit";
import { useLanguage } from "@/components/LanguageProvider";

const stages = [
  {
    number: "01",
    titleKey: "incident",
    descriptionKey: "incidentDescription",
  },
  {
    number: "02",
    titleKey: "getHelpReport",
    descriptionKey: "getHelpReportDescription",
  },
  {
    number: "03",
    titleKey: "complaintFIR",
    descriptionKey: "complaintFIRDescription",
  },
  {
    number: "04",
    titleKey: "investigation",
    descriptionKey: "investigationDescription",
  },
  {
    number: "05",
    titleKey: "evidenceProceedings",
    descriptionKey: "evidenceProceedingsDescription",
  },
  {
    number: "06",
    titleKey: "arrestProceedings",
    descriptionKey: "arrestProceedingsDescription",
  },
  {
    number: "07",
    titleKey: "chargeSheet",
    descriptionKey: "chargeSheetDescription",
  },
  {
    number: "08",
    titleKey: "courtProceedings",
    descriptionKey: "courtProceedingsDescription",
  },
  {
    number: "09",
    titleKey: "trialJudgment",
    descriptionKey: "trialJudgmentDescription",
  },
  {
    number: "10",
    titleKey: "appealFurther",
    descriptionKey: "appealFurtherDescription",
  },
] as const;

export default function ProcessPage() {
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
          {t("processInformation")}
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {t("processTitle")}
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-ava-slate">
          {t("processIntro")}
        </p>

        <div className="mt-8 rounded-2xl border border-ava-mist bg-ava-mist/50 p-6">
          <h2 className="font-semibold text-ava-charcoal">
            {t("everyCaseDifferent")}
          </h2>

          <p className="mt-2 text-sm leading-6 text-ava-slate">
            {t("everyCaseDifferentText")}
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="space-y-5">
          {stages.map((stage, index) => (
            <div
              key={stage.number}
              className={`relative rounded-2xl border p-6 transition-colors ${
                index === 0 || index === 9
                  ? "border-ava-rose/30 bg-ava-white"
                  : "border-ava-mist bg-ava-white"
              }`}
            >
              <div className="flex gap-5">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    index === 0 || index === 9
                      ? "bg-ava-rose/15 text-ava-rose"
                      : "bg-ava-mist text-ava-slate"
                  }`}
                >
                  {stage.number}
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ava-dusty">
                    {t("stage")} {index + 1}
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-ava-charcoal">
                    {t(stage.titleKey)}
                  </h2>

                  <p className="mt-3 leading-7 text-ava-slate">
                    {t(stage.descriptionKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What victims can do */}
      <section className="border-t border-ava-mist bg-ava-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-bold text-ava-charcoal">
            {t("whatCanIDo")}
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-ava-mist bg-ava-cream p-6">
              <h3 className="font-semibold text-ava-charcoal">
                {t("getInformation")}
              </h3>

              <p className="mt-2 text-sm leading-6 text-ava-slate">
                {t("getInformationText")}
              </p>
            </div>

            <div className="rounded-2xl border border-ava-rose/25 bg-ava-rose/10 p-6">
              <h3 className="font-semibold text-ava-charcoal">
                {t("accessSupport")}
              </h3>

              <p className="mt-2 text-sm leading-6 text-ava-slate">
                {t("accessSupportText")}
              </p>
            </div>

            <div className="rounded-2xl border border-ava-mist bg-ava-cream p-6">
              <h3 className="font-semibold text-ava-charcoal">
                {t("keepRecords")}
              </h3>

              <p className="mt-2 text-sm leading-6 text-ava-slate">
                {t("keepRecordsText")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-ava-mist bg-ava-cream">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="rounded-2xl border border-ava-mist bg-ava-white p-6">
            <h2 className="font-semibold text-ava-charcoal">
              {t("pleaseRemember")}
            </h2>

            <p className="mt-2 text-sm leading-6 text-ava-slate">
              {t("processDisclaimer")}
            </p>

            <p className="mt-4 text-xs text-ava-dusty">
              {t("processSource")}
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