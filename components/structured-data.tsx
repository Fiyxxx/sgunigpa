export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SGUniGPA",
    description:
      "Free GPA calculator for Singapore university students. Supports NUS CAP (with S/U), NTU, and SMU grading systems.",
    url: "https://sgunigpa.com",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "SGD",
    },
    featureList: [
      "NUS CAP calculator with S/U option",
      "NTU GPA calculator",
      "SMU GPA calculator",
      "Local data storage",
      "Real-time GPA calculation",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
