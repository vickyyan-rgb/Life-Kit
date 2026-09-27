import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Google GenAI setup if key is available
  const apiKey = process.env.GEMINI_API_KEY || '';
  let aiClient: GoogleGenAI | null = null;
  if (apiKey) {
    try {
      aiClient = new GoogleGenAI({ apiKey });
    } catch (err) {
      console.warn('Failed to initialize GoogleGenAI client:', err);
    }
  }

  // Mentor chat endpoint for teens (14-21)
  app.post('/api/ask-mentor', async (req, res) => {
    const { question, userProfile, currentZone } = req.body;

    if (!question || typeof question !== 'string') {
      res.status(400).json({ error: 'Question is required' });
      return;
    }

    const userName = userProfile?.name || 'Explorer';
    const userAge = userProfile?.age || 18;
    const userLocation = `${userProfile?.city || ''}, ${userProfile?.country || ''}`.trim() || 'Global';

    if (aiClient && apiKey) {
      try {
        const prompt = `You are "Sage Spark", a warm, wise, energetic, and practical life mentor in "TerraNova: Life Skills Sandbox", an interactive learning realm for teens and young adults aged 14-21.
The user asking you this is named "${userName}", age ${userAge}, living in "${userLocation}".
Current map territory/topic they are exploring: "${currentZone || 'World Hub'}".

User Question: "${question}"

Guidelines:
- Explain things in clear, approachable language suited for a ${userAge}-year-old.
- No patronizing, no dry legal jargon without plain-English translation.
- Break down real-world practical steps (e.g. what form to file, what to say to a landlord, how credit interest compounds, what an emergency fund looks like).
- Keep response concise, friendly, and structured with bullet points or 2-3 short readable paragraphs.
- Offer 1 quick practical "Pro-Tip" at the end.`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        const reply = response.text || 'I am here to help you navigate adulting! Could you tell me more about what you need?';
        res.json({ reply });
        return;
      } catch (error) {
        console.error('Gemini API call error:', error);
        // Fall through to smart fallback
      }
    }

    // Smart contextual fallback response if AI key is missing or errored
    const qLower = question.toLowerCase();
    let fallbackReply = `Hey ${userName}! Great question. `;

    if (qLower.includes('tax') || qLower.includes('w-2') || qLower.includes('1099') || qLower.includes('refund')) {
      fallbackReply += `When it comes to taxes: If you make under the standard deduction (around $14,600 for singles in recent tax years), you might not owe federal income tax, but if taxes were withheld on your W-2 paycheck, you must file a return to get your refund money back! Pro-Tip: Never pay $100+ for commercial software; use IRS Free File or Direct File if you make under the income limit.`;
    } else if (qLower.includes('credit') || qLower.includes('score') || qLower.includes('apr')) {
      fallbackReply += `Credit cards are loans, not free money! The golden rule of credit: Always pay the 'Statement Balance' in full before the due date. That way you pay ZERO interest (0% APR effect). Keep your credit utilization below 30% (ideally below 10%) of your credit limit to build a 720+ credit score rapidly.`;
    } else if (qLower.includes('rent') || qLower.includes('lease') || qLower.includes('deposit') || qLower.includes('landlord')) {
      fallbackReply += `When renting your first place: Always take date-stamped photos and videos of the ENTIRE apartment the minute you get the keys before moving a single box in! Landlords cannot legally deduct 'normal wear and tear' (like slight scuffs or faded paint) from your security deposit. Always keep email proof of repair requests.`;
    } else if (qLower.includes('budget') || qLower.includes('saving') || qLower.includes('bank') || qLower.includes('hysa')) {
      fallbackReply += `The 50/30/20 rule is your best friend: 50% for Needs (rent, food, transit), 30% for Wants (games, dining out, hobbies), and 20% for Savings & Debt repayment. Put your emergency fund into a High-Yield Savings Account (HYSA) paying 4-5% APY instead of standard big banks paying 0.01%!`;
    } else if (qLower.includes('job') || qLower.includes('paycheck') || qLower.includes('interview') || qLower.includes('gross') || qLower.includes('net')) {
      fallbackReply += `Understanding your paycheck: 'Gross Pay' is what you earned on paper (e.g. $20/hr × 20 hrs = $400). 'Net Pay' is what actually hits your bank account after Social Security (FICA 6.2%), Medicare (1.45%), and Federal/State withholding. Usually about 15-22% is deducted.`;
    } else if (qLower.includes('insurance') || qLower.includes('deductible') || qLower.includes('copay')) {
      fallbackReply += `Health insurance cheat-sheet: 'Premium' is what you pay every month to have insurance. 'Copay' is a flat fee at the doctor (e.g. $25 for a checkup). 'Deductible' is what you pay out of pocket before the insurance company pays the rest!`;
    } else {
      fallbackReply += `Navigating life skills is a journey of small daily discoveries. Always inspect the fine print, ask questions before signing contracts, and keep digital copies of every important receipt and document. You've got this!`;
    }

    res.json({ reply: fallbackReply });
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // In development, hook up Vite dev server middlewares
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve dist files
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TerraNova server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
