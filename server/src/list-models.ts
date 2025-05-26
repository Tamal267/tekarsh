import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) {
  console.error('Error: GOOGLE_API_KEY environment variable not set.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

export async function listModels() {
  try {
    const { models } = await genAI.listModels();

    console.log("Available Gemini Models and their capabilities:");
    for (const model of models) {
      console.log(`- Model Name: ${model.name}`);
      console.log(`  Description: ${model.description}`);
      console.log(`  Supported Methods: ${model.supportedGenerationMethods?.join(', ')}`);
      console.log(`  Input Token Limit: ${model.inputTokenLimit}`);
      console.log(`  Output Token Limit: ${model.outputTokenLimit}`);
      console.log('---');
    }
  } catch (error) {
    console.error('Error listing models:', error);
  }
}

listModels();