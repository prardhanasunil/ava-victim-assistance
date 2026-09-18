"use client";

import Link from "next/link";
import QuickExit from "@/components/QuickExit";
import { useLanguage } from "@/components/LanguageProvider";
import { useState } from "react";

type Case = {
  id: number;
  title: string;
  caseNumber: string;
  policeStation: string;
  district: string;
  year: string;
  court: string;
  notes: string;
};

export default function MyCase() {
  const { t } = useLanguage();

  const [showForm, setShowForm] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [cases, setCases] = useState<Case[]>([]);

  const [caseDetails, setCaseDetails] = useState({
    title: "",
    caseNumber: "",
    policeStation: "",
    district: "",
    year: "",
    court: "",
    notes: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setCaseDetails((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();

    const newCase: Case = {
      id: Date.now(),
      title: caseDetails.title || "Untitled Case",
      caseNumber: caseDetails.caseNumber,
      policeStation: caseDetails.policeStation,
      district: caseDetails.district,
      year: caseDetails.year,
      court: caseDetails.court,
      notes: caseDetails.notes,
    };

    setCases((previous) => [...previous, newCase]);

    setCaseDetails({
      title: "",
      caseNumber: "",
      policeStation: "",
      district: "",
      year: "",
      court: "",
      notes: "",
    });

    setShowForm(false);
    setSelectedCase(newCase);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="block">
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              {t("appName")}
            </h1>

            <p className="text-xs text-slate-500">
              {t("tagline")}
            </p>
          </Link>

          <Link
            href="/"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100"
          >
            {t("backToAVA")}
          </Link>
        </div>
      </nav>

      {/* Main */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-ava-slate">
              {t("privateCaseSpace")}
            </p>

            <h2 className="mt-2 text-4xl font-bold tracking-tight">
              {t("myCaseTitle")}
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              {t("myCaseIntro")}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowForm(true);
              setSelectedCase(null);
            }}
            className="rounded-xl bg-ava-slate px-5 py-3 font-semibold text-white hover:bg-ava-charcoal"
          >
            {t("addCase")}
          </button>
        </div>

        {/* Privacy notice */}
        <div className="mt-8 rounded-2xl border border-ava-mist bg-ava-mist/50 p-6">
          <h3 className="font-semibold text-ava-charcoal">
            {t("keepInformationPrivate")}
          </h3>

          <p className="mt-2 text-sm leading-6 text-ava-slate">
            {t("privacyCaseText")}
          </p>
        </div>

        {/* Add case form */}
        {showForm && (
          <form
            onSubmit={handleSave}
            className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">
                  {t("addCase")}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {t("addCaseDescription")}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-sm font-medium text-slate-500 hover:text-slate-800"
              >
                {t("cancel")}
              </button>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="text-sm font-medium text-slate-700"
                >
                  {t("caseName")}
                </label>

                <input
                  id="title"
                  name="title"
                  value={caseDetails.title}
                  onChange={handleChange}
                  placeholder="e.g. Case 01"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-ava-slate focus:ring-2 focus:ring-ava-mist"
                />
              </div>

              <div>
                <label
                  htmlFor="caseNumber"
                  className="text-sm font-medium text-slate-700"
                >
                  {t("firCaseNumber")}
                </label>

                <input
                  id="caseNumber"
                  name="caseNumber"
                  value={caseDetails.caseNumber}
                  onChange={handleChange}
                  placeholder="Enter case number"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-ava-slate focus:ring-2 focus:ring-ava-mist"
                />
              </div>

              <div>
                <label
                  htmlFor="policeStation"
                  className="text-sm font-medium text-slate-700"
                >
                  {t("policeStation")}
                </label>

                <input
                  id="policeStation"
                  name="policeStation"
                  value={caseDetails.policeStation}
                  onChange={handleChange}
                  placeholder="Enter police station"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-ava-slate focus:ring-2 focus:ring-ava-mist"
                />
              </div>

              <div>
                <label
                  htmlFor="district"
                  className="text-sm font-medium text-slate-700"
                >
                  {t("district")}
                </label>

                <input
                  id="district"
                  name="district"
                  value={caseDetails.district}
                  onChange={handleChange}
                  placeholder="Enter district"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-ava-slate focus:ring-2 focus:ring-ava-mist"
                />
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="text-sm font-medium text-slate-700"
                >
                  {t("year")}
                </label>

                <input
                  id="year"
                  name="year"
                  type="number"
                  min="1900"
                  max="2100"
                  value={caseDetails.year}
                  onChange={handleChange}
                  placeholder="e.g. 2026"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-ava-slate focus:ring-2 focus:ring-ava-mist"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="court"
                  className="text-sm font-medium text-slate-700"
                >
                  {t("courtAuthority")}
                </label>

                <input
                  id="court"
                  name="court"
                  value={caseDetails.court}
                  onChange={handleChange}
                  placeholder="Enter court or relevant authority"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-ava-slate focus:ring-2 focus:ring-ava-mist"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="notes"
                  className="text-sm font-medium text-slate-700"
                >
                  {t("personalNotes")}
                </label>

                <textarea
                  id="notes"
                  name="notes"
                  rows={5}
                  value={caseDetails.notes}
                  onChange={handleChange}
                  placeholder="Add reminders, important dates or personal notes..."
                  className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-ava-slate focus:ring-2 focus:ring-ava-mist"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 rounded-xl bg-ava-slate px-6 py-3 font-semibold text-white hover:bg-ava-charcoal"
            >
              {t("save")} {t("myCaseTitle")}
            </button>
          </form>
        )}

        {/* Cases */}
        <section className="mt-10">
          <div className="mb-5">
            <h3 className="text-2xl font-bold">
              {t("myCases")}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {t("savedCasesText")}
            </p>
          </div>

          {cases.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <div className="text-4xl">📁</div>

              <h4 className="mt-4 font-semibold">
                {t("noCases")}
              </h4>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {t("noCasesText")}
              </p>

              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="mt-5 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold hover:bg-slate-100"
              >
                {t("addFirstCase")}
              </button>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {cases.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelectedCase(item)}
                  className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-ava-slate">
                        {t("caseReference")}
                      </p>

                      <h4 className="mt-2 text-xl font-bold">
                        {item.title}
                      </h4>
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {t("userEntered")}
                    </span>
                  </div>

                  <div className="mt-5 space-y-2 text-sm text-slate-600">
                    <p>
                      <span className="font-medium text-slate-800">
                        {t("firCaseNumber")}:
                      </span>{" "}
                      {item.caseNumber || t("notProvided")}
                    </p>

                    <p>
                      <span className="font-medium text-slate-800">
                        {t("policeStation")}:
                      </span>{" "}
                      {item.policeStation || t("notProvided")}
                    </p>

                    <p>
                      <span className="font-medium text-slate-800">
                        {t("district")}:
                      </span>{" "}
                      {item.district || t("notProvided")}
                    </p>
                  </div>

                  <p className="mt-5 text-sm font-semibold text-ava-slate">
                    {t("viewDetails")}
                  </p>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Selected case */}
        {selectedCase && (
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ava-slate">
                  {t("caseDetails")}
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  {selectedCase.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="text-sm font-medium text-slate-500 hover:text-slate-800"
              >
                {t("close")}
              </button>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  {t("firCaseNumber")}
                </p>

                <p className="mt-1 text-sm">
                  {selectedCase.caseNumber || t("notProvided")}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  {t("policeStation")}
                </p>

                <p className="mt-1 text-sm">
                  {selectedCase.policeStation || t("notProvided")}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  {t("district")}
                </p>

                <p className="mt-1 text-sm">
                  {selectedCase.district || t("notProvided")}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  {t("year")}
                </p>

                <p className="mt-1 text-sm">
                  {selectedCase.year || t("notProvided")}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  {t("courtAuthority")}
                </p>

                <p className="mt-1 text-sm">
                  {selectedCase.court || t("notProvided")}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  {t("personalNotes")}
                </p>

                <p className="mt-2 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  {selectedCase.notes || t("noNotes")}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-xs font-semibold uppercase text-amber-800">
                {t("informationSource")}
              </p>

              <p className="mt-2 text-sm leading-6 text-amber-800">
                {t("caseInformationWarning")}
              </p>
            </div>
          </section>
        )}

        {/* Demo notice */}
        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm font-semibold text-amber-900">
            {t("demoVersion")}
          </p>

          <p className="mt-2 text-sm leading-6 text-amber-800">
            {t("demoBrowserWarning")}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 border-t bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="font-semibold text-slate-800">
            {t("appName")} — {t("tagline")}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            {t("footerDescription")}
          </p>
        </div>
      </footer>

      <QuickExit />
    </main>
  );
}