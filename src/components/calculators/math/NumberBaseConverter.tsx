
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Code, Bookmark, Calculator, Lightbulb, Check, FileDigit } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  convertNumber, 
  validateInput, 
  getBasePrefix,
  getBaseSuffix,
  type NumberBaseResult 
} from '@/utils/calculateNumberBase';
import NumberBaseEducationalContent from './NumberBaseEducationalContent';

interface BaseOption {
  value: number;
  label: string;
  placeholder: string;
  pattern: string;
}

const NumberBaseConverter: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromBase, setFromBase] = useState<number>(10);
  const [toBase, setToBase] = useState<number>(2);
  const [result, setResult] = useState<NumberBaseResult | null>(null);
  const [conversionHistory, setConversionHistory] = useState<NumberBaseResult[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  
  const baseOptions: BaseOption[] = [
    { value: 2, label: 'Binary (Base 2)', placeholder: 'e.g. 10101', pattern: '^[0-1]+$' },
    { value: 8, label: 'Octal (Base 8)', placeholder: 'e.g. 752', pattern: '^[0-7]+$' },
    { value: 10, label: 'Decimal (Base 10)', placeholder: 'e.g. 42', pattern: '^[0-9]+$' },
    { value: 16, label: 'Hexadecimal (Base 16)', placeholder: 'e.g. 2A', pattern: '^[0-9A-Fa-f]+$' },
    { value: 36, label: 'Base 36', placeholder: 'e.g. Z1', pattern: '^[0-9A-Za-z]+$' }
  ];
  
  // Find current base option
  const currentBaseOption = baseOptions.find(option => option.value === fromBase);
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Validate input based on selected base
    if (value && currentBaseOption) {
      const isValid = validateInput(value, fromBase);
      if (!isValid) {
        setInputError(`Invalid character for base ${fromBase}`);
      } else {
        setInputError(null);
      }
    } else {
      setInputError(null);
    }
  };
  
  // Handle conversion
  const handleConvert = () => {
    if (!inputValue.trim()) {
      setInputError('Please enter a value to convert');
      return;
    }
    
    if (inputError) {
      toast.error(inputError);
      return;
    }
    
    try {
      const convertedResult = convertNumber(inputValue, fromBase, toBase);
      setResult(convertedResult);
      
      // Add to history (avoid duplicates)
      const isDuplicate = conversionHistory.some(
        item => item.inputValue === convertedResult.inputValue && 
                item.fromBase === convertedResult.fromBase && 
                item.toBase === convertedResult.toBase
      );
      
      if (!isDuplicate) {
        setConversionHistory(prev => [convertedResult, ...prev].slice(0, 10));
      }
      
      toast.success('Conversion completed successfully!');
    } catch (error) {
      toast.error('Conversion failed. Please check your input.');
    }
  };
  
  // Handle swap bases
  const handleSwapBases = () => {
    setFromBase(toBase);
    setToBase(fromBase);
    if (result) {
      setInputValue(result.outputValue);
    }
  };
  
  // Handle copy to clipboard
  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success('Copied to clipboard');
    
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };
  
  // Clear history
  const clearHistory = () => {
    setConversionHistory([]);
    toast.success('History cleared');
  };
  
  // Get formatted placeholder
  const getPlaceholder = (): string => {
    const option = baseOptions.find(opt => opt.value === fromBase);
    return option ? option.placeholder : 'Enter a value';
  };
  
  return (
    <div className="space-y-8">
      <Tabs defaultValue="converter" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="converter" className="flex items-center gap-2">
            <Calculator size={16} />
            <span>Converter</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <Lightbulb size={16} />
            <span>Learn</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="converter" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Number Base Converter</CardTitle>
              <CardDescription>Convert numbers between different bases (binary, decimal, hex, etc.)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromBase">From Base</Label>
                    <Select
                      value={fromBase.toString()}
                      onValueChange={(value) => setFromBase(Number(value))}
                    >
                      <SelectTrigger id="fromBase">
                        <SelectValue placeholder="Select base" />
                      </SelectTrigger>
                      <SelectContent>
                        {baseOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="toBase">To Base</Label>
                    <Select
                      value={toBase.toString()}
                      onValueChange={(value) => setToBase(Number(value))}
                    >
                      <SelectTrigger id="toBase">
                        <SelectValue placeholder="Select base" />
                      </SelectTrigger>
                      <SelectContent>
                        {baseOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-shrink-0" 
                    onClick={handleSwapBases}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 10H3" />
                      <path d="m21 6-4 4 4 4" />
                      <path d="M7 14h14" />
                      <path d="m3 18 4-4-4-4" />
                    </svg>
                    <span className="ml-2">Swap</span>
                  </Button>
                  
                  <Badge variant="outline" className="flex-shrink-0">
                    {fromBase} → {toBase}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="inputValue" className="flex items-center justify-between">
                    <span>Enter {baseOptions.find(b => b.value === fromBase)?.label.split(' ')[0]} Number</span>
                    {fromBase !== 10 && (
                      <Badge variant="outline" className="font-mono">
                        {getBasePrefix(fromBase)}
                      </Badge>
                    )}
                  </Label>
                  <Input
                    id="inputValue"
                    placeholder={getPlaceholder()}
                    value={inputValue}
                    onChange={handleInputChange}
                    className={inputError ? "border-red-500" : ""}
                  />
                  {inputError && (
                    <p className="text-sm text-red-500 mt-1">{inputError}</p>
                  )}
                </div>
                
                <Button onClick={handleConvert} className="w-full" disabled={!!inputError || !inputValue}>
                  Convert
                </Button>
                
                {result && (
                  <div className="space-y-2 pt-2">
                    <Label className="flex items-center justify-between">
                      <span>Result in {baseOptions.find(b => b.value === toBase)?.label.split(' ')[0]}</span>
                      {toBase !== 10 && (
                        <Badge variant="outline" className="font-mono">
                          {getBasePrefix(toBase)}
                        </Badge>
                      )}
                    </Label>
                    <div className="relative">
                      <div className="flex items-center">
                        <Input
                          value={result.outputValue}
                          readOnly
                          className="pr-10 font-mono"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => handleCopy(result.outputValue, -1)}
                        >
                          {copiedIndex === -1 ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {conversionHistory.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-indigo-500" />
                    <span>Conversion History</span>
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearHistory}>Clear</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {conversionHistory.map((item, index) => (
                    <div key={index} className="flex items-center justify-between gap-2 p-2 bg-gray-50 rounded-md">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 text-sm font-mono truncate">
                          <span className="text-gray-600">
                            {getBasePrefix(item.fromBase)}
                          </span>
                          <span>{item.inputValue}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.fromBase} → {item.toBase}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-sm font-mono">
                          <span className="text-gray-600">
                            {getBasePrefix(item.toBase)}
                          </span>
                          <span>{item.outputValue}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 flex-shrink-0"
                          onClick={() => handleCopy(item.outputValue, index)}
                        >
                          {copiedIndex === index ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="education">
          <NumberBaseEducationalContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NumberBaseConverter;
