import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Cell } from 'recharts';
import { 
  Plus, 
  Trash2, 
  DollarSign, 
  Percent, 
  CreditCard, 
  Calculator, 
  BarChart3, 
  Snowflake, 
  Flame 
} from 'lucide-react';
import { toast } from 'sonner';
import { calculatorColors } from '@/utils/calculatorColors';
import { 
  DebtItem, 
  DebtSnowballResult, 
  calculateDebtSnowball, 
  generateExampleDebts, 
  formatCurrency, 
  formatPercent 
} from '@/utils/calculateDebtSnowball';
import DebtSnowballEducationalContent from './DebtSnowballEducationalContent';
import { CHART_COLORS } from '@/utils/calculatorColors';

const DebtSnowballTracker: React.FC = () => {
  const [debts, setDebts] = useState<DebtItem[]>([]);
  const [extraPayment, setExtraPayment] = useState<number>(200);
  const [strategy, setStrategy] = useState<'snowball' | 'avalanche'>('snowball');
  const [results, setResults] = useState<DebtSnowballResult | null>(null);
  const [newDebt, setNewDebt] = useState<Omit<DebtItem, 'id'>>({
    name: '',
    balance: 0,
    interestRate: 0,
    minimumPayment: 0
  });
  
  useEffect(() => {
    if (debts.length === 0) {
      const examples = generateExampleDebts();
      setDebts(examples);
      
      const initialResults = calculateDebtSnowball(examples, extraPayment, strategy);
      setResults(initialResults);
    }
  }, []);
  
  const handleCalculate = () => {
    if (debts.length === 0) {
      toast.error("Please add at least one debt to calculate a payment plan");
      return;
    }
    
    try {
      const calculatedResults = calculateDebtSnowball(debts, extraPayment, strategy);
      setResults(calculatedResults);
      toast.success("Debt payoff plan calculated successfully");
    } catch (error) {
      console.error("Error calculating debt snowball:", error);
      toast.error("There was an error calculating your debt payoff plan");
    }
  };
  
  const handleAddDebt = () => {
    if (!newDebt.name) {
      toast.error("Please enter a name for your debt");
      return;
    }
    
    if (newDebt.balance <= 0) {
      toast.error("Please enter a balance greater than zero");
      return;
    }
    
    if (newDebt.interestRate < 0) {
      toast.error("Interest rate cannot be negative");
      return;
    }
    
    if (newDebt.minimumPayment <= 0) {
      toast.error("Minimum payment must be greater than zero");
      return;
    }
    
    const newDebtWithId: DebtItem = {
      ...newDebt,
      id: Date.now().toString()
    };
    
    setDebts(prev => [...prev, newDebtWithId]);
    setNewDebt({
      name: '',
      balance: 0,
      interestRate: 0,
      minimumPayment: 0
    });
    
    toast.success(`Added ${newDebt.name} to your debt list`);
  };
  
  const handleRemoveDebt = (id: string) => {
    setDebts(prev => prev.filter(debt => debt.id !== id));
    toast.success("Debt removed successfully");
  };
  
  const handleStrategyChange = (value: string) => {
    setStrategy(value as 'snowball' | 'avalanche');
  };
  
  const handleExtraPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setExtraPayment(value);
  };
  
  const handleInputChange = (field: keyof Omit<DebtItem, 'id'>, value: string) => {
    const parsedValue = field === 'name' ? value : (parseFloat(value) || 0);
    
    setNewDebt(prev => ({
      ...prev,
      [field]: parsedValue
    }));
  };
  
  const handleLoadExamples = () => {
    const examples = generateExampleDebts();
    setDebts(examples);
    
    const exampleResults = calculateDebtSnowball(examples, extraPayment, strategy);
    setResults(exampleResults);
    
    toast.success("Example debts loaded");
  };
  
  const handleClearAll = () => {
    setDebts([]);
    setResults(null);
    toast.info("All debts cleared");
  };
  
  const generateBalanceChartData = () => {
    if (!results) return [];
    
    const debtMap = debts.reduce((map, debt) => {
      map[debt.id] = debt.name;
      return map;
    }, {} as Record<string, string>);
    
    return results.paymentSchedule.filter((_, i) => i % 3 === 0 || i === results.paymentSchedule.length - 1).map(month => {
      const debtBalances = month.payments.reduce((acc, payment) => {
        acc[debtMap[payment.debtId]] = payment.remainingBalance;
        return acc;
      }, {} as Record<string, number>);
      
      return {
        month: month.month,
        ...debtBalances,
        totalBalance: month.remainingBalance
      };
    });
  };
  
  const generatePaymentChartData = () => {
    if (!results) return [];
    
    return debts.map(debt => {
      const totalPayments = results.paymentSchedule.reduce((sum, month) => {
        const payment = month.payments.find(p => p.debtId === debt.id);
        return sum + (payment?.amount || 0);
      }, 0);
      
      const totalInterest = results.paymentSchedule.reduce((sum, month) => {
        const payment = month.payments.find(p => p.debtId === debt.id);
        return sum + (payment?.interestPaid || 0);
      }, 0);
      
      return {
        name: debt.name,
        principal: debt.balance,
        interest: totalInterest,
        total: debt.balance + totalInterest
      };
    });
  };
  
  const getDebtById = (id: string) => {
    return debts.find(debt => debt.id === id);
  };
  
  const balanceChartData = generateBalanceChartData();
  const paymentChartData = generatePaymentChartData();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-primary" />
                Add Your Debts
              </CardTitle>
              <CardDescription>
                Enter information about each debt you want to pay off
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="debtName">Debt Name</Label>
                <Input
                  id="debtName"
                  placeholder="Credit Card, Student Loan, etc."
                  value={newDebt.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="balance">Current Balance</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="balance"
                    type="number"
                    className="pl-8"
                    placeholder="0.00"
                    value={newDebt.balance || ''}
                    onChange={(e) => handleInputChange('balance', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <div className="relative">
                  <Percent className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    className="pl-8"
                    placeholder="0.00"
                    value={newDebt.interestRate || ''}
                    onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="minimumPayment">Minimum Monthly Payment</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="minimumPayment"
                    type="number"
                    className="pl-8"
                    placeholder="0.00"
                    value={newDebt.minimumPayment || ''}
                    onChange={(e) => handleInputChange('minimumPayment', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleAddDebt}>
                <Plus className="mr-2 h-4 w-4" />
                Add Debt
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="mr-2 h-5 w-5 text-primary" />
                Payoff Strategy
              </CardTitle>
              <CardDescription>
                Choose your debt payoff strategy and extra payment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="strategy">Strategy</Label>
                <Select value={strategy} onValueChange={handleStrategyChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="snowball" className="flex items-center">
                      <div className="flex items-center">
                        <Snowflake className="mr-2 h-4 w-4" />
                        Debt Snowball (Smallest Balance First)
                      </div>
                    </SelectItem>
                    <SelectItem value="avalanche">
                      <div className="flex items-center">
                        <Flame className="mr-2 h-4 w-4" />
                        Debt Avalanche (Highest Interest First)
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  {strategy === 'snowball' 
                    ? 'Snowball method: Pay off smallest debts first to build momentum.'
                    : 'Avalanche method: Pay off highest interest debts first to save money.'}
                </p>
              </div>
              
              <div>
                <Label htmlFor="extraPayment">Extra Monthly Payment</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="extraPayment"
                    type="number"
                    className="pl-8"
                    placeholder="0.00"
                    value={extraPayment}
                    onChange={handleExtraPaymentChange}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Additional amount to put toward debt each month
                </p>
              </div>
              
              <Button className="w-full" onClick={handleCalculate}>
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Payoff Plan
              </Button>
              
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={handleLoadExamples}>
                  Load Examples
                </Button>
                <Button variant="destructive" size="sm" className="flex-1" onClick={handleClearAll}>
                  Clear All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                Your Debts
              </CardTitle>
              <CardDescription>
                {debts.length === 0 
                  ? "Add your debts to get started" 
                  : `${debts.length} ${debts.length === 1 ? 'debt' : 'debts'} to be paid off`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {debts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CreditCard className="mx-auto h-10 w-10 mb-2 opacity-30" />
                  <p>You haven't added any debts yet.</p>
                  <p className="text-sm">Add a debt or load example data to get started.</p>
                </div>
              ) : (
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Balance</TableHead>
                        <TableHead className="text-right">Rate</TableHead>
                        <TableHead className="text-right">Min. Payment</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {debts.map(debt => (
                        <TableRow key={debt.id}>
                          <TableCell className="font-medium">{debt.name}</TableCell>
                          <TableCell className="text-right">{formatCurrency(debt.balance)}</TableCell>
                          <TableCell className="text-right">{formatPercent(debt.interestRate)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(debt.minimumPayment)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveDebt(debt.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
          
          {results && (
            <Card>
              <CardHeader>
                <div className="flex flex-col space-y-1.5">
                  <Tabs defaultValue="summary">
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                        Debt Payoff Results
                      </CardTitle>
                      <TabsList>
                        <TabsTrigger value="summary">Summary</TabsTrigger>
                        <TabsTrigger value="chart">Charts</TabsTrigger>
                        <TabsTrigger value="plan">Payoff Plan</TabsTrigger>
                      </TabsList>
                    </div>
                    <CardDescription>
                      {strategy === 'snowball' 
                        ? 'Using the Debt Snowball method (smallest balances first)'
                        : 'Using the Debt Avalanche method (highest interest first)'}
                    </CardDescription>
                  
                    <CardContent className="px-0 pt-4">
                      <TabsContent value="summary">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                          <Card className="bg-blue-50">
                            <CardHeader className="py-4">
                              <CardDescription>Time to Debt Free</CardDescription>
                              <CardTitle className="text-xl text-primary">
                                {results.totalMonths} months ({Math.floor(results.totalMonths / 12)} years {results.totalMonths % 12} months)
                              </CardTitle>
                            </CardHeader>
                          </Card>
                          
                          <Card className="bg-green-50">
                            <CardHeader className="py-4">
                              <CardDescription>Total Principal</CardDescription>
                              <CardTitle className="text-xl text-secondary">
                                {formatCurrency(results.totalPaid - results.totalInterestPaid)}
                              </CardTitle>
                            </CardHeader>
                          </Card>
                          
                          <Card className="bg-red-50">
                            <CardHeader className="py-4">
                              <CardDescription>Total Interest</CardDescription>
                              <CardTitle className="text-xl text-destructive">
                                {formatCurrency(results.totalInterestPaid)}
                              </CardTitle>
                            </CardHeader>
                          </Card>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Payoff Order</h3>
                          <ol className="space-y-2 list-decimal list-inside">
                            {results.payoffOrder.map((debtId, index) => {
                              const debt = getDebtById(debtId);
                              return debt ? (
                                <li key={debtId} className="p-3 rounded bg-gray-50">
                                  <span className="font-medium">{index + 1}. {debt.name}</span>
                                  <div className="text-sm text-muted-foreground mt-1">
                                    Starting Balance: {formatCurrency(debt.balance)} | 
                                    Interest Rate: {formatPercent(debt.interestRate)}
                                  </div>
                                </li>
                              ) : null;
                            })}
                          </ol>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="chart">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium mb-4">Balance Over Time</h3>
                            <div className="h-[300px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={balanceChartData}>
                                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                  <XAxis 
                                    dataKey="month" 
                                    label={{ value: 'Month', position: 'insideBottom', offset: -5 }} 
                                  />
                                  <YAxis 
                                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                                    width={80}
                                  />
                                  <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} />
                                  <Legend />
                                  <Line 
                                    type="monotone" 
                                    dataKey="totalBalance" 
                                    name="Total Balance" 
                                    stroke={calculatorColors.primary}
                                    strokeWidth={2}
                                    activeDot={{ r: 8 }}
                                  />
                                  {debts.map((debt, index) => (
                                    <Line
                                      key={debt.id}
                                      type="monotone"
                                      dataKey={debt.name}
                                      name={debt.name}
                                      stroke={CHART_COLORS[index % CHART_COLORS.length]}
                                      activeDot={{ r: 6 }}
                                    />
                                  ))}
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium mb-4">Principal vs Interest</h3>
                            <div className="h-[300px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={paymentChartData}>
                                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                  <XAxis dataKey="name" />
                                  <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                                  <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} />
                                  <Legend />
                                  <Bar dataKey="principal" name="Principal" fill={calculatorColors.chart.principal} />
                                  <Bar dataKey="interest" name="Interest" fill={calculatorColors.chart.interest} />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="plan">
                        <div className="rounded-md border overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Month</TableHead>
                                <TableHead className="text-right">Payment Amount</TableHead>
                                <TableHead className="text-right">Remaining Balance</TableHead>
                                <TableHead className="text-right">Progress</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {results.paymentSchedule
                                .filter((_, i) => i % 3 === 0 || i === results.paymentSchedule.length - 1)
                                .map((month) => {
                                  const initialBalance = debts.reduce((sum, debt) => sum + debt.balance, 0);
                                  const progressPercent = ((initialBalance - month.remainingBalance) / initialBalance) * 100;
                                  
                                  return (
                                    <TableRow key={month.month}>
                                      <TableCell>{month.month}</TableCell>
                                      <TableCell className="text-right">{formatCurrency(month.totalPaid)}</TableCell>
                                      <TableCell className="text-right">{formatCurrency(month.remainingBalance)}</TableCell>
                                      <TableCell className="text-right">
                                        <div className="flex items-center justify-end">
                                          <span className="mr-2">{progressPercent.toFixed(0)}%</span>
                                          <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                                            <div 
                                              className="h-full bg-primary" 
                                              style={{ width: `${progressPercent}%` }}
                                            />
                                          </div>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  );
                                })
                              }
                            </TableBody>
                          </Table>
                        </div>
                      </TabsContent>
                    </CardContent>
                  </Tabs>
                </div>
              </CardHeader>
            </Card>
          )}
          
          <DebtSnowballEducationalContent />
        </div>
      </div>
    </div>
  );
};

export default DebtSnowballTracker;
