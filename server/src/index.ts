import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import { OpenAI } from 'openai';

const app = express();
const port = 3001;

if (!process.env.OPENAI_API_KEY) {
  throw new Error("The OPENAI_API_KEY environment variable is missing or empty.");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

app.post('/api/chat', async (req: Request, res: Response) => {
  const { messages }: { messages: ChatMessage[] } = req.body;

  if (!messages) {
    return res.status(400).json({ error: 'Messages are required' });
  }

  const systemPrompt: ChatMessage = {
    role: 'system',
    content: 'You are a world-class travel planner. Your goal is to help the user create a detailed itinerary. Be friendly, knowledgeable, and ask clarifying questions to understand their needs. Provide suggestions for destinations, activities, and accommodations. Format the itinerary clearly.'
  };

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemPrompt, ...messages],
    });

    const aiResponse = completion.choices[0].message.content;
    res.json({ reply: aiResponse });

  } catch (error) {
    console.error('Error calling OpenAI:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});