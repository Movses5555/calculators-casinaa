
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Binary, Hash, FileDigit, Calculator, Lightbulb } from 'lucide-react';

const NumberBaseEducationalContent: React.FC = () => {
  return (
    <div className="space-y-6 py-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-indigo-500" />
            Understanding Number Systems
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            A number system is a way of representing numbers using a specific set of symbols or digits. 
            Different number systems have different bases, which indicate how many unique digits are used in the system.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 font-medium mb-2">
                <Binary className="h-4 w-4 text-indigo-500" />
                <span>Binary (Base 2)</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Uses only 0 and 1. The foundation of all digital computing.
              </p>
              <div className="text-xs font-mono bg-gray-100 p-2 rounded">
                <div>Decimal 42 = Binary 101010</div>
                <div className="mt-1 text-gray-500">
                  4×10¹ + 2×10⁰ = 1×2⁵ + 0×2⁴ + 1×2³ + 0×2² + 1×2¹ + 0×2⁰
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 font-medium mb-2">
                <Hash className="h-4 w-4 text-indigo-500" />
                <span>Octal (Base 8)</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Uses digits 0-7. Often used in file permissions in Unix-like systems.
              </p>
              <div className="text-xs font-mono bg-gray-100 p-2 rounded">
                <div>Decimal 42 = Octal 52</div>
                <div className="mt-1 text-gray-500">
                  4×10¹ + 2×10⁰ = 5×8¹ + 2×8⁰
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 font-medium mb-2">
                <Calculator className="h-4 w-4 text-indigo-500" />
                <span>Decimal (Base 10)</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Uses digits 0-9. The standard number system used in everyday life.
              </p>
              <div className="text-xs font-mono bg-gray-100 p-2 rounded">
                <div>Decimal 42 = 42</div>
                <div className="mt-1 text-gray-500">
                  4×10¹ + 2×10⁰ = 42
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 font-medium mb-2">
                <FileDigit className="h-4 w-4 text-indigo-500" />
                <span>Hexadecimal (Base 16)</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Uses digits 0-9 and letters A-F. Common in computer programming for representing memory addresses and colors.
              </p>
              <div className="text-xs font-mono bg-gray-100 p-2 rounded">
                <div>Decimal 42 = Hexadecimal 2A</div>
                <div className="mt-1 text-gray-500">
                  4×10¹ + 2×10⁰ = 2×16¹ + 10(A)×16⁰
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Number System Conversions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg mb-2">Decimal to Other Bases</h3>
              <p className="text-sm text-gray-600 mb-2">
                To convert decimal to another base, repeatedly divide by the target base and collect the remainders in reverse order.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-sm mb-2">Example: Convert decimal 25 to binary</p>
                <div className="text-xs font-mono">
                  <div>25 ÷ 2 = 12 remainder 1</div>
                  <div>12 ÷ 2 = 6 remainder 0</div>
                  <div>6 ÷ 2 = 3 remainder 0</div>
                  <div>3 ÷ 2 = 1 remainder 1</div>
                  <div>1 ÷ 2 = 0 remainder 1</div>
                  <div className="mt-1">Result (reading remainders from bottom to top): 11001</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Other Bases to Decimal</h3>
              <p className="text-sm text-gray-600 mb-2">
                Multiply each digit by its corresponding power of the base and sum the results.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-sm mb-2">Example: Convert binary 10110 to decimal</p>
                <div className="text-xs font-mono">
                  <div>1×2⁴ + 0×2³ + 1×2² + 1×2¹ + 0×2⁰</div>
                  <div>= 16 + 0 + 4 + 2 + 0</div>
                  <div>= 22</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Applications of Different Number Systems</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="bg-indigo-100 p-2 rounded-full mt-1">
                <Binary className="h-4 w-4 text-indigo-700" />
              </div>
              <div>
                <span className="font-medium">Binary (Base 2)</span>
                <p className="text-sm text-gray-600 mt-1">
                  Used in all digital systems. Computers store and process data in binary form. Each digit (0 or 1) is called a bit.
                </p>
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <div className="bg-indigo-100 p-2 rounded-full mt-1">
                <Hash className="h-4 w-4 text-indigo-700" />
              </div>
              <div>
                <span className="font-medium">Octal (Base 8)</span>
                <p className="text-sm text-gray-600 mt-1">
                  Used for file permissions in Unix-like systems (chmod). Also used historically for representing binary data in a more compact form.
                </p>
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <div className="bg-indigo-100 p-2 rounded-full mt-1">
                <FileDigit className="h-4 w-4 text-indigo-700" />
              </div>
              <div>
                <span className="font-medium">Hexadecimal (Base 16)</span>
                <p className="text-sm text-gray-600 mt-1">
                  Used for representing memory addresses in debugging, color codes in web design (e.g., #FF5733), and 
                  representing binary data in a more readable format. Each hex digit represents four binary digits.
                </p>
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <div className="bg-indigo-100 p-2 rounded-full mt-1">
                <Hash className="h-4 w-4 text-indigo-700" />
              </div>
              <div>
                <span className="font-medium">Base64</span>
                <p className="text-sm text-gray-600 mt-1">
                  Used to encode binary data when that data needs to be stored or transferred over media designed to handle text.
                  Common in email attachments, embedding images in HTML/CSS, and storing complex data in JSON.
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default NumberBaseEducationalContent;
