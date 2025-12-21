import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { topic, imageUrls } = req.body;

    if (!topic || typeof topic !== "string") {
      return res.status(400).json({ success: false, message: "Missing or invalid topic" });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ success: false, message: "Server misconfiguration: Missing OPENROUTER_API_KEY" });
    }

    // Build the prompt with image URLs if provided
    let prompt = `Create a blog post in TSX format about: "${topic}". THERE SHOULD BE NO COMMENTS IN THE CODE. DO NOT CHANGE THE BACKGROUND COLOR OR THE TEXT COLOR. YOU CAN PUT IMAGES OFF TO THE SIDE OF TEXT OR BELOW A SECTION OF TEXT. THIS SHOULD BE TAILORED FOR A HIGH CLASS PHOTOGRAPHY BUSINESS CALLED MAGIC HOUR PORTRAITS AND THE AUTHOR WILL BE ROBERT BONSALL.`;
    if (imageUrls && imageUrls.length > 0) {
      prompt += `Use these images: ${imageUrls.join(", ")}. `;
    }
    prompt += `Generate only the TSX code wrapped in a div. Use <img> tags (not Image components). Do not include return() or function wrappers, just the TSX content. Make it engaging and well-structured.`;

    const siteUrl = "https://magichourportraits.com";
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": siteUrl,
        "X-Title": "Magic Hour Blog Generator",
      },
      body: JSON.stringify({
        model: "xiaomi/mimo-v2-flash:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ 
        success: false, 
        message: "Failed to generate content",
        error: errorText 
      });
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return res.status(500).json({ 
        success: false, 
        message: "Invalid response from AI service" 
      });
    }

    let generatedContent = data.choices[0].message.content;

    // Clean up the content - remove markdown code blocks if present
    generatedContent = generatedContent
      .replace(/^```tsx?\n?/g, "")
      .replace(/^```html\n?/g, "")
      .replace(/^```\n?/g, "")
      .replace(/```$/g, "")
      .trim();

    return res.status(200).json({ 
      success: true, 
      content: generatedContent 
    });
  } catch (err) {
    return res.status(500).json({ 
      success: false, 
      message: "Failed to generate blog content",
      error: err instanceof Error ? err.message : "Unknown error"
    });
  }
}

