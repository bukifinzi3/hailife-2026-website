export default function Script() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Clínica Hailife",
    "description": "Clínica especializada em oftalmologia com mais de 20 anos de experiência em São Paulo",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Rua Correia Dias, 184, Conjunto 62",
        "addressLocality": "São Paulo",
        "addressRegion": "SP",
        "postalCode": "04104-000",
        "addressCountry": "BR",
        "description": "Unidade Paraíso"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Rua Vieira de Moraes, 2110, Conjunto 207",
        "addressLocality": "São Paulo",
        "addressRegion": "SP",
        "postalCode": "04617-007",
        "addressCountry": "BR",
        "description": "Unidade Campo Belo"
      }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Wednesday", "Friday"],
        "opens": "13:00",
        "closes": "19:00",
        "description": "Unidade Paraíso - Dra. Simone Finzi"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Tuesday", "Thursday", "Saturday"],
        "opens": "08:00",
        "closes": "12:00",
        "description": "Unidade Campo Belo - Dra. Liliana Campos"
      }
    ],
    "telephone": "+5511999999999",
    "url": "https://www.clinicahailife.com.br"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
