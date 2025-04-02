
import React from "react";
import Layout from "./Layout";
import { Helmet } from "react-helmet";

interface BettingLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  pageIdentifier: string;
}

const BettingLayout: React.FC<BettingLayoutProps> = ({
  children,
  title,
  description,
  pageIdentifier,
}) => {
  return (
    <Layout>
      <Helmet>
        <title>{title} | Money Metrics Mania</title>
        <meta name="description" content={description} />
      </Helmet>
      
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

export default BettingLayout;
