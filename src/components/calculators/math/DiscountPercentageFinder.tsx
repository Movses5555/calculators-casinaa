
import React, { useState } from 'react';
import { toast } from 'sonner';
import { DiscountInput, DiscountResult, calculateDiscount } from '@/utils/math/discount';
import DiscountPercentageEducationalContent from './DiscountPercentageEducationalContent';
import DiscountInputForm, { FormValues, CalculationType } from './DiscountInputForm';
import DiscountResultsDisplay from './DiscountResultsDisplay';

const DiscountPercentageFinder: React.FC = () => {
  const [calculationType, setCalculationType] = useState<CalculationType>('findDiscountPercentage');
  const [formValues, setFormValues] = useState<FormValues>({
    originalPrice: '',
    discountedPrice: '',
    discountPercentage: ''
  });
  const [result, setResult] = useState<DiscountResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCalculate = () => {
    try {
      setIsCalculating(true);
      
      const input: DiscountInput = {
        calculation: calculationType
      };
      
      // Add required fields based on calculation type
      switch (calculationType) {
        case 'findDiscountedPrice':
          if (!formValues.originalPrice || !formValues.discountPercentage) {
            toast.error('Please enter both original price and discount percentage');
            setIsCalculating(false);
            return;
          }
          input.originalPrice = parseFloat(formValues.originalPrice);
          input.discountPercentage = parseFloat(formValues.discountPercentage);
          break;
          
        case 'findDiscountPercentage':
          if (!formValues.originalPrice || !formValues.discountedPrice) {
            toast.error('Please enter both original price and discounted price');
            setIsCalculating(false);
            return;
          }
          input.originalPrice = parseFloat(formValues.originalPrice);
          input.discountedPrice = parseFloat(formValues.discountedPrice);
          break;
          
        case 'findOriginalPrice':
          if (!formValues.discountedPrice || !formValues.discountPercentage) {
            toast.error('Please enter both discounted price and discount percentage');
            setIsCalculating(false);
            return;
          }
          input.discountedPrice = parseFloat(formValues.discountedPrice);
          input.discountPercentage = parseFloat(formValues.discountPercentage);
          break;
      }
      
      // Validate input values are positive
      Object.entries(input).forEach(([key, value]) => {
        if (key !== 'calculation' && typeof value === 'number' && value <= 0) {
          throw new Error(`${key.replace(/([A-Z])/g, ' $1').toLowerCase()} must be greater than zero`);
        }
      });
      
      // Calculate result
      const calculatedResult = calculateDiscount(input);
      setResult(calculatedResult);
      
      toast.success('Discount calculation completed!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error calculating discount');
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setFormValues({
      originalPrice: '',
      discountedPrice: '',
      discountPercentage: ''
    });
    setResult(null);
  };

  const handleCalculationTypeChange = (value: string) => {
    setCalculationType(value as CalculationType);
    // Clear result when changing calculation type
    setResult(null);
  };

  const handleQuickDiscountSelect = (percent: number) => {
    setFormValues(prev => ({
      ...prev,
      discountPercentage: percent.toString()
    }));
    if (calculationType === 'findDiscountPercentage') {
      setCalculationType('findDiscountedPrice');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <DiscountInputForm
            calculationType={calculationType}
            formValues={formValues}
            isCalculating={isCalculating}
            onCalculationTypeChange={handleCalculationTypeChange}
            onInputChange={handleInputChange}
            onCalculate={handleCalculate}
            onReset={handleReset}
            onQuickDiscountSelect={handleQuickDiscountSelect}
          />
        </div>
        
        <div className="lg:col-span-7 space-y-6">
          <DiscountResultsDisplay
            result={result}
            calculationType={calculationType}
            discountPercentage={formValues.discountPercentage}
          />
          
          <DiscountPercentageEducationalContent />
        </div>
      </div>
    </div>
  );
};

export default DiscountPercentageFinder;
