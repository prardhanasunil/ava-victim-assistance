"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

export default function QuickExit() {
  const router = useRouter();
  const { t } = useLanguage();

  const handleQuickExit = () => {
    router.replace("/safe-exit");
  };

  return (
    <button
      type="button"
      onClick={handleQuickExit}
      className="fixed bottom-5 right-5 z-50 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-lg transition hover:bg-slate-100"
      aria-label={t("quickExit")}
    >
      {t("quickExit")}
    </button>
  );
}