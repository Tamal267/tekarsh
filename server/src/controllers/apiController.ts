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

const reqirements = `# Senior React Developer

## About the Role

We're looking for a talented Senior React Developer to join our growing team. In this role, you'll be responsible for building and maintaining high-quality web applications using React and modern frontend technologies.

## Responsibilities

- Design and implement new features and functionality for our web applications
- Write clean, maintainable, and efficient code
- Collaborate with cross-functional teams to define, design, and ship new features
- Identify and address performance bottlenecks and bugs
- Participate in code reviews and mentor junior developers
- Stay up-to-date with emerging trends and technologies in frontend development

## Requirements

- 5+ years of experience in frontend development
- 3+ years of experience with React.js and its ecosystem
- Strong proficiency in JavaScript, HTML, and CSS
- Experience with state management libraries (Redux, MobX, etc.)
- Familiarity with modern frontend build pipelines and tools
- Experience with responsive design and cross-browser compatibility
- Strong problem-solving skills and attention to detail
- Excellent communication and collaboration skills

## Nice to Have

- Experience with TypeScript
- Knowledge of server-side rendering with Next.js
- Experience with testing frameworks (Jest, React Testing Library)
- Understanding of CI/CD pipelines
- Experience with GraphQL
- Contributions to open-source projects

## Benefits

- Competitive salary and equity package
- Flexible remote work policy
- Health, dental, and vision insurance
- 401(k) matching
- Professional development budget
- Home office stipend
- Unlimited PTO
- Regular team retreats

We are an equal opportunity employer and value diversity at our company. We do not discriminate on the basis of race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or disability status.
    `

export const cvAnalyzer = async (c: any) => {
  try {
    const { pdfUrl, details } = await c.req.json() // Get JSON body
    console.log('url:', pdfUrl) // Log the URL for debugging

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

    console.log(`Fetching PDF from URL: ${pdfUrl}`) // Log the URL being fetched

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

    console.log('first 500 characters of PDF text:', cvText.slice(0, 500)) // Log first 500 characters for debugging

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
    console.log('Job Details:', details) // Log job details for debugging

    // --- Send to Gemini API ---
    const prompt = `Analyze the following CV content based on full details of the job and extract the following information in JSON format (only the JSON, no additional text):
    - "Full Name"
    - "Email"
    - "Phone Number"
    - "Key Skills" (a list of key skills (e.g., Python, JavaScript, AWS))
    - "Professional Experience" (a description)
    - "Highest Education" (Degree and Institution)
    - "Overall Suitability" (for the job based on the provided requirements)
    - "Strengths" (array of strings) and Weaknesses (array of strings) related to the job requirements
    - "Areas for Improvement" (array of strings)
    - "AI Confidence Score" (0-100) for the analysis
    - "AI Recommendation" (e.g., "Strong candidate", "Needs improvement in skills", "Not suitable for this role") with explanation

    Job Details:
    ${details}

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
