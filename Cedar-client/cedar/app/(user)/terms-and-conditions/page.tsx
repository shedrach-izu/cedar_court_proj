import Link from "next/link";

const sections = [
  {
    title: "1. Acceptance of These Terms",
    content: [
      `These Terms & Conditions govern your use of the Cedar Court website, serviced-apartment accommodation, restaurant services, and related facilities.`,
      `By using our website, making a reservation, or placing an order, you agree to the terms applicable to that service. If you do not agree, please do not use the relevant service.`,
    ],
  },
  {
    title: "2. Reservations and Bookings",
    content: [
      `Apartment reservations are subject to availability and confirmation by Cedar Court. A booking request does not necessarily mean that a reservation has been confirmed.`,
      `Guests must provide accurate contact information, check-in and check-out dates, and the number of guests. The maximum occupancy and other conditions applicable to the selected apartment must be observed.`,
      `Reservation prices, included services, payment requirements, and any special conditions will be communicated during the booking process or in the applicable booking confirmation.`,
    ],
  },
  {
    title: "3. Check-In and Check-Out",
    content: [
      `Check-in and check-out times are determined by Cedar Court and may be updated from time to time. Please confirm the applicable times before arrival.`,
      `Early check-in, late check-out, special requests, and additional services are subject to availability and may incur additional charges where disclosed.`,
      `Guests may be asked to provide valid identification and any information reasonably required to verify a reservation, subject to applicable law.`,
    ],
  },
  {
    title: "4. Pricing and Payment",
    content: [
      `Prices are displayed in the currency indicated during checkout. Applicable taxes, service fees, delivery charges, and other disclosed charges may form part of the final amount.`,
      `Where online payment is available, transactions may be processed by a third-party payment provider such as Paystack. Payments remain subject to the provider's applicable terms and verification procedures.`,
      `A payment confirmation or successful transaction reference does not replace any separate booking confirmation required by Cedar Court.`,
      `If a displayed price or transaction contains an apparent error, we will take reasonable steps to investigate and contact the affected customer before taking further action, subject to applicable law.`,
    ],
  },
  {
    title: "5. Cancellations, Changes and Refunds",
    content: [
      `Cancellation, amendment, refund, and no-show conditions may vary according to the reservation, order, rate, or offer selected. Please review the applicable conditions before completing payment.`,
      `If you need to change or cancel a reservation, contact Cedar Court as soon as possible. Requests are subject to availability and the applicable booking conditions.`,
      `Where a refund is approved, processing times may depend on the payment provider and the original payment method. Refunds will be handled in accordance with the applicable policy and relevant law.`,
      `Cedar Court will communicate any specific cancellation deadlines, penalties, and refund restrictions applicable to your booking. Do not assume a reservation is refundable unless the applicable conditions confirm it.`,
    ],
  },
  {
    title: "6. Restaurant Orders",
    content: [
      `Restaurant menu items, prices, and availability may change. An order is subject to acceptance and confirmation by Cedar Court.`,
      `Please provide accurate contact details and delivery information where delivery is offered. Delivery availability, fees, estimated times, and collection arrangements will be communicated during ordering where applicable.`,
      `Food allergy or dietary requests should be communicated clearly before an order is confirmed. Although we will take reasonable care, guests should contact us to discuss serious allergies or specific dietary requirements before ordering.`,
      `Order cancellations, substitutions, and refunds are subject to the circumstances, the applicable order conditions, and relevant law.`,
    ],
  },
  {
    title: "7. Guest Conduct and Property Care",
    content: [
      `Guests must treat staff, other guests, accommodation, furnishings, and facilities with reasonable care and respect.`,
      `Guests must comply with applicable safety instructions, occupancy limits, and lawful property rules. Unlawful activity, harassment, damage to property, or conduct that creates a safety risk is not permitted.`,
      `Guests may be responsible, to the extent permitted by law, for damage or loss caused by their actions or the actions of people under their responsibility.`,
      `Please report maintenance issues or damage to our staff promptly so that appropriate action can be taken.`,
    ],
  },
  {
    title: "8. Facilities and Service Availability",
    content: [
      `Facilities and services, including room service, restaurant and bar facilities, event spaces, laundry, Wi-Fi, concierge assistance, and airport transfers, are subject to availability and may require advance arrangements or additional payment.`,
      `We will make reasonable efforts to provide confirmed services. Temporary interruptions, maintenance, safety concerns, or circumstances outside our reasonable control may affect availability.`,
      `Where a material change affects a confirmed booking, Cedar Court will take reasonable steps to communicate with the affected customer and address the situation in accordance with the applicable booking conditions and law.`,
    ],
  },
  {
    title: "9. Website Use and Intellectual Property",
    content: [
      `Website text, branding, graphics, photographs, logos, and other content are owned by Cedar Court or used with permission unless otherwise indicated.`,
      `You may use the website for lawful personal purposes. You must not misuse the website, attempt unauthorised access, interfere with its operation, or reproduce protected content without permission or another lawful basis.`,
      `We make reasonable efforts to keep website information accurate and available, but we do not guarantee that the website will always be uninterrupted or error-free.`,
    ],
  },
  {
    title: "10. Privacy and Personal Information",
    content: [
      `Personal information submitted through our website or services is handled in accordance with our Privacy Policy and applicable data-protection requirements.`,
      `Please review our Privacy Policy to understand how information is collected, used, and protected.`,
    ],
  },
  {
    title: "11. Liability and Circumstances Beyond Our Control",
    content: [
      `Nothing in these terms excludes or limits a right, remedy, or liability that cannot lawfully be excluded or limited.`,
      `To the extent permitted by applicable law, Cedar Court is not responsible for losses arising from circumstances beyond its reasonable control, including certain utility interruptions, network failures, emergencies, or events that could not reasonably have been prevented.`,
      `Nothing in this section removes any consumer rights or obligations that apply under Nigerian law.`,
    ],
  },
  {
    title: "12. Complaints and Disputes",
    content: [
      `If you have a concern about a reservation, restaurant order, payment, or service, please contact Cedar Court so that we can investigate and try to resolve it.`,
      `These terms are intended to operate consistently with the laws applicable in Nigeria. Any dispute will be handled by the competent authorities or courts with jurisdiction, subject to applicable law.`,
    ],
  },
  {
    title: "13. Changes to These Terms",
    content: [
      `We may update these Terms & Conditions when our services, procedures, or legal requirements change. The latest version will be published on this page.`,
      `Where required, material changes will be communicated or handled in accordance with applicable law. The terms applicable to an existing reservation may also depend on the conditions provided when that booking was made.`,
    ],
  },
  {
    title: "14. Contact Us",
    content: [
      `For questions about these terms, bookings, restaurant orders, or complaints, please contact Cedar Court through our Contact page.`,
    ],
  },
];

export default function TermsAndConditionsPage() {
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
            Terms & Conditions
          </h1>

          <p className="mt-6 max-w-2xl font-['Jost'] text-base leading-8 text-[#a99a84] md:text-lg">
            The terms that guide your use of Cedar Court's
            accommodation, restaurant, website, and hospitality
            services.
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
            Before you book
          </h2>

          <p className="font-['Jost'] leading-7 text-[#a99a84]">
            Please review the booking details, applicable charges,
            check-in and check-out times, and cancellation
            conditions before completing a reservation or
            restaurant order.
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
            href="/privacy-policy"
            className="font-['DM_Mono'] text-xs uppercase tracking-widest text-[#c4954a] transition-colors hover:text-[#ede4d4]"
          >
            Privacy Policy →
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