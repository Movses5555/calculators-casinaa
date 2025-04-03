
import React from 'react';
import Layout from '@/components/layout/Layout';
import TextCharacterCounter from '@/components/calculators/random/TextCharacterCounter';
import CalculatorSEOContent from '@/components/seo/CalculatorSEOContent';

const TextCharacterCounterPage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="Text Character Counter | Word Counter Tool | CalcMaster"
        description="Count characters, words, sentences and paragraphs in your text with our free online character counter tool. Perfect for essays, social media posts, and SEO."
        keywords="character counter, word counter, text analyzer, letter count, text statistics, word count tool, SEO text counter"
        pageIdentifier="text-character-counter"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Text Character Counter</h1>
              <p className="text-gray-600 md:text-lg">
                Count characters, words, sentences, and paragraphs in your text.
              </p>
            </div>
            
            <TextCharacterCounter />
          </div>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default TextCharacterCounterPage;
