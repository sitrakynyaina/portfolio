export interface Skill {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Cloud & DevOps" | "Systems & DB";
  level: number; // 0 to 10 scale for custom meter displays
  icon: string; // Lucide icon name
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  category: "Full-Stack" | "Frontend" | "Cloud & Security";
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  stats?: { label: string; value: string }[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}
