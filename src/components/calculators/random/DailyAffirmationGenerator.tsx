
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, RefreshCw, Heart, Copy, CheckCircle2, BookOpen, Star, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface AffirmationCategory {
  name: string;
  affirmations: string[];
  color: string;
  icon: React.ReactNode;
}

const affirmationCategories: AffirmationCategory[] = [
  {
    name: 'Self-Love',
    color: 'pink',
    icon: <Heart className="h-5 w-5" />,
    affirmations: [
      "I am worthy of love and respect.",
      "I love myself fully, including my flaws and imperfections.",
      "I deserve all the good things that come to me.",
      "My body is healthy and full of energy.",
      "I am enough just as I am.",
      "I treat myself with kindness and respect.",
      "I am becoming the best version of myself.",
      "I am proud of who I am becoming.",
      "I am grateful for who I am and what I have.",
      "I radiate confidence, self-respect, and inner harmony.",
    ],
  },
  {
    name: 'Success',
    color: 'amber',
    icon: <Star className="h-5 w-5" />,
    affirmations: [
      "I am capable of achieving my goals.",
      "I have the power to create change.",
      "I am in charge of how I feel today.",
      "I can overcome any obstacles that come my way.",
      "I am focused and persistent.",
      "I trust my intuition and make wise decisions.",
      "I am constantly growing and evolving.",
      "Every day I am getting better and better.",
      "I possess the qualities needed to be successful.",
      "My potential to succeed is unlimited.",
    ],
  },
  {
    name: 'Abundance',
    color: 'green',
    icon: <Sparkles className="h-5 w-5" />,
    affirmations: [
      "I am open to receiving all the wealth life has to offer.",
      "Money flows to me freely and abundantly.",
      "I release all resistance to attracting money.",
      "My actions create prosperity.",
      "I am aligned with the energy of abundance.",
      "I am worthy of a prosperous life.",
      "Wealth is constantly flowing into my life.",
      "My life is full of prosperity and abundance.",
      "I attract opportunities that create more abundance.",
      "I am grateful for all the abundance in my life.",
    ],
  },
  {
    name: 'Health',
    color: 'blue',
    icon: <BookOpen className="h-5 w-5" />,
    affirmations: [
      "My body is healthy, strong, and full of energy.",
      "I make choices that nourish my body.",
      "Every cell in my body is healthy and vibrant.",
      "I honor my body by trusting its wisdom.",
      "I am grateful for my health and vitality.",
      "My body has the ability to heal itself.",
      "I choose healthy habits that serve my well-being.",
      "I am in perfect health.",
      "I am getting stronger and healthier every day.",
      "My mind is clear, focused, and at peace.",
    ],
  },
  {
    name: 'Relationships',
    color: 'purple',
    icon: <Heart className="h-5 w-5" />,
    affirmations: [
      "I attract positive and healthy relationships.",
      "I am surrounded by people who love and support me.",
      "I communicate my needs and desires clearly and confidently.",
      "I am worthy of healthy, loving relationships.",
      "I release toxic relationships with grace.",
      "I forgive others and myself for past mistakes.",
      "My relationships are meaningful and fulfilling.",
      "I am attracting my ideal partner into my life.",
      "I give and receive love freely and openly.",
      "I am grateful for all the relationships in my life.",
    ],
  },
];

const DailyAffirmationGenerator = () => {
  const [activeCategory, setActiveCategory] = useState<string>(affirmationCategories[0].name);
  const [currentAffirmation, setCurrentAffirmation] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generateRandomAffirmation();
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteAffirmations');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    // Save favorites to localStorage when they change
    localStorage.setItem('favoriteAffirmations', JSON.stringify(favorites));
  }, [favorites]);

  const generateRandomAffirmation = () => {
    const category = affirmationCategories.find(c => c.name === activeCategory);
    if (category) {
      const randomIndex = Math.floor(Math.random() * category.affirmations.length);
      setCurrentAffirmation(category.affirmations[randomIndex]);
    }
  };

  const addToFavorites = () => {
    if (currentAffirmation && !favorites.includes(currentAffirmation)) {
      setFavorites(prev => [...prev, currentAffirmation]);
      toast.success('Added to favorites!');
    } else if (favorites.includes(currentAffirmation)) {
      toast.info('This affirmation is already in your favorites');
    }
  };

  const removeFromFavorites = (affirmation: string) => {
    setFavorites(prev => prev.filter(fav => fav !== affirmation));
    toast.success('Removed from favorites');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryColor = (categoryName: string) => {
    const category = affirmationCategories.find(c => c.name === categoryName);
    return category ? category.color : 'indigo';
  };

  const getCategoryIcon = (categoryName: string) => {
    const category = affirmationCategories.find(c => c.name === categoryName);
    return category ? category.icon : <Sparkles className="h-5 w-5" />;
  };

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <Card className="border-t-4 border-t-indigo-500 shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Sparkles className="h-8 w-8 text-indigo-500" />
          </div>
          <CardTitle className="text-2xl md:text-3xl">Daily Affirmation Generator</CardTitle>
          <CardDescription>
            Generate positive affirmations to boost your mood and mindset
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="generator" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="generator">Generator</TabsTrigger>
              <TabsTrigger value="favorites">
                My Favorites ({favorites.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="generator" className="space-y-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {affirmationCategories.map((category) => (
                  <Button
                    key={category.name}
                    variant={activeCategory === category.name ? "default" : "outline"}
                    onClick={() => {
                      setActiveCategory(category.name);
                      generateRandomAffirmation();
                    }}
                    className={`${
                      activeCategory === category.name 
                        ? `bg-${category.color}-500 hover:bg-${category.color}-600` 
                        : ""
                    }`}
                  >
                    {category.icon}
                    <span className="ml-2">{category.name}</span>
                  </Button>
                ))}
              </div>
              
              <div className={`p-6 rounded-lg bg-${getCategoryColor(activeCategory)}-50 dark:bg-${getCategoryColor(activeCategory)}-900/20 border-2 border-${getCategoryColor(activeCategory)}-200 dark:border-${getCategoryColor(activeCategory)}-800 text-center min-h-[150px] flex items-center justify-center`}>
                <p className="text-2xl font-medium italic">"{currentAffirmation}"</p>
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <Button 
                  onClick={generateRandomAffirmation}
                  className={`bg-${getCategoryColor(activeCategory)}-500 hover:bg-${getCategoryColor(activeCategory)}-600`}
                >
                  <RefreshCw className="mr-2 h-5 w-5" /> Generate New
                </Button>
                <Button 
                  variant="outline" 
                  onClick={addToFavorites}
                >
                  <Heart className="mr-2 h-5 w-5" /> Add to Favorites
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => copyToClipboard(currentAffirmation)}
                >
                  {copied ? (
                    <><CheckCircle2 className="mr-2 h-5 w-5" /> Copied!</>
                  ) : (
                    <><Copy className="mr-2 h-5 w-5" /> Copy</>
                  )}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="favorites">
              {favorites.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <Heart className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>You haven't saved any affirmations yet.</p>
                  <p className="mt-2">Generate affirmations and add them to your favorites!</p>
                </div>
              ) : (
                <ScrollArea className="h-[400px] rounded-md border p-4">
                  <div className="space-y-3">
                    {favorites.map((affirmation, index) => (
                      <div 
                        key={index} 
                        className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center"
                      >
                        <p className="italic">"{affirmation}"</p>
                        <div className="flex space-x-2 ml-4">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => copyToClipboard(affirmation)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeFromFavorites(affirmation)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyAffirmationGenerator;
