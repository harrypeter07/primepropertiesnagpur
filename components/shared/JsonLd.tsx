import React from "react";

export const JsonLd: React.FC = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": "https://primenagpurproperties.com/#agent",
        name: "Properties Nagpur (Prime Nagpur Properties)",
        image: "https://primenagpurproperties.com/images/logo_with_bg.png",
        logo: "https://primenagpurproperties.com/images/logo_with_bg.png",
        url: "https://primenagpurproperties.com",
        telephone: "+91-712-2567890",
        priceRange: "₹₹ - ₹₹₹₹",
        currenciesAccepted: "INR",
        paymentAccepted: "Cash, Cheque, Bank Transfer, Home Loan",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Wardha Road, Near Besa Square",
          addressLocality: "Nagpur",
          addressRegion: "Maharashtra",
          postalCode: "440015",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 21.1458,
          longitude: 79.0882,
        },
        areaServed: [
          { "@type": "City", name: "Nagpur" },
          { "@type": "AdministrativeArea", name: "Wardha Road" },
          { "@type": "AdministrativeArea", name: "Besa-Pipla" },
          { "@type": "AdministrativeArea", name: "Civil Lines" },
          { "@type": "AdministrativeArea", name: "Dharampeth" },
          { "@type": "AdministrativeArea", name: "MIHAN SEZ" },
          { "@type": "AdministrativeArea", name: "Hingna" },
          { "@type": "AdministrativeArea", name: "Koradi Road" },
          { "@type": "AdministrativeArea", name: "Manish Nagar" },
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "09:00",
            closes: "20:00",
          },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "348",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://primenagpurproperties.com/#website",
        url: "https://primenagpurproperties.com",
        name: "Properties Nagpur",
        description:
          "Search 500+ NMRDA & RERA approved residential plots, luxury flats, homes, and commercial lands in Nagpur.",
        publisher: { "@id": "https://primenagpurproperties.com/#agent" },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://primenagpurproperties.com/listings?search={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://primenagpurproperties.com/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Which areas in Nagpur are best for buying residential plots and homes?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The top high-growth areas in Nagpur for residential plots and homes are Besa-Pipla, Wardha Road corridor, Manish Nagar, Somalwada, and Dharampeth. Besa-Pipla and Wardha Road offer high capital appreciation due to proximity to the MIHAN SEZ and Nagpur Metro.",
            },
          },
          {
            "@type": "Question",
            name: "Are all properties on Properties Nagpur NMRDA and RERA approved?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, 100% of our listed plots, luxury apartments, and commercial projects come with verified NMRDA sanctions, RERA registration numbers, 7/12 land records, and clear legal title clearance certificates.",
            },
          },
          {
            "@type": "Question",
            name: "What is the average plot price in Besa and Wardha Road, Nagpur?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Residential NMRDA sanctioned RL plots in Besa and Wardha Road typically range from ₹3,000 to ₹5,500 per sqft depending on layout road width, park facing, and gated township amenities.",
            },
          },
          {
            "@type": "Question",
            name: "Can I get bank loan approval for plots in Nagpur?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, our NMRDA approved residential plots and RERA registered flats have pre-approved loan sanctions from leading nationalized and private banks including SBI, HDFC, ICICI, and Axis Bank with up to 80% LTV financing.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
