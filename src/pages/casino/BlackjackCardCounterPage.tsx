
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageSEOContent from '@/components/seo/PageSEOContent';
import BlackjackCardCounter from '@/components/calculators/casino/BlackjackCardCounter';

const BlackjackCardCounterPage = () => {
  return (
    <Layout>
      <PageSEOContent
        title="Blackjack Card Counter | Card Counting Trainer | CalcMaster"
        description="Practice card counting for blackjack with our free online trainer. Learn hi-lo, KO, Omega II, and other card counting systems."
        keywords="card counting, blackjack card counter, counting cards, hi-lo system, blackjack trainer, card counting practice"
        pageIdentifier="blackjack-card-counter"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Blackjack Card Counter</h1>
              <p className="text-gray-600 md:text-lg">
                Practice card counting for blackjack with our interactive trainer for various counting systems.
              </p>
            </div>
            
            <BlackjackCardCounter />
          </div>
        </div>
      </PageSEOContent>
    </Layout>
  );
};

export default BlackjackCardCounterPage;
