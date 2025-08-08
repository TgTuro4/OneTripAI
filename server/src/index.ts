import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { OpenAI } from 'openai';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Validate required environment variables
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is required');
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Types
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Chat endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages }: { messages: ChatMessage[] } = req.body;

    // Validate request
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Valid messages array is required' });
    }

    // System prompt for travel planning
    const systemPrompt: ChatMessage = {
      role: 'system',
      content: 'You are a world-class travel planner. Your goal is to help the user create a detailed itinerary. Be friendly, knowledgeable, and ask clarifying questions to understand their needs. Provide suggestions for destinations, activities, and accommodations. Format the itinerary clearly with specific recommendations.'
    };

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemPrompt, ...messages],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error('No response from OpenAI');
    }

    res.json({ reply: aiResponse });

  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to get response from AI',
      details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    });
  }
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📊 Health check available at http://localhost:${port}/health`);
});