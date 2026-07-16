import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Parse json payload
app.use(express.json());

// Lazy-initialize GoogleGenAI client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GCP_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is not defined. AI Assistant will operate in simulation mode.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// System instructions for AI twin
const RESUME_PROMPT = `
You are the interactive AI Twin & Professional Advisor of Landry. Your goal is to represent him to hiring managers, technical recruiters, and other developers visiting his portfolio.
Speak in a professional, composed, confident, and highly competent manner. Avoid overly promotional fluff, "AI slang" (e.g. "delve", "testament to", "beacon of"), or emojis. Keep answers concise, highly structured, and technical.

Key Facts about Landry:
- Title: Junior Full-Stack Developer & Systems Architect
- Experience: 2 years of experience designing and implementing high-throughput web applications and scalable systems.
- Style / Personality: Sharp, technical, clean-cut, data-driven, engineering-first, professional, masculine.
- Education: Computer Science and software engineering at ENI Fianarantsoa.
- Core Specialties: Full-stack responsive React applications, serverless microservice architectures, and robust system performance optimization.
- Core Technologies:
  - Frontend: TypeScript, React 19, Next.js, Tailwind CSS, Framer Motion
  - Backend: Node.js, Spring boot, Express js
  - Databases: PostgreSQL, Mysql, Oracle
  - Cloud / DevOps: ""
- Projects Highlights:
  1. SaaS Enterprise Dashboard (Atlas Financial): High-throughput reactive financial portal processing up to 10k messages per second. Features modern visual node representations and full TypeScript security.
  2. Cloud Topology Explorer (Apex Mesh): A rich React graph renderer for Kubernetes namespaces showing inter-dependency and traffic flows. Built using Cytoscape.js and Go.
  3. Synapse Telemetry Broker (IoT scale): High-performance distributed system routing up to 50k messages/sec, utilizing Apache Kafka & PostgreSQL with high data density.

Guidelines for Chatting:
- Answer technical questions about Landry's skills, experience, or project details accurately based on the facts above.
- If asked about compensation, tell them to get in touch via the Contact section or email landrysitrak@gmail.com.
- If asked about hypothetical complex tasks (e.g., "Could Landry build an AI scraper with Redis caching?"), answer enthusiastically yet realistically, outlining Landry's technical strategy using Redis queues, Go concurrency, and node workers.
- Always refer to yourself as "Landry's AI Assistant" or "Landry's Career Advisor" and address Landry in the third-person or respond as his dedicated agent.
`;

// API Career Assistant Route
app.post("/api/career-assistant", async (req: any, res: any) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages payload. Expected an array." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return a professional offline demo response if GEMINI_API_KEY is not configured yet
      const lastMessage = messages[messages.length - 1]?.text || "";
      const text = generateMockResponse(lastMessage);
      return res.json({ text });
    }

    const ai = getGeminiClient();

    // Map the sender models to correct prompt format
    const contents = messages.map((m: any) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    // Utilizing gemini-3-flash-preview for advanced reasoning and low-latency interaction
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: RESUME_PROMPT,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text || "I was unable to formulate a response. Please email me at landrysitrak@gmail.com directly." });
  } catch (error: any) {
    console.error("Gemini Assistant Error:", error);
    res.status(500).json({ error: "Internal Server Error in Gemini advisor engine" });
  }
});

// Mock reply fallback for local demo when the API key is not yet typed
function generateMockResponse(prompt: string): string {
  const query = prompt.toLowerCase();
  if (query.includes("skill") || query.includes("tech") || query.includes("language")) {
    return "Landry specializes in TypeScript, React, Node.js, Go, PostgreSQL, Redis, Kubernetes, and Google Cloud Platform. He is highly proficient in architectural scalability.";
  }
  if (query.includes("contact") || query.includes("hire") || query.includes("email")) {
    return "You can contact Landry directly by submitting the form on the Contact section or emailing him at landrysitrak@gmail.com.";
  }
  if (query.includes("project") || query.includes("work")) {
    return "Landry's portfolio features three flagship projects: the SaaS Enterprise Financial Dashboard, the Apex Mesh Cloud Topology Explorer, and the Synapse Telemetry Broker. Let me know if you want deep details on any of these.";
  }
  return "Hello! I am Landry's AI career advisor. Ask me anything about his engineering experience, technical stack, or projects. (Since no GEMINI_API_KEY is currently provided in early preview, I am running on fallback mode!)";
}

// Hook up Vite Dev Server Middleware or serve static built files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: any, res: any) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express full-stack backend running on port ${PORT}`);
  });
}

startServer();