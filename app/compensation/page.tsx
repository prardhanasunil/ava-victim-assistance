
import Link from "next/link";
import QuickExit from "@/components/QuickExit";

const steps = [
  {
    number: "01",
    title: "Understand eligibility",
    description:
      "Check whether the applicable victim compensation scheme or legal framework may cover your circumstances.",
  },
  {
    number: "02",
    title: "Find the appropriate authority",
    description:
      "Identify the authority or legal-aid service responsible for receiving or processing compensation-related applications.",
  },
  {
    number: "03",
    title: "Submit the required information",
    description:
      "Provide the documents and information required under the applicable procedure.",
  },
  {
    number: "04",
    title: "Application is considered",
    description:
      "The relevant authority considers the application according to the applicable law, scheme and procedure.",
  },
  {
    number: "05",
    title: "Decision / assistance",
    description:
      "Where an applicant is eligible, compensation or other assistance may be provided according to the applicable scheme.",
  },
];

const considerations = [
  "The applicable compensation scheme",
  "The nature and circumstances of the offence",
  "Eligibility requirements",
  "Documents or information required",
  "The authority responsible for processing the application",
  "Any applicable timelines or procedural requirements",
];

export default function CompensationPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            ← Back to AVA
          </Link>

          <div className="text-right">
            <p className="text-xl font-bold text-slate-800">AVA</p>
            <p className="text-xs text-slate-500">
              App for Victim Assistance
            </p>
          </div>
        </div>
      </header>

      {/* Demo warning */}
      <div className="border-b bg-amber-50 px-6 py-3">
        <div className="mx-auto max-w-6xl text-center text-sm font-medium text-amber-900">
          DEMO DATA — NOT FOR REAL-WORLD USE
        </div>
      </div>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-ava-slate">
          Victim Support
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Victim Compensation
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Victim compensation schemes may provide financial assistance to
          eligible people affected by crime. The applicable process depends on
          the offence, circumstances and governing law or scheme.
        </p>

        <div className="mt-8 rounded-2xl border border-ava-mist bg-ava-mist/50 p-6">
          <h2 className="font-semibold text-ava-charcoal">
            What is victim compensation?
          </h2>

          <p className="mt-2 text-sm leading-6 text-ava-slate">
            Victim compensation generally refers to financial assistance that
            may be available to eligible victims or their dependants under an
            applicable legal framework or compensation scheme.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-4xl px-6 pb-14">
        <h2 className="text-2xl font-bold">
          How the process generally works
        </h2>

        <p className="mt-2 text-slate-600">
          The following is a simplified educational overview.
        </p>

        <div className="mt-7 space-y-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ava-mist text-sm font-bold text-ava-slate">
                  {step.number}
                </div>

                <div>
                  <h3 className="text-lg font-bold">{step.title}</h3>

                  <p className="mt-2 leading-7 text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Eligibility */}
      <section className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-bold">
            What may affect eligibility or the process?
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {considerations.map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-slate-50 p-5"
              >
                <div className="flex gap-3">
                  <span className="text-ava-slate">✓</span>
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold">
              Documents and information
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Requirements can vary. Depending on the applicable procedure,
              applicants may be asked for information or documents relating to
              the incident, identity, medical treatment, financial impact or
              case proceedings.
            </p>

            <div className="mt-5 rounded-xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-700">
                Do not submit sensitive documents to AVA through this demo.
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                AVA's public information pages do not require an FIR, case
                number or account to access general support information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get help */}
      <section className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-2xl bg-ava-mist/50 p-7">
            <h2 className="text-2xl font-bold text-ava-charcoal">
              Need help understanding compensation?
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-ava-slate">
              You can explore legal-aid and other verified support services
              through AVA's support directory.
            </p>

            <Link
              href="/support"
              className="mt-6 inline-block rounded-xl bg-ava-slate px-6 py-3 font-semibold text-white shadow-sm hover:bg-ava-charcoal"
            >
              Find Support →
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-semibold">Important</h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              This page provides general educational information only. It does
              not determine eligibility or provide individualized legal
              advice. Compensation rules, eligibility requirements and
              procedures may change and should be verified through the relevant
              official authority or a qualified legal professional.
            </p>

            <p className="mt-4 text-xs text-slate-400">
              Source: Demo compensation-information record — source
              verification required.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-300">
          <p className="font-semibold text-white">
            AVA — App for Victim Assistance
          </p>

          <p className="mt-2">
            A victim-centred information and support platform.
          </p>
        </div>
      </footer>
         <QuickExit />
    </main>
  );
}
