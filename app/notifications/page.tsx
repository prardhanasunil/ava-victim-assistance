"use client";

import Link from "next/link";
import { useState } from "react";
import QuickExit from "@/components/QuickExit";
import { useLanguage } from "@/components/LanguageProvider";

type TranslationKey = Parameters<
  ReturnType<typeof useLanguage>["t"]
>[0];

type Update = {
  id: number;
  type: "important" | "service" | "legal";
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  dateKey: TranslationKey;
};

const updates: Update[] = [
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
    type: "service",
    titleKey: "updateLegalAidTitle",
    descriptionKey: "updateLegalAidText",
    dateKey: "updateFifteenDaysAgo",
  },
];

const filters: {
  value: "all" | "important" | "service" | "legal";
  labelKey: TranslationKey;
}[] = [
  { value: "all", labelKey: "updateAll" },
  { value: "important", labelKey: "updateImportant" },
  { value: "service", labelKey: "updateService" },
  { value: "legal", labelKey: "updateLegal" },
];

export default function UpdatesPage() {
  const { t } = useLanguage();

  const [filter, setFilter] = useState<
    "all" | "important" | "service" | "legal"
  >("all");

  const [readUpdates, setReadUpdates] = useState<number[]>([]);

  const filteredUpdates =
    filter === "all"
      ? updates
      : updates.filter((update) => update.type === filter);

  const unreadCount = updates.filter(
    (update) => !readUpdates.includes(update.id)
  ).length;

  const markAsRead = (id: number) => {
    setReadUpdates((current) =>
      current.includes(id) ? current : [...current, id]
    );
  };

  const markAllAsRead = () => {
    setReadUpdates(updates.map((update) => update.id));
  };

  const getTypeLabel = (type: Update["type"]) => {
    if (type === "important") return t("updateImportant");
    if (type === "service") return t("updateService");
    return t("updateLegal");
  };

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

      {/* Intro */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-ava-rose">
              {t("updatesLabel")}
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              {t("updatesTitle")}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-ava-slate">
              {t("updatesIntro")}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-full border border-ava-mist bg-ava-mist/50 px-4 py-2 text-sm font-semibold text-ava-slate">
            <span aria-hidden="true">🔔</span>
            {unreadCount} {t("unread")}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-4xl px-6 pb-6">
        <div className="flex flex-wrap gap-2">
          {filters.map(({ value, labelKey }) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                filter === value
                  ? "border-ava-slate bg-ava-slate text-ava-white"
                  : "border-ava-mist bg-ava-white text-ava-slate hover:border-ava-dusty"
              }`}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={markAllAsRead}
            className="text-sm font-medium text-ava-slate transition-colors hover:text-ava-rose hover:underline"
          >
            {t("markAllRead")}
          </button>
        </div>
      </section>

      {/* Updates */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="space-y-4">
          {filteredUpdates.map((update) => {
            const isRead = readUpdates.includes(update.id);

            return (
              <button
                key={update.id}
                type="button"
                onClick={() => markAsRead(update.id)}
                className={`w-full rounded-2xl border p-6 text-left transition hover:border-ava-dusty ${
                  isRead
                    ? "border-ava-mist bg-ava-white"
                    : "border-ava-mist bg-ava-mist/40"
                }`}
              >
                <div className="flex gap-4">
                  <div
                    className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      update.type === "important"
                        ? "bg-ava-rose/15 text-ava-rose"
                        : update.type === "service"
                        ? "bg-ava-dusty/15 text-ava-slate"
                        : "bg-ava-mist text-ava-slate"
                    }`}
                  >
                    <span aria-hidden="true">
                      {update.type === "important"
                        ? "!"
                        : update.type === "service"
                        ? "✓"
                        : "§"}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-ava-dusty">
                        {getTypeLabel(update.type)}
                      </span>

                      {!isRead && (
                        <span className="rounded-full bg-ava-rose px-2 py-0.5 text-xs font-semibold text-ava-white">
                          {t("new")}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-2 text-lg font-bold text-ava-charcoal">
                      {t(update.titleKey)}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-ava-slate">
                      {t(update.descriptionKey)}
                    </p>

                    <p className="mt-3 text-xs text-ava-dusty">
                      {t(update.dateKey)}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="hidden text-xl text-ava-dusty sm:block"
                  >
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Prototype Notice */}
      <section className="border-t border-ava-mist bg-ava-white">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <div className="rounded-2xl border border-ava-mist bg-ava-cream p-6">
            <h2 className="font-semibold text-ava-charcoal">
              {t("updatesPrototypeTitle")}
            </h2>

            <p className="mt-2 text-sm leading-6 text-ava-slate">
              {t("updatesPrototypeText")}
            </p>
          </div>
        </div>
      </section>

      <QuickExit />
    </main>
  );
}