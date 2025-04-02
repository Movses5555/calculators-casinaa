import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';
import { Download, Plus, Trash2, DollarSign, ArrowDownUp, FileSpreadsheet } from 'lucide-react';
import { calculatorColors, CHART_COLORS } from '@/utils/calculatorColors';
import { BudgetCategory, BudgetInput, BudgetResult, calculateBudget, calculateCategoryPercentage } from '@/utils/finance/budget';
import SimpleBudgetEducationalContent from './SimpleBudgetEducationalContent';

interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  category: 'income' | 'expense';
  frequency: 'monthly' | 'yearly' | 'weekly' | 'daily';
}

interface BudgetSummary {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  savingsRate: number;
  categoryBreakdown: Record<string, number>;
}

const calculateBudgetSummary = (items: BudgetItem[]): BudgetSummary => {
  const monthlyItems = items.map(item => {
    let monthlyAmount = item.amount;
    
    switch (item.frequency) {
      case 'yearly':
        monthlyAmount = item.amount / 12;
        break;
      case 'weekly':
        monthlyAmount = (item.amount * 52) / 12;
        break;
      case 'daily':
        monthlyAmount = (item.amount * 365) / 12;
        break;
    }
    
    return {
      ...item,
      monthlyAmount
    };
  });
  
  const totalIncome = monthlyItems
    .filter(item => item.category === 'income')
    .reduce((sum, item) => sum + item.monthlyAmount, 0);
  
  const totalExpenses = monthlyItems
    .filter(item => item.category === 'expense')
    .reduce((sum, item) => sum + item.monthlyAmount, 0);
  
  const netBalance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (netBalance / totalIncome) * 100 : 0;
  
  const categoryBreakdown: Record<string, number> = {};
  
  monthlyItems.forEach(item => {
    if (item.category === 'expense') {
      categoryBreakdown[item.name] = item.monthlyAmount;
    }
  });
  
  return {
    totalIncome,
    totalExpenses,
    netBalance,
    savingsRate,
    categoryBreakdown
  };
};

const generateSampleBudget = (): BudgetItem[] => {
  return [
    { id: '1', name: 'Salary', amount: 5000, category: 'income', frequency: 'monthly' },
    { id: '2', name: 'Rent', amount: 1500, category: 'expense', frequency: 'monthly' },
    { id: '3', name: 'Groceries', amount: 600, category: 'expense', frequency: 'monthly' },
    { id: '4', name: 'Utilities', amount: 250, category: 'expense', frequency: 'monthly' },
    { id: '5', name: 'Transportation', amount: 300, category: 'expense', frequency: 'monthly' },
    { id: '6', name: 'Entertainment', amount: 200, category: 'expense', frequency: 'monthly' },
    { id: '7', name: 'Subscription', amount: 150, category: 'expense', frequency: 'monthly' }
  ];
};

const SimpleBudgetPlanner: React.FC = () => {
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [newItem, setNewItem] = useState<Omit<BudgetItem, 'id'>>({
    name: '',
    amount: 0,
    category: 'income',
    frequency: 'monthly'
  });
  const [summary, setSummary] = useState<BudgetSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0,
    savingsRate: 0,
    categoryBreakdown: {}
  });
  
  useEffect(() => {
    if (items.length === 0) {
      const sampleData = generateSampleBudget();
      setItems(sampleData);
    }
  }, []);
  
  useEffect(() => {
    if (items.length > 0) {
      const calculatedSummary = calculateBudgetSummary(items);
      setSummary(calculatedSummary);
    }
  }, [items]);
  
  const handleAddItem = () => {
    if (!newItem.name) {
      toast.error("Please enter a name for the item");
      return;
    }
    
    if (newItem.amount <= 0) {
      toast.error("Please enter a valid amount (greater than 0)");
      return;
    }
    
    const newItemWithId: BudgetItem = {
      ...newItem,
      id: Date.now().toString()
    };
    
    setItems(prevItems => [...prevItems, newItemWithId]);
    setNewItem({
      name: '',
      amount: 0,
      category: 'income',
      frequency: 'monthly'
    });
    
    toast.success(`Added ${newItem.category}: ${newItem.name}`);
  };
  
  const handleRemoveItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    toast.success("Item removed successfully");
  };
  
  const handleDownloadCSV = () => {
    const headers = ['Name', 'Amount', 'Category', 'Frequency'];
    const csvRows = items.map(item => 
      [item.name, item.amount, item.category, item.frequency].join(',')
    );
    
    const csvContent = [
      headers.join(','),
      ...csvRows
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'budget_planner.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Budget data downloaded as CSV');
  };
  
  const handleReset = () => {
    setItems([]);
    toast.info('Budget data has been reset');
  };
  
  const handleLoadSample = () => {
    const sampleData = generateSampleBudget();
    setItems(sampleData);
    toast.success('Sample budget loaded');
  };
  
  const expensesChartData = Object.entries(summary.categoryBreakdown || {})
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({
      name,
      value
    }));
  
  const incomeVsExpenseData = [
    { name: 'Income', value: summary.totalIncome, color: calculatorColors.data.total },
    { name: 'Expenses', value: summary.totalExpenses, color: calculatorColors.data.interest }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-primary" />
                Add Budget Item
              </CardTitle>
              <CardDescription>
                Enter your income and expenses to create your budget
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  placeholder="e.g., Salary, Rent, Groceries"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="itemAmount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="itemAmount"
                    type="number"
                    className="pl-8"
                    placeholder="0.00"
                    value={newItem.amount || ''}
                    onChange={(e) => setNewItem({...newItem, amount: parseFloat(e.target.value) || 0})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="itemCategory">Category</Label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value: 'income' | 'expense') => setNewItem({...newItem, category: value})}
                  >
                    <SelectTrigger id="itemCategory">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="itemFrequency">Frequency</Label>
                  <Select
                    value={newItem.frequency}
                    onValueChange={(value: 'monthly' | 'yearly' | 'weekly' | 'daily') => setNewItem({...newItem, frequency: value})}
                  >
                    <SelectTrigger id="itemFrequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleAddItem}>
                <Plus className="mr-2 h-4 w-4" />
                Add to Budget
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileSpreadsheet className="mr-2 h-5 w-5 text-primary" />
                Budget Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full" onClick={handleLoadSample}>
                Load Sample Budget
              </Button>
              <Button variant="outline" className="w-full" onClick={handleDownloadCSV}>
                <Download className="mr-2 h-4 w-4" />
                Export as CSV
              </Button>
              <Button variant="destructive" className="w-full" onClick={handleReset}>
                Reset Budget
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ArrowDownUp className="mr-2 h-5 w-5 text-primary" />
                Budget Summary
              </CardTitle>
              <CardDescription>
                Your monthly budget overview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-blue-50">
                  <CardHeader className="pb-2">
                    <CardDescription>Monthly Income</CardDescription>
                    <CardTitle className="text-2xl text-primary">
                      ${summary.totalIncome.toFixed(2)}
                    </CardTitle>
                  </CardHeader>
                </Card>
                
                <Card className="bg-red-50">
                  <CardHeader className="pb-2">
                    <CardDescription>Monthly Expenses</CardDescription>
                    <CardTitle className="text-2xl text-destructive">
                      ${summary.totalExpenses.toFixed(2)}
                    </CardTitle>
                  </CardHeader>
                </Card>
                
                <Card className={`${summary.netBalance >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                  <CardHeader className="pb-2">
                    <CardDescription>Net Balance</CardDescription>
                    <CardTitle className={`text-2xl ${summary.netBalance >= 0 ? 'text-green-600' : 'text-destructive'}`}>
                      ${summary.netBalance.toFixed(2)}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
              
              <Tabs defaultValue="items">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="items">Budget Items</TabsTrigger>
                  <TabsTrigger value="charts">Budget Charts</TabsTrigger>
                </TabsList>
                
                <TabsContent value="items" className="space-y-4">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 p-3 bg-muted/50 font-medium">
                      <div className="col-span-5">Name</div>
                      <div className="col-span-2 text-right">Amount</div>
                      <div className="col-span-2">Category</div>
                      <div className="col-span-2">Frequency</div>
                      <div className="col-span-1"></div>
                    </div>
                    
                    <div className="divide-y max-h-80 overflow-y-auto">
                      {items.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground">
                          No budget items added yet. Add some items or load a sample budget.
                        </div>
                      ) : (
                        items.map(item => (
                          <div key={item.id} className="grid grid-cols-12 p-3 items-center">
                            <div className="col-span-5 font-medium">{item.name}</div>
                            <div className="col-span-2 text-right">${item.amount.toFixed(2)}</div>
                            <div className="col-span-2">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                item.category === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {item.category}
                              </span>
                            </div>
                            <div className="col-span-2">{item.frequency}</div>
                            <div className="col-span-1 text-right">
                              <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="charts">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Income vs. Expenses</h3>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={incomeVsExpenseData}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {incomeVsExpenseData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Legend />
                            <RechartsTooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Expense Breakdown</h3>
                      <div className="h-[300px]">
                        {expensesChartData.length > 0 ? (
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={expensesChartData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              >
                                {expensesChartData.map((_, index) => (
                                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                ))}
                              </Pie>
                              <Legend />
                              <RechartsTooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                            </PieChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="flex items-center justify-center h-full text-muted-foreground">
                            No expense data to display
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <SimpleBudgetEducationalContent />
        </div>
      </div>
    </div>
  );
};

export default SimpleBudgetPlanner;
