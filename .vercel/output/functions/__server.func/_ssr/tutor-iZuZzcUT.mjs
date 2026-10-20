import { n as createServerFn, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tutor-iZuZzcUT.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var SYSTEM_CHAT = `You are Folio, a precise academic tutor inside a study tracker.
Help with explanations, worked examples, study plans, and exam prep.
Be concise and structured. Use short headings and bullets. No fluff, no emojis.
If the student pastes notes, tighten them. If they ask to be quizzed, ask one question at a time and wait.
When giving a study plan, tie it to finite blocks (25–50 min) and named resources.`;
var SYSTEM_CARDS = `You generate study flashcards. Reply with JSON only, no markdown:
{"cards":[{"front":"...","back":"..."}]}
5 to 8 cards. Front is a question or prompt; back is a complete, exam-ready answer.
No emoji. Academic tone.`;
var askTutor_createServerFn_handler = createServerRpc({
	id: "e4b298ada733254d7dc14aac47b9f6d9ecc8198d39cd13d11e0d91f3eeec50d8",
	name: "askTutor",
	filename: "src/lib/tutor.ts"
}, (opts) => askTutor.__executeServer(opts));
var askTutor = createServerFn({ method: "POST" }).validator((d) => d).handler(askTutor_createServerFn_handler, async ({ data }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-ZQG4KQcM.mjs");
	assertSameSiteRequest();
	if (!data || !Array.isArray(data.messages) || data.mode !== "chat" && data.mode !== "cards") return {
		ok: false,
		error: "Invalid request payload."
	};
	const apiKey = process.env.XAI_API_KEY;
	const trimmed = data.messages.slice(-10).filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string").map((m) => ({
		role: m.role,
		content: m.content.slice(0, 4e3)
	}));
	const lastUser = [...trimmed].reverse().find((m) => m.role === "user")?.content ?? "";
	if (!apiKey) {
		if (data.mode === "cards") {
			const topic = lastUser.trim() || "Core Concepts";
			const cards = [
				{
					front: `What are the core fundamentals of ${topic}?`,
					back: `The fundamentals of ${topic} involve understanding key definitions, operational principles, and practical problem-solving applications.`
				},
				{
					front: `How do you analyze problems related to ${topic}?`,
					back: `Break down the problem into smaller sub-components, identify known constraints, and apply standard formulas or algorithmic patterns step-by-step.`
				},
				{
					front: `What is a common edge case or misconception in ${topic}?`,
					back: `A common pitfall is neglecting boundary conditions or assuming ideal conditions without verifying input assumptions.`
				},
				{
					front: `What is the optimal study strategy for ${topic}?`,
					back: `Use active recall, practice worked examples without looking at solutions, and test yourself with timed practice problems.`
				},
				{
					front: `How is ${topic} evaluated on exams?`,
					back: `Exams typically test conceptual definitions, multi-step problem solving, and short proof or derivation questions under time constraints.`
				}
			];
			return {
				ok: true,
				text: JSON.stringify({ cards })
			};
		}
		const topic = lastUser.trim() || "your topic";
		return {
			ok: true,
			text: `### Folio Tutor Guide: ${topic}\n\nHere is a structured breakdown to master this subject:\n\n1. **Core Concept Overview**\n   - Review the primary definitions and foundational theorems.\n   - Ensure you can state the main results in your own words.\n\n2. **Actionable Study Plan**\n   - **Block 1 (25m):** Read notes & derive key formulas from scratch.\n   - **Block 2 (25m):** Solve 2–3 practice problems under exam conditions.\n   - **Block 3 (25m):** Review mistakes and generate targeted flashcards.\n\n3. **Quick Quiz Question**\n   - What is the most important theorem or rule governing ${topic}?\n\n*(Note: Configure XAI_API_KEY to connect live Grok 4.5 model reasoning)*`
		};
	}
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			temperature: data.mode === "cards" ? .3 : .4,
			max_tokens: data.mode === "cards" ? 900 : 700,
			messages: [{
				role: "system",
				content: data.mode === "cards" ? SYSTEM_CARDS : SYSTEM_CHAT
			}, ...trimmed]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `Tutor request failed (${res.status}).`
	};
	const text = (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
	if (!text) return {
		ok: false,
		error: "The tutor returned an empty reply."
	};
	return {
		ok: true,
		text
	};
});
//#endregion
export { askTutor_createServerFn_handler };
