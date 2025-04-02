
import React, { useState } from "react";
import { Package, Plus, Edit, Trash, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface PromoSpace {
  id: string;
  title: string;
  description: string;
  bgColor: string;
  linkText: string;
  linkUrl: string;
  variant: "primary" | "secondary" | "dark";
  showCoins: boolean;
  active: boolean;
  placement: string;
}

const PromoSpacesPage = () => {
  const [promos, setPromos] = useState<PromoSpace[]>([
    {
      id: "1",
      title: "Get Premium Calculators",
      description: "Advanced features and unlimited calculations",
      bgColor: "bg-gradient-to-r from-[#1E2630] to-[#0F1923]",
      linkText: "Try Premium",
      linkUrl: "/premium",
      variant: "primary",
      showCoins: true,
      active: true,
      placement: "Home Page"
    },
    {
      id: "2",
      title: "Start Your Free Trial",
      description: "Access all premium calculators for 7 days",
      bgColor: "bg-gradient-to-r from-[#0F1923] to-[#253545]",
      linkText: "Start Trial",
      linkUrl: "/trial",
      variant: "secondary",
      showCoins: false,
      active: true,
      placement: "Calculator Pages"
    },
    {
      id: "3",
      title: "Spring Sale - 50% Off",
      description: "Limited time offer on annual subscriptions",
      bgColor: "bg-gradient-to-r from-[#0F1923] to-[#1E2630]",
      linkText: "Get Offer",
      linkUrl: "/spring-sale",
      variant: "dark",
      showCoins: true,
      active: true,
      placement: "Finance Pages"
    }
  ]);
  
  const [open, setOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<PromoSpace | null>(null);
  
  const handleEdit = (promo: PromoSpace) => {
    setEditingPromo(promo);
    setOpen(true);
  };
  
  const handleAdd = () => {
    setEditingPromo(null);
    setOpen(true);
  };
  
  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const promoData = {
      id: editingPromo?.id || Date.now().toString(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      bgColor: formData.get("bgColor") as string,
      linkText: formData.get("linkText") as string,
      linkUrl: formData.get("linkUrl") as string,
      variant: formData.get("variant") as "primary" | "secondary" | "dark",
      showCoins: Boolean(formData.get("showCoins")),
      active: Boolean(formData.get("active")),
      placement: formData.get("placement") as string
    };
    
    if (editingPromo) {
      setPromos(promos.map(promo => 
        promo.id === editingPromo.id ? promoData : promo
      ));
    } else {
      setPromos([...promos, promoData]);
    }
    
    setOpen(false);
  };
  
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this promo?")) {
      setPromos(promos.filter(promo => promo.id !== id));
    }
  };
  
  const handleToggleActive = (id: string) => {
    setPromos(promos.map(promo => 
      promo.id === id ? { ...promo, active: !promo.active } : promo
    ));
  };

  const getVariantName = (variant: string) => {
    const variants = {
      primary: "Primary (Dark)",
      secondary: "Secondary (Blue)",
      dark: "Dark"
    };
    return variants[variant as keyof typeof variants] || variant;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Promo Spaces</h1>
          <p className="text-muted-foreground">Manage promotional banners</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Promo
        </Button>
      </div>
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Promo Preview</h2>
        {editingPromo && (
          <Card className="bg-transparent border-none shadow-none">
            <CardContent className="p-0">
              <div className={`${editingPromo.bgColor} w-full py-6 px-6 relative rounded-lg`}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="mr-6 hidden md:block">
                      <div className="bg-white bg-opacity-10 rounded-full p-3">
                        <Package size={24} className="text-[#4ad481]" />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-bold text-xl md:text-2xl uppercase text-white">{editingPromo.title}</h3>
                        {editingPromo.showCoins && (
                          <div className="ml-3">
                            <div className="flex -space-x-2">
                              <div className="w-6 h-6 rounded-full bg-yellow-300 border-2 border-[#1E2630]"></div>
                              <div className="w-6 h-6 rounded-full bg-yellow-400 border-2 border-[#1E2630]"></div>
                              <div className="w-6 h-6 rounded-full bg-yellow-500 border-2 border-[#1E2630]"></div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mt-1">
                        <div className="text-white text-opacity-90">{editingPromo.description}</div>
                        <div className="text-lg md:text-3xl font-bold mt-1 text-white">
                          <span className="text-sm md:text-lg">UP TO</span> $20 <span className="text-sm md:text-lg">value</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="bg-[#4ad481] text-[#0F1923] font-bold px-6 py-3 rounded-lg transition-all duration-200 hover:bg-opacity-90 hover:shadow-md text-center">
                    {editingPromo.linkText}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Variant</TableHead>
              <TableHead>Placement</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promos.map(promo => (
              <TableRow key={promo.id}>
                <TableCell>
                  <div className="font-medium">{promo.title}</div>
                  <div className="text-sm text-muted-foreground line-clamp-1">
                    {promo.description}
                  </div>
                </TableCell>
                <TableCell>{getVariantName(promo.variant)}</TableCell>
                <TableCell>{promo.placement}</TableCell>
                <TableCell>
                  <Button
                    variant={promo.active ? "outline" : "ghost"}
                    size="sm"
                    onClick={() => handleToggleActive(promo.id)}
                    className={`${
                      promo.active
                        ? "text-green-600 border-green-200 bg-green-50 hover:bg-green-100"
                        : "text-gray-500"
                    }`}
                  >
                    {promo.active ? "Active" : "Inactive"}
                  </Button>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(promo)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(promo.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{editingPromo ? "Edit Promo Space" : "Add Promo Space"}</DialogTitle>
            <DialogDescription>
              Configure the promotional banner details
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingPromo?.title}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={2}
                  defaultValue={editingPromo?.description}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="linkText">Button Text</Label>
                  <Input
                    id="linkText"
                    name="linkText"
                    defaultValue={editingPromo?.linkText}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="linkUrl">Button URL</Label>
                  <Input
                    id="linkUrl"
                    name="linkUrl"
                    defaultValue={editingPromo?.linkUrl}
                    required
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="bgColor">Background Color/Gradient</Label>
                <Input
                  id="bgColor"
                  name="bgColor"
                  defaultValue={editingPromo?.bgColor || "bg-gradient-to-r from-[#1E2630] to-[#0F1923]"}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="variant">Variant</Label>
                <Select 
                  name="variant" 
                  defaultValue={editingPromo?.variant || "primary"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select variant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary (Dark)</SelectItem>
                    <SelectItem value="secondary">Secondary (Blue)</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="placement">Placement</Label>
                <Input
                  id="placement"
                  name="placement"
                  defaultValue={editingPromo?.placement || "Home Page"}
                  required
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showCoins"
                    name="showCoins"
                    className="h-4 w-4 rounded border-gray-300"
                    defaultChecked={editingPromo?.showCoins ?? true}
                  />
                  <Label htmlFor="showCoins">Show Coins</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="active"
                    name="active"
                    className="h-4 w-4 rounded border-gray-300"
                    defaultChecked={editingPromo?.active ?? true}
                  />
                  <Label htmlFor="active">Active</Label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingPromo ? "Update" : "Add"} Promo</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PromoSpacesPage;
