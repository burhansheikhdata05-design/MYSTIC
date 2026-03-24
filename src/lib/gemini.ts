import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getFlavorRecommendation(answers: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on these personality traits: "${answers}", recommend one of our three Mystic Soda flavors: 
      1. Original Mystic (Cherry, Spice, Mystery)
      2. Electric Citrus (Lime, Ginger, Zest)
      3. Midnight Vanilla (Creamy, Bold, Dark). 
      Provide a fun, Gen-Z style explanation.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            flavor: { type: Type.STRING },
            reason: { type: Type.STRING },
            vibe: { type: Type.STRING }
          },
          required: ["flavor", "reason", "vibe"]
        }
      }
    });
    
    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Error:", error);
    return {
      flavor: "Original Mystic",
      reason: "You're a classic with a twist. You appreciate the mystery of life.",
      vibe: "Classic Rebel"
    };
  }
}
