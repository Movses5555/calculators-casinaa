
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Hash, Type, Copy, CheckCircle2, Trash2 } from 'lucide-react';

interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
}

const TextCharacterCounter = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState<TextStats>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    analyzeText(text);
  }, [text]);

  const analyzeText = (inputText: string) => {
    // Characters (with spaces)
    const characters = inputText.length;
    
    // Characters (without spaces)
    const charactersNoSpaces = inputText.replace(/\s/g, '').length;
    
    // Words
    const words = inputText.trim() === '' 
      ? 0 
      : inputText.trim().split(/\s+/).length;
    
    // Sentences (basic approximation)
    const sentences = inputText === '' 
      ? 0 
      : inputText.split(/[.!?]+/).filter(Boolean).length;
    
    // Paragraphs
    const paragraphs = inputText === '' 
      ? 0 
      : inputText.split(/\n+/).filter(p => p.trim().length > 0).length;
    
    // Lines
    const lines = inputText === '' ? 0 : inputText.split('\n').length;
    
    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleClear = () => {
    setText('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getKeyMetric = (tab: string) => {
    switch (tab) {
      case 'characters':
        return stats.characters;
      case 'words':
        return stats.words;
      case 'sentences':
        return stats.sentences;
      default:
        return stats.characters;
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <Card className="border-t-4 border-t-indigo-500 shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Hash className="h-8 w-8 text-indigo-500" />
          </div>
          <CardTitle className="text-2xl md:text-3xl">Text Character Counter</CardTitle>
          <CardDescription>
            Count characters, words, sentences and more in your text
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="characters" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="characters">Characters</TabsTrigger>
              <TabsTrigger value="words">Words</TabsTrigger>
              <TabsTrigger value="sentences">Sentences</TabsTrigger>
            </TabsList>
            
            {['characters', 'words', 'sentences'].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-6">
                <div className="text-5xl md:text-7xl font-bold text-center text-indigo-500 py-4">
                  {getKeyMetric(tab).toLocaleString()}
                </div>
                
                <div className="space-y-4">
                  <Textarea
                    placeholder="Enter or paste your text here..."
                    className="min-h-[200px] text-base"
                    value={text}
                    onChange={handleTextChange}
                  />
                  
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      variant="outline" 
                      onClick={handleClear}
                      className="flex-1"
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Clear
                    </Button>
                    <Button 
                      onClick={handleCopy} 
                      className="flex-1 bg-indigo-500 hover:bg-indigo-600"
                    >
                      {copied ? (
                        <><CheckCircle2 className="mr-2 h-4 w-4" /> Copied!</>
                      ) : (
                        <><Copy className="mr-2 h-4 w-4" /> Copy Text</>
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Characters</div>
                    <div className="text-xl font-semibold">{stats.characters.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Without Spaces</div>
                    <div className="text-xl font-semibold">{stats.charactersNoSpaces.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Words</div>
                    <div className="text-xl font-semibold">{stats.words.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Sentences</div>
                    <div className="text-xl font-semibold">{stats.sentences.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Paragraphs</div>
                    <div className="text-xl font-semibold">{stats.paragraphs.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Lines</div>
                    <div className="text-xl font-semibold">{stats.lines.toLocaleString()}</div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TextCharacterCounter;
