
/**
 * Color scheme definitions for calculators
 */

export const CHART_COLORS = [
  "#4E79A7", 
  "#F28E2C", 
  "#E15759", 
  "#76B7B2", 
  "#59A14F", 
  "#EDC949", 
  "#AF7AA1", 
  "#FF9DA7", 
  "#9C755F", 
  "#BAB0AB"
];

export const dataColorMap: Record<string, string> = {
  'Principal': "#4E79A7",
  'Interest': "#F28E2C",
  'Property Tax': "#E15759",
  'Insurance': "#76B7B2",
  'PMI': "#59A14F"
};

export const calculatorColors = {
  primary: "#3B82F6",
  secondary: "#10B981",
  accent: "#8B5CF6",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#6366F1",
  text: {
    heading: "#1F2937",
    body: "#4B5563",
    light: "#9CA3AF",
    muted: "#6B7280"
  },
  background: {
    card: "#FFFFFF",
    page: "#F9FAFB",
    highlight: "#F3F4F6"
  },
  data: {
    total: "#3B82F6",
    interest: "#8B5CF6",
    principal: "#10B981",
    contributions: "#3B82F6",
    initial: "#10B981",
    fat: "#F59E0B",
    lean: "#3B82F6"
  },
  chart: {
    principal: "#10B981",
    interest: "#8B5CF6",
    balance: "#3B82F6",
    downPayment: "#F59E0B",
    totalCost: "#EF4444",
    fat: "#F59E0B", 
    lean: "#3B82F6",
    primary: "#3B82F6",
    categoricalColors: CHART_COLORS
  }
};
