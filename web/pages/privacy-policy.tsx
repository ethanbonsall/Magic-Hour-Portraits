// File: pages/privacy-policy.tsx
"use client";

import Footer from "@/components/home/bottom-description-bar";
import NavBar from "@/components/navbar";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";

const PrivacyPolicyPage = () => {
  return (
    <div className="w-screen overflow-x-hidden">
      <Head>
        <title>Privacy Policy</title>
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-1JPCVGXG7T"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1JPCVGXG7T');
            `,
        }}
      />
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text px-4 py-12">
        <div className="w-full max-w-4xl space-y-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-center">
            Privacy Policy
          </h1>
          <div className="space-y-6 text-base md:text-lg leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-text-800">
                Last Updated
              </h2>
              <p className="text-text-800">
                This Privacy Policy was last updated on{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                .
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-text-800">
                Introduction
              </h2>
              <p className="text-text-800">
                Magic Hour Portraits (&quot;we,&quot; &quot;our,&quot; or
                &quot;us&quot;) is committed to protecting your privacy. This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website and use
                our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-text-800">
                Information We Collect
              </h2>
              <div className="space-y-3 text-text-800">
                <p>
                  We may collect information about you in a variety of ways:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Personal Information:</strong> Name, email address,
                    phone number, and other contact details you provide when
                    contacting us or booking a session.
                  </li>
                  <li>
                    <strong>Payment Information:</strong> Billing address and
                    payment details processed through secure third-party payment
                    processors.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Information about how you
                    access and use our website, including IP address, browser
                    type, pages visited, and time spent on pages.
                  </li>
                  <li>
                    <strong>Cookies:</strong> We use cookies and similar
                    tracking technologies to track activity on our website and
                    hold certain information.
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-text-800">
                How We Use Your Information
              </h2>
              <div className="space-y-3 text-text-800">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>
                    Send you technical notices, updates, and support messages
                  </li>
                  <li>
                    Respond to your comments, questions, and provide customer
                    service
                  </li>
                  <li>Monitor and analyze trends and usage</li>
                  <li>
                    Detect, prevent, and address technical issues and fraud
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-text-800">
                Information Sharing and Disclosure
              </h2>
              <p className="text-text-800">
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information only in the
                following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-text-800">
                <li>
                  With service providers who assist us in operating our website
                  and conducting our business
                </li>
                <li>
                  To comply with legal obligations or respond to lawful requests
                </li>
                <li>
                  To protect our rights, privacy, safety, or property, and that
                  of our users
                </li>
                <li>
                  In connection with any merger, sale of assets, or acquisition
                  of all or a portion of our business
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-text-800">
                Data Security
              </h2>
              <p className="text-text-800">
                We implement appropriate technical and organizational security
                measures to protect your personal information. However, no
                method of transmission over the Internet or electronic storage
                is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-text-800">
                Your Rights
              </h2>
              <p className="text-text-800">
                You have the right to access, update, or delete your personal
                information at any time. You may also opt-out of certain
                communications from us. To exercise these rights, please visit
                our{" "}
                <Link
                  href="/opt-out"
                  className="text-primary hover:underline font-semibold"
                >
                  opt-out page
                </Link>{" "}
                or contact us using the information provided below.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-text-800">
                Third-Party Links
              </h2>
              <p className="text-text-800">
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices or content of these
                third-party sites. We encourage you to read the privacy policies
                of any third-party sites you visit.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-text-800">
                Changes to This Privacy Policy
              </h2>
              <p className="text-text-800">
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &quot;Last Updated&quot; date. You
                are advised to review this Privacy Policy periodically for any
                changes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-text-800">
                Contact Us
              </h2>
              <p className="text-text-800">
                If you have any questions about this Privacy Policy, please
                contact us:
              </p>
              <div className="space-y-2 text-text-800">
                <p>
                  <strong>Magic Hour Portraits</strong>
                </p>
                <p>Robert Bonsall</p>
                <p>
                  <Link
                    href="/contact"
                    className="text-primary hover:underline"
                  >
                    Contact Page
                  </Link>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
