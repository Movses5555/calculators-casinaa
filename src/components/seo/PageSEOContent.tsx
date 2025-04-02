
import React from 'react';
import { Helmet } from 'react-helmet';

interface PageSEOContentProps {
  title: string;
  description: string;
  keywords: string;
  children: React.ReactNode;
  pageIdentifier: string;
  schemaType?: 'WebPage' | 'CalculatorApplication' | 'Article' | 'HowTo';
  datePublished?: string;
  dateModified?: string;
}

const PageSEOContent: React.FC<PageSEOContentProps> = ({
  title,
  description,
  keywords,
  children,
  pageIdentifier,
  schemaType = 'WebPage',
  datePublished = '2025-01-01',
  dateModified = '2025-03-19',
}) => {
  // Generate schema.org structured data
  const generateSchemaData = () => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': schemaType,
      name: title,
      description,
      url: `https://moneymetricsmania.com/${pageIdentifier}`,
      datePublished,
      dateModified,
      publisher: {
        '@type': 'Organization',
        name: 'CalcMaster',
        logo: {
          '@type': 'ImageObject',
          url: 'https://moneymetricsmania.com/logo.png'
        }
      }
    };

    if (schemaType === 'CalculatorApplication') {
      return {
        ...baseSchema,
        applicationCategory: 'FinanceTool',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        }
      };
    }

    return baseSchema;
  };

  const schemaData = generateSchemaData();

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://moneymetricsmania.com/${pageIdentifier}`} />
        <meta property="og:image" content="https://moneymetricsmania.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://moneymetricsmania.com/og-image.png" />
        <link rel="canonical" href={`https://moneymetricsmania.com/${pageIdentifier}`} />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      <div id={`content-${pageIdentifier}`}>
        {children}
      </div>
    </>
  );
};

export default PageSEOContent;
