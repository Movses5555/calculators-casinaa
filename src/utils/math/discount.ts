
/**
 * Discount calculation utility
 */

export type DiscountCalculationType = 'findDiscountedPrice' | 'findDiscountPercentage' | 'findOriginalPrice';

export interface DiscountInput {
  calculation: DiscountCalculationType;
  originalPrice?: number;
  discountedPrice?: number;
  discountPercentage?: number;
}

export interface DiscountResult {
  result: number;
  savings?: number;
  explanation: string;
  formula: string;
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const calculateDiscount = (input: DiscountInput): DiscountResult => {
  switch (input.calculation) {
    case 'findDiscountedPrice': {
      if (input.originalPrice === undefined || input.discountPercentage === undefined) {
        throw new Error("Original price and discount percentage are required");
      }
      
      const discountAmount = (input.originalPrice * input.discountPercentage) / 100;
      const discountedPrice = input.originalPrice - discountAmount;
      
      return {
        result: discountedPrice,
        savings: discountAmount,
        explanation: `The sale price is calculated by reducing the original price by ${input.discountPercentage}%.`,
        formula: `${formatCurrency(input.originalPrice)} - (${formatCurrency(input.originalPrice)} × ${input.discountPercentage}%) = ${formatCurrency(discountedPrice)}`
      };
    }
    
    case 'findDiscountPercentage': {
      if (input.originalPrice === undefined || input.discountedPrice === undefined) {
        throw new Error("Original price and discounted price are required");
      }
      
      if (input.originalPrice === 0) {
        throw new Error("Original price cannot be zero");
      }
      
      const discountAmount = input.originalPrice - input.discountedPrice;
      const discountPercentage = (discountAmount / input.originalPrice) * 100;
      
      return {
        result: discountPercentage,
        savings: discountAmount,
        explanation: `The discount percentage is calculated by finding what percentage of the original price is being saved.`,
        formula: `[(${formatCurrency(input.originalPrice)} - ${formatCurrency(input.discountedPrice)}) ÷ ${formatCurrency(input.originalPrice)}] × 100 = ${discountPercentage.toFixed(2)}%`
      };
    }
    
    case 'findOriginalPrice': {
      if (input.discountedPrice === undefined || input.discountPercentage === undefined) {
        throw new Error("Discounted price and discount percentage are required");
      }
      
      if (input.discountPercentage === 100) {
        throw new Error("Discount percentage cannot be 100%");
      }
      
      const originalPrice = (input.discountedPrice * 100) / (100 - input.discountPercentage);
      const savings = originalPrice - input.discountedPrice;
      
      return {
        result: originalPrice,
        savings,
        explanation: `The original price is calculated by working backwards from the sale price and discount percentage.`,
        formula: `${formatCurrency(input.discountedPrice)} ÷ (100% - ${input.discountPercentage}%) × 100% = ${formatCurrency(originalPrice)}`
      };
    }
    
    default:
      throw new Error("Invalid calculation type");
  }
};
