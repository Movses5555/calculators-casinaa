
import React, { useState } from "react";
import { SlidersHorizontal, Plus, Edit, Trash, Eye } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FeatureTool {
  id: string;
  title: string;
  description: string;
  icon: string;
  position: "left" | "right";
  active: boolean;
  linkUrl: string;
  bgColor: string;
}

const FeatureToolsPage = () => {
  const [tools, setTools] = useState<FeatureTool[]>([
    {
      id: "1",
      title: "Investment Calculator",
      description: "Plan your future with our investment calculator.",
      icon: "Investment",
      position: "left",
      active: true,
      linkUrl: "/finance/investment-calculator",
      bgColor: "#F2FCE2"
    },
    {
      id: "2",
      title: "Crypto Calculator",
      description: "Calculate cryptocurrency conversions and mining profits.",
      icon: "Crypto",
      position: "left",
      active: true,
      linkUrl: "/crypto/crypto-profit-calculator",
      bgColor: "#E5DEFF"
    },
    {
      id: "3",
      title: "Mortgage Calculator",
      description: "Calculate your monthly payments and total interest.",
      icon: "Mortgage",
      position: "right",
      active: true,
      linkUrl: "/finance/mortgage-calculator",
      bgColor: "#D3E4FD"
    },
    {
      id: "4",
      title: "Loan Calculator",
      description: "Determine your loan payments and interest costs.",
      icon: "Loan",
      position: "right",
      active: true,
      linkUrl: "/finance/loan-calculator",
      bgColor: "#FDE1D3"
    }
  ]);
  
  const [open, setOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTool, setPreviewTool] = useState<FeatureTool | null>(null);
  const [editingTool, setEditingTool] = useState<FeatureTool | null>(null);
  const [activeTab, setActiveTab] = useState<"left" | "right">("left");
  
  const colorOptions = [
    { value: "#F2FCE2", label: "Soft Green" },
    { value: "#FEF7CD", label: "Soft Yellow" },
    { value: "#FEC6A1", label: "Soft Orange" },
    { value: "#E5DEFF", label: "Soft Purple" },
    { value: "#FFDEE2", label: "Soft Pink" },
    { value: "#FDE1D3", label: "Soft Peach" },
    { value: "#D3E4FD", label: "Soft Blue" },
    { value: "#F1F0FB", label: "Soft Gray" }
  ];
  
  const handleEdit = (tool: FeatureTool) => {
    setEditingTool(tool);
    setOpen(true);
  };
  
  const handleAdd = () => {
    setEditingTool(null);
    setOpen(true);
  };
  
  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const toolData = {
      id: editingTool?.id || Date.now().toString(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      icon: formData.get("icon") as string,
      position: formData.get("position") as "left" | "right",
      active: Boolean(formData.get("active")),
      linkUrl: formData.get("linkUrl") as string,
      bgColor: formData.get("bgColor") as string
    };
    
    if (editingTool) {
      setTools(tools.map(tool => tool.id === editingTool.id ? toolData : tool));
    } else {
      setTools([...tools, toolData]);
    }
    
    setOpen(false);
  };
  
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this tool?")) {
      setTools(tools.filter(tool => tool.id !== id));
    }
  };
  
  const handleToggleActive = (id: string) => {
    setTools(tools.map(tool => 
      tool.id === id ? { ...tool, active: !tool.active } : tool
    ));
  };
  
  const handlePreview = (tool: FeatureTool) => {
    setPreviewTool(tool);
    setPreviewOpen(true);
  };
  
  const filteredTools = tools.filter(tool => tool.position === activeTab);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Feature Tools</h1>
          <p className="text-muted-foreground">Manage sidebar feature tools</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Tool
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "left" | "right")} className="mb-6">
        <TabsList>
          <TabsTrigger value="left">Left Sidebar</TabsTrigger>
          <TabsTrigger value="right">Right Sidebar</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="bg-white rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Link</TableHead>
              <TableHead>Background</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTools.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No tools found for this position
                </TableCell>
              </TableRow>
            ) : (
              filteredTools.map(tool => (
                <TableRow key={tool.id}>
                  <TableCell>
                    <div className="font-medium">{tool.title}</div>
                    <div className="text-sm text-muted-foreground">{tool.description}</div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{tool.linkUrl}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-6 h-6 rounded-full border border-gray-200" 
                        style={{ backgroundColor: tool.bgColor }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {colorOptions.find(color => color.value === tool.bgColor)?.label || tool.bgColor}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={tool.active ? "outline" : "ghost"}
                      size="sm"
                      onClick={() => handleToggleActive(tool.id)}
                      className={`${
                        tool.active
                          ? "text-green-600 border-green-200 bg-green-50 hover:bg-green-100"
                          : "text-gray-500"
                      }`}
                    >
                      {tool.active ? "Active" : "Inactive"}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handlePreview(tool)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(tool)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(tool.id)}>
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
      
      {/* Edit/Add Tool Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{editingTool ? "Edit Feature Tool" : "Add Feature Tool"}</DialogTitle>
            <DialogDescription>
              Configure the feature tool details below
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingTool?.title}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  defaultValue={editingTool?.description}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="icon">Icon Label</Label>
                <Input
                  id="icon"
                  name="icon"
                  defaultValue={editingTool?.icon}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="position">Position</Label>
                <Select 
                  name="position" 
                  defaultValue={editingTool?.position || activeTab}
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
              
              <div className="grid gap-2">
                <Label htmlFor="bgColor">Background Color</Label>
                <Select 
                  name="bgColor" 
                  defaultValue={editingTool?.bgColor || "#F2FCE2"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select background color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map(color => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center">
                          <div 
                            className="w-4 h-4 rounded-full mr-2" 
                            style={{ backgroundColor: color.value }}
                          />
                          {color.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="linkUrl">Link URL</Label>
                <Input
                  id="linkUrl"
                  name="linkUrl"
                  defaultValue={editingTool?.linkUrl}
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="active"
                  name="active"
                  className="h-4 w-4 rounded border-gray-300"
                  defaultChecked={editingTool?.active ?? true}
                />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingTool ? "Update" : "Add"} Tool</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Feature Tool Preview</DialogTitle>
          </DialogHeader>
          
          {previewTool && (
            <div className="py-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="p-5" style={{ backgroundColor: previewTool.bgColor }}>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-semibold mb-1">{previewTool.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{previewTool.description}</p>
                    <Button size="sm" className="w-full">Try {previewTool.title}</Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p className="mb-2">Preview Info:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Position: <span className="font-medium">{previewTool.position === "left" ? "Left" : "Right"} Sidebar</span></li>
                  <li>Status: <span className={`font-medium ${previewTool.active ? "text-green-600" : "text-red-600"}`}>
                    {previewTool.active ? "Active" : "Inactive"}
                  </span></li>
                  <li>Link: <span className="font-medium">{previewTool.linkUrl}</span></li>
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

export default FeatureToolsPage;
