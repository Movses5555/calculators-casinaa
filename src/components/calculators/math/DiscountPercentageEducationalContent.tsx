
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tag, Calculator, Lightbulb, ShoppingBag } from 'lucide-react';

const DiscountPercentageEducationalContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="formulas" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="formulas">Discount Formulas</TabsTrigger>
          <TabsTrigger value="tips">Shopping Tips</TabsTrigger>
          <TabsTrigger value="examples">Practical Examples</TabsTrigger>
        </TabsList>
        
        <TabsContent value="formulas" className="pt-4 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Finding the Sale Price</h3>
            <div className="font-mono text-center p-2 bg-white rounded border border-gray-200 mb-3">
              Sale Price = Original Price × (1 - Discount Percentage / 100)
            </div>
            <div className="font-mono text-center p-2 bg-white rounded border border-gray-200 mb-3">
              Sale Price = Original Price - (Original Price × Discount Percentage / 100)
            </div>
            <p className="text-gray-600 text-sm">
              Example: 20% off $100 = $100 × (1 - 20/100) = $100 × 0.8 = $80
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Finding the Discount Percentage</h3>
            <div className="font-mono text-center p-2 bg-white rounded border border-gray-200 mb-3">
              Discount Percentage = ((Original Price - Sale Price) ÷ Original Price) × 100
            </div>
            <p className="text-gray-600 text-sm">
              Example: Item priced at $80, originally $100<br />
              Discount % = ((100 - 80) ÷ 100) × 100 = (20 ÷ 100) × 100 = 20%
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Finding the Original Price</h3>
            <div className="font-mono text-center p-2 bg-white rounded border border-gray-200 mb-3">
              Original Price = Sale Price ÷ (1 - Discount Percentage / 100)
            </div>
            <p className="text-gray-600 text-sm">
              Example: Sale price is $80 with a 20% discount<br />
              Original price = $80 ÷ (1 - 20/100) = $80 ÷ 0.8 = $100
            </p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <h3 className="font-medium mb-2 flex items-center gap-2 text-red-700">
              <Lightbulb className="h-4 w-4" />
              <span>Quick Tips for Mental Calculation</span>
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <span className="font-medium">10% off:</span> Move the decimal point one place to the left.<br />
                Example: 10% of $45 = $4.50
              </li>
              <li>
                <span className="font-medium">20% off:</span> Calculate 10% and multiply by 2.<br />
                Example: 20% of $45 = $4.50 × 2 = $9
              </li>
              <li>
                <span className="font-medium">25% off:</span> Divide by 4.<br />
                Example: 25% of $80 = $80 ÷ 4 = $20
              </li>
              <li>
                <span className="font-medium">50% off:</span> Divide by 2.<br />
                Example: 50% of $30 = $30 ÷ 2 = $15
              </li>
              <li>
                <span className="font-medium">33% off:</span> Divide by 3.<br />
                Example: 33% of $60 = $60 ÷ 3 = $20
              </li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="tips" className="pt-4 space-y-4">
          <div className="flex gap-4 items-start">
            <div className="bg-red-100 p-2 rounded-full">
              <Tag className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Calculate the Actual Savings</h3>
              <p className="text-gray-600">
                Don't just focus on the discount percentage; calculate the actual dollar amount you're saving. 
                A 50% discount on a $10 item saves you less than a 20% discount on a $100 item.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start">
            <div className="bg-red-100 p-2 rounded-full">
              <ShoppingBag className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Compare Unit Prices</h3>
              <p className="text-gray-600">
                When comparing discounted items of different sizes, calculate the price per unit (ounce, pound, etc.) 
                to determine which one offers the better value.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Be Aware of Consecutive Discounts</h3>
            <p className="text-gray-600 text-sm mb-3">
              When multiple discounts are applied sequentially (e.g., 20% off, then an additional 10% off), 
              they don't add up directly (20% + 10% ≠ 30% off).
            </p>
            <div className="bg-white p-3 rounded border border-gray-200">
              <p className="font-medium mb-1">Example: $100 item with 20% off, then an additional 10% off.</p>
              <ol className="list-decimal pl-5 text-sm space-y-1">
                <li>First discount: $100 × (1 - 20/100) = $80</li>
                <li>Second discount: $80 × (1 - 10/100) = $72</li>
                <li>Total discount: ($100 - $72) ÷ $100 × 100 = 28%</li>
              </ol>
              <p className="text-xs mt-2 text-gray-500">
                For consecutive discounts of a% and b%, the total discount is: 100 - (100 - a) × (100 - b) / 100
              </p>
            </div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <h3 className="font-medium mb-2 text-red-700">Beware of "Discount" Tactics</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
              <li>
                <span className="font-medium">Inflated Original Prices:</span> Some retailers inflate the "original" price to 
                make discounts appear larger. Research typical prices for items before buying.
              </li>
              <li>
                <span className="font-medium">"Buy One Get One" Offers:</span> Calculate the effective discount. 
                "Buy one get one 50% off" is equivalent to 25% off both items.
              </li>
              <li>
                <span className="font-medium">Minimum Purchase Requirements:</span> Discounts requiring a minimum purchase 
                amount may lead to spending more than planned.
              </li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="examples" className="pt-4 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Example 1: Seasonal Clothing Sale</h3>
            <div className="space-y-2 text-gray-600 text-sm">
              <p><span className="font-medium">Original price:</span> $89.99</p>
              <p><span className="font-medium">Discount:</span> 30% off</p>
              <p><span className="font-medium">Sale price calculation:</span> $89.99 × (1 - 30/100) = $89.99 × 0.7 = $62.99</p>
              <p><span className="font-medium">You save:</span> $89.99 - $62.99 = $27.00</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Example 2: Electronics with Tiered Discounts</h3>
            <div className="space-y-2 text-gray-600 text-sm">
              <p><span className="font-medium">Original price:</span> $1,299.99</p>
              <p><span className="font-medium">Holiday sale discount:</span> 15% off</p>
              <p><span className="font-medium">Price after first discount:</span> $1,299.99 × 0.85 = $1,104.99</p>
              <p><span className="font-medium">Additional loyalty discount:</span> 5% off</p>
              <p><span className="font-medium">Final price:</span> $1,104.99 × 0.95 = $1,049.74</p>
              <p><span className="font-medium">Total savings:</span> $1,299.99 - $1,049.74 = $250.25</p>
              <p><span className="font-medium">Effective discount percentage:</span> ($250.25 ÷ $1,299.99) × 100 = 19.25%</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Example 3: Finding Original Price</h3>
            <div className="space-y-2 text-gray-600 text-sm">
              <p>You find a sale tag showing $42.50 with a 15% discount. What was the original price?</p>
              <p><span className="font-medium">Original price calculation:</span> $42.50 ÷ (1 - 15/100) = $42.50 ÷ 0.85 = $50.00</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Example 4: Comparing Discount Values</h3>
            <div className="space-y-2 text-gray-600 text-sm mb-3">
              <p>Which is the better deal?</p>
              <p><span className="font-medium">Option A:</span> 40% off a $120 item</p>
              <p><span className="font-medium">Option B:</span> 25% off a $160 item</p>
            </div>
            <div className="bg-white p-3 rounded border border-gray-200 text-sm">
              <p><span className="font-medium">Option A savings:</span> 40% of $120 = $48, final price = $72</p>
              <p><span className="font-medium">Option B savings:</span> 25% of $160 = $40, final price = $120</p>
              <p className="font-medium mt-2">Option A saves more money and results in a lower final price.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DiscountPercentageEducationalContent;
