import { GoogleGenerativeAI } from '@google/generative-ai'
import fetch from 'node-fetch'
import pdfParse from 'pdf-parse'

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

if (!GOOGLE_API_KEY) {
  console.error('Error: GOOGLE_API_KEY environment variable not set.')
  process.exit(1) // Exit if API key is missing
}

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY)
// Choose your Gemini model. 'gemini-pro' is good for text, 'gemini-1.5-flash' for higher token limits/multimodality.
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export const cvAnalyzer = async (c: any) => {
  try {
    const { pdfUrl } = await c.req.json() // Get JSON body

    if (!pdfUrl) {
      return c.json({ message: 'No PDF URL provided.' }, 400)
    }

    if (!pdfUrl.endsWith('.pdf')) {
      return c.json(
        { message: 'The provided URL does not seem to be a PDF file.' },
        400,
      )
    }

    // --- Fetch PDF Content from URL ---
    const response = await fetch(pdfUrl)

    if (!response.ok) {
      return c.json(
        {
          message: `Failed to download PDF from URL: ${response.statusText}`,
          url: pdfUrl,
        },
        response.status,
      )
    }

    const arrayBuffer = await response.arrayBuffer()
    const dataBuffer = Buffer.from(arrayBuffer) // Convert ArrayBuffer to Node.js Buffer

    // --- Extract Text from PDF ---
    let cvText = ''
    try {
      const pdfData = await pdfParse(dataBuffer)
      cvText = pdfData.text
    } catch (pdfParseError) {
      console.error('PDF parsing error:', pdfParseError)
      return c.json(
        {
          message:
            'Could not extract text from the PDF. It might be an image-based PDF or corrupted.',
        },
        400,
      )
    }

    if (!cvText.trim()) {
      // Check if extracted text is empty or just whitespace
      return c.json(
        {
          message:
            'No readable text found in the PDF. It might be an image-only PDF.',
        },
        400,
      )
    }

    console.log('Extracted CV Text:', cvText.slice(0, 500)) // Log first 500 characters for debugging

    // --- Send to Gemini API ---
    const prompt = `Analyze the following CV content and extract the following information in JSON format (only the JSON, no additional text):
    - Full Name
    - Email
    - Phone Number
    - A list of key skills (e.g., Python, JavaScript, AWS)
    - A summary of their professional experience (e.g., "5 years of experience in software development with expertise in...", or list of companies and roles)
    - Highest Education (Degree and Institution)

    CV Content:
    ${cvText}
    `

    const result = await model.generateContent(prompt)
    const apiResponse = await result.response
    let generatedText = apiResponse.text()
    // Remove markdown fences by cutting off the first and last three characters if present
    generatedText = generatedText.trim()
    if (generatedText.startsWith('```json')) {
      generatedText = generatedText.slice(7).trim() // Remove '```json' prefix
    }
    if (generatedText.endsWith('```')) {
      generatedText = generatedText.slice(0, -3)
    }
    generatedText = generatedText.trim()

    // Try to parse the JSON output from Gemini
    let parsedAnalysis: any // Use 'any' for now as the exact structure is dynamic
    try {
      parsedAnalysis = JSON.parse(generatedText)
    } catch (jsonError) {
      console.error('Failed to parse JSON from Gemini:', jsonError)
      console.error('Gemini raw response:', generatedText)
      // If Gemini didn't return valid JSON, return the raw text or an error
      return c.json(
        {
          message:
            'Failed to parse CV analysis from AI. Raw response provided.',
          rawAnalysis: generatedText,
        },
        500,
      )
    }

    // Return the analysis
    return c.json({ success: true, analysis: parsedAnalysis })
  } catch (error: any) {
    // Catch any unexpected errors
    console.error('API Error:', error)
    return c.json(
      { message: 'Internal Server Error', error: error.message },
      500,
    )
  }
}
