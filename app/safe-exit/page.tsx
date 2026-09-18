"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function SafeExit() {
  const { t } = useLanguage();

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 text-slate-900">
      <section className="w-full max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          {t("appName")}
        </p>

        <h1 className="mt-4 text-3xl font-bold">
          {t("safeExitTitle")}
        </h1>

        <p className="mt-4 leading-7 text-slate-600">
          {t("safeExitText")}
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-block rounded-xl bg-slate-800 px-6 py-3 font-semibold text-white hover:bg-slate-700"
          >
            {t("goToHome")}
          </Link>
        </div>
      </section>
    </main>
  );
}