
/**
 * Percentage calculation utility
 */

export interface PercentageInput {
  calculation: 'percentOfNumber' | 'percentChange' | 'findPercent';
  value1: number;
  value2: number;
}

export interface PercentageResult {
  result: number;
  explanation: string;
  formula: string;
}

export const formatPercent = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value / 100);
};

export const calculatePercentage = (input: PercentageInput): PercentageResult => {
  switch (input.calculation) {
    case 'percentOfNumber': {
      // Calculate what is X% of Y
      const percent = input.value1;
      const number = input.value2;
      const result = (percent / 100) * number;
      
      return {
        result,
        explanation: `${percent}% of ${number} is ${result.toFixed(2)}`,
        formula: `(${percent} ÷ 100) × ${number} = ${result.toFixed(2)}`
      };
    }
    
    case 'percentChange': {
      // Calculate percent change from X to Y
      const from = input.value1;
      const to = input.value2;
      
      if (from === 0) {
        return {
          result: 0,
          explanation: "Cannot calculate percentage change from zero",
          formula: "Not applicable when starting value is zero"
        };
      }
      
      const change = to - from;
      const percentChange = (change / Math.abs(from)) * 100;
      
      return {
        result: percentChange,
        explanation: `The change from ${from} to ${to} is ${change >= 0 ? 'an increase' : 'a decrease'} of ${Math.abs(percentChange).toFixed(2)}%`,
        formula: `((${to} - ${from}) ÷ |${from}|) × 100 = ${percentChange.toFixed(2)}%`
      };
    }
    
    case 'findPercent': {
      // Calculate what percent is X of Y
      const part = input.value1;
      const whole = input.value2;
      
      if (whole === 0) {
        return {
          result: 0,
          explanation: "Cannot calculate percentage when the total is zero",
          formula: "Not applicable when the total is zero"
        };
      }
      
      const percent = (part / whole) * 100;
      
      return {
        result: percent,
        explanation: `${part} is ${percent.toFixed(2)}% of ${whole}`,
        formula: `(${part} ÷ ${whole}) × 100 = ${percent.toFixed(2)}%`
      };
    }
    
    default:
      throw new Error('Invalid calculation type');
  }
};
