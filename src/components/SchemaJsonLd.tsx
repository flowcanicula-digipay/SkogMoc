const schema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Skog Mộc by TNP',
  description:
    'Architectural, interior, furniture, and landscape design for Vietnamese homes.',
  url: 'https://TODO-domain.vn',
  telephone: '+84 90 333 37 29',
  email: 'thuyken52914@yahoo.com.vn',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Lô 35 đường số 9, KCN Tam Phước',
    addressLocality: 'Biên Hòa',
    addressRegion: 'Đồng Nai',
    addressCountry: 'VN',
  },
  areaServed: ['VN'],
  availableLanguage: ['en', 'vi', 'ja'],
  priceRange: '$$',
};

export default function SchemaJsonLd() {
  return (
    <script
      type="application/ld+json"
      // Hardcoded developer-controlled object only — never pass user input here.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
