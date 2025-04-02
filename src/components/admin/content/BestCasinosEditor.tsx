
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Pencil, Trash, PlusCircle } from "lucide-react";
import { CasinoItem } from "@/types/content";

// Initial data from BestCasinosSection
const initialCasinos: CasinoItem[] = [
  {
    id: 1,
    name: "Legzo Casino",
    logo: "/lovable-uploads/75c5c9f4-f685-43d1-b2cd-bade1b56b887.png",
    safetyIndex: "HIGH"
  },
  {
    id: 2,
    name: "DelOro Casino",
    logo: "/lovable-uploads/09c3c164-34f2-44c2-b8b0-cc16eddd88b1.png",
    safetyIndex: "HIGH"
  },
  {
    id: 3,
    name: "Lemon Casino",
    logo: "/lovable-uploads/75c5c9f4-f685-43d1-b2cd-bade1b56b887.png",
    safetyIndex: "VERY HIGH"
  },
  {
    id: 4,
    name: "Rolling Slots Casino",
    logo: "/lovable-uploads/09c3c164-34f2-44c2-b8b0-cc16eddd88b1.png",
    safetyIndex: "VERY HIGH"
  },
  {
    id: 5,
    name: "Betunlim Casino",
    logo: "/lovable-uploads/75c5c9f4-f685-43d1-b2cd-bade1b56b887.png",
    safetyIndex: "HIGH"
  },
  {
    id: 6,
    name: "Boomerang Casino",
    logo: "/lovable-uploads/09c3c164-34f2-44c2-b8b0-cc16eddd88b1.png",
    safetyIndex: "VERY HIGH"
  }
];

const getSafetyColor = (safety: string) => {
  switch (safety) {
    case "VERY HIGH":
      return "text-green-500";
    case "HIGH":
      return "text-green-400";
    case "MEDIUM":
      return "text-yellow-500";
    case "LOW":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

const BestCasinosEditor = () => {
  const [casinos, setCasinos] = useState<CasinoItem[]>(initialCasinos);
  const [currentCasino, setCurrentCasino] = useState<CasinoItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<Partial<CasinoItem>>({
    name: "",
    logo: "",
    safetyIndex: "HIGH"
  });
  
  const handleEditCasino = (casino: CasinoItem) => {
    setCurrentCasino(casino);
    setFormData({
      name: casino.name,
      logo: casino.logo,
      safetyIndex: casino.safetyIndex
    });
    setIsEditing(true);
    setDialogOpen(true);
  };
  
  const handleAddNew = () => {
    setCurrentCasino(null);
    setFormData({
      name: "",
      logo: "",
      safetyIndex: "HIGH"
    });
    setIsEditing(false);
    setDialogOpen(true);
  };
  
  const handleDeleteCasino = (id: number) => {
    const updatedCasinos = casinos.filter(casino => casino.id !== id);
    setCasinos(updatedCasinos);
    toast({
      title: "Casino deleted",
      description: "The casino has been removed from the list.",
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSafetyChange = (value: string) => {
    setFormData({
      ...formData,
      safetyIndex: value as "HIGH" | "VERY HIGH" | "MEDIUM" | "LOW"
    });
  };
  
  const handleSubmit = () => {
    if (!formData.name || !formData.logo) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (isEditing && currentCasino) {
      // Update existing casino
      const updatedCasinos = casinos.map(casino => 
        casino.id === currentCasino.id 
          ? { ...casino, ...formData as CasinoItem }
          : casino
      );
      setCasinos(updatedCasinos);
      toast({
        title: "Casino updated",
        description: "The casino has been updated successfully."
      });
    } else {
      // Add new casino
      const newCasino: CasinoItem = {
        id: Math.max(0, ...casinos.map(c => c.id)) + 1,
        name: formData.name!,
        logo: formData.logo!,
        safetyIndex: formData.safetyIndex as "HIGH" | "VERY HIGH" | "MEDIUM" | "LOW"
      };
      setCasinos([...casinos, newCasino]);
      toast({
        title: "Casino added",
        description: "The new casino has been added to the list."
      });
    }
    
    setDialogOpen(false);
  };
  
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle>Best Casinos Editor</CardTitle>
        <CardDescription>
          Manage the casino listings that appear on the homepage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of best casinos shown on the homepage.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Safety Index</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {casinos.map((casino) => (
              <TableRow key={casino.id}>
                <TableCell>
                  <img 
                    src={casino.logo} 
                    alt={casino.name}
                    className="w-16 h-16 object-contain rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{casino.name}</TableCell>
                <TableCell>
                  <span className={`font-bold ${getSafetyColor(casino.safetyIndex)}`}>
                    {casino.safetyIndex}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditCasino(casino)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteCasino(casino.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Casino
        </Button>
      </CardFooter>
      
      {/* Casino edit/add dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Casino" : "Add New Casino"}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? "Make changes to the selected casino." 
                : "Add a new casino to the best casinos section."
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name*
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="logo" className="text-right">
                Logo URL*
              </Label>
              <Input
                id="logo"
                name="logo"
                value={formData.logo}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="safetyIndex" className="text-right">
                Safety Index
              </Label>
              <Select 
                value={formData.safetyIndex} 
                onValueChange={handleSafetyChange}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select safety index" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VERY HIGH">VERY HIGH</SelectItem>
                  <SelectItem value="HIGH">HIGH</SelectItem>
                  <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                  <SelectItem value="LOW">LOW</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {isEditing ? "Save Changes" : "Add Casino"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default BestCasinosEditor;
