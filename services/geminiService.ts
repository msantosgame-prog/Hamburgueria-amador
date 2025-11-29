import { GoogleGenAI, ChatSession, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let chatSession: ChatSession | null = null;

export const initializeChat = (): ChatSession => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Using gemini-2.5-flash for fast, responsive chat
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const session = initializeChat();
    const result: GenerateContentResponse = await session.sendMessage({ message });
    return result.text || "Desculpe, não consegui entender. Pode repetir?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ops! Tive um problema técnico na cozinha do meu cérebro. Tente novamente em instantes.";
  }
};
