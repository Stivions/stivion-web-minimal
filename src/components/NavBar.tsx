
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface NavBarProps {
  channelName: string;
  subscriberCount: string;
}

const NavBar: React.FC<NavBarProps> = ({ channelName, subscriberCount }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "nav-bg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className={cn(
            "font-medium tracking-tight transition-all duration-300",
            scrolled ? "text-base" : "text-lg",
          )}>
            {channelName}
          </h1>
          <span className="text-xs text-muted-foreground px-2 py-0.5 bg-secondary rounded-full">
            {subscriberCount} suscriptores
          </span>
        </div>
        
        <nav>
          <ul className="flex items-center space-x-8">
            <li>
              <a 
                href="#videos" 
                className="text-sm hover:text-black transition-colors duration-200"
              >
                Videos
              </a>
            </li>
            <li>
              <a 
                href="https://www.youtube.com/@Stiviion" 
                target="_blank"
                rel="noopener noreferrer" 
                className="text-sm hover:text-black transition-colors duration-200"
              >
                Canal
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
