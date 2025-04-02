
import React, { useState } from "react";
import { Tag, Plus, Edit, Trash, Upload, Eye } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SponsoredListing {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  position: "left" | "right";
  active: boolean;
}

const SponsoredListingsPage = () => {
  const [listings, setListings] = useState<SponsoredListing[]>([
    {
      id: "1",
      title: "Financial Advisor",
      description: "Connect with certified advisors to optimize your financial planning and secure your future.",
      imageUrl: "/lovable-uploads/a0a3f632-5dee-434b-9f92-919b6dad0fc5.png",
      linkUrl: "/partners/financial-advisors",
      position: "right",
      active: true
    },
    {
      id: "2",
      title: "Premium Crypto Tools",
      description: "Advanced cryptocurrency analysis tools for serious investors.",
      imageUrl: "/lovable-uploads/262b4d58-af14-4747-ac4c-c8f0afd85a9f.png",
      linkUrl: "/crypto/premium-tools",
      position: "right",
      active: true
    },
    {
      id: "3",
      title: "Tax Preparation Services",
      description: "Get help with your taxes from certified professionals.",
      imageUrl: "/lovable-uploads/75c5c9f4-f685-43d1-b2cd-bade1b56b887.png",
      linkUrl: "/partners/tax-services",
      position: "left",
      active: true
    }
  ]);
  
  const [open, setOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<SponsoredListing | null>(null);
  const [previewListing, setPreviewListing] = useState<SponsoredListing | null>(null);
  const [activeTab, setActiveTab] = useState("left");
  
  const handleEdit = (listing: SponsoredListing) => {
    setEditingListing(listing);
    setOpen(true);
  };
  
  const handleAdd = () => {
    setEditingListing(null);
    setOpen(true);
  };
  
  const handlePreview = (listing: SponsoredListing) => {
    setPreviewListing(listing);
    setPreviewOpen(true);
  };
  
  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const listingData = {
      id: editingListing?.id || Date.now().toString(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      imageUrl: formData.get("imageUrl") as string,
      linkUrl: formData.get("linkUrl") as string,
      position: formData.get("position") as "left" | "right",
      active: Boolean(formData.get("active"))
    };
    
    if (editingListing) {
      setListings(listings.map(listing => 
        listing.id === editingListing.id ? listingData : listing
      ));
    } else {
      setListings([...listings, listingData]);
    }
    
    setOpen(false);
  };
  
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      setListings(listings.filter(listing => listing.id !== id));
    }
  };
  
  const handleToggleActive = (id: string) => {
    setListings(listings.map(listing => 
      listing.id === id ? { ...listing, active: !listing.active } : listing
    ));
  };

  const filteredListings = listings.filter(listing => listing.position === activeTab);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Sponsored Listings</h1>
          <p className="text-muted-foreground">Manage sidebar sponsored content</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Listing
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="left">Left Sidebar</TabsTrigger>
          <TabsTrigger value="right">Right Sidebar</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="bg-white rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Link</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredListings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No listings found for this position
                </TableCell>
              </TableRow>
            ) : (
              filteredListings.map(listing => (
                <TableRow key={listing.id}>
                  <TableCell>
                    <div className="w-12 h-12 rounded overflow-hidden bg-gray-100">
                      <img 
                        src={listing.imageUrl} 
                        alt={listing.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{listing.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">
                      {listing.description}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{listing.linkUrl}</TableCell>
                  <TableCell>
                    <Button
                      variant={listing.active ? "outline" : "ghost"}
                      size="sm"
                      onClick={() => handleToggleActive(listing.id)}
                      className={`${
                        listing.active
                          ? "text-green-600 border-green-200 bg-green-50 hover:bg-green-100"
                          : "text-gray-500"
                      }`}
                    >
                      {listing.active ? "Active" : "Inactive"}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handlePreview(listing)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(listing)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(listing.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Edit/Add Listing Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{editingListing ? "Edit Sponsored Listing" : "Add Sponsored Listing"}</DialogTitle>
            <DialogDescription>
              Configure the sponsored listing details below
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingListing?.title}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={3}
                  defaultValue={editingListing?.description}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    defaultValue={editingListing?.imageUrl}
                    required
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" className="flex-shrink-0">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
                {editingListing?.imageUrl && (
                  <div className="mt-2 w-full h-32 rounded overflow-hidden bg-gray-100">
                    <img 
                      src={editingListing.imageUrl} 
                      alt={editingListing.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="linkUrl">Link URL</Label>
                <Input
                  id="linkUrl"
                  name="linkUrl"
                  defaultValue={editingListing?.linkUrl}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="position">Position</Label>
                <Select 
                  name="position" 
                  defaultValue={editingListing?.position || activeTab}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left Sidebar</SelectItem>
                    <SelectItem value="right">Right Sidebar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="active"
                  name="active"
                  className="h-4 w-4 rounded border-gray-300"
                  defaultChecked={editingListing?.active ?? true}
                />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingListing ? "Update" : "Add"} Listing</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Sponsored Listing Preview</DialogTitle>
          </DialogHeader>
          
          {previewListing && (
            <div className="py-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="p-4">
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden bg-gray-100">
                      <img 
                        src={previewListing.imageUrl} 
                        alt={previewListing.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{previewListing.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{previewListing.description}</p>
                      <Button size="sm" variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p className="mb-2">Preview Info:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Position: <span className="font-medium">{previewListing.position === "left" ? "Left" : "Right"} Sidebar</span></li>
                  <li>Status: <span className={`font-medium ${previewListing.active ? "text-green-600" : "text-red-600"}`}>
                    {previewListing.active ? "Active" : "Inactive"}
                  </span></li>
                  <li>Link: <span className="font-medium">{previewListing.linkUrl}</span></li>
                </ul>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SponsoredListingsPage;
