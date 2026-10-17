import Link from "next/link";

const sections = [
  {
    title: "1. Introduction",
    content: [
      `Cedar Court Serviced Apartments ("Cedar Court", "we", "our", or "us") respects your privacy and is committed to handling your personal information responsibly.`,
      `This Privacy Policy explains how we collect, use, store, disclose, and protect information when you visit our website, make a reservation, place a restaurant order, contact us, or use our services.`,
    ],
  },
  {
    title: "2. Information We Collect",
    content: [
      `Personal information you provide may include your name, email address, telephone number, account details, reservation information, guest preferences, delivery details, and messages sent to us.`,
      `When you make a booking or order, we may collect relevant dates, guest numbers, requested services, order details, transaction references, and payment status.`,
      `Our website and service providers may also process technical information such as your IP address, browser type, device information, and website usage data where applicable.`,
    ],
  },
  {
    title: "3. How We Use Your Information",
    content: [
      `We use personal information to manage apartment reservations, process restaurant orders, maintain customer accounts, respond to enquiries, provide customer support, and communicate important service updates.`,
      `We may also use information to process payments through our payment providers, prevent fraud, maintain security, comply with legal obligations, and improve our website and services.`,
      `Where you have provided the necessary consent, we may use your contact details to send newsletters, promotional offers, and updates. You can opt out of marketing communications.`,
    ],
  },
  {
    title: "4. Payments and Third-Party Services",
    content: [
      `Payments may be handled by third-party payment processors, including Paystack where enabled. Payment transactions are subject to the relevant provider's terms and privacy practices.`,
      `Cedar Court does not intend to collect or store your full payment card details through ordinary website forms. Payment information is handled according to the payment method and provider used.`,
      `We may use service providers for website hosting, email delivery, analytics, customer communications, and other operational needs. We share only information reasonably needed for their services, subject to applicable requirements.`,
    ],
  },
  {
    title: "5. Cookies and Technical Information",
    content: [
      `Our website or its service providers may use cookies or similar technologies to support essential functionality, security, preferences, and performance.`,
      `You can manage cookies through your browser settings. Disabling certain cookies may affect features such as account access or reservation functionality.`,
    ],
  },
  {
    title: "6. How We Share Information",
    content: [
      `We do not sell your personal information. We may share relevant information with authorised staff, payment processors, technology providers, professional advisers, or public authorities where required or permitted by law.`,
      `Information may also be disclosed when necessary to protect guests, enforce our terms, investigate suspected fraud, or protect our legal rights.`,
    ],
  },
  {
    title: "7. Data Retention and Security",
    content: [
      `We retain personal information for as long as reasonably necessary to provide our services, maintain business records, resolve disputes, and meet legal or regulatory obligations.`,
      `We use appropriate technical and organisational measures intended to protect personal information. However, no online system or electronic transmission can be guaranteed to be completely secure.`,
    ],
  },
  {
    title: "8. Your Privacy Rights",
    content: [
      `Subject to applicable law, you may have the right to request access to your personal information, correct inaccurate details, request deletion, object to certain processing, withdraw consent where processing relies on consent, or request a copy of eligible information.`,
      `To exercise a privacy right or raise a concern, contact us using the details in the Contact Us section. We may need to verify your identity before responding.`,
    ],
  },
  {
    title: "9. Children's Privacy",
    content: [
      `Our website is intended for people who can lawfully use our services. Personal information about children should be provided only by a parent, guardian, or other person legally authorised to provide it, where required.`,
    ],
  },
  {
    title: "10. Changes to This Policy",
    content: [
      `We may update this Privacy Policy when our services, practices, or legal obligations change. The revised version will be published on this page with an updated effective date where appropriate.`,
    ],
  },
  {
    title: "11. Contact Us",
    content: [
      `If you have questions about this Privacy Policy or how your personal information is handled, please contact Cedar Court using the contact details on our Contact page.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0c0a08] text-[#ede4d4]">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[rgba(196,149,74,0.15)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,149,74,0.10),transparent_65%)]" />

        <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
          <p className="mb-5 font-['DM_Mono'] text-xs uppercase tracking-[0.3em] text-[#c4954a]">
            Cedar Court · Legal
          </p>

          <h1 className="max-w-3xl font-['Fraunces'] text-4xl leading-tight md:text-6xl">
            Privacy Policy
          </h1>

          <p className="mt-6 max-w-2xl font-['Jost'] text-base leading-8 text-[#a99a84] md:text-lg">
            Your privacy matters to us. Learn how Cedar Court
            handles personal information when you use our
            accommodation, restaurant, and website services.
          </p>

          <p className="mt-6 font-['DM_Mono'] text-xs tracking-wide text-[#8a7d6a]">
            Effective date: 17 October 2026
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-6 py-14 md:py-20">
        <div className="mb-12 border-l-2 border-[#c4954a] bg-[#161310] p-6 md:p-8">
          <h2 className="mb-3 font-['Fraunces'] text-xl">
            At a glance
          </h2>

          <p className="font-['Jost'] leading-7 text-[#a99a84]">
            We use information to manage bookings and orders,
            provide customer support, process transactions through
            payment providers, and improve our services. We do
            not sell your personal information.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((section) => (
            <section
              key={section.title}
              className="border-b border-[rgba(196,149,74,0.12)] pb-8 last:border-0"
            >
              <h2 className="mb-4 font-['Fraunces'] text-2xl text-[#c4954a]">
                {section.title}
              </h2>

              <div className="space-y-4">
                {section.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className="font-['Jost'] text-sm leading-8 text-[#b7aa97] md:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-6 border-t border-[rgba(196,149,74,0.15)] pt-8">
          <Link
            href="/terms-and-conditions"
            className="font-['DM_Mono'] text-xs uppercase tracking-widest text-[#c4954a] transition-colors hover:text-[#ede4d4]"
          >
            Terms & Conditions →
          </Link>

          <Link
            href="/contact"
            className="font-['DM_Mono'] text-xs uppercase tracking-widest text-[#c4954a] transition-colors hover:text-[#ede4d4]"
          >
            Contact Us →
          </Link>
        </div>
      </section>
    </main>
  );
}