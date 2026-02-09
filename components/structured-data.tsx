export function StructuredData() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "SGUniGPA",
      alternateName: "Singapore University GPA Calculator",
      description:
        "Free online GPA calculator for Singapore university students. Calculate your NUS CAP with S/U options, NTU GPA, and SMU GPA instantly with accurate grading scales.",
      url: "https://sgunigpa.com",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "SGD",
      },
      featureList: [
        "NUS CAP calculator with S/U option support",
        "NTU GPA calculator with accurate grading scale",
        "SMU GPA calculator with 4.0 scale",
        "Local browser data storage",
        "Real-time GPA calculation",
        "No login or registration required",
        "Works offline after first load",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        ratingCount: "1",
      },
      author: {
        "@type": "Person",
        name: "Han Sheng",
        url: "https://www.hansheng.dev",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I calculate my NUS CAP?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "SGUniGPA automatically calculates your NUS CAP using the official formula: CAP = Σ(Module Grade Point × MCs) / Σ(MCs for all graded modules). You can also mark modules as S/U to exclude them from your CAP calculation.",
          },
        },
        {
          "@type": "Question",
          name: "Does this calculator support S/U options for NUS?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! SGUniGPA fully supports NUS S/U (Satisfactory/Unsatisfactory) options. Modules marked as S/U are excluded from your CAP calculation but still count towards earned credits if you score C or above.",
          },
        },
        {
          "@type": "Question",
          name: "Is my GPA data saved?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, all your course data is automatically saved in your browser's local storage. Your data never leaves your device and is restored when you return to the site.",
          },
        },
        {
          "@type": "Question",
          name: "Which universities are supported?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "SGUniGPA supports NUS (5.0 CAP scale with S/U), NTU (5.0 GPA scale), and SMU (4.0 GPA scale) with accurate grading systems for each university.",
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://sgunigpa.com",
        },
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
