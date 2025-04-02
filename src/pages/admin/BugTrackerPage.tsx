
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Helmet } from 'react-helmet';
import { Bug, AlertTriangle, CheckCircle, Clock, LogOut } from 'lucide-react';
import { 
  getAllBugs, 
  getBugsByStatus,
  getBugsByPriority,
  updateBugStatus,
  type BugItem
} from '@/utils/admin/bugTracker';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const BugTrackerPage: React.FC = () => {
  const [bugs, setBugs] = useState<BugItem[]>(getAllBugs());
  const [activeTab, setActiveTab] = useState<string>('all');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (value === 'all') {
      setBugs(getAllBugs());
    } else if (['open', 'in-progress', 'resolved', 'closed'].includes(value)) {
      setBugs(getBugsByStatus(value as 'open' | 'in-progress' | 'resolved' | 'closed'));
    } else if (['low', 'medium', 'high', 'critical'].includes(value)) {
      setBugs(getBugsByPriority(value as 'low' | 'medium' | 'high' | 'critical'));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out of the admin panel.",
    });
    navigate('/');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-200 text-gray-800';
      case 'medium': return 'bg-blue-200 text-blue-800';
      case 'high': return 'bg-orange-200 text-orange-800';
      case 'critical': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-amber-500" />;
      case 'resolved': 
      case 'closed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Bug className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Bug Tracker | CalcMaster Admin</title>
        <meta name="description" content="Internal bug tracking system for CalcMaster" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container max-w-6xl mx-auto py-8 px-4">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="inline-flex items-center justify-center p-2 bg-red-500/10 rounded-full mr-4">
                <Bug className="h-6 w-6 text-red-500" />
              </div>
              <h1 className="text-3xl font-bold">Bug Tracker</h1>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
          <p className="text-xl max-w-2xl">
            Track and manage known issues across the application.
          </p>
        </header>

        <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="all">All Bugs</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            <div className="bg-card rounded-lg shadow-sm border overflow-hidden">
              <div className="grid grid-cols-12 gap-2 p-4 font-medium bg-muted text-muted-foreground">
                <div className="col-span-1">ID</div>
                <div className="col-span-4">Description</div>
                <div className="col-span-3">Component</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1">Priority</div>
                <div className="col-span-2">Actions</div>
              </div>
              
              {bugs.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-4 opacity-50" />
                  <p>No bugs found in this category.</p>
                </div>
              ) : (
                bugs.map((bug) => (
                  <div key={bug.id} className="grid grid-cols-12 gap-2 p-4 border-t">
                    <div className="col-span-1 font-mono text-sm">{bug.id}</div>
                    <div className="col-span-4">{bug.description}</div>
                    <div className="col-span-3 text-sm text-muted-foreground font-mono truncate" title={bug.component}>
                      {bug.component}
                    </div>
                    <div className="col-span-1 flex items-center gap-1">
                      {getStatusIcon(bug.status)}
                      <span className="text-sm capitalize">{bug.status}</span>
                    </div>
                    <div className="col-span-1">
                      <Badge className={`${getPriorityColor(bug.priority)} capitalize`}>
                        {bug.priority}
                      </Badge>
                    </div>
                    <div className="col-span-2 flex gap-2">
                      {bug.status !== 'resolved' && bug.status !== 'closed' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => {
                            // In a real app, this would update the bug in a database
                            console.log(`Marking ${bug.id} as resolved`);
                          }}
                        >
                          Mark Resolved
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => {
                          // Navigate to the component with the bug
                          console.log(`Navigating to ${bug.component}`);
                        }}
                      >
                        View Code
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default BugTrackerPage;
