
/**
 * Bug tracking utility functions
 */

export interface Bug {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  reportedBy?: string;
  component?: string;
}

// For compatibility with BugTrackerPage
export interface BugItem extends Bug {
  priority: string;
}

// In-memory storage for bugs (in a real app, this would be a database)
const bugs: Bug[] = [
  {
    id: 'BUG-0001',
    title: 'Calculator Results Incorrect',
    description: 'The mortgage calculator is showing incorrect interest amounts',
    status: 'open',
    severity: 'high',
    createdAt: new Date('2023-04-15'),
    updatedAt: new Date('2023-04-15'),
    assignedTo: 'dev.team@example.com',
    reportedBy: 'user@example.com',
    component: 'MortgageCalculator'
  },
  {
    id: 'BUG-0002',
    title: 'UI Rendering Issue',
    description: 'The chart component does not render properly on mobile devices',
    status: 'in-progress',
    severity: 'medium',
    createdAt: new Date('2023-05-02'),
    updatedAt: new Date('2023-05-10'),
    assignedTo: 'ui.team@example.com',
    reportedBy: 'tester@example.com',
    component: 'ResultsChart'
  }
];

export const generateBugId = (): string => {
  return `BUG-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
};

export const sortBugsByPriority = (bugsToSort: Bug[]): Bug[] => {
  const severityOrder = {
    'critical': 0,
    'high': 1,
    'medium': 2,
    'low': 3
  };
  
  return [...bugsToSort].sort((a, b) => {
    // First sort by severity
    const severityDiff = severityOrder[a.severity] - severityOrder[b.severity];
    if (severityDiff !== 0) return severityDiff;
    
    // Then sort by status (open bugs first)
    if (a.status === 'open' && b.status !== 'open') return -1;
    if (a.status !== 'open' && b.status === 'open') return 1;
    
    // Finally sort by creation date (newest first)
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
};

// Convert Bug array to BugItem array for BugTrackerPage
const convertToBugItems = (bugs: Bug[]): BugItem[] => {
  return bugs.map(bug => ({
    ...bug,
    priority: bug.severity // Map severity to priority for backward compatibility
  }));
};

// Functions needed by BugTrackerPage
export const getAllBugs = (): BugItem[] => {
  return convertToBugItems([...bugs]);
};

export const getBugsByStatus = (status: 'open' | 'in-progress' | 'resolved' | 'closed'): BugItem[] => {
  return convertToBugItems(bugs.filter(bug => bug.status === status));
};

export const getBugsByPriority = (priority: 'low' | 'medium' | 'high' | 'critical'): BugItem[] => {
  return convertToBugItems(bugs.filter(bug => bug.severity === priority));
};

export const updateBugStatus = (id: string, status: 'open' | 'in-progress' | 'resolved' | 'closed'): BugItem | null => {
  const bugIndex = bugs.findIndex(bug => bug.id === id);
  if (bugIndex === -1) return null;
  
  bugs[bugIndex] = {
    ...bugs[bugIndex],
    status,
    updatedAt: new Date()
  };
  
  return convertToBugItems([bugs[bugIndex]])[0];
};

export const reportBug = (id: string, description: string): void => {
  console.log(`Bug reported: ${id} - ${description}`);
  // In a real app, this would create a new bug entry
};
