import React, { useState, useEffect } from "react";
import { 
  calculateMortgage, 
  formatCurrency, 
  formatPercent,
  type MortgageInput,
  type MortgageResult
} from "../../utils/calculateMortgage";
import { ArrowRight, Download, ChevronDown, ChevronUp, Info, DollarSign, Percent, Calendar, Home } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { toast } from "sonner";
import { CHART_COLORS, dataColorMap } from "@/utils/calculatorColors";

const MortgageCalculator = () => {
  const [activeTab, setActiveTab] = useState<"calculator" | "results" | "amortization">("calculator");
  const [inputs, setInputs] = useState<MortgageInput>({
    loanAmount: 300000,
    interestRate: 4.5,
    loanTerm: 30,
    downPayment: 60000,
    propertyTax: 2400,
    homeInsurance: 1200,
    pmi: 0
  });
  
  const [result, setResult] = useState<MortgageResult | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>("basic");
  
  useEffect(() => {
    calculateAndSetResults();
  }, [inputs]);
  
  const calculateAndSetResults = () => {
    try {
      const calculationResult = calculateMortgage(inputs);
      setResult(calculationResult);
      if (activeTab === "calculator") {
        setActiveTab("results");
      }
    } catch (error) {
      console.error("Calculation error:", error);
      toast.error("There was an error with your calculation. Please check your inputs.");
    }
  };
  
  const handleInputChange = (field: keyof MortgageInput, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSliderChange = (field: keyof MortgageInput, value: string) => {
    handleInputChange(field, parseFloat(value));
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  const getPieChartData = () => {
    if (!result) return [];
    
    return [
      { name: "Principal", value: inputs.loanAmount - inputs.downPayment },
      { name: "Interest", value: result.totalInterest },
      { name: "Property Tax", value: inputs.propertyTax * inputs.loanTerm },
      { name: "Insurance", value: inputs.homeInsurance * inputs.loanTerm }
    ];
  };
  
  const getBarChartData = () => {
    if (!result) return [];
    
    const yearlyData: any[] = [];
    const paymentsByYear = result.paymentSchedule.reduce((acc: { [key: number]: { principal: number; interest: number } }, payment) => {
      if (!acc[payment.year]) {
        acc[payment.year] = { principal: 0, interest: 0 };
      }
      
      acc[payment.year].principal += payment.principal;
      acc[payment.year].interest += payment.interest;
      
      return acc;
    }, {});
    
    Object.entries(paymentsByYear).forEach(([year, data]) => {
      yearlyData.push({
        year: `Year ${year}`,
        principal: data.principal,
        interest: data.interest
      });
    });
    
    return yearlyData.slice(0, 10);
  };
  
  const getAmortizationSchedule = () => {
    if (!result) return [];
    
    return result.paymentSchedule.map((payment, index) => ({
      id: index + 1,
      period: `${payment.year}-${payment.month}`,
      payment: formatCurrency(payment.payment),
      principal: formatCurrency(payment.principal),
      interest: formatCurrency(payment.interest),
      balance: formatCurrency(payment.balance)
    }));
  };
  
  const downloadAmortizationSchedule = () => {
    if (!result) return;
    
    const schedule = result.paymentSchedule;
    const headers = ["Period", "Payment", "Principal", "Interest", "Remaining Balance"];
    
    let csvContent = headers.join(",") + "\n";
    
    schedule.forEach(payment => {
      const row = [
        `Year ${payment.year}, Month ${payment.month}`,
        payment.payment.toFixed(2),
        payment.principal.toFixed(2),
        payment.interest.toFixed(2),
        payment.balance.toFixed(2)
      ];
      
      csvContent += row.join(",") + "\n";
    });
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.setAttribute("href", url);
    link.setAttribute("download", "mortgage_amortization_schedule.csv");
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Amortization schedule downloaded successfully");
  };

  return (
    <div className="bg-white rounded-xl shadow-subtle overflow-hidden transition-all duration-300 animate-scale-in">
      <div className="bg-gradient-to-r from-calculator-primary to-calculator-secondary p-6 text-white">
        <h2 className="text-2xl font-semibold">Mortgage Calculator</h2>
        <p className="opacity-90">Calculate your monthly mortgage payments and view amortization schedule</p>
      </div>
      
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors duration-200 ${
              activeTab === "calculator"
                ? "border-calculator-primary text-calculator-primary"
                : "border-transparent text-gray-600 hover:text-calculator-primary"
            }`}
            onClick={() => setActiveTab("calculator")}
          >
            Calculator
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors duration-200 ${
              activeTab === "results"
                ? "border-calculator-primary text-calculator-primary"
                : "border-transparent text-gray-600 hover:text-calculator-primary"
            }`}
            onClick={() => setActiveTab("results")}
            disabled={!result}
          >
            Results
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors duration-200 ${
              activeTab === "amortization"
                ? "border-calculator-primary text-calculator-primary"
                : "border-transparent text-gray-600 hover:text-calculator-primary"
            }`}
            onClick={() => setActiveTab("amortization")}
            disabled={!result}
          >
            Amortization
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {activeTab === "calculator" && (
          <div className="space-y-6 animate-fade-in">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 text-left font-medium bg-gray-50 hover:bg-gray-100 transition-colors"
                onClick={() => toggleSection("basic")}
              >
                <div className="flex items-center">
                  <Home className="w-5 h-5 mr-2 text-calculator-primary" />
                  <span>Basic Information</span>
                </div>
                {expandedSection === "basic" ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {expandedSection === "basic" && (
                <div className="p-4 space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Home Price
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          value={inputs.loanAmount + inputs.downPayment}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0;
                            setInputs(prev => ({
                              ...prev,
                              loanAmount: value - prev.downPayment
                            }));
                          }}
                          className="calc-input pl-10 w-full"
                        />
                      </div>
                      <input
                        type="range"
                        min="50000"
                        max="2000000"
                        step="10000"
                        value={inputs.loanAmount + inputs.downPayment}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          setInputs(prev => ({
                            ...prev,
                            loanAmount: value - prev.downPayment
                          }));
                        }}
                        className="calc-slider w-full mt-2"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>$50K</span>
                        <span>$2M</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Down Payment
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          value={inputs.downPayment}
                          onChange={(e) => handleInputChange("downPayment", parseFloat(e.target.value) || 0)}
                          className="calc-input pl-10 w-full"
                        />
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <input
                          type="range"
                          min="0"
                          max={(inputs.loanAmount + inputs.downPayment) * 0.8}
                          step="5000"
                          value={inputs.downPayment}
                          onChange={(e) => handleInputChange("downPayment", parseFloat(e.target.value))}
                          className="calc-slider w-4/5"
                        />
                        <div className="w-1/5 text-right">
                          <span className="text-xs font-medium rounded-full bg-gray-100 px-2 py-1">
                            {((inputs.downPayment / (inputs.loanAmount + inputs.downPayment)) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Loan Term (Years)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          value={inputs.loanTerm}
                          onChange={(e) => handleInputChange("loanTerm", parseInt(e.target.value))}
                          className="calc-input pl-10 w-full appearance-none"
                        >
                          <option value="10">10 years</option>
                          <option value="15">15 years</option>
                          <option value="20">20 years</option>
                          <option value="25">25 years</option>
                          <option value="30">30 years</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Interest Rate (%)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Percent className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          step="0.125"
                          value={inputs.interestRate}
                          onChange={(e) => handleInputChange("interestRate", parseFloat(e.target.value) || 0)}
                          className="calc-input pl-10 w-full"
                        />
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.125"
                        value={inputs.interestRate}
                        onChange={(e) => handleSliderChange("interestRate", e.target.value)}
                        className="calc-slider w-full mt-2"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0%</span>
                        <span>10%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 text-left font-medium bg-gray-50 hover:bg-gray-100 transition-colors"
                onClick={() => toggleSection("additional")}
              >
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-calculator-primary" />
                  <span>Additional Costs</span>
                </div>
                {expandedSection === "additional" ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {expandedSection === "additional" && (
                <div className="p-4 space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Property Tax (Yearly)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          value={inputs.propertyTax}
                          onChange={(e) => handleInputChange("propertyTax", parseFloat(e.target.value) || 0)}
                          className="calc-input pl-10 w-full"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Home Insurance (Yearly)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          value={inputs.homeInsurance}
                          onChange={(e) => handleInputChange("homeInsurance", parseFloat(e.target.value) || 0)}
                          className="calc-input pl-10 w-full"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PMI (Monthly)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        value={inputs.pmi}
                        onChange={(e) => handleInputChange("pmi", parseFloat(e.target.value) || 0)}
                        className="calc-input pl-10 w-full"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 flex items-center">
                      <Info className="h-3 w-3 mr-1" />
                      PMI is typically required if your down payment is less than 20% of the home's value.
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={calculateAndSetResults}
                className="calc-button flex items-center space-x-2 px-8 py-3"
              >
                <span>Calculate Mortgage</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
        
        {activeTab === "results" && result && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-calculator-primary to-calculator-secondary text-white p-6 rounded-lg">
                <h3 className="text-lg font-medium opacity-90 mb-1">Monthly Payment</h3>
                <p className="text-3xl font-bold">{formatCurrency(result.monthlyPayment)}</p>
                <div className="mt-4 text-sm">
                  <div className="flex justify-between">
                    <span>Principal & Interest:</span>
                    <span>{formatCurrency(result.monthlyPrincipalInterest)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Property Tax:</span>
                    <span>{formatCurrency(result.monthlyPropertyTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Home Insurance:</span>
                    <span>{formatCurrency(result.monthlyHomeInsurance)}</span>
                  </div>
                  {result.monthlyPMI > 0 && (
                    <div className="flex justify-between">
                      <span>PMI:</span>
                      <span>{formatCurrency(result.monthlyPMI)}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Loan Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan Amount:</span>
                    <span className="font-medium">{formatCurrency(inputs.loanAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Down Payment:</span>
                    <span className="font-medium">{formatCurrency(inputs.downPayment)} ({((inputs.downPayment / (inputs.loanAmount + inputs.downPayment)) * 100).toFixed(1)}%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Rate:</span>
                    <span className="font-medium">{formatPercent(inputs.interestRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan Term:</span>
                    <span className="font-medium">{inputs.loanTerm} years</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Total Costs</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Principal:</span>
                    <span className="font-medium">{formatCurrency(inputs.loanAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Interest:</span>
                    <span className="font-medium">{formatCurrency(result.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Cost:</span>
                    <span className="font-medium">{formatCurrency(result.totalPayment)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Payment Breakdown</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getPieChartData()}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                        labelLine={false}
                      >
                        {getPieChartData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {getPieChartData().map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center">
                      <div
                        className="w-4 h-4 rounded mr-2"
                        style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                      />
                      <div className="text-sm">
                        <div className="font-medium">{entry.name}</div>
                        <div className="text-gray-500">{formatCurrency(entry.value)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Principal vs. Interest (First 10 Years)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getBarChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Bar dataKey="principal" name="Principal" fill={dataColorMap['Principal']} stackId="a" />
                      <Bar dataKey="interest" name="Interest" fill={dataColorMap['Interest']} stackId="a" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={() => setActiveTab("amortization")}
                className="calc-button flex items-center space-x-2"
              >
                <span>View Amortization Schedule</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
        
        {activeTab === "amortization" && result && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-700">Amortization Schedule</h3>
              <button
                onClick={downloadAmortizationSchedule}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download CSV</span>
              </button>
            </div>
            
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Principal
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Interest
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Remaining Balance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getAmortizationSchedule().slice(0, 60).map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Year {row.period.split('-')[0]}, Month {row.period.split('-')[1]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.payment}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.principal}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.interest}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.balance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="text-center text-sm text-gray-500 mt-4">
              Showing the first 5 years of payments. Download the full schedule with the button above.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MortgageCalculator;

