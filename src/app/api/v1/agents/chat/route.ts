import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

const model = google('gemini-2.0-flash')

export async function POST(request: Request) {
  try {
    const { agent, userMessage, context } = await request.json()

    if (!agent || !userMessage) {
      return new Response(
        JSON.stringify({ error: 'Agent and message required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const systemPrompt = `You are a specialized AI agent for "Who Knows" - an exclusive dark luxury streetwear brand.

Brand Context:
- Aesthetic: Mystery, vintage-washed black, bone-tan cracked prints
- Target: 18-35 urban early-adopters, TikTok-native, mystery-seekers
- Products: Oversized hoodies (€129), sweatpants (€109), crewnecks (€99), tees (€79), shorts (€69)
- Strategy: Limited drops, DTC-first, community-driven, UGC-powered
- Market Position: Niche luxury streetwear, direct competitor to Fear of God/Yeezy

Agent Role: ${agent}
${context?.description ? `Description: ${context.description}` : ''}
${context?.context ? `Context: ${context.context}` : ''}
${context?.command ? `Default Command: ${context.command}` : ''}

Respond conversationally and provide actionable insights tailored to this agent's specialty. Be concise but thorough.`

    const { text } = await generateText({
      model,
      system: systemPrompt,
      prompt: userMessage,
      temperature: 0.7,
    })

    return new Response(text, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('[v0] Agent chat error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process agent request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
