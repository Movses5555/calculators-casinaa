
import React from "react";
import { 
  Bug, 
  SlidersHorizontal, 
  Tag, 
  Package, 
  ArrowRight 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboardPage = () => {
  const stats = [
    { 
      title: "Bug Reports", 
      value: 13, 
      description: "Active reports", 
      icon: <Bug className="h-8 w-8 text-red-500" />,
      link: "/admin/bug-tracker",
      color: "bg-red-50"
    },
    { 
      title: "Feature Tools", 
      value: 4, 
      description: "Active tools", 
      icon: <SlidersHorizontal className="h-8 w-8 text-blue-500" />,
      link: "/admin/feature-tools",
      color: "bg-blue-50"
    },
    { 
      title: "Sponsored Listings", 
      value: 7, 
      description: "Active listings", 
      icon: <Tag className="h-8 w-8 text-purple-500" />,
      link: "/admin/sponsored-listings",
      color: "bg-purple-50"
    },
    { 
      title: "Promo Spaces", 
      value: 3, 
      description: "Active promos", 
      icon: <Package className="h-8 w-8 text-green-500" />,
      link: "/admin/promo-spaces",
      color: "bg-green-50"
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className={`rounded-t-lg ${stat.color}`}>
              <div className="flex justify-between items-start">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold">{stat.value}</div>
              <CardTitle className="text-lg mt-2">{stat.title}</CardTitle>
              <CardDescription className="text-sm">{stat.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <a 
                href={stat.link} 
                className="text-sm font-medium flex items-center text-muted-foreground hover:text-foreground"
              >
                View details
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Bug Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">Login page error</p>
                    <p className="text-sm text-muted-foreground">Reported 2 days ago</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                    High
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Active Promotions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">Premium Calculator Offer</p>
                    <p className="text-sm text-muted-foreground">Ends in 5 days</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
