
/**
 * Number base conversion utility
 */

export interface BaseConversionInput {
  value: string;
  fromBase: number;
  toBase: number;
}

export interface BaseConversionResult {
  original: string;
  converted: string;
  fromBase: number;
  toBase: number;
  decimalValue: number;
  isValid: boolean;
  error?: string;
}

export interface NumberBaseResult extends BaseConversionResult {
  // Additional fields needed by NumberBaseConverter component
  digitCount: number;
  binaryRepresentation?: string;
  hexRepresentation?: string;
  inputValue: string;
  outputValue: string;
}

export const supportedBases = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 32, 36];

export const validateBaseNumber = (value: string, base: number): boolean => {
  const validChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, base);
  const regex = new RegExp(`^[${validChars}]+$`, 'i');
  return regex.test(value);
};

export const calculateNumberBaseConversion = (
  input: BaseConversionInput
): BaseConversionResult => {
  // Default result in case of error
  const errorResult: BaseConversionResult = {
    original: input.value,
    converted: '',
    fromBase: input.fromBase,
    toBase: input.toBase,
    decimalValue: 0,
    isValid: false,
    error: ''
  };
  
  // Validate input
  if (!input.value) {
    errorResult.error = 'Please enter a value';
    return errorResult;
  }
  
  if (!supportedBases.includes(input.fromBase)) {
    errorResult.error = `From base ${input.fromBase} is not supported`;
    return errorResult;
  }
  
  if (!supportedBases.includes(input.toBase)) {
    errorResult.error = `To base ${input.toBase} is not supported`;
    return errorResult;
  }
  
  // Check if value is valid for the given base
  if (!validateBaseNumber(input.value, input.fromBase)) {
    errorResult.error = `The value "${input.value}" is not valid for base ${input.fromBase}`;
    return errorResult;
  }
  
  try {
    // Convert from original base to decimal
    const decimalValue = parseInt(input.value, input.fromBase);
    
    // Convert from decimal to target base
    const convertedValue = decimalValue.toString(input.toBase).toUpperCase();
    
    return {
      original: input.value,
      converted: convertedValue,
      fromBase: input.fromBase,
      toBase: input.toBase,
      decimalValue,
      isValid: true
    };
  } catch (error) {
    errorResult.error = `Conversion error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    return errorResult;
  }
};

// Additional functions needed by NumberBaseConverter component
export const convertNumber = (
  inputValue: string,
  fromBase: number,
  toBase: number
): NumberBaseResult => {
  const input: BaseConversionInput = {
    value: inputValue,
    fromBase,
    toBase
  };
  
  const result = calculateNumberBaseConversion(input);
  
  // Add additional fields for NumberBaseResult
  return {
    ...result,
    digitCount: result.converted.length,
    binaryRepresentation: result.isValid ? result.decimalValue.toString(2) : undefined,
    hexRepresentation: result.isValid ? result.decimalValue.toString(16).toUpperCase() : undefined,
    inputValue,
    outputValue: result.converted
  };
};

export const validateInput = (value: string, base: number): boolean => {
  return validateBaseNumber(value, base);
};

export const getBasePrefix = (base: number): string => {
  switch (base) {
    case 2: return "0b";
    case 8: return "0o";
    case 16: return "0x";
    default: return "";
  }
};

export const getBaseSuffix = (base: number): string => {
  switch (base) {
    case 10: return "";
    case 2: return "₂";
    case 8: return "₈";
    case 16: return "₁₆";
    default: return "₍" + base + "₎";
  }
};
