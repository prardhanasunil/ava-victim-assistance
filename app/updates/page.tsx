"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import QuickExit from "@/components/QuickExit";

const updates = [
  {
    id: 1,
    type: "important",
    titleKey: "updateCompensationTitle",
    descriptionKey: "updateCompensationText",
    dateKey: "updateTwoDaysAgo",
  },
  {
    id: 2,
    type: "service",
    titleKey: "updatePsychologicalTitle",
    descriptionKey: "updatePsychologicalText",
    dateKey: "updateFiveDaysAgo",
  },
  {
    id: 3,
    type: "legal",
    titleKey: "updateRightsTitle",
    descriptionKey: "updateRightsText",
    dateKey: "updateTwelveDaysAgo",
  },
  {
    id: 4,
    type: "legal",
    titleKey: "updateLegalAidTitle",
    descriptionKey: "updateLegalAidText",
    dateKey: "updateFifteenDaysAgo",
  },
] as const;

export default function UpdatesPage() {
  const { t } = useLanguage();

  const [filter, setFilter] = useState<
    "all" | "important" | "service" | "legal"
  >("all");

  const [readUpdates, setReadUpdates] = useState<number[]>([]);

  const filteredUpdates = updates.filter((update) => {
    if (filter === "all") return true;
    return update.type === filter;
  });

  const unreadCount = updates.filter(
    (update) => !readUpdates.includes(update.id)
  ).length;

  function markAsRead(id: number) {
    setReadUpdates((current) =>
      current.includes(id) ? current : [...current, id]
    );
  }

  function markAllAsRead() {
    setReadUpdates(updates.map((update) => update.id));
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="block">
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              {t("appName")}
            </h1>

            <p className="text-xs text-slate-500">{t("tagline")}</p>
          </Link>

          <QuickExit />
        </div>
      </nav>

      {/* Main Content */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        {/* Back */}
        <Link
          href="/"
          className="text-sm font-medium text-ava-slate hover:text-ava-charcoal hover:underline"
        >
          ← {t("appName")}
        </Link>

        {/* Header */}
        <div className="mt-8 flex flex-col gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-ava-slate">
              {t("updatesLabel")}
            </p>

            <h2 className="mt-2 text-4xl font-bold tracking-tight">
              {t("updatesTitle")}
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              {t("updatesIntro")}
            </p>
          </div>

          <div className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-center">
            <p className="text-2xl font-bold text-slate-800">
              {unreadCount}
            </p>

            <p className="text-xs text-slate-500">{t("unread")}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                filter === "all"
                  ? "bg-slate-800 text-white"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {t("updateAll")}
            </button>

            <button
              type="button"
              onClick={() => setFilter("important")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                filter === "important"
                  ? "bg-slate-800 text-white"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {t("updateImportant")}
            </button>

            <button
              type="button"
              onClick={() => setFilter("service")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                filter === "service"
                  ? "bg-slate-800 text-white"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {t("updateService")}
            </button>

            <button
              type="button"
              onClick={() => setFilter("legal")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                filter === "legal"
                  ? "bg-slate-800 text-white"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {t("updateLegal")}
            </button>
          </div>

          <button
            type="button"
            onClick={markAllAsRead}
            className="text-left text-sm font-semibold text-ava-slate hover:text-ava-charcoal hover:underline sm:text-right"
          >
            {t("markAllRead")}
          </button>
        </div>

        {/* Updates */}
        <div className="mt-8 space-y-4">
          {filteredUpdates.map((update) => {
            const isRead = readUpdates.includes(update.id);

            return (
              <article
                key={update.id}
                className={`rounded-2xl border bg-white p-6 transition ${
                  isRead
                    ? "border-slate-200"
                    : "border-ava-mist shadow-sm"
                }`}
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-4">
                    {/* Status indicator */}
                    <div
                      className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
                        isRead ? "bg-slate-300" : "bg-ava-slate"
                      }`}
                      aria-hidden="true"
                    />

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900">
                          {t(update.titleKey)}
                        </h3>

                        {!isRead && (
                          <span className="rounded-full bg-ava-slate px-2 py-0.5 text-xs font-semibold text-white">
                            {t("new")}
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {t(update.descriptionKey)}
                      </p>

                      <p className="mt-3 text-xs font-medium text-slate-400">
                        {t(update.dateKey)}
                      </p>
                    </div>
                  </div>

                  {!isRead && (
                    <button
                      type="button"
                      onClick={() => markAsRead(update.id)}
                      className="shrink-0 text-left text-sm font-semibold text-ava-slate hover:text-ava-charcoal hover:underline"
                    >
                      ✓ {t("markAsRead")}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Prototype Notice */}
        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h3 className="font-semibold text-amber-900">
            {t("updatesPrototypeTitle")}
          </h3>

          <p className="mt-2 text-sm leading-6 text-amber-800">
            {t("updatesPrototypeText")}
          </p>
        </div>
      </section>
    </main>
  );
}