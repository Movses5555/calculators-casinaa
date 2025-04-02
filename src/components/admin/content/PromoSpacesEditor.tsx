
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PromoSpace } from "@/types/content";

// Sample data for demo purposes
const samplePromoSpaces: PromoSpace[] = [
  {
    id: 1,
    title: "New Crypto Calculator",
    description: "Calculate your potential crypto earnings with our new mining profitability tool",
    image: "/placeholder.svg",
    url: "/crypto/mining-profitability-calculator",
    position: "header",
    active: true
  },
  {
    id: 2,
    title: "Manage Your Finances",
    description: "Try our mortgage calculator to plan your home purchase",
    image: "/placeholder.svg",
    url: "/finance/mortgage-calculator",
    position: "sidebar",
    active: true
  },
  {
    id: 3,
    title: "Sports Betting Tools",
    description: "Get an edge with our Kelly Criterion calculator",
    image: "/placeholder.svg",
    url: "/betting/kelly-criterion-calculator",
    position: "inline",
    active: false
  }
];

const PromoSpacesEditor = () => {
  const [promoSpaces, setPromoSpaces] = useState<PromoSpace[]>(samplePromoSpaces);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPromo, setCurrentPromo] = useState<PromoSpace | null>(null);

  const handleToggleActive = (id: number) => {
    setPromoSpaces(
      promoSpaces.map(promo => 
        promo.id === id ? { ...promo, active: !promo.active } : promo
      )
    );
  };

  const handleEdit = (promo: PromoSpace) => {
    setCurrentPromo(promo);
    setIsEditing(true);
  };

  const handleSave = () => {
    // In a real app, you would save this to a database
    setIsEditing(false);
    setCurrentPromo(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Promotional Spaces</CardTitle>
        <CardDescription>
          Manage promotional banners and advertisement spaces across the application
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4 p-4 border rounded-md">
            <h3 className="font-medium">Edit Promotional Space</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input 
                  value={currentPromo?.title} 
                  onChange={(e) => setCurrentPromo({...currentPromo!, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL</label>
                <Input 
                  value={currentPromo?.url} 
                  onChange={(e) => setCurrentPromo({...currentPromo!, url: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <Input 
                  value={currentPromo?.description} 
                  onChange={(e) => setCurrentPromo({...currentPromo!, description: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Position</label>
                <Select 
                  value={currentPromo?.position} 
                  onValueChange={(value: "sidebar" | "header" | "footer" | "inline") => 
                    setCurrentPromo({...currentPromo!, position: value})
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sidebar">Sidebar</SelectItem>
                    <SelectItem value="header">Header</SelectItem>
                    <SelectItem value="footer">Footer</SelectItem>
                    <SelectItem value="inline">Inline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <Input 
                  value={currentPromo?.image} 
                  onChange={(e) => setCurrentPromo({...currentPromo!, image: e.target.value})}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={currentPromo?.active}
                  onCheckedChange={(checked) => setCurrentPromo({...currentPromo!, active: checked})}
                />
                <label>Active</label>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => {
                setIsEditing(false);
                setCurrentPromo(null);
              }}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 flex justify-between items-center">
              <Button 
                onClick={() => {
                  setCurrentPromo({
                    id: promoSpaces.length + 1,
                    title: "",
                    description: "",
                    image: "/placeholder.svg",
                    url: "",
                    position: "sidebar",
                    active: true
                  });
                  setIsEditing(true);
                }}
              >
                Add New Promo Space
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promoSpaces.map((promo) => (
                  <TableRow key={promo.id}>
                    <TableCell className="font-medium">{promo.title}</TableCell>
                    <TableCell className="capitalize">{promo.position}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{promo.url}</TableCell>
                    <TableCell>
                      <Switch 
                        checked={promo.active}
                        onCheckedChange={() => handleToggleActive(promo.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(promo)}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PromoSpacesEditor;
