import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { getAgentCommand } from '@/lib/agents/commands';

const model = google('gemini-2.0-flash');

async function executeAgent(agentName: string, command: string, context: string) {
  const systemPrompt = `You are a specialized AI agent for "Who Knows" - an exclusive dark luxury streetwear brand (OVERSIZE, EST 2024).

Brand Context:
- Aesthetic: Mystery, vintage-washed black, bone-tan cracked prints
- Target: 18-35 urban early-adopters, TikTok-native, mystery-seekers
- Products: Oversized hoodies (€129), sweatpants (€109), crewnecks (€99), tees (€79), shorts (€69)
- Strategy: Limited drops, DTC-first, community-driven, UGC-powered
- Market Position: Niche luxury streetwear, direct competitor response to Fear of God/Yeezy

Task Context: ${context}

Your command: ${command}

Provide actionable, brand-aligned insights in clear, structured format.`;

  try {
    const result = await generateText({
      model,
      prompt: systemPrompt,
      temperature: 0.7,
    });

    return {
      success: true,
      data: {
        agent: agentName,
        result: result.text,
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error(`[v0] Agent ${agentName} error:`, error);
    return {
      success: false,
      error: `Failed to execute ${agentName}`,
    };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { agent, command, context } = body;

    if (!agent) {
      return Response.json(
        { success: false, error: 'Agent name required' },
        { status: 400 }
      );
    }

    // Get command from registry if not provided
    const agentCommand = command || getAgentCommand(agent)?.command;
    const agentContext = context || getAgentCommand(agent)?.context || 'Who Knows brand analysis';

    if (!agentCommand) {
      return Response.json(
        { success: false, error: `No command found for agent: ${agent}` },
        { status: 400 }
      );
    }

    const result = await executeAgent(agent, agentCommand, agentContext);

    return Response.json(result);
  } catch (error) {
    console.error('[v0] Agent execution error:', error);
    return Response.json(
      { success: false, error: 'Agent execution failed' },
      { status: 500 }
    );
  }
}
