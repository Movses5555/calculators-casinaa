import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { PlusCircle, Trash2, MoveUp, MoveDown } from 'lucide-react';

interface SubnavLink {
  id: string;
  name: string;
  path: string;
  icon: string;
  order: number;
  isExternal?: boolean;
}

const iconOptions = [
  { value: 'home', label: 'Home' },
  { value: 'dice', label: 'Dice' },
  { value: 'creditCard', label: 'Credit Card' },
  { value: 'gift', label: 'Gift' },
  { value: 'book', label: 'Book' },
  { value: 'alert', label: 'Alert' },
  { value: 'users', label: 'Users' },
  { value: 'star', label: 'Star' },
  { value: 'trophy', label: 'Trophy' },
  { value: 'newspaper', label: 'Newspaper' }
];

const SubnavLinksEditor = () => {
  const [links, setLinks] = useState<SubnavLink[]>([]);
  const [newLink, setNewLink] = useState<Partial<SubnavLink>>({
    name: '',
    path: '',
    icon: 'dice',
    isExternal: false
  });

  // Load existing links on mount
  useEffect(() => {
    try {
      const storedLinks = localStorage.getItem('subnavLinks');
      if (storedLinks) {
        setLinks(JSON.parse(storedLinks));
      } else {
        // If no stored links, initialize with default links from Subnav component
        const defaultLinks = [
          { id: "1", name: "Online Casinos", path: "/online-casinos", icon: "dice", order: 1 },
          { id: "2", name: "Games", path: "/online-casinos/slots", icon: "dice", order: 2 },
          { id: "3", name: "Payments", path: "/online-casinos/payments", icon: "creditCard", order: 3 },
          { id: "4", name: "Bonuses", path: "/casino-bonuses", icon: "gift", order: 4 },
          { id: "5", name: "Guide", path: "/guide", icon: "book", order: 5 },
          { id: "6", name: "Reviews", path: "/casino-reviews", icon: "star", order: 6 },
          { id: "7", name: "Tournaments", path: "/tournaments", icon: "trophy", order: 7 }
        ];
        setLinks(defaultLinks);
        localStorage.setItem('subnavLinks', JSON.stringify(defaultLinks));
      }
    } catch (error) {
      console.error('Error loading subnav links:', error);
      toast.error('Failed to load navigation links');
    }
  }, []);

  // Save links to localStorage whenever they change
  const saveLinks = (updatedLinks: SubnavLink[]) => {
    try {
      localStorage.setItem('subnavLinks', JSON.stringify(updatedLinks));
      toast.success('Navigation links saved successfully');
    } catch (error) {
      console.error('Error saving subnav links:', error);
      toast.error('Failed to save navigation links');
    }
  };

  // Add a new link
  const handleAddLink = () => {
    if (!newLink.name || !newLink.path) {
      toast.error('Name and path are required');
      return;
    }

    const updatedLinks = [
      ...links,
      {
        id: Date.now().toString(),
        name: newLink.name,
        path: newLink.path,
        icon: newLink.icon || 'dice',
        order: links.length + 1,
        isExternal: newLink.isExternal
      } as SubnavLink
    ];

    setLinks(updatedLinks);
    saveLinks(updatedLinks);

    // Reset form
    setNewLink({
      name: '',
      path: '',
      icon: 'dice',
      isExternal: false
    });
  };

  // Remove a link
  const handleRemoveLink = (id: string) => {
    const updatedLinks = links.filter(link => link.id !== id)
      .map((link, index) => ({ ...link, order: index + 1 }));
    
    setLinks(updatedLinks);
    saveLinks(updatedLinks);
  };

  // Move link up in order
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    
    const updatedLinks = [...links];
    [updatedLinks[index - 1], updatedLinks[index]] = [updatedLinks[index], updatedLinks[index - 1]];
    
    // Update order property
    updatedLinks.forEach((link, i) => {
      link.order = i + 1;
    });
    
    setLinks(updatedLinks);
    saveLinks(updatedLinks);
  };

  // Move link down in order
  const handleMoveDown = (index: number) => {
    if (index === links.length - 1) return;
    
    const updatedLinks = [...links];
    [updatedLinks[index], updatedLinks[index + 1]] = [updatedLinks[index + 1], updatedLinks[index]];
    
    // Update order property
    updatedLinks.forEach((link, i) => {
      link.order = i + 1;
    });
    
    setLinks(updatedLinks);
    saveLinks(updatedLinks);
  };

  // Update link properties
  const handleUpdateLink = (id: string, field: string, value: string | boolean) => {
    const updatedLinks = links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    );
    
    setLinks(updatedLinks);
    saveLinks(updatedLinks);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Navigation Links</CardTitle>
        <CardDescription>
          Customize the links in the sub-navigation bar
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Existing links */}
          {links.map((link, index) => (
            <div key={link.id} className="flex flex-wrap items-center gap-3 p-3 border rounded-md">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <Label htmlFor={`name-${link.id}`}>Name</Label>
                  <Input 
                    id={`name-${link.id}`}
                    value={link.name}
                    onChange={(e) => handleUpdateLink(link.id, 'name', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`path-${link.id}`}>Path</Label>
                  <Input 
                    id={`path-${link.id}`}
                    value={link.path}
                    onChange={(e) => handleUpdateLink(link.id, 'path', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`icon-${link.id}`}>Icon</Label>
                  <Select 
                    value={link.icon} 
                    onValueChange={(value) => handleUpdateLink(link.id, 'icon', value)}
                  >
                    <SelectTrigger id={`icon-${link.id}`} className="mt-1">
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id={`external-${link.id}`}
                    checked={link.isExternal}
                    onCheckedChange={(checked) => handleUpdateLink(link.id, 'isExternal', !!checked)}
                  />
                  <Label htmlFor={`external-${link.id}`}>External</Label>
                </div>
                
                <div className="flex space-x-1">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                  >
                    <MoveUp size={16} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === links.length - 1}
                  >
                    <MoveDown size={16} />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => handleRemoveLink(link.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* Add new link */}
          <div className="border rounded-md p-4 mt-4">
            <h3 className="font-medium mb-3">Add New Link</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <div>
                <Label htmlFor="new-name">Name</Label>
                <Input 
                  id="new-name" 
                  value={newLink.name}
                  onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="new-path">Path</Label>
                <Input 
                  id="new-path" 
                  value={newLink.path}
                  onChange={(e) => setNewLink({ ...newLink, path: e.target.value })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="new-icon">Icon</Label>
                <Select 
                  value={newLink.icon} 
                  onValueChange={(value) => setNewLink({ ...newLink, icon: value })}
                >
                  <SelectTrigger id="new-icon" className="mt-1">
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="new-external"
                  checked={newLink.isExternal}
                  onCheckedChange={(checked) => setNewLink({ ...newLink, isExternal: !!checked })}
                />
                <Label htmlFor="new-external">External link</Label>
              </div>
              
              <Button onClick={handleAddLink}>
                <PlusCircle size={16} className="mr-2" />
                Add Link
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubnavLinksEditor;
