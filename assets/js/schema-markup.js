/**
 * Schema.org Markup para Mente & Dados
 * Adiciona rich snippets para SEO
 */

function addSchemaMarkup(type, data) {
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  scripts.forEach(script => {
    if (script.id === `schema-${type}`) script.remove();
  });
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = `schema-${type}`;
  script.textContent = JSON.stringify(data, null, 2);
  document.head.appendChild(script);
}

// Schema: Organization (global)
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Mente & Dados",
  "url": "https://menteedados.github.io",
  "logo": "https://menteedados.github.io/assets/images/logo.svg",
  "sameAs": [
    "https://www.youtube.com/@MenteeDados",
    "https://www.instagram.com/menteedados.oficial",
    "https://medium.com/@menteedados"
  ],
  "description": "Produtos digitais para engenharia de dados. Trilhas, e-books e cursos para iniciantes e profissionais.",
  "founder": {
    "@type": "Person",
    "name": "Franciele Amaral"
  }
};

// Schema: Website (global)
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Mente & Dados",
  "url": "https://menteedados.github.io",
  "description": "Transformando iniciantes em engenheiros de dados através de conteúdo prático e trilhas estruturadas.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://menteedados.github.io/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

// Schema: Product - E-book
function addEbookSchema() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "E-book - Modelagem Mental Antes do Código",
    "description": "Método em 6 etapas para transformar qualquer problema de dados em modelo, decisão e solução. 232 páginas de raciocínio aplicado.",
    "image": "https://menteedados.github.io/assets/images/og/og-ebook.png",
    "brand": {
      "@type": "Brand",
      "name": "Mente & Dados"
    },
    "sku": "MENTE-EBOOK-001",
    "offers": {
      "@type": "Offer",
      "price": 87,
      "priceCurrency": "BRL",
      "availability": "https://schema.org/InStock",
      "url": "https://menteedados.github.io/trilha-00/ebook/",
      "priceValidUntil": "2026-12-31",
      "seller": {
        "@type": "Organization",
        "name": "Mente & Dados"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.9,
      "reviewCount": 45,
      "bestRating": 5,
      "worstRating": 1
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Ana Paula"
        },
        "reviewBody": "O método mudou completamente minha forma de pensar problemas de dados.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 5
        }
      }
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Iniciantes em Engenharia de Dados"
    },
    "learningResourceType": "E-book",
    "educationalLevel": "Beginner to Intermediate",
    "numberOfPages": 232
  };
  
  addSchemaMarkup('product-ebook', productSchema);
}

// Schema: Product - Caderno
function addCadernoSchema() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Caderno de Exercícios - Engenharia de Dados",
    "description": "10 cenários reais com soluções comentadas. 235 páginas de prática guiada com e-commerce, hotel, marketplace e mais.",
    "image": "https://menteedados.github.io/assets/images/og/og-caderno.png",
    "brand": {
      "@type": "Brand",
      "name": "Mente & Dados"
    },
    "sku": "MENTE-CADERNO-001",
    "offers": {
      "@type": "Offer",
      "price": 67,
      "priceCurrency": "BRL",
      "availability": "https://schema.org/InStock",
      "url": "https://menteedados.github.io/trilha-00/caderno/",
      "priceValidUntil": "2026-12-31",
      "seller": {
        "@type": "Organization",
        "name": "Mente & Dados"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.8,
      "reviewCount": 32,
      "bestRating": 5,
      "worstRating": 1
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Iniciantes e Intermediários"
    },
    "learningResourceType": "Exercícios Práticos",
    "educationalLevel": "Beginner to Advanced",
    "numberOfPages": 235
  };
  
  addSchemaMarkup('product-caderno', productSchema);
}

