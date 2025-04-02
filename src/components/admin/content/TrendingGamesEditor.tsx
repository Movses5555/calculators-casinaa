
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { Pencil, Trash, PlusCircle } from "lucide-react";
import { GameItem } from "@/types/content";

// Initial data from PopularGamesSection
const initialGames: GameItem[] = [
  {
    id: 1,
    title: "DUEL AT DAWN",
    image: "/lovable-uploads/e7f96515-a1d6-48bc-85f0-6263486e671e.png",
    playerCount: 655,
    provider: "HACKSAW GAMING"
  },
  {
    id: 2,
    title: "SWEET BONANZA",
    image: "/lovable-uploads/633dc988-8bba-4c4f-ac94-6df332e7975b.png",
    playerCount: 1191,
    provider: "PRAGMATIC PLAY"
  },
  {
    id: 3,
    title: "STRENGTH OF HERCULES",
    image: "/lovable-uploads/a6f70574-f875-4f66-8d15-1e238b2bedde.png",
    playerCount: 224,
    provider: "HACKSAW GAMING"
  },
  {
    id: 4,
    title: "JOKER JAM",
    image: "/lovable-uploads/a0a3f632-5dee-434b-9f92-919b6dad0fc5.png",
    playerCount: 87,
    provider: "MASSIVE STUDIOS",
    exclusive: true
  },
  {
    id: 5,
    title: "DEAD, DEAD OR DEADER",
    image: "/lovable-uploads/39eb34bc-1bbc-4ab3-abae-d2040818fb48.png",
    playerCount: 105,
    provider: "NOLIMIT CITY"
  }
];

const TrendingGamesEditor = () => {
  const [games, setGames] = useState<GameItem[]>(initialGames);
  const [currentGame, setCurrentGame] = useState<GameItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<Partial<GameItem>>({
    title: "",
    image: "",
    playerCount: 0,
    provider: "",
    exclusive: false
  });
  
  const handleEditGame = (game: GameItem) => {
    setCurrentGame(game);
    setFormData({
      title: game.title,
      image: game.image,
      playerCount: game.playerCount,
      provider: game.provider,
      exclusive: game.exclusive || false
    });
    setIsEditing(true);
    setDialogOpen(true);
  };
  
  const handleAddNew = () => {
    setCurrentGame(null);
    setFormData({
      title: "",
      image: "",
      playerCount: 0,
      provider: "",
      exclusive: false
    });
    setIsEditing(false);
    setDialogOpen(true);
  };
  
  const handleDeleteGame = (id: number) => {
    const updatedGames = games.filter(game => game.id !== id);
    setGames(updatedGames);
    toast({
      title: "Game deleted",
      description: "The game has been removed from the trending list.",
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseInt(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      exclusive: checked
    });
  };
  
  const handleSubmit = () => {
    if (!formData.title || !formData.image || !formData.provider) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (isEditing && currentGame) {
      // Update existing game
      const updatedGames = games.map(game => 
        game.id === currentGame.id 
          ? { ...game, ...formData }
          : game
      );
      setGames(updatedGames);
      toast({
        title: "Game updated",
        description: "The game has been updated successfully."
      });
    } else {
      // Add new game
      const newGame: GameItem = {
        id: Math.max(0, ...games.map(g => g.id)) + 1,
        title: formData.title!,
        image: formData.image!,
        playerCount: formData.playerCount || 0,
        provider: formData.provider!,
        exclusive: formData.exclusive
      };
      setGames([...games, newGame]);
      toast({
        title: "Game added",
        description: "The new game has been added to the trending list."
      });
    }
    
    setDialogOpen(false);
  };
  
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle>Trending Games Editor</CardTitle>
        <CardDescription>
          Manage the trending games that appear on the homepage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of trending games shown on the homepage.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Players</TableHead>
              <TableHead>Exclusive</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {games.map((game) => (
              <TableRow key={game.id}>
                <TableCell>
                  <img 
                    src={game.image} 
                    alt={game.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{game.title}</TableCell>
                <TableCell>{game.provider}</TableCell>
                <TableCell>{game.playerCount}</TableCell>
                <TableCell>{game.exclusive ? "Yes" : "No"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditGame(game)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteGame(game.id)}
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
          Add New Game
        </Button>
      </CardFooter>
      
      {/* Game edit/add dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Game" : "Add New Game"}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? "Make changes to the selected game." 
                : "Add a new game to the trending section."
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title*
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL*
              </Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="provider" className="text-right">
                Provider*
              </Label>
              <Input
                id="provider"
                name="provider"
                value={formData.provider}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="playerCount" className="text-right">
                Player Count
              </Label>
              <Input
                id="playerCount"
                name="playerCount"
                type="number"
                value={formData.playerCount}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Exclusive
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Checkbox 
                  id="exclusive" 
                  checked={formData.exclusive || false}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="exclusive">
                  Mark as exclusive game
                </Label>
              </div>
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
              {isEditing ? "Save Changes" : "Add Game"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TrendingGamesEditor;
