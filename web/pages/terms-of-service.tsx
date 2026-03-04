import NavBar from "@/components/navbar";
import React from "react";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <NavBar />
      <div className="mx-auto w-full max-w-4xl px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Effective date: <span className="font-medium">4 March 2026</span>
          </p>
          <p className="mt-6 text-base leading-7 text-slate-700">
            These Terms of Service (“Terms”) govern your access to and use of
            the website and services provided by{" "}
            <span className="font-medium">Magic Hour Portraits</span> (“we,”
            “us,” “our”). By using our website, submitting an enquiry, booking
            our services, or opting in to receive SMS messages, you agree to
            these Terms.
          </p>
          <p className="mt-4 text-base leading-7 text-slate-700">
            If you do not agree, do not use our website or services.
          </p>
        </header>

        <section className="space-y-10">
          <TosSection title="1. Business information">
            <ul className="mt-4 space-y-2 text-slate-700">
              <li>
                <span className="font-medium">Business name:</span> Magic Hour
                Portraits
              </li>
              <li>
                <span className="font-medium">Website:</span>{" "}
                <a
                  href="https://magichourportraits.com/"
                  className="underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
                >
                  https://magichourportraits.com/
                </a>
              </li>
              <li>
                <span className="font-medium">Customer support email:</span>{" "}
                <a
                  href="mailto:robertbonsall@magichourportraits.com"
                  className="underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
                >
                  robertbonsall@magichourportraits.com
                </a>
              </li>
              <li>
                <span className="font-medium">Customer support phone:</span>{" "}
                <a
                  href="tel:+18144984800"
                  className="underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
                >
                  +1 814-498-4800
                </a>
              </li>
              <li>
                <span className="font-medium">Service area:</span> Pennsylvania,
                USA (serving clients in PA, NY, NJ, MD, DE)
              </li>
            </ul>
          </TosSection>

          <TosSection title="2. Services">
            <p>
              Magic Hour Portraits provides wedding photography services,
              including packages and related deliverables as described on our
              website or in written proposals.
            </p>
            <p className="mt-4">
              All details regarding pricing, inclusions, timelines, and
              deliverables are confirmed in writing. Website information may be
              updated at any time.
            </p>
          </TosSection>

          <TosSection title="3. Enquiries, availability, and bookings">
            <p>
              Submitting an enquiry does not guarantee availability for your
              date.
            </p>
            <p className="mt-4">
              A booking is only confirmed when we provide written confirmation
              and any required booking steps are completed (for example, signing
              an agreement and/or payment of a retainer if applicable).
            </p>
            <p className="mt-4">
              If we are unable to provide services due to circumstances outside
              our control, we will communicate promptly and work with you on
              reasonable next steps.
            </p>
          </TosSection>

          <TosSection title="4. Payments">
            <p>
              Payment terms, if applicable, will be provided in writing at the
              time of booking. You agree to pay all invoices in accordance with
              the terms stated on the invoice or booking agreement.
            </p>
          </TosSection>

          <TosSection title="5. Rescheduling and cancellation">
            <p>
              Any rescheduling or cancellation terms will be provided in your
              booking agreement or written confirmation. If no separate
              agreement exists, rescheduling and cancellation requests will be
              handled case by case.
            </p>
          </TosSection>

          <TosSection title="6. Intellectual property">
            <p>
              All content on our website, including text, images, graphics, and
              branding, is owned by Magic Hour Portraits or licensed to us and
              is protected by intellectual property laws.
            </p>
            <p className="mt-4">
              You may not copy, reproduce, modify, distribute, or exploit our
              content without our prior written permission.
            </p>
          </TosSection>

          <TosSection title="7. Website use">
            <p>
              You agree not to misuse our website, including by introducing
              malware, attempting unauthorized access, scraping, or interfering
              with website functionality.
            </p>
          </TosSection>

          <TosSection title="8. Third party links">
            <p>
              Our website may include links to third party websites. We do not
              control these websites and are not responsible for their content,
              policies, or practices.
            </p>
          </TosSection>

          <TosSection title="9. Limitation of liability">
            <p>To the maximum extent permitted by law:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
              <li>
                We are not liable for indirect, incidental, special,
                consequential, or punitive damages arising from your use of our
                website or services.
              </li>
              <li>
                Our total liability for any claim related to our services is
                limited to the amount you paid us for the specific services
                giving rise to the claim.
              </li>
              <li>
                Nothing in these Terms limits any rights you may have under
                applicable consumer protection laws that cannot be excluded.
              </li>
            </ul>
          </TosSection>

          <TosSection title="10. SMS Terms and Conditions">
            <p>
              If you opt in to receive SMS messages from Magic Hour Portraits,
              you agree to the following:
            </p>

            <SubSection title="10.1 Description of SMS use cases">
              <p>
                We send conversational SMS messages to people who enquire about
                our wedding photography services. Messages may include:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
                <li>enquiry confirmations and responses</li>
                <li>scheduling and booking links</li>
                <li>appointment confirmations and appointment reminders</li>
              </ul>
              <p className="mt-4">
                We do not send SMS messages to purchased lists.
              </p>
            </SubSection>

            <SubSection title="10.2 How you opt in">
              <p>
                Opt in is collected through our website forms using an unchecked
                SMS consent checkbox. You will only receive SMS messages if you
                provide consent.
              </p>
            </SubSection>

            <SubSection title="10.3 Opt out instructions">
              <p>
                You can opt out at any time by replying{" "}
                <span className="font-medium">STOP</span>,{" "}
                <span className="font-medium">END</span>,{" "}
                <span className="font-medium">CANCEL</span>,{" "}
                <span className="font-medium">UNSUBSCRIBE</span>, or{" "}
                <span className="font-medium">QUIT</span>. After you opt out,
                you will no longer receive SMS messages from us unless you opt
                in again.
              </p>
            </SubSection>

            <SubSection title="10.4 Customer support contact">
              <p>
                For help, reply <span className="font-medium">HELP</span> or
                contact us at:
              </p>
              <div className="mt-3 space-y-2 text-slate-700">
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  <a
                    href="mailto:robertbonsall@magichourportraits.com"
                    className="underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
                  >
                    robertbonsall@magichourportraits.com
                  </a>
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  <a
                    href="tel:+18144984800"
                    className="underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
                  >
                    +1 814-498-4800
                  </a>
                </p>
              </div>
            </SubSection>

            <SubSection title="10.5 Message frequency and rates">
              <p>
                Message frequency varies based on your enquiry and scheduling
                activity. Message and data rates may apply.
              </p>
            </SubSection>

            <SubSection title="10.6 Carrier liability disclaimer">
              <p>
                Mobile carriers are not liable for delayed or undelivered
                messages.
              </p>
            </SubSection>

            <SubSection title="10.7 Age restriction">
              <p>
                You must be 18 years or older to opt in to receive SMS messages
                from us.
              </p>
            </SubSection>

            <SubSection title="10.8 Privacy Policy">
              <p>
                Our Privacy Policy explains how we collect, use, and protect
                your information:{" "}
                <a
                  href="https://magichourportraits.com/privacy-policy"
                  className="underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
                >
                  https://magichourportraits.com/privacy-policy
                </a>
              </p>
            </SubSection>
          </TosSection>

          <TosSection title="11. Changes to these Terms">
            <p>
              We may update these Terms from time to time. The latest version
              will be posted on our website with an updated effective date.
            </p>
          </TosSection>

          <TosSection title="12. Governing law">
            <p>
              These Terms are governed by the laws of the Commonwealth of
              Pennsylvania, and you consent to the exclusive jurisdiction of the
              state and federal courts located in Pennsylvania for any dispute
              arising from these Terms or our services.
            </p>
          </TosSection>
        </section>

        <footer className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-600">
          <p>
            © {new Date().getFullYear()} Magic Hour Portraits. All rights
            reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}

function TosSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
      <h2 className="text-lg font-semibold tracking-tight text-slate-900">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-7 text-slate-700">
        {children}
      </div>
    </section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="text-sm font-semibold tracking-tight text-slate-900">
        {title}
      </h3>
      <div className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
        {children}
      </div>
    </div>
  );
}
