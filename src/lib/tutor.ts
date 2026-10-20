import { createServerFn } from "@tanstack/react-start";

export type ChatTurn = { role: "user" | "assistant"; content: string };

const SYSTEM_CHAT = `You are Folio, a precise academic tutor inside a study tracker.
Help with explanations, worked examples, study plans, and exam prep.
Be concise and structured. Use short headings and bullets. No fluff, no emojis.
If the student pastes notes, tighten them. If they ask to be quizzed, ask one question at a time and wait.
When giving a study plan, tie it to finite blocks (25–50 min) and named resources.`;

const SYSTEM_CARDS = `You generate study flashcards. Reply with JSON only, no markdown:
{"cards":[{"front":"...","back":"..."}]}
5 to 8 cards. Front is a question or prompt; back is a complete, exam-ready answer.
No emoji. Academic tone.`;

export const askTutor = createServerFn({ method: "POST" })
  .validator((d: { messages: ChatTurn[]; mode: "chat" | "cards" }) => d)
  .handler(async ({ data }) => {
    const { assertSameSiteRequest } = await import("./auth/isolation.server");
    assertSameSiteRequest();

    if (!data || !Array.isArray(data.messages) || (data.mode !== "chat" && data.mode !== "cards")) {
      return { ok: false as const, error: "Invalid request payload." };
    }

    const apiKey = process.env.XAI_API_KEY;
    const trimmed = data.messages
      .slice(-10)
      .filter(
        (m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string",
      )
      .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));
    const lastUser = [...trimmed].reverse().find((m) => m.role === "user")?.content ?? "";

    if (!apiKey) {
      if (data.mode === "cards") {
        const topic = lastUser.trim() || "Core Concepts";
        const cards = [
          {
            front: `What are the core fundamentals of ${topic}?`,
            back: `The fundamentals of ${topic} involve understanding key definitions, operational principles, and practical problem-solving applications.`,
          },
          {
            front: `How do you analyze problems related to ${topic}?`,
            back: `Break down the problem into smaller sub-components, identify known constraints, and apply standard formulas or algorithmic patterns step-by-step.`,
          },
          {
            front: `What is a common edge case or misconception in ${topic}?`,
            back: `A common pitfall is neglecting boundary conditions or assuming ideal conditions without verifying input assumptions.`,
          },
          {
            front: `What is the optimal study strategy for ${topic}?`,
            back: `Use active recall, practice worked examples without looking at solutions, and test yourself with timed practice problems.`,
          },
          {
            front: `How is ${topic} evaluated on exams?`,
            back: `Exams typically test conceptual definitions, multi-step problem solving, and short proof or derivation questions under time constraints.`,
          },
        ];
        return { ok: true as const, text: JSON.stringify({ cards }) };
      }

      const topic = lastUser.trim() || "your topic";
      const reply = `### Folio Tutor Guide: ${topic}\n\nHere is a structured breakdown to master this subject:\n\n1. **Core Concept Overview**\n   - Review the primary definitions and foundational theorems.\n   - Ensure you can state the main results in your own words.\n\n2. **Actionable Study Plan**\n   - **Block 1 (25m):** Read notes & derive key formulas from scratch.\n   - **Block 2 (25m):** Solve 2–3 practice problems under exam conditions.\n   - **Block 3 (25m):** Review mistakes and generate targeted flashcards.\n\n3. **Quick Quiz Question**\n   - What is the most important theorem or rule governing ${topic}?\n\n*(Note: Configure XAI_API_KEY to connect live Grok 4.5 model reasoning)*`;
      return { ok: true as const, text: reply };
    }

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: data.mode === "cards" ? 0.3 : 0.4,
        max_tokens: data.mode === "cards" ? 900 : 700,
        messages: [
          { role: "system", content: data.mode === "cards" ? SYSTEM_CARDS : SYSTEM_CHAT },
          ...trimmed,
        ],
      }),
    });

    if (!res.ok) {
      return { ok: false as const, error: `Tutor request failed (${res.status}).` };
    }

    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return { ok: false as const, error: "The tutor returned an empty reply." };
    return { ok: true as const, text };
  });

export function parseCardsJson(text: string): { front: string; back: string }[] {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) return [];
  try {
    const parsed = JSON.parse(text.slice(start, end + 1)) as {
      cards?: { front?: string; back?: string }[];
    };
    return (parsed.cards ?? [])
      .map((c) => ({ front: (c.front ?? "").trim(), back: (c.back ?? "").trim() }))
      .filter((c) => c.front && c.back)
      .slice(0, 12);
  } catch {
    return [];
  }
}
