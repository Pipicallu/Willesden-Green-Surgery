import { useState } from "react";
import { Share2, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/willesdengreensurgery",
      color: "hover:text-blue-600",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/willesdengreensurgery",
      color: "hover:text-sky-500",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/willesdengreensurgery",
      color: "hover:text-pink-600",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/company/willesdengreensurgery",
      color: "hover:text-blue-700",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Social Links - appear when open */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 flex flex-col gap-3 mb-2">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-12 h-12 bg-background border rounded-full shadow-lg transition-all hover:scale-110 ${link.color}`}
              aria-label={link.name}
            >
              <link.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      )}

      {/* Main FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg transition-all hover:scale-110 ${
          isOpen ? "rotate-45" : ""
        }`}
        aria-label="Share on social media"
      >
        <Share2 className="w-6 h-6" />
      </button>
    </div>
  );
}
