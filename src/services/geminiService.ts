import { GoogleGenAI } from "@google/genai";
import { Occasion, OccasionLabels } from "../../types.ts";

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateFunnyWish = async (
  sender: string,
  recipient: string,
  occasion: Occasion,
  years?: number
): Promise<string> => {
  if (!ai) {
    return `Happy ${OccasionLabels[occasion]} ${recipient}! Make it epic! - ${sender}`;
  }
  try {
    const prompt = `Write a hilarious, short, viral-style, slightly chaotic or roasting wish for a ${OccasionLabels[occasion]} from ${sender} to ${recipient}. 
    ${years ? `It has been ${years} years.` : ''}
    Keep it under 35 words. Use slang, funny emojis, and be high energy. 
    If it's retirement, make a joke about sleeping.
    If it's a wedding/love anniversary, be cute but funny about tolerating each other.
    If it's a birthday, make a joke about aging.
    RETURN ONLY THE TEXT.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || `Happy ${OccasionLabels[occasion]}! (AI took a nap, but I didn't!)`;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Happy ${OccasionLabels[occasion]} ${recipient}! Let's party! - ${sender}`;
  }
};