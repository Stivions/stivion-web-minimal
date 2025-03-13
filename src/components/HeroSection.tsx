
import React from 'react';

interface HeroSectionProps {
  channelTitle: string;
  description: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ channelTitle, description }) => {
  return (
    <section className="pt-32 pb-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary rounded-full mb-6 animate-fade-in">
          Canal de YouTube
        </span>
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 animate-fade-up">
          {channelTitle}
        </h1>
        <p className="text-lg text-muted-foreground mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {description}
        </p>
        <div className="flex justify-center space-x-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <a
            href="https://www.youtube.com/@Stiviion"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover-scale"
          >
            Visitar canal
          </a>
          <a
            href="#videos"
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover-scale"
          >
            Ver videos
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