// Schema: Product - Bundle Completo
function addBundleSchema() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Bundle Completo - Trilha 00 Mente & Dados",
    "description": "Pacote completo com E-book (232 páginas) + Caderno de Exercícios (235 páginas) + 3 Bônus Exclusivos. Economia de R$ 47.",
    "image": "https://menteedados.github.io/assets/images/og/og-bundle.png",
    "brand": {
      "@type": "Brand",
      "name": "Mente & Dados"
    },
    "sku": "MENTE-BUNDLE-001",
    "offers": {
      "@type": "Offer",
      "price": 127,
      "priceCurrency": "BRL",
      "availability": "https://schema.org/InStock",
      "url": "https://menteedados.github.io/trilha-00/completo/",
      "priceValidUntil": "2026-12-31",
      "seller": {
        "@type": "Organization",
        "name": "Mente & Dados"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.95,
      "reviewCount": 67,
      "bestRating": 5,
      "worstRating": 1
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Iniciantes em Engenharia de Dados"
    },
    "learningResourceType": "Bundle Educacional",
    "educationalLevel": "Beginner to Advanced",
    "numberOfPages": 467
  };
  
  addSchemaMarkup('product-bundle', productSchema);
}

// Schema: BreadcrumbList (para todas as páginas)
function addBreadcrumbSchema(items) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
  
  addSchemaMarkup('breadcrumb', breadcrumbSchema);
}

// Schema: Course (para a Trilha 00)
function addCourseSchema() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Trilha 00 - Modelagem Mental Antes do Código",
    "description": "Aprenda o raciocínio que antecede qualquer ferramenta de dados. Método em 6 etapas para transformar problemas em soluções estruturadas.",
    "provider": {
      "@type": "Organization",
      "name": "Mente & Dados",
      "sameAs": "https://menteedados.github.io"
    },
    "educationalCredentialAwarded": "Certificado de Conclusão",
    "coursePrerequisites": "Nenhum conhecimento prévio necessário",
    "audience": {
      "@type": "Audience",
      "audienceType": "Iniciantes em Engenharia de Dados"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online",
      "courseWorkload": "PT20H",
      "startDate": "2026-06-01",
      "endDate": "2026-12-31",
      "offers": {
        "@type": "Offer",
        "price": 127,
        "priceCurrency": "BRL",
        "category": "Self-Paced"
      }
    }
  };
  
  addSchemaMarkup('course', courseSchema);
}

// Inicializar schemas com base na página
function initSchemas() {
  const path = window.location.pathname;
  
  // Adicionar schemas globais
  addSchemaMarkup('organization', organizationSchema);
  addSchemaMarkup('website', websiteSchema);
  
  // Adicionar breadcrumb base
  addBreadcrumbSchema([
    { name: "Home", url: "https://menteedados.github.io/" },
    { name: "Trilha 00", url: "https://menteedados.github.io/trilha-00/" }
  ]);
  
  // Adicionar schema específico por página
  if (path.includes('/trilha-00/ebook/')) {
    addEbookSchema();
    addBreadcrumbSchema([
      { name: "Home", url: "https://menteedados.github.io/" },
      { name: "Trilha 00", url: "https://menteedados.github.io/trilha-00/" },
      { name: "E-book", url: "https://menteedados.github.io/trilha-00/ebook/" }
    ]);
    console.log('📊 Schema: E-book adicionado');
  } else if (path.includes('/trilha-00/caderno/')) {
    addCadernoSchema();
    addBreadcrumbSchema([
      { name: "Home", url: "https://menteedados.github.io/" },
      { name: "Trilha 00", url: "https://menteedados.github.io/trilha-00/" },
      { name: "Caderno", url: "https://menteedados.github.io/trilha-00/caderno/" }
    ]);
    console.log('📊 Schema: Caderno adicionado');
  } else if (path.includes('/trilha-00/completo/')) {
    addBundleSchema();
    addBreadcrumbSchema([
      { name: "Home", url: "https://menteedados.github.io/" },
      { name: "Trilha 00", url: "https://menteedados.github.io/trilha-00/" },
      { name: "Bundle Completo", url: "https://menteedados.github.io/trilha-00/completo/" }
    ]);
    console.log('📊 Schema: Bundle adicionado');
  } else if (path.includes('/trilha-00/')) {
    addCourseSchema();
    console.log('📊 Schema: Course adicionado');
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initSchemas);
