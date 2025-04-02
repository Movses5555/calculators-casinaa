
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Dice1, CreditCard, Gift, BookOpen, Star, Trophy, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface SubnavLink {
  id: string;
  name: string;
  path: string;
  icon: string;
  order: number;
  isExternal?: boolean;
}

// Map icon names to Lucide icon components
const iconMap: Record<string, React.ReactNode> = {
  dice: <Dice1 size={14} />,
  creditCard: <CreditCard size={14} />,
  gift: <Gift size={14} />,
  book: <BookOpen size={14} />,
  star: <Star size={14} />,
  trophy: <Trophy size={14} />
};

// Default navigation links if none are fetched from storage
const defaultNavLinks: SubnavLink[] = [
  { id: "1", name: "Online Casinos", path: "/online-casinos", icon: "dice", order: 1 },
  { id: "2", name: "Games", path: "/online-casinos/slots", icon: "dice", order: 2 },
  { id: "3", name: "Payments", path: "/online-casinos/payments", icon: "creditCard", order: 3 },
  { id: "4", name: "Bonuses", path: "/casino-bonuses", icon: "gift", order: 4 },
  { id: "5", name: "Guide", path: "/guide", icon: "book", order: 5 },
  { id: "6", name: "Reviews", path: "/casino-reviews", icon: "star", order: 6 },
  { id: "7", name: "Tournaments", path: "/tournaments", icon: "trophy", order: 7 }
];

// Function to fetch navigation links from local storage
const fetchNavLinks = (): SubnavLink[] => {
  try {
    const storedLinks = localStorage.getItem('subnavLinks');
    if (storedLinks) {
      return JSON.parse(storedLinks);
    }
  } catch (error) {
    console.error('Error fetching subnav links:', error);
  }
  return defaultNavLinks;
};

const Subnav = () => {
  const location = useLocation();
  
  // Use React Query to fetch navigation links with caching
  const { data: navLinks = defaultNavLinks } = useQuery({
    queryKey: ['subnavLinks'],
    queryFn: fetchNavLinks,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Filter out the links we want to remove (Home, News, Forum, Complaints)
  const filteredLinks = navLinks.filter(link => 
    !["Home", "News", "Forum", "Complaints"].includes(link.name)
  );

  // Sort links by order
  const sortedLinks = [...filteredLinks].sort((a, b) => a.order - b.order);

  return (
    <div className="bg-[#1E2630] py-1 border-b border-[#2a3642]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-8">
          {sortedLinks.map((link) => (
            <LinkItem 
              key={link.id} 
              link={link}
              isActive={location.pathname === link.path} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Separate component for rendering each navigation link
const LinkItem = ({ 
  link, 
  isActive 
}: { 
  link: SubnavLink, 
  isActive: boolean 
}) => {
  const icon = iconMap[link.icon] || <Dice1 size={14} />;
  
  // For external links
  if (link.isExternal) {
    return (
      <a 
        href={link.path}
        target="_blank"
        rel="noopener noreferrer"
        className={`nav-link flex items-center gap-1 whitespace-nowrap font-medium ${
          isActive ? 'text-[#4ad481]' : 'text-gray-300 hover:text-[#4ad481]'
        } transition-colors`}
      >
        {icon}
        <span>{link.name}</span>
        <ExternalLink size={10} />
      </a>
    );
  }
  
  // For internal links
  return (
    <Link 
      to={link.path}
      className={`nav-link flex items-center gap-1 whitespace-nowrap font-medium ${
        isActive ? 'text-[#4ad481]' : 'text-gray-300 hover:text-[#4ad481]'
      } transition-colors`}
    >
      {icon}
      <span>{link.name}</span>
    </Link>
  );
};

export default Subnav;
