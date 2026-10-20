import type { FlashCard } from "./types";

export type RecallQuality = 1 | 3 | 4 | 5;

export function reviewCard(card: FlashCard, quality: RecallQuality, now = new Date()): FlashCard {
  let { ease, interval, reps, lapses } = card;
  if (quality < 3) {
    reps = 0;
    lapses += 1;
    interval = 1;
  } else {
    if (reps === 0) interval = 1;
    else if (reps === 1) interval = 3;
    else interval = Math.max(1, Math.round(interval * ease));
    reps += 1;
    ease = Math.max(1.3, ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    if (quality === 5) interval = Math.round(interval * 1.3);
    if (quality === 3) interval = Math.max(1, Math.round(interval * 0.8));
  }
  const due = new Date(now);
  due.setDate(due.getDate() + interval);
  due.setHours(8, 0, 0, 0);
  return { ...card, ease, interval, reps, lapses, dueAt: due.toISOString() };
}

export function newCard(partial: Pick<FlashCard, "id" | "deckId" | "front" | "back">): FlashCard {
  return {
    ...partial,
    ease: 2.5,
    interval: 0,
    dueAt: new Date().toISOString(),
    reps: 0,
    lapses: 0,
  };
}

export function isDue(card: FlashCard, now = new Date()) {
  return new Date(card.dueAt).getTime() <= now.getTime();
}
