
import React from 'react';
import Layout from '@/components/layout/Layout';
import NamePickerWheel from '@/components/calculators/chance/NamePickerWheel';
import CalculatorSEOContent from '@/components/seo/CalculatorSEOContent';

const NamePickerWheelPage = () => {
  return (
    <Layout>
      <CalculatorSEOContent
        title="Name Picker Wheel | Random Name Selector | CalcMaster"
        description="Pick random names with our name picker wheel. Perfect for drawings, contests, choosing group members, or making fair selections."
        keywords="name picker, random name generator, name selector, spinning wheel, random picker, name chooser, random selection, wheel of names"
        pageIdentifier="name-picker-wheel"
      >
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Name Picker Wheel</h1>
              <p className="text-gray-600 md:text-lg">
                Randomly select names from a list using a spinning wheel. Perfect for drawings, contests, or choosing group members.
              </p>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6">
              <NamePickerWheel />
            </div>
          </div>
        </div>
      </CalculatorSEOContent>
    </Layout>
  );
};

export default NamePickerWheelPage;
