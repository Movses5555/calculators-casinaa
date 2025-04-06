/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, MinusCircle, DollarSign, Users, Calculator, BarChart3, Receipt, UserPlus, Trash2 } from 'lucide-react';
import { calculatorColors } from '@/utils/calculatorColors';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { toast } from 'sonner';
import BillSplitEducationalContent from './BillSplitEducationalContent';

interface Person {
  id: string;
  name: string;
  share: number;
  customAmount: number | null;
  useCustomAmount: boolean;
}

interface BillItem {
  id: string;
  description: string;
  amount: number;
  splitType: 'equal' | 'percentage' | 'custom';
  payers: string[];
}

const BillSplitCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('calculator');
  const [billTotal, setBillTotal] = useState<number>(100);
  const [taxPercent, setTaxPercent] = useState<number>(0);
  const [tipPercent, setTipPercent] = useState<number>(15);
  const [people, setPeople] = useState<Person[]>([
    { id: '1', name: 'Person 1', share: 1, customAmount: null, useCustomAmount: false },
    { id: '2', name: 'Person 2', share: 1, customAmount: null, useCustomAmount: false },
  ]);
  const [itemizedBill, setItemizedBill] = useState<boolean>(false);
  const [billItems, setBillItems] = useState<BillItem[]>([
    { id: '1', description: 'Item 1', amount: 50, splitType: 'equal', payers: ['1', '2'] },
    { id: '2', description: 'Item 2', amount: 50, splitType: 'equal', payers: ['1', '2'] },
  ]);

  // Calculate results
  const calculateResults = () => {
    if (billTotal <= 0) {
      toast.error('Bill total must be greater than 0');
      return;
    }

    if (people.length === 0) {
      toast.error('Add at least one person to split the bill');
      return;
    }

    setActiveTab('results');
    toast.success('Bill split calculated!');
  };

  // Add a new person
  const addPerson = () => {
    const newId = (people.length + 1).toString();
    setPeople([
      ...people,
      { id: newId, name: `Person ${newId}`, share: 1, customAmount: null, useCustomAmount: false }
    ]);

    // Add this person to all existing bill items
    if (itemizedBill) {
      setBillItems(billItems.map(item => ({
        ...item,
        payers: [...item.payers, newId]
      })));
    }
  };

  // Remove a person
  const removePerson = (id: string) => {
    if (people.length <= 1) {
      toast.error('You need at least one person');
      return;
    }
    
    setPeople(people.filter(person => person.id !== id));
    
    // Remove this person from all bill items
    if (itemizedBill) {
      setBillItems(billItems.map(item => ({
        ...item,
        payers: item.payers.filter(payerId => payerId !== id)
      })));
    }
  };

  // Update person name
  const updatePersonName = (id: string, name: string) => {
    setPeople(people.map(person => 
      person.id === id ? { ...person, name } : person
    ));
  };

  // Update person share
  const updatePersonShare = (id: string, share: number) => {
    setPeople(people.map(person => 
      person.id === id ? { ...person, share } : person
    ));
  };

  // Toggle custom amount for a person
  const toggleCustomAmount = (id: string) => {
    setPeople(people.map(person => 
      person.id === id ? { ...person, useCustomAmount: !person.useCustomAmount } : person
    ));
  };

  // Update custom amount for a person
  const updateCustomAmount = (id: string, amount: number) => {
    setPeople(people.map(person => 
      person.id === id ? { ...person, customAmount: amount } : person
    ));
  };

  // Add a new bill item
  const addBillItem = () => {
    const newId = (billItems.length + 1).toString();
    setBillItems([
      ...billItems,
      { 
        id: newId, 
        description: `Item ${newId}`, 
        amount: 0, 
        splitType: 'equal', 
        payers: people.map(person => person.id) 
      }
    ]);
  };

  // Remove a bill item
  const removeBillItem = (id: string) => {
    if (billItems.length <= 1) {
      toast.error('You need at least one item');
      return;
    }
    
    setBillItems(billItems.filter(item => item.id !== id));
    
    // Update bill total
    const newTotal = billItems
      .filter(item => item.id !== id)
      .reduce((sum, item) => sum + item.amount, 0);
    
    setBillTotal(newTotal);
  };

  // Update bill item
  const updateBillItem = (id: string, field: keyof BillItem, value: any) => {
    const updatedItems = billItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    
    setBillItems(updatedItems);
    
    // Update bill total if itemized
    if (itemizedBill) {
      const newTotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);
      setBillTotal(newTotal);
    }
  };

  // Toggle payer for a bill item
  const toggleItemPayer = (itemId: string, personId: string) => {
    setBillItems(billItems.map(item => {
      if (item.id === itemId) {
        const isIncluded = item.payers.includes(personId);
        const newPayers = isIncluded
          ? item.payers.filter(id => id !== personId)
          : [...item.payers, personId];
        
        // Ensure at least one payer
        if (newPayers.length === 0) {
          toast.error('Item must have at least one payer');
          return item;
        }
        
        return { ...item, payers: newPayers };
      }
      return item;
    }));
  };

  // Calculate subtotal
  const subtotal = itemizedBill 
    ? billItems.reduce((sum, item) => sum + item.amount, 0) 
    : billTotal;
  
  // Calculate tax amount
  const taxAmount = subtotal * (taxPercent / 100);
  
  // Calculate tip amount
  const tipAmount = subtotal * (tipPercent / 100);
  
  // Calculate grand total
  const grandTotal = subtotal + taxAmount + tipAmount;

  // Calculate per person amounts
  const calculatePerPersonAmounts = () => {
    // Equal split
    if (!itemizedBill) {
      const totalShares = people.reduce((sum, person) => 
        sum + (person.useCustomAmount ? 0 : person.share), 0);
      
      const customTotal = people.reduce((sum, person) => 
        sum + (person.useCustomAmount && person.customAmount ? person.customAmount : 0), 0);
      
      const remainingAmount = grandTotal - customTotal;
      
      return people.map(person => {
        if (person.useCustomAmount && person.customAmount !== null) {
          return {
            id: person.id,
            name: person.name,
            amount: person.customAmount,
            percentage: (person.customAmount / grandTotal) * 100
          };
        } else {
          const amount = totalShares > 0 
            ? (person.share / totalShares) * remainingAmount 
            : 0;
          return {
            id: person.id,
            name: person.name,
            amount,
            percentage: (amount / grandTotal) * 100
          };
        }
      });
    } 
    // Itemized bill
    else {
      // Calculate per-item splits first
      const personItemAmounts: Record<string, number> = {};
      
      people.forEach(person => {
        personItemAmounts[person.id] = 0;
      });
      
      billItems.forEach(item => {
        if (item.payers.length === 0) return;
        
        const perPerson = item.amount / item.payers.length;
        item.payers.forEach(payerId => {
          personItemAmounts[payerId] = (personItemAmounts[payerId] || 0) + perPerson;
        });
      });
      
      // Add tax and tip proportionally
      const extraCharges = taxAmount + tipAmount;
      const extraPerPerson = people.map(person => {
        const baseAmount = personItemAmounts[person.id] || 0;
        const proportion = subtotal > 0 ? baseAmount / subtotal : 0;
        return {
          id: person.id,
          extraAmount: proportion * extraCharges
        };
      });
      
      // Final amounts
      return people.map(person => {
        const baseAmount = personItemAmounts[person.id] || 0;
        const extra = extraPerPerson.find(p => p.id === person.id)?.extraAmount || 0;
        const total = baseAmount + extra;
        
        return {
          id: person.id,
          name: person.name,
          amount: total,
          percentage: (total / grandTotal) * 100
        };
      });
    }
  };

  const perPersonAmounts = calculatePerPersonAmounts();

  // Chart data
  const getChartData = () => {
    return perPersonAmounts.map(person => ({
      name: person.name,
      value: person.amount,
      percentage: person.percentage.toFixed(1) + '%'
    }));
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator" className="flex items-center gap-2">
            <Calculator size={16} />
            <span>Calculator</span>
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2">
            <BarChart3 size={16} />
            <span>Results</span>
          </TabsTrigger>
        </TabsList>
      
        <TabsContent value="calculator" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bill Information</CardTitle>
              <CardDescription>Enter the bill total and additional charges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="billTotal">Bill Total</Label>
                  <Badge variant="outline" className="font-mono">
                    {formatCurrency(subtotal)}
                  </Badge>
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="billTotal" 
                    type="number" 
                    className="pl-9" 
                    value={billTotal} 
                    onChange={(e) => setBillTotal(Number(e.target.value))}
                    disabled={itemizedBill}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="itemizedBill" 
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={itemizedBill}
                  onChange={() => setItemizedBill(!itemizedBill)}
                />
                <Label htmlFor="itemizedBill">Itemize bill</Label>
              </div>
              
              {itemizedBill && (
                <div className="space-y-3 p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Bill Items</h4>
                    <Button variant="outline" size="sm" onClick={addBillItem}>
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Add Item
                    </Button>
                  </div>
                  
                  {billItems.map(item => (
                    <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-4">
                        <Input 
                          placeholder="Description" 
                          value={item.description} 
                          onChange={(e) => updateBillItem(item.id, 'description', e.target.value)}
                        />
                      </div>
                      <div className="col-span-3 relative">
                        <DollarSign className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="number" 
                          className="pl-7"
                          value={item.amount} 
                          onChange={(e) => updateBillItem(item.id, 'amount', Number(e.target.value))}
                        />
                      </div>
                      <div className="col-span-4 flex gap-1 flex-wrap">
                        {people.map(person => (
                          <Badge 
                            key={person.id}
                            variant={item.payers.includes(person.id) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => toggleItemPayer(item.id, person.id)}
                          >
                            {person.name.charAt(0)}
                          </Badge>
                        ))}
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeBillItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="taxPercent">Tax ({taxPercent}%)</Label>
                  <Badge variant="outline" className="font-mono">
                    {formatCurrency(taxAmount)}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Slider
                    id="taxPercent"
                    min={0}
                    max={30}
                    step={0.5}
                    value={[taxPercent]}
                    onValueChange={(value) => setTaxPercent(value[0])}
                  />
                  <div className="w-16">
                    <Input
                      type="number"
                      value={taxPercent}
                      onChange={(e) => setTaxPercent(Number(e.target.value))}
                      className="h-8"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="tipPercent">Tip ({tipPercent}%)</Label>
                  <Badge variant="outline" className="font-mono">
                    {formatCurrency(tipAmount)}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Slider
                    id="tipPercent"
                    min={0}
                    max={30}
                    step={0.5}
                    value={[tipPercent]}
                    onValueChange={(value) => setTipPercent(value[0])}
                  />
                  <div className="w-16">
                    <Input
                      type="number"
                      value={tipPercent}
                      onChange={(e) => setTipPercent(Number(e.target.value))}
                      className="h-8"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-2 pb-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tax ({taxPercent}%):</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tip ({tipPercent}%):</span>
                  <span>{formatCurrency(tipAmount)}</span>
                </div>
                <div className="flex items-center justify-between font-medium mt-1 pt-1 border-t">
                  <span>Total:</span>
                  <span>{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>People</CardTitle>
                <Button variant="outline" size="sm" onClick={addPerson}>
                  <UserPlus className="h-4 w-4 mr-1" />
                  Add Person
                </Button>
              </div>
              <CardDescription>Add people and adjust their shares</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {people.map(person => (
                <div key={person.id} className="grid grid-cols-12 gap-2 items-center border-b pb-3">
                  <div className="col-span-4">
                    <Input 
                      placeholder="Name" 
                      value={person.name} 
                      onChange={(e) => updatePersonName(person.id, e.target.value)}
                    />
                  </div>
                  
                  {!person.useCustomAmount ? (
                    <>
                      <div className="col-span-5">
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8" 
                            onClick={() => updatePersonShare(person.id, Math.max(0.5, person.share - 0.5))}
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                          <div className="w-full">
                            <Slider
                              min={0.5}
                              max={10}
                              step={0.5}
                              value={[person.share]}
                              onValueChange={(value) => updatePersonShare(person.id, value[0])}
                            />
                          </div>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8" 
                            onClick={() => updatePersonShare(person.id, Math.min(10, person.share + 0.5))}
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="col-span-2 text-center">
                        <Badge>{person.share}x</Badge>
                      </div>
                    </>
                  ) : (
                    <div className="col-span-7 relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        className="pl-9"
                        value={person.customAmount || ''}
                        onChange={(e) => updateCustomAmount(person.id, Number(e.target.value))}
                        placeholder="Custom amount"
                      />
                    </div>
                  )}
                  
                  <div className="col-span-1 flex justify-end space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => toggleCustomAmount(person.id)}
                    >
                      <Receipt className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => removePerson(person.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button onClick={calculateResults} className="w-full">
                Calculate Split
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="results" className="space-y-6 pt-4">
          <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-xl font-medium mb-2">Bill Total</h3>
                <div className="text-4xl font-bold mb-4">{formatCurrency(grandTotal)}</div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <div className="text-amber-100">Subtotal</div>
                    <div className="font-semibold">{formatCurrency(subtotal)}</div>
                  </div>
                  <div>
                    <div className="text-amber-100">Tax ({taxPercent}%)</div>
                    <div className="font-semibold">{formatCurrency(taxAmount)}</div>
                  </div>
                  <div>
                    <div className="text-amber-100">Tip ({tipPercent}%)</div>
                    <div className="font-semibold">{formatCurrency(tipAmount)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Split Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {perPersonAmounts.map(person => (
                    <div key={person.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium">{person.name}</span>
                        <div className="text-xs text-muted-foreground">
                          {person.percentage.toFixed(1)}% of total
                        </div>
                      </div>
                      <span className="text-xl font-semibold">{formatCurrency(person.amount)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Split Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getChartData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percentage }) => `${name}: ${percentage}`}
                      >
                        {getChartData().map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={calculatorColors.chart.categoricalColors[index % calculatorColors.chart.categoricalColors.length]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [formatCurrency(Number(value)), 'Amount']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => setActiveTab('calculator')}>
              Edit Bill
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <BillSplitEducationalContent />
    </div>
  );
};

export default BillSplitCalculator;
