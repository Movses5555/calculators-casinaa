
import React from "react";
import Layout from "./Layout";
import Head from "next/head";

interface CryptoLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  pageIdentifier: string;
}

const CryptoLayout: React.FC<CryptoLayoutProps> = ({
  children,
  title,
  description,
  pageIdentifier,
}) => {
  return (
    <Layout>
      <Head>
        <title>{title} | Money Metrics Mania</title>
        <meta name="description" content={description} />
      </Head>
      
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-6">{title}</h1>
          <p className="text-xl max-w-2xl mx-auto">
            {description}
          </p>
        </header>
        
        <div id={pageIdentifier}>
          {children}
        </div>
      </div>
    </Layout>
  );
};

export default CryptoLayout;
