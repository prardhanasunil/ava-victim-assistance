
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import QuickExit from "@/components/QuickExit";
import { useLanguage } from "@/components/LanguageProvider";

export default function ReportPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            ← {t("backToAVA")}
          </Link>

          <div className="text-right">
            <p className="text-xl font-bold text-slate-800">
              {t("appName")}
            </p>

            <p className="text-xs text-slate-500">
              {t("tagline")}
            </p>
          </div>
        </div>
      </header>

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-ava-slate">
          {t("reportLabel")}
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {t("reportTitle")}
        </h1>

        <p className="mt-5 text-lg leading-8 text-slate-600">
          {t("reportIntro")}
        </p>
      </section>

      {/* Safety Notice */}
      <section className="mx-auto max-w-3xl px-6 pb-8">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-semibold text-amber-900">
            {t("reportSafetyTitle")}
          </h2>

          <p className="mt-2 text-sm leading-6 text-amber-800">
            {t("reportSafetyText")}
          </p>
        </div>
      </section>

      {/* Report Form */}
      <section className="mx-auto max-w-3xl px-6 pb-12">
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="space-y-6">
              {/* Information Type */}
              <div>
                <label
                  htmlFor="informationType"
                  className="block text-sm font-semibold text-slate-800"
                >
                  {t("reportInformationType")}
                </label>

                <select
                  id="informationType"
                  name="informationType"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-ava-slate focus:ring-2 focus:ring-ava-mist"
                >
                  <option value="">
                    {t("reportSelectOption")}
                  </option>

                  <option value="helpline">
                    {t("reportOptionHelpline")}
                  </option>

                  <option value="organisation">
                    {t("reportOptionOrganisation")}
                  </option>

                  <option value="legal">
                    {t("reportOptionLegal")}
                  </option>

                  <option value="link">
                    {t("reportOptionLink")}
                  </option>

                  <option value="other">
                    {t("reportOptionOther")}
                  </option>
                </select>
              </div>

              {/* Page / Service */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-semibold text-slate-800"
                >
                  {t("reportWhereFound")}
                </label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  placeholder={t("reportWhereFoundPlaceholder")}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-ava-slate focus:ring-2 focus:ring-ava-mist"
                />
              </div>

              {/* Incorrect Information */}
              <div>
                <label
                  htmlFor="problem"
                  className="block text-sm font-semibold text-slate-800"
                >
                  {t("reportProblem")}
                </label>

                <textarea
                  id="problem"
                  name="problem"
                  required
                  rows={5}
                  placeholder={t("reportProblemPlaceholder")}
                  className="mt-2 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-ava-slate focus:ring-2 focus:ring-ava-mist"
                />
              </div>

              {/* Suggested Correction */}
              <div>
                <label
                  htmlFor="correction"
                  className="block text-sm font-semibold text-slate-800"
                >
                  {t("reportCorrection")}
                </label>

                <textarea
                  id="correction"
                  name="correction"
                  rows={4}
                  placeholder={t("reportCorrectionPlaceholder")}
                  className="mt-2 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-ava-slate focus:ring-2 focus:ring-ava-mist"
                />
              </div>

              {/* Optional Contact */}
              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-semibold text-slate-800"
                >
                  {t("reportContact")}
                </label>

                <input
                  id="contact"
                  name="contact"
                  type="text"
                  placeholder={t("reportContactPlaceholder")}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-ava-slate focus:ring-2 focus:ring-ava-mist"
                />

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {t("reportContactOptional")}
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {t("reportSubmit")}
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation */
          <div
            role="status"
            className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center"
          >
            <div
              aria-hidden="true"
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-700"
            >
              ✓
            </div>

            <h2 className="mt-5 text-2xl font-bold text-green-900">
              {t("reportSuccessTitle")}
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-green-800">
              {t("reportSuccessText")}
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              {t("backToAVA")}
            </Link>
          </div>
        )}
      </section>

      {/* Prototype Notice */}
      <section className="border-t bg-white">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="font-semibold">
              {t("reportPrototypeTitle")}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {t("reportPrototypeText")}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-300">
          <p className="font-semibold text-white">
            {t("appName")} — {t("tagline")}
          </p>

          <p className="mt-2">
            {t("footerDescription")}
          </p>

          <div className="mt-5 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="hover:text-white hover:underline"
            >
              {t("about")}
            </Link>

            <Link
              href="/privacy"
              className="hover:text-white hover:underline"
            >
              {t("privacy")}
            </Link>

            <Link
              href="/disclaimer"
              className="hover:text-white hover:underline"
            >
              {t("disclaimerLabel")}
            </Link>
          </div>
        </div>
      </footer>

      <QuickExit />
    </main>
  );
}
