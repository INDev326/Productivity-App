import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as getServerFnById, n as createServerFn, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { _ as ChartLine, a as RotateCcw, b as ArrowRight, c as Pause, d as Layers, f as House, g as ChevronLeft, h as ChevronRight, i as Settings, l as MessageSquare, m as Flame, n as Timer, o as Plus, p as GraduationCap, r as Sparkles, s as Play, u as Menu, v as CalendarDays, y as BookOpen } from "../_libs/lucide-react.mjs";
import { r as hasGateSessionMarker } from "./router-BNtitLDE.mjs";
import { a as Textarea, i as Select, l as signOut, n as Field, o as authClient, r as Input, s as cn, t as Button, u as uid } from "./client-DFSecBe2.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
import { a as isTomorrow, c as formatDistanceToNowStrict, d as eachDayOfInterval, f as isSameDay, g as addDays, h as addMonths, i as isYesterday, l as format, m as startOfWeek, n as setHours, o as isToday, p as startOfDay, r as parseISO, s as isSameMonth, t as setMinutes, u as startOfMonth } from "../_libs/date-fns.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DkHlE80n.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Sheet({ open, onOpenChange, title, children, wide }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
		open,
		onOpenChange,
		shouldScaleBackground: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, { className: "fixed inset-0 z-50 bg-ink/35 dark:bg-ink/55" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
			className: cn("fixed bottom-0 left-0 right-0 z-50 mx-auto flex max-h-[92vh] flex-col rounded-t-3xl bg-surface shadow-card outline-none", wide ? "max-w-2xl" : "max-w-lg"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-border-strong" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
					className: "px-5 pt-4 font-display text-2xl text-fg",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "folio-scroll mt-3 flex-1 overflow-y-auto px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]",
					children
				})
			]
		})] })
	});
}
var COURSE_TINTS = [
	"forest",
	"ocean",
	"slate",
	"moss",
	"clay",
	"dusk"
];
var TINT_CLASS = {
	forest: {
		text: "text-tint-forest",
		soft: "bg-tint-forest/12",
		solid: "bg-tint-forest"
	},
	ocean: {
		text: "text-tint-ocean",
		soft: "bg-tint-ocean/12",
		solid: "bg-tint-ocean"
	},
	slate: {
		text: "text-tint-slate",
		soft: "bg-tint-slate/12",
		solid: "bg-tint-slate"
	},
	moss: {
		text: "text-tint-moss",
		soft: "bg-tint-moss/12",
		solid: "bg-tint-moss"
	},
	clay: {
		text: "text-tint-clay",
		soft: "bg-tint-clay/12",
		solid: "bg-tint-clay"
	},
	dusk: {
		text: "text-tint-dusk",
		soft: "bg-tint-dusk/12",
		solid: "bg-tint-dusk"
	}
};
var WEEKDAYS = [
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
	"Sun"
];
function dayKey(d) {
	return format(d, "yyyy-MM-dd");
}
function formatDay(iso) {
	const d = parseISO(iso);
	if (isToday(d)) return "Today";
	if (isTomorrow(d)) return "Tomorrow";
	if (isYesterday(d)) return "Yesterday";
	return format(d, "EEE, d MMM");
}
function formatClock(iso) {
	return format(parseISO(iso), "h:mm a");
}
function formatShortDate(iso) {
	return format(parseISO(iso), "d MMM");
}
function relativeDue(iso) {
	const d = parseISO(iso);
	const now = /* @__PURE__ */ new Date();
	if (d.getTime() < now.getTime() - 6e4) return `overdue ${formatDistanceToNowStrict(d)}`;
	if (isToday(d)) return `today ${format(d, "h:mm a")}`;
	if (isTomorrow(d)) return `tomorrow ${format(d, "h:mm a")}`;
	return formatDistanceToNowStrict(d, { addSuffix: true });
}
function formatMinutes(min) {
	if (min < 60) return `${Math.round(min)}m`;
	const h = Math.floor(min / 60);
	const m = Math.round(min % 60);
	return m ? `${h}h ${m}m` : `${h}h`;
}
function formatHours(min) {
	const h = min / 60;
	return h >= 10 ? `${Math.round(h)}h` : `${h.toFixed(1).replace(/\.0$/, "")}h`;
}
function pad2(n) {
	return n.toString().padStart(2, "0");
}
function formatTimer(sec) {
	const s = Math.max(0, Math.floor(sec));
	const h = Math.floor(s / 3600);
	const m = Math.floor(s % 3600 / 60);
	const r = s % 60;
	if (h > 0) return `${h}:${pad2(m)}:${pad2(r)}`;
	return `${pad2(m)}:${pad2(r)}`;
}
function mondayOf(d = /* @__PURE__ */ new Date()) {
	const copy = new Date(d);
	const day = copy.getDay();
	const diff = day === 0 ? -6 : 1 - day;
	copy.setDate(copy.getDate() + diff);
	copy.setHours(0, 0, 0, 0);
	return copy;
}
function jsDayToMonIndex(jsDay) {
	return jsDay === 0 ? 6 : jsDay - 1;
}
function reviewCard(card, quality, now = /* @__PURE__ */ new Date()) {
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
		ease = Math.max(1.3, ease + (.1 - (5 - quality) * (.08 + (5 - quality) * .02)));
		if (quality === 5) interval = Math.round(interval * 1.3);
		if (quality === 3) interval = Math.max(1, Math.round(interval * .8));
	}
	const due = new Date(now);
	due.setDate(due.getDate() + interval);
	due.setHours(8, 0, 0, 0);
	return {
		...card,
		ease,
		interval,
		reps,
		lapses,
		dueAt: due.toISOString()
	};
}
function newCard(partial) {
	return {
		...partial,
		ease: 2.5,
		interval: 0,
		dueAt: (/* @__PURE__ */ new Date()).toISOString(),
		reps: 0,
		lapses: 0
	};
}
function isDue(card, now = /* @__PURE__ */ new Date()) {
	return new Date(card.dueAt).getTime() <= now.getTime();
}
function at(daysFromToday, hour = 9, minute = 0) {
	const d = setMinutes(setHours(startOfDay(/* @__PURE__ */ new Date()), hour), minute);
	return addDays(d, daysFromToday).toISOString();
}
function session(id, courseId, daysAgo, hour, durationMin) {
	return {
		id,
		courseId,
		startedAt: at(-daysAgo, hour, 10),
		durationMin,
		kind: "focus"
	};
}
var defaultSettings = {
	name: "Maya Chen",
	school: "Northridge University",
	major: "Computer Science",
	gpaScale: 4,
	pomodoroMin: 25,
	breakMin: 5,
	weeklyHourGoal: 12,
	theme: "light"
};
function emptyData() {
	return {
		courses: [],
		assignments: [],
		exams: [],
		slots: [],
		sessions: [],
		notes: [],
		decks: [],
		cards: [],
		goals: [],
		settings: {
			name: "",
			school: "",
			major: "",
			gpaScale: 4,
			pomodoroMin: 25,
			breakMin: 5,
			weeklyHourGoal: 10,
			theme: "light"
		}
	};
}
function buildSeed() {
	const cards = [
		newCard({
			id: "k1",
			deckId: "d1",
			front: "Master theorem: T(n) = aT(n/b) + f(n). When does case 1 apply?",
			back: "If f(n) = O(n^{log_b a − ε}) for some ε > 0, then T(n) = Θ(n^{log_b a}). The recursive work dominates."
		}),
		newCard({
			id: "k2",
			deckId: "d1",
			front: "Difference between Dijkstra and Bellman–Ford?",
			back: "Dijkstra needs non-negative weights and is faster with a heap. Bellman–Ford handles negatives and detects negative cycles, running in O(VE)."
		}),
		newCard({
			id: "k3",
			deckId: "d1",
			front: "What is the time complexity of Kruskal with Union-Find (path compression + union by rank)?",
			back: "O(E log E) for sorting edges, then nearly O(E) for unions — overall O(E log E)."
		}),
		newCard({
			id: "k4",
			deckId: "d1",
			front: "Define overlapping subproblems vs optimal substructure.",
			back: "Overlapping subproblems: the same subproblem is solved many times (memoize). Optimal substructure: an optimal solution contains optimal solutions to subproblems (DP / greedy)."
		}),
		newCard({
			id: "k5",
			deckId: "d1",
			front: "Give the recurrence for 0/1 knapsack DP.",
			back: "dp[i][w] = max(dp[i−1][w], v_i + dp[i−1][w−w_i]) if w_i ≤ w, else dp[i−1][w]."
		}),
		newCard({
			id: "k6",
			deckId: "d2",
			front: "A matrix is invertible iff…",
			back: "Its determinant is non-zero; equivalently, full rank; equivalently, 0 is not an eigenvalue; equivalently, columns are linearly independent."
		}),
		newCard({
			id: "k7",
			deckId: "d2",
			front: "What does the rank-nullity theorem say?",
			back: "For a linear map T: V → W, dim(ker T) + dim(im T) = dim V. Rank + nullity = n."
		}),
		newCard({
			id: "k8",
			deckId: "d2",
			front: "Eigenvalue equation and characteristic polynomial.",
			back: "Av = λv with v ≠ 0. p(λ) = det(A − λI) = 0. The roots are the eigenvalues."
		}),
		newCard({
			id: "k9",
			deckId: "d2",
			front: "When is a matrix diagonalizable?",
			back: "If it has a full set of linearly independent eigenvectors (geometric multiplicity equals algebraic for every eigenvalue), or if it has n distinct eigenvalues."
		}),
		newCard({
			id: "k10",
			deckId: "d3",
			front: "Newton’s second law in inertial frames.",
			back: "ΣF = dp/dt. For constant mass, ΣF = ma. In components, this is three second-order ODEs."
		}),
		newCard({
			id: "k11",
			deckId: "d3",
			front: "Work–energy theorem.",
			back: "The net work on a particle equals its change in kinetic energy: W_net = ΔK."
		}),
		newCard({
			id: "k12",
			deckId: "d3",
			front: "Condition for mechanical energy conservation.",
			back: "If only conservative forces do work (or non-conservative work is zero), E = K + U is constant."
		})
	];
	cards[0] = {
		...cards[0],
		reps: 4,
		interval: 6,
		dueAt: at(-1, 8)
	};
	cards[1] = {
		...cards[1],
		reps: 3,
		interval: 4,
		dueAt: at(0, 8)
	};
	cards[5] = {
		...cards[5],
		reps: 2,
		interval: 2,
		dueAt: at(0, 8)
	};
	cards[6] = {
		...cards[6],
		reps: 5,
		interval: 10,
		dueAt: at(3, 8)
	};
	const sessions = [
		session("s1", "c1", 20, 19, 50),
		session("s2", "c2", 19, 20, 40),
		session("s3", "c3", 18, 18, 75),
		session("s4", "c1", 17, 21, 35),
		session("s5", "c4", 16, 16, 55),
		session("s6", "c5", 15, 19, 30),
		session("s7", "c2", 14, 20, 90),
		session("s8", "c1", 13, 18, 110),
		session("s9", "c3", 12, 19, 45),
		session("s10", "c4", 11, 15, 40),
		session("s11", "c1", 10, 20, 70),
		session("s12", "c2", 8, 19, 80),
		session("s13", "c3", 7, 18, 95),
		session("s14", "c5", 6, 21, 35),
		session("s15", "c1", 5, 19, 120),
		session("s16", "c2", 4, 17, 50),
		session("s17", "c4", 3, 20, 65),
		session("s18", "c1", 2, 19, 85),
		session("s19", "c3", 1, 18, 70),
		session("s20", "c2", 0, 10, 40)
	];
	return {
		settings: defaultSettings,
		courses: [
			{
				id: "c1",
				name: "Design of Algorithms",
				code: "CS 301",
				instructor: "Prof. Okonkwo",
				credits: 4,
				tint: "forest",
				room: "Harper 214",
				targetGrade: 90
			},
			{
				id: "c2",
				name: "Linear Algebra",
				code: "MATH 240",
				instructor: "Dr. Patel",
				credits: 3,
				tint: "ocean",
				room: "Newton 12",
				targetGrade: 88
			},
			{
				id: "c3",
				name: "Classical Mechanics",
				code: "PHYS 201",
				instructor: "Prof. Reeves",
				credits: 4,
				tint: "slate",
				room: "Kelvin Hall",
				targetGrade: 85
			},
			{
				id: "c4",
				name: "Technical Writing",
				code: "ENG 210",
				instructor: "Dr. Alvarez",
				credits: 3,
				tint: "moss",
				room: "Reed 4",
				targetGrade: 92
			},
			{
				id: "c5",
				name: "The Modern World",
				code: "HIST 118",
				instructor: "Prof. Berg",
				credits: 3,
				tint: "clay",
				room: "East 301",
				targetGrade: 87
			}
		],
		assignments: [
			{
				id: "a1",
				courseId: "c1",
				title: "Problem set 4 — divide and conquer",
				notes: "Master theorem drills plus the closest-pair writeup.",
				dueAt: at(2, 23, 59),
				status: "doing",
				priority: "high",
				weight: 8
			},
			{
				id: "a2",
				courseId: "c2",
				title: "Homework 5 — eigenvalues",
				notes: "Compute eigenpairs for the 3×3 companion matrix.",
				dueAt: at(1, 17, 0),
				status: "todo",
				priority: "high",
				weight: 6
			},
			{
				id: "a3",
				courseId: "c3",
				title: "Lab report: Atwood machine",
				notes: "Include error bars and a residual plot.",
				dueAt: at(5, 17, 0),
				status: "doing",
				priority: "med",
				weight: 10
			},
			{
				id: "a4",
				courseId: "c4",
				title: "Proposal draft — usability study",
				notes: "1,500 words, IEEE citations, methods section first.",
				dueAt: at(4, 12, 0),
				status: "doing",
				priority: "med",
				weight: 15
			},
			{
				id: "a5",
				courseId: "c5",
				title: "Primary source response",
				notes: "Wilson’s Fourteen Points vs. the Treaty of Versailles.",
				dueAt: at(8, 23, 59),
				status: "todo",
				priority: "low",
				weight: 8
			},
			{
				id: "a6",
				courseId: "c1",
				title: "Programming: Dijkstra visualizer",
				notes: "Must handle disconnected graphs and report path cost.",
				dueAt: at(12, 23, 59),
				status: "todo",
				priority: "high",
				weight: 12
			},
			{
				id: "a7",
				courseId: "c2",
				title: "MATLAB labs 1–3 (bundle)",
				notes: "Submit a single notebook with all figures embedded.",
				dueAt: at(9, 17, 0),
				status: "todo",
				priority: "med",
				weight: 5
			},
			{
				id: "a8",
				courseId: "c1",
				title: "Problem set 3 — graphs",
				notes: "",
				dueAt: at(-6, 23, 59),
				status: "done",
				priority: "high",
				weight: 8,
				score: 94
			},
			{
				id: "a9",
				courseId: "c2",
				title: "Homework 4 — vector spaces",
				notes: "",
				dueAt: at(-8, 17, 0),
				status: "done",
				priority: "med",
				weight: 6,
				score: 88
			},
			{
				id: "a10",
				courseId: "c3",
				title: "Problem set 2 — energy",
				notes: "",
				dueAt: at(-10, 17, 0),
				status: "done",
				priority: "med",
				weight: 8,
				score: 81
			},
			{
				id: "a11",
				courseId: "c4",
				title: "Audience analysis memo",
				notes: "",
				dueAt: at(-12, 12, 0),
				status: "done",
				priority: "low",
				weight: 10,
				score: 96
			},
			{
				id: "a12",
				courseId: "c5",
				title: "Map quiz: 1914 Europe",
				notes: "",
				dueAt: at(-14, 10, 0),
				status: "done",
				priority: "low",
				weight: 5,
				score: 100
			}
		],
		exams: [
			{
				id: "e1",
				courseId: "c2",
				title: "Quiz 3 — change of basis",
				type: "quiz",
				startsAt: at(4, 11, 0),
				location: "Newton 12",
				notes: "No calculator. One handwritten sheet.",
				weight: 8
			},
			{
				id: "e2",
				courseId: "c4",
				title: "Oral presentation",
				type: "presentation",
				startsAt: at(14, 14, 0),
				location: "Reed 4",
				notes: "Eight minutes, two minutes questions.",
				weight: 20
			},
			{
				id: "e3",
				courseId: "c3",
				title: "Midterm 1",
				type: "midterm",
				startsAt: at(18, 9, 30),
				location: "Kelvin Hall",
				notes: "Kinematics through energy. Formula sheet provided.",
				weight: 25
			},
			{
				id: "e4",
				courseId: "c1",
				title: "Midterm",
				type: "midterm",
				startsAt: at(22, 15, 0),
				location: "Harper 214",
				notes: "Asymptotics, divide-and-conquer, graphs. Closed book.",
				weight: 25
			},
			{
				id: "e5",
				courseId: "c5",
				title: "Midterm",
				type: "midterm",
				startsAt: at(30, 10, 0),
				location: "East 301",
				notes: "1848–1919. IDs plus one essay.",
				weight: 25
			},
			{
				id: "e6",
				courseId: "c2",
				title: "Quiz 2",
				type: "quiz",
				startsAt: at(-15, 11, 0),
				location: "Newton 12",
				notes: "",
				weight: 8,
				score: 86
			},
			{
				id: "e7",
				courseId: "c1",
				title: "Quiz 1 — asymptotics",
				type: "quiz",
				startsAt: at(-20, 15, 0),
				location: "Harper 214",
				notes: "",
				weight: 5,
				score: 91
			}
		],
		slots: [
			{
				id: "t1",
				courseId: "c1",
				day: 0,
				start: "09:00",
				end: "10:15",
				room: "Harper 214"
			},
			{
				id: "t2",
				courseId: "c2",
				day: 0,
				start: "11:00",
				end: "12:15",
				room: "Newton 12"
			},
			{
				id: "t3",
				courseId: "c3",
				day: 1,
				start: "09:30",
				end: "10:45",
				room: "Kelvin Hall"
			},
			{
				id: "t4",
				courseId: "c4",
				day: 1,
				start: "14:00",
				end: "15:15",
				room: "Reed 4"
			},
			{
				id: "t5",
				courseId: "c1",
				day: 2,
				start: "09:00",
				end: "10:15",
				room: "Harper 214"
			},
			{
				id: "t6",
				courseId: "c2",
				day: 2,
				start: "11:00",
				end: "12:15",
				room: "Newton 12"
			},
			{
				id: "t7",
				courseId: "c5",
				day: 2,
				start: "15:30",
				end: "16:45",
				room: "East 301"
			},
			{
				id: "t8",
				courseId: "c3",
				day: 3,
				start: "09:30",
				end: "10:45",
				room: "Kelvin Hall"
			},
			{
				id: "t9",
				courseId: "c3",
				day: 3,
				start: "13:00",
				end: "15:00",
				room: "Lab B"
			},
			{
				id: "t10",
				courseId: "c4",
				day: 4,
				start: "10:00",
				end: "11:15",
				room: "Reed 4"
			},
			{
				id: "t11",
				courseId: "c5",
				day: 4,
				start: "13:00",
				end: "14:15",
				room: "East 301"
			}
		],
		sessions,
		notes: [
			{
				id: "n1",
				courseId: "c1",
				title: "Master theorem — the three cases",
				body: "Case 1: leaves dominate (f polynomially smaller than n^{log_b a}).\nCase 2: work is balanced — usually Θ(n^{log_b a} log n).\nCase 3: root dominates, plus a regularity condition on f.\n\nWatch the ε: f must be polynomially smaller/larger, not just asymptotically.\n\nCLRS 4.5 worked examples: merge sort is case 2; binary search is case 2 with a=1.",
				updatedAt: at(-1, 21, 12)
			},
			{
				id: "n2",
				courseId: "c2",
				title: "Change of basis recipe",
				body: "If P’s columns are the new basis in old coordinates, then [v]_B = P^{-1}[v]_E and [T]_B = P^{-1}[T]_E P.\n\nFor an eigenbasis, [T]_B is diagonal. Always check P is invertible before claiming a basis.\n\nPractice: rotate the standard basis of R² by π/6 and rewrite the shear matrix.",
				updatedAt: at(-2, 16, 40)
			},
			{
				id: "n3",
				courseId: "c3",
				title: "Energy methods vs Newton",
				body: "Use energy when you care about speeds at positions, not the time history. Use Newton / kinematics when you need a(t) or when non-conservative forces are the point.\n\nAtwood: two masses, one string. Constraint: a is shared. Tension cancels in the energy picture if the pulley is ideal.\n\nLab note: our g came out 9.71 ± 0.08. Discuss air + pulley inertia.",
				updatedAt: at(-3, 22, 5)
			},
			{
				id: "n4",
				courseId: "c4",
				title: "Proposal structure that Alvarez likes",
				body: "1. Problem in one paragraph, no throat-clearing.\n2. Why it matters to a named audience.\n3. Methods: what you will actually do this term.\n4. Deliverable and success metric.\n5. Timeline with three milestones.\n\nCut the literature review to six sources. IEEE, hanging indent, DOI on everything.",
				updatedAt: at(-4, 11, 20)
			},
			{
				id: "n5",
				courseId: "c5",
				title: "1848 — the springtime of peoples",
				body: "Shared spark: harvest failures, industrial unemployment, liberal-national programmes. Different landings: France to a republic then Louis-Napoleon; German states fail to unify; Habsburgs survive by splitting Magyar and Slavic claims.\n\nEssay angle: 1848 as a rehearsal for 1918 more than a failure of 1848 itself.",
				updatedAt: at(-5, 19, 48)
			}
		],
		decks: [
			{
				id: "d1",
				courseId: "c1",
				name: "Algorithms core"
			},
			{
				id: "d2",
				courseId: "c2",
				name: "Linear algebra"
			},
			{
				id: "d3",
				courseId: "c3",
				name: "Mechanics"
			}
		],
		cards,
		goals: [
			{
				id: "g1",
				title: "Twelve focused hours this week",
				kind: "hours",
				target: 12,
				period: "week"
			},
			{
				id: "g2",
				title: "Hold a 90 in Algorithms",
				kind: "grade",
				target: 90,
				courseId: "c1",
				period: "term"
			},
			{
				id: "g3",
				title: "Review 20 cards",
				kind: "cards",
				target: 20,
				period: "term"
			}
		]
	};
}
var STORAGE_KEY = "folio-v1";
function upsert(list, item) {
	const i = list.findIndex((x) => x.id === item.id);
	if (i === -1) return [...list, item];
	const next = list.slice();
	next[i] = item;
	return next;
}
function readStorage() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
function writeStorage(state) {
	const data = {
		initialized: state.initialized,
		courses: state.courses,
		assignments: state.assignments,
		exams: state.exams,
		slots: state.slots,
		sessions: state.sessions,
		notes: state.notes,
		decks: state.decks,
		cards: state.cards,
		goals: state.goals,
		settings: state.settings
	};
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	} catch {}
}
var useFolio = create()((set) => ({
	...buildSeed(),
	initialized: true,
	saveCourse: (c) => set((s) => ({ courses: upsert(s.courses, c) })),
	removeCourse: (id) => set((s) => ({
		courses: s.courses.filter((x) => x.id !== id),
		assignments: s.assignments.filter((x) => x.courseId !== id),
		exams: s.exams.filter((x) => x.courseId !== id),
		slots: s.slots.filter((x) => x.courseId !== id),
		notes: s.notes.map((n) => n.courseId === id ? {
			...n,
			courseId: void 0
		} : n),
		decks: s.decks.map((d) => d.courseId === id ? {
			...d,
			courseId: void 0
		} : d),
		sessions: s.sessions.map((x) => x.courseId === id ? {
			...x,
			courseId: void 0
		} : x),
		goals: s.goals.map((g) => g.courseId === id ? {
			...g,
			courseId: void 0
		} : g)
	})),
	saveAssignment: (a) => set((s) => ({ assignments: upsert(s.assignments, a) })),
	removeAssignment: (id) => set((s) => ({ assignments: s.assignments.filter((x) => x.id !== id) })),
	saveExam: (e) => set((s) => ({ exams: upsert(s.exams, e) })),
	removeExam: (id) => set((s) => ({ exams: s.exams.filter((x) => x.id !== id) })),
	saveSlot: (slot) => set((s) => ({ slots: upsert(s.slots, slot) })),
	removeSlot: (id) => set((s) => ({ slots: s.slots.filter((x) => x.id !== id) })),
	saveNote: (n) => set((s) => ({ notes: upsert(s.notes, n) })),
	removeNote: (id) => set((s) => ({ notes: s.notes.filter((x) => x.id !== id) })),
	saveDeck: (d) => set((s) => ({ decks: upsert(s.decks, d) })),
	removeDeck: (id) => set((s) => ({
		decks: s.decks.filter((x) => x.id !== id),
		cards: s.cards.filter((c) => c.deckId !== id)
	})),
	saveCard: (c) => set((s) => ({ cards: upsert(s.cards, c) })),
	removeCard: (id) => set((s) => ({ cards: s.cards.filter((x) => x.id !== id) })),
	saveGoal: (g) => set((s) => ({ goals: upsert(s.goals, g) })),
	removeGoal: (id) => set((s) => ({ goals: s.goals.filter((x) => x.id !== id) })),
	logSession: (sess) => set((s) => ({ sessions: upsert(s.sessions, {
		id: sess.id ?? uid(),
		...sess
	}) })),
	removeSession: (id) => set((s) => ({ sessions: s.sessions.filter((x) => x.id !== id) })),
	review: (id, q) => set((s) => ({ cards: s.cards.map((c) => c.id === id ? reviewCard(c, q) : c) })),
	patchSettings: (p) => set((s) => ({ settings: {
		...s.settings,
		...p
	} })),
	loadSeed: () => set(() => ({
		...buildSeed(),
		initialized: true
	})),
	resetAll: () => set(() => ({
		...emptyData(),
		initialized: true
	}))
}));
var booted = false;
function bootFolio() {
	if (booted || typeof window === "undefined") return;
	booted = true;
	const saved = readStorage();
	if (saved?.initialized && saved.courses) useFolio.setState({
		courses: saved.courses ?? [],
		assignments: saved.assignments ?? [],
		exams: saved.exams ?? [],
		slots: saved.slots ?? [],
		sessions: saved.sessions ?? [],
		notes: saved.notes ?? [],
		decks: saved.decks ?? [],
		cards: saved.cards ?? [],
		goals: saved.goals ?? [],
		settings: {
			...useFolio.getState().settings,
			...saved.settings
		},
		initialized: true
	});
	useFolio.subscribe((s) => writeStorage(s));
}
function makeCourse() {
	return {
		id: uid(),
		name: "",
		code: "",
		instructor: "",
		credits: 3,
		tint: "forest",
		room: "",
		targetGrade: 90
	};
}
function makeAssignment(courseId) {
	const due = /* @__PURE__ */ new Date();
	due.setDate(due.getDate() + 7);
	due.setHours(23, 59, 0, 0);
	return {
		id: uid(),
		courseId,
		title: "",
		notes: "",
		dueAt: due.toISOString(),
		status: "todo",
		priority: "med",
		weight: 10
	};
}
function makeExam(courseId) {
	const starts = /* @__PURE__ */ new Date();
	starts.setDate(starts.getDate() + 14);
	starts.setHours(9, 0, 0, 0);
	return {
		id: uid(),
		courseId,
		title: "",
		type: "midterm",
		startsAt: starts.toISOString(),
		location: "",
		notes: "",
		weight: 25
	};
}
function makeNote(courseId) {
	return {
		id: uid(),
		courseId,
		title: "",
		body: "",
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
function makeDeck(courseId) {
	return {
		id: uid(),
		courseId,
		name: ""
	};
}
function makeFlash(deckId, front = "", back = "") {
	return newCard({
		id: uid(),
		deckId,
		front,
		back
	});
}
function makeSlot(courseId) {
	return {
		id: uid(),
		courseId,
		day: 0,
		start: "09:00",
		end: "10:15",
		room: ""
	};
}
function makeGoal() {
	return {
		id: uid(),
		title: "",
		kind: "hours",
		target: 10,
		period: "week"
	};
}
var alwaysTrue = () => true;
function useHydratedFolio() {
	return (0, import_react.useSyncExternalStore)((onStoreChange) => {
		bootFolio();
		onStoreChange();
		return useFolio.subscribe(onStoreChange);
	}, alwaysTrue, alwaysTrue);
}
var TITLES = {
	course: "Course",
	assignment: "Assignment",
	exam: "Exam",
	slot: "Class block",
	note: "Note",
	deck: "Deck",
	card: "Card",
	goal: "Goal"
};
function isoToLocal(iso) {
	if (!iso) return "";
	const d = new Date(iso);
	if (isNaN(d.getTime())) return "";
	const pad = (n) => n.toString().padStart(2, "0");
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function Composer({ kind, onClose }) {
	if (!kind) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		open: true,
		onOpenChange: (o) => !o && onClose(),
		title: kind.value ? `Edit ${TITLES[kind.type].toLowerCase()}` : `New ${TITLES[kind.type].toLowerCase()}`,
		children: [
			kind.type === "course" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseForm, {
				initial: kind.value,
				onDone: onClose
			}) : null,
			kind.type === "assignment" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssignmentForm, {
				initial: kind.value,
				courseId: kind.courseId,
				onDone: onClose
			}) : null,
			kind.type === "exam" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExamForm, {
				initial: kind.value,
				courseId: kind.courseId,
				onDone: onClose
			}) : null,
			kind.type === "slot" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotForm, {
				initial: kind.value,
				courseId: kind.courseId,
				onDone: onClose
			}) : null,
			kind.type === "note" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteForm, {
				initial: kind.value,
				courseId: kind.courseId,
				onDone: onClose
			}) : null,
			kind.type === "deck" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeckForm, {
				initial: kind.value,
				courseId: kind.courseId,
				onDone: onClose
			}) : null,
			kind.type === "card" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardForm, {
				initial: kind.value,
				deckId: kind.deckId,
				onDone: onClose
			}) : null,
			kind.type === "goal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalForm, {
				initial: kind.value,
				onDone: onClose
			}) : null
		]
	});
}
function Actions({ onSave, onDelete, saveLabel = "Save" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5 flex gap-2 pb-2",
		children: [onDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "ghost",
			className: "text-danger",
			onClick: onDelete,
			children: "Delete"
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			className: "ml-auto min-w-28",
			onClick: onSave,
			children: saveLabel
		})]
	});
}
function CourseSelect({ value, onChange }) {
	const courses = useFolio((s) => s.courses);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
		value,
		onChange: (e) => onChange(e.target.value),
		children: courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
			value: c.id,
			children: [
				c.code,
				" — ",
				c.name
			]
		}, c.id))
	});
}
function CourseForm({ initial, onDone }) {
	const save = useFolio((s) => s.saveCourse);
	const remove = useFolio((s) => s.removeCourse);
	const [c, setC] = (0, import_react.useState)(() => initial ?? makeCourse());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Code",
					className: "col-span-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: c.code,
						onChange: (e) => setC({
							...c,
							code: e.target.value
						}),
						placeholder: "CS 301"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Name",
					className: "col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: c.name,
						onChange: (e) => setC({
							...c,
							name: e.target.value
						}),
						placeholder: "Design of Algorithms"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Instructor",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: c.instructor,
					onChange: (e) => setC({
						...c,
						instructor: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Credits",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 1,
						max: 8,
						value: c.credits,
						onChange: (e) => setC({
							...c,
							credits: Number(e.target.value) || 0
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Room",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: c.room,
						onChange: (e) => setC({
							...c,
							room: e.target.value
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Target grade %",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					min: 0,
					max: 100,
					value: c.targetGrade,
					onChange: (e) => setC({
						...c,
						targetGrade: Number(e.target.value) || 0
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Color",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: COURSE_TINTS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setC({
							...c,
							tint: t
						}),
						className: cn("size-9 rounded-full border-2", TINT_CLASS[t].solid, c.tint === t ? "border-fg" : "border-transparent"),
						"aria-label": t
					}, t))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Actions, {
				onSave: () => {
					if (!c.name.trim() && !c.code.trim()) return;
					save(c);
					onDone();
				},
				onDelete: initial ? () => {
					remove(c.id);
					onDone();
				} : void 0
			})
		]
	});
}
function AssignmentForm({ initial, courseId, onDone }) {
	const courses = useFolio((s) => s.courses);
	const save = useFolio((s) => s.saveAssignment);
	const remove = useFolio((s) => s.removeAssignment);
	const fallback = courses[0]?.id ?? "";
	const [a, setA] = (0, import_react.useState)(() => initial ?? makeAssignment(courseId || fallback));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: a.title,
					onChange: (e) => setA({
						...a,
						title: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Course",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseSelect, {
					value: a.courseId,
					onChange: (id) => setA({
						...a,
						courseId: id
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Due",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "datetime-local",
						value: isoToLocal(a.dueAt),
						onChange: (e) => {
							const val = e.target.value;
							if (!val) return;
							const d = new Date(val);
							if (!isNaN(d.getTime())) setA({
								...a,
								dueAt: d.toISOString()
							});
						}
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Weight %",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 0,
						max: 100,
						value: a.weight,
						onChange: (e) => setA({
							...a,
							weight: Number(e.target.value) || 0
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Priority",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: a.priority,
						onChange: (e) => setA({
							...a,
							priority: e.target.value
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "low",
								children: "Low"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "med",
								children: "Medium"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "high",
								children: "High"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Status",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: a.status,
						onChange: (e) => setA({
							...a,
							status: e.target.value
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "todo",
								children: "To do"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "doing",
								children: "In progress"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "done",
								children: "Done"
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Score (optional)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					min: 0,
					max: 100,
					placeholder: "Ungraded",
					value: a.score ?? "",
					onChange: (e) => setA({
						...a,
						score: e.target.value === "" ? void 0 : Number(e.target.value)
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Notes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: a.notes,
					onChange: (e) => setA({
						...a,
						notes: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Actions, {
				onSave: () => {
					if (!a.title.trim()) return;
					save(a);
					onDone();
				},
				onDelete: initial ? () => {
					remove(a.id);
					onDone();
				} : void 0
			})
		]
	});
}
function ExamForm({ initial, courseId, onDone }) {
	const courses = useFolio((s) => s.courses);
	const save = useFolio((s) => s.saveExam);
	const remove = useFolio((s) => s.removeExam);
	const fallback = courses[0]?.id ?? "";
	const [e, setE] = (0, import_react.useState)(() => initial ?? makeExam(courseId || fallback));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: e.title,
					onChange: (ev) => setE({
						...e,
						title: ev.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Course",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseSelect, {
					value: e.courseId,
					onChange: (id) => setE({
						...e,
						courseId: id
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Type",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: e.type,
						onChange: (ev) => setE({
							...e,
							type: ev.target.value
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "quiz",
								children: "Quiz"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "midterm",
								children: "Midterm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "final",
								children: "Final"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "lab",
								children: "Lab exam"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "presentation",
								children: "Presentation"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Weight %",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						value: e.weight,
						onChange: (ev) => setE({
							...e,
							weight: Number(ev.target.value) || 0
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Starts",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "datetime-local",
						value: isoToLocal(e.startsAt),
						onChange: (ev) => {
							const val = ev.target.value;
							if (!val) return;
							const d = new Date(val);
							if (!isNaN(d.getTime())) setE({
								...e,
								startsAt: d.toISOString()
							});
						}
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Location",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: e.location,
						onChange: (ev) => setE({
							...e,
							location: ev.target.value
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Score (optional)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					placeholder: "Ungraded",
					value: e.score ?? "",
					onChange: (ev) => setE({
						...e,
						score: ev.target.value === "" ? void 0 : Number(ev.target.value)
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Notes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: e.notes,
					onChange: (ev) => setE({
						...e,
						notes: ev.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Actions, {
				onSave: () => {
					if (!e.title.trim()) return;
					save(e);
					onDone();
				},
				onDelete: initial ? () => {
					remove(e.id);
					onDone();
				} : void 0
			})
		]
	});
}
function SlotForm({ initial, courseId, onDone }) {
	const courses = useFolio((s) => s.courses);
	const save = useFolio((s) => s.saveSlot);
	const remove = useFolio((s) => s.removeSlot);
	const fallback = courses[0]?.id ?? "";
	const [s, setS] = (0, import_react.useState)(() => initial ?? makeSlot(courseId || fallback));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Course",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseSelect, {
					value: s.courseId,
					onChange: (id) => setS({
						...s,
						courseId: id
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Day",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: String(s.day),
					onChange: (e) => setS({
						...s,
						day: Number(e.target.value)
					}),
					children: WEEKDAYS.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: i,
						children: d
					}, d))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "time",
						value: s.start,
						onChange: (e) => setS({
							...s,
							start: e.target.value
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "End",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "time",
						value: s.end,
						onChange: (e) => setS({
							...s,
							end: e.target.value
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Room",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: s.room,
					onChange: (e) => setS({
						...s,
						room: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Actions, {
				onSave: () => {
					save(s);
					onDone();
				},
				onDelete: initial ? () => {
					remove(s.id);
					onDone();
				} : void 0
			})
		]
	});
}
function NoteForm({ initial, courseId, onDone }) {
	const save = useFolio((s) => s.saveNote);
	const remove = useFolio((s) => s.removeNote);
	const courses = useFolio((s) => s.courses);
	const [n, setN] = (0, import_react.useState)(() => initial ?? makeNote(courseId));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: n.title,
					onChange: (e) => setN({
						...n,
						title: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Course",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: n.courseId ?? "",
					onChange: (e) => setN({
						...n,
						courseId: e.target.value || void 0
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "None"
					}), courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: c.code
					}, c.id))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Body",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					className: "min-h-40",
					value: n.body,
					onChange: (e) => setN({
						...n,
						body: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Actions, {
				onSave: () => {
					if (!n.title.trim()) return;
					save({
						...n,
						updatedAt: (/* @__PURE__ */ new Date()).toISOString()
					});
					onDone();
				},
				onDelete: initial ? () => {
					remove(n.id);
					onDone();
				} : void 0
			})
		]
	});
}
function DeckForm({ initial, courseId, onDone }) {
	const save = useFolio((s) => s.saveDeck);
	const remove = useFolio((s) => s.removeDeck);
	const courses = useFolio((s) => s.courses);
	const [d, setD] = (0, import_react.useState)(() => initial ?? makeDeck(courseId));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Name",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: d.name,
					onChange: (e) => setD({
						...d,
						name: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Course",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: d.courseId ?? "",
					onChange: (e) => setD({
						...d,
						courseId: e.target.value || void 0
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "None"
					}), courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: c.code
					}, c.id))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Actions, {
				onSave: () => {
					if (!d.name.trim()) return;
					save(d);
					onDone();
				},
				onDelete: initial ? () => {
					remove(d.id);
					onDone();
				} : void 0
			})
		]
	});
}
function CardForm({ initial, deckId, onDone }) {
	const save = useFolio((s) => s.saveCard);
	const remove = useFolio((s) => s.removeCard);
	const [c, setC] = (0, import_react.useState)(() => initial ?? makeFlash(deckId));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Front",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: c.front,
					onChange: (e) => setC({
						...c,
						front: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Back",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: c.back,
					onChange: (e) => setC({
						...c,
						back: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Actions, {
				onSave: () => {
					if (!c.front.trim() || !c.back.trim()) return;
					save(c);
					onDone();
				},
				onDelete: initial ? () => {
					remove(c.id);
					onDone();
				} : void 0
			})
		]
	});
}
function GoalForm({ initial, onDone }) {
	const save = useFolio((s) => s.saveGoal);
	const remove = useFolio((s) => s.removeGoal);
	const courses = useFolio((s) => s.courses);
	const [g, setG] = (0, import_react.useState)(() => initial ?? makeGoal());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: g.title,
					onChange: (e) => setG({
						...g,
						title: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Kind",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: g.kind,
						onChange: (e) => setG({
							...g,
							kind: e.target.value
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "hours",
								children: "Study hours"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "grade",
								children: "Course grade"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "cards",
								children: "Cards reviewed"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Target",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						value: g.target,
						onChange: (e) => setG({
							...g,
							target: Number(e.target.value) || 0
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Period",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: g.period,
					onChange: (e) => setG({
						...g,
						period: e.target.value
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "week",
						children: "This week"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "term",
						children: "This term"
					})]
				})
			}),
			g.kind === "grade" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Course",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: g.courseId ?? "",
					onChange: (e) => setG({
						...g,
						courseId: e.target.value || void 0
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Select"
					}), courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: c.code
					}, c.id))]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Actions, {
				onSave: () => {
					if (!g.title.trim()) return;
					save(g);
					onDone();
				},
				onDelete: initial ? () => {
					remove(g.id);
					onDone();
				} : void 0
			})
		]
	});
}
function CourseDot({ tint, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("inline-block size-2.5 rounded-full", TINT_CLASS[tint].solid, className) });
}
function CourseChip({ course }) {
	const t = TINT_CLASS[course.tint];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium", t.soft, t.text),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", t.solid) }), course.code]
	});
}
function Section({ title, action, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xs font-medium uppercase tracking-[0.14em] text-muted",
				children: title
			}), action]
		}), children]
	});
}
function Card({ className, children, onClick }) {
	const classes = cn("w-full rounded-2xl border border-border bg-surface p-4 text-left shadow-card", onClick && "transition-transform duration-150 active:scale-[0.99]", className);
	if (onClick) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: classes,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: classes,
		children
	});
}
function Empty({ title, body, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-dashed border-border px-5 py-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl text-fg",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-1 max-w-xs text-sm text-muted",
				children: body
			}),
			action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: action
			}) : null
		]
	});
}
function Metric({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-surface px-4 py-3 shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium uppercase tracking-[0.14em] text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-3xl tabular leading-none text-fg",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-subtle",
				children: hint
			}) : null
		]
	});
}
function Ring({ value, size = 56, children }) {
	const r = 18;
	const c = 2 * Math.PI * r;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative grid place-items-center",
		style: {
			width: size,
			height: size
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 44 44",
			className: "size-full -rotate-90",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "22",
				cy: "22",
				r,
				fill: "none",
				stroke: "currentColor",
				className: "text-surface-2",
				strokeWidth: "4"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "22",
				cy: "22",
				r,
				fill: "none",
				stroke: "currentColor",
				className: "text-accent",
				strokeWidth: "4",
				strokeLinecap: "round",
				strokeDasharray: c,
				strokeDashoffset: c * (1 - Math.max(0, Math.min(1, value)))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 grid place-items-center text-xs font-medium tabular",
			children
		})]
	});
}
function minutesOnDay(sessions, day) {
	return sessions.filter((s) => isSameDay(parseISO(s.startedAt), day)).reduce((n, s) => n + s.durationMin, 0);
}
function minutesThisWeek(sessions, from = mondayOf()) {
	const end = addDays(from, 7);
	return sessions.filter((s) => {
		const t = parseISO(s.startedAt);
		return t >= from && t < end;
	}).reduce((n, s) => n + s.durationMin, 0);
}
function streakDays(sessions, now = /* @__PURE__ */ new Date()) {
	const keys = new Set(sessions.map((s) => dayKey(parseISO(s.startedAt))));
	let cursor = startOfDay(now);
	if (!keys.has(dayKey(cursor))) cursor = addDays(cursor, -1);
	let n = 0;
	while (keys.has(dayKey(cursor))) {
		n += 1;
		cursor = addDays(cursor, -1);
	}
	return n;
}
function lastNDays(sessions, n = 7, now = /* @__PURE__ */ new Date()) {
	return Array.from({ length: n }, (_, i) => {
		const d = addDays(startOfDay(now), -(n - 1 - i));
		return {
			date: d,
			minutes: minutesOnDay(sessions, d),
			key: dayKey(d)
		};
	});
}
function minutesByCourse(sessions) {
	const map = /* @__PURE__ */ new Map();
	for (const s of sessions) {
		const k = s.courseId ?? "_none";
		map.set(k, (map.get(k) ?? 0) + s.durationMin);
	}
	return map;
}
function upcomingAssignments(assignments, withinDays = 14) {
	const until = Date.now() + withinDays * 864e5;
	return assignments.filter((a) => a.status !== "done").filter((a) => {
		return new Date(a.dueAt).getTime() <= until;
	}).sort((a, b) => +new Date(a.dueAt) - +new Date(b.dueAt));
}
function upcomingExams(exams, withinDays = 45) {
	const now = Date.now();
	const until = now + withinDays * 864e5;
	return exams.filter((e) => typeof e.score !== "number").filter((e) => {
		const t = new Date(e.startsAt).getTime();
		return t >= now - 864e5 && t <= until;
	}).sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt));
}
function todaySlots(slots) {
	const idx = jsDayToMonIndex((/* @__PURE__ */ new Date()).getDay());
	return slots.filter((s) => s.day === idx).sort((a, b) => a.start.localeCompare(b.start));
}
function courseById(courses, id) {
	return courses.find((c) => c.id === id);
}
function dueCards(cards, deckId) {
	return cards.filter((c) => (!deckId || c.deckId === deckId) && isDue(c));
}
function goalProgress(goal, sessions, cards, coursePct) {
	if (goal.kind === "hours") {
		const hours = (goal.period === "week" ? minutesThisWeek(sessions) : sessions.reduce((n, s) => n + s.durationMin, 0)) / 60;
		return {
			current: hours,
			ratio: Math.min(1, hours / goal.target)
		};
	}
	if (goal.kind === "cards") {
		const reviewed = cards.filter((c) => c.reps > 0).length;
		return {
			current: reviewed,
			ratio: Math.min(1, reviewed / goal.target)
		};
	}
	const pct = coursePct ?? 0;
	return {
		current: pct,
		ratio: goal.target ? Math.min(1, pct / goal.target) : 0
	};
}
function heatmap(sessions, weeks = 8, now = /* @__PURE__ */ new Date()) {
	const end = startOfDay(now);
	const start = addDays(end, -(weeks * 7 - 1));
	const cells = [];
	for (let i = 0; i < weeks * 7; i++) {
		const d = addDays(start, i);
		cells.push({
			key: dayKey(d),
			date: d,
			minutes: minutesOnDay(sessions, d)
		});
	}
	return cells;
}
function chime() {
	try {
		const ctx = new AudioContext();
		const o = ctx.createOscillator();
		const g = ctx.createGain();
		o.type = "sine";
		o.frequency.value = 528;
		g.gain.value = .05;
		o.connect(g);
		g.connect(ctx.destination);
		o.start();
		g.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + .9);
		o.stop(ctx.currentTime + .9);
	} catch {}
}
function Focus() {
	const settings = useFolio((s) => s.settings);
	const courses = useFolio((s) => s.courses);
	const sessions = useFolio((s) => s.sessions);
	const logSession = useFolio((s) => s.logSession);
	const [courseId, setCourseId] = (0, import_react.useState)(courses[0]?.id ?? "");
	const [preset, setPreset] = (0, import_react.useState)(settings.pomodoroMin);
	const [mode, setMode] = (0, import_react.useState)("work");
	const [running, setRunning] = (0, import_react.useState)(false);
	const [remaining, setRemaining] = (0, import_react.useState)(settings.pomodoroMin * 60);
	const [total, setTotal] = (0, import_react.useState)(settings.pomodoroMin * 60);
	const startedAt = (0, import_react.useRef)(null);
	const finishing = (0, import_react.useRef)(false);
	const todayMin = minutesOnDay(sessions, /* @__PURE__ */ new Date());
	(0, import_react.useEffect)(() => {
		if (!running) return;
		const id = window.setInterval(() => {
			setRemaining((r) => Math.max(0, r - 1));
		}, 1e3);
		return () => window.clearInterval(id);
	}, [running]);
	(0, import_react.useEffect)(() => {
		if (remaining !== 0 || !running || !startedAt.current || finishing.current) return;
		finishing.current = true;
		const elapsedMin = Math.max(1, Math.round((Date.now() - startedAt.current) / 6e4));
		if (mode === "work") {
			logSession({
				id: uid(),
				courseId: courseId || void 0,
				startedAt: new Date(startedAt.current).toISOString(),
				durationMin: elapsedMin,
				kind: "focus"
			});
			toast.success("Block complete. Logged to your week.");
			chime();
			setMode("break");
			const b = settings.breakMin * 60;
			setTotal(b);
			setRemaining(b);
			startedAt.current = Date.now();
		} else {
			toast("Break over. Ready when you are.");
			chime();
			setMode("work");
			setRunning(false);
			startedAt.current = null;
			const w = preset * 60;
			setTotal(w);
			setRemaining(w);
		}
		finishing.current = false;
	}, [
		remaining,
		running,
		mode,
		courseId,
		logSession,
		preset,
		settings.breakMin
	]);
	function applyPreset(min) {
		setPreset(min);
		setMode("work");
		setRunning(false);
		startedAt.current = null;
		const s = min * 60;
		setTotal(s);
		setRemaining(s);
	}
	function toggle() {
		if (running) {
			setRunning(false);
			return;
		}
		if (!startedAt.current) startedAt.current = Date.now();
		setRunning(true);
	}
	function reset() {
		setRunning(false);
		startedAt.current = null;
		setMode("work");
		const s = preset * 60;
		setTotal(s);
		setRemaining(s);
	}
	const ratio = total ? remaining / total : 0;
	const r = 54;
	const c = 2 * Math.PI * r;
	const labels = (0, import_react.useMemo)(() => [
		25,
		50,
		90
	].filter((n, i, a) => a.indexOf(n) === i), []);
	const todaySessions = sessions.filter((s) => new Date(s.startedAt).toDateString() === (/* @__PURE__ */ new Date()).toDateString()).sort((a, b) => +new Date(b.startedAt) - +new Date(a.startedAt));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.16em] text-muted",
				children: "Focus"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl text-fg",
				children: mode === "work" ? "Deep work." : "Rest a moment."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative size-64",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 140 140",
						className: "size-full -rotate-90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "70",
							cy: "70",
							r,
							fill: "none",
							stroke: "currentColor",
							className: "text-surface-2",
							strokeWidth: "8"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "70",
							cy: "70",
							r,
							fill: "none",
							stroke: "currentColor",
							className: "text-accent",
							strokeWidth: "8",
							strokeLinecap: "round",
							strokeDasharray: c,
							strokeDashoffset: c * (1 - ratio)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 grid place-items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-5xl tabular leading-none text-fg",
								children: formatTimer(remaining)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs uppercase tracking-[0.16em] text-muted",
								children: mode === "work" ? "focus" : "break"
							})]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center gap-2",
				children: labels.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => applyPreset(n),
					className: `h-9 rounded-full px-3 text-sm font-medium ${preset === n && mode === "work" ? "bg-accent text-accent-fg" : "bg-surface-2 text-muted"}`,
					children: [n, "m"]
				}, n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: courseId,
				onChange: (e) => setCourseId(e.target.value),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "No course"
				}), courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
					value: c.id,
					children: [
						c.code,
						" — ",
						c.name
					]
				}, c.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "lg",
					className: "min-w-36",
					onClick: toggle,
					children: [running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 fill-current" }), running ? "Pause" : "Start"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "lg",
					variant: "secondary",
					onClick: reset,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Reset"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Today",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl tabular",
						children: formatMinutes(todayMin)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "logged in focus sessions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 space-y-2",
						children: todaySessions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "No blocks yet."
						}) : todaySessions.map((s) => {
							const c = courses.find((x) => x.id === s.courseId);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: c?.code ?? "Open study"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular",
									children: formatMinutes(s.durationMin)
								})]
							}, s.id);
						})
					})
				] })
			})
		]
	});
}
function Badge({ className, tone = "muted", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide", {
			muted: "bg-surface-2 text-muted",
			accent: "bg-accent-soft text-accent",
			danger: "bg-danger/12 text-danger",
			warn: "bg-warn/12 text-warn",
			ok: "bg-ok/12 text-ok"
		}[tone], className),
		children
	});
}
function Progress({ value, className, barClassName }) {
	const pct = Math.max(0, Math.min(100, value * 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-1.5 w-full overflow-hidden rounded-full bg-surface-2", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full bg-accent transition-[width] duration-300 ease-out", barClassName),
			style: { width: `${pct}%` }
		})
	});
}
var LETTERS_4 = [
	{
		min: 93,
		letter: "A",
		gpa: 4
	},
	{
		min: 90,
		letter: "A-",
		gpa: 3.7
	},
	{
		min: 87,
		letter: "B+",
		gpa: 3.3
	},
	{
		min: 83,
		letter: "B",
		gpa: 3
	},
	{
		min: 80,
		letter: "B-",
		gpa: 2.7
	},
	{
		min: 77,
		letter: "C+",
		gpa: 2.3
	},
	{
		min: 73,
		letter: "C",
		gpa: 2
	},
	{
		min: 70,
		letter: "C-",
		gpa: 1.7
	},
	{
		min: 67,
		letter: "D+",
		gpa: 1.3
	},
	{
		min: 63,
		letter: "D",
		gpa: 1
	},
	{
		min: 60,
		letter: "D-",
		gpa: .7
	},
	{
		min: 0,
		letter: "F",
		gpa: 0
	}
];
function letterFromPercent(pct) {
	return LETTERS_4.find((r) => pct >= r.min)?.letter ?? "F";
}
function percentToGpa(pct, scale) {
	if (scale === 10) return Math.round(pct / 10 * 10) / 10;
	const base = LETTERS_4.find((r) => pct >= r.min)?.gpa ?? 0;
	if (scale === 5) return Math.round(base * 1.25 * 100) / 100;
	return base;
}
function weightedPercent(items) {
	const scored = items.filter((i) => typeof i.score === "number");
	if (!scored.length) return null;
	const w = scored.reduce((s, i) => s + i.weight, 0);
	if (w <= 0) return null;
	return scored.reduce((s, i) => s + i.weight * i.score, 0) / w;
}
function remainingWeight(items) {
	const used = items.filter((i) => typeof i.score === "number").reduce((s, i) => s + i.weight, 0);
	return Math.max(0, 100 - used);
}
function courseItems(courseId, assignments, exams) {
	return [...assignments.filter((a) => a.courseId === courseId), ...exams.filter((e) => e.courseId === courseId)];
}
function coursePercent(courseId, assignments, exams) {
	return weightedPercent(courseItems(courseId, assignments, exams));
}
function termGpa(courses, assignments, exams, scale) {
	let points = 0;
	let credits = 0;
	for (const c of courses) {
		const pct = coursePercent(c.id, assignments, exams);
		if (pct == null) continue;
		points += percentToGpa(pct, scale) * c.credits;
		credits += c.credits;
	}
	if (!credits) return null;
	return Math.round(points / credits * 100) / 100;
}
function formatGpa(n, scale) {
	if (n == null) return "—";
	const digits = scale === 10 ? 1 : 2;
	return n.toFixed(digits);
}
function neededForTarget(current, remaining, target) {
	if (remaining <= 0) return current;
	const have = current ?? 0;
	const haveW = 100 - remaining;
	const need = (target * 100 - have * haveW) / remaining;
	return Math.round(need * 10) / 10;
}
function Home$1({ go, compose }) {
	const courses = useFolio((s) => s.courses);
	const assignments = useFolio((s) => s.assignments);
	const exams = useFolio((s) => s.exams);
	const sessions = useFolio((s) => s.sessions);
	const slots = useFolio((s) => s.slots);
	const goals = useFolio((s) => s.goals);
	const cards = useFolio((s) => s.cards);
	const settings = useFolio((s) => s.settings);
	const name = settings.name.split(" ")[0] || "there";
	const hour = (/* @__PURE__ */ new Date()).getHours();
	const hello = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
	const gpa = termGpa(courses, assignments, exams, settings.gpaScale);
	const weekMin = minutesThisWeek(sessions);
	const streak = streakDays(sessions);
	const due = upcomingAssignments(assignments, 10).slice(0, 5);
	const nextExams = upcomingExams(exams, 40).slice(0, 3);
	const today = todaySlots(slots);
	const days = lastNDays(sessions, 7);
	const maxMin = Math.max(1, ...days.map((d) => d.minutes));
	const weekGoal = settings.weeklyHourGoal * 60;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "pt-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-muted",
						children: format(/* @__PURE__ */ new Date(), "EEEE d MMMM")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-1 font-display text-[2.15rem] leading-[1.1] text-fg",
						children: [
							hello,
							", ",
							name,
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-md text-sm text-muted",
						children: streak > 0 ? `${streak}-day streak. ${formatHours(weekMin)} logged this week.` : "Start a focus block to open the week."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Streak",
						value: `${streak}d`,
						hint: "consecutive days"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "This week",
						value: formatHours(weekMin),
						hint: `of ${settings.weeklyHourGoal}h`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "GPA",
						value: formatGpa(gpa, settings.gpaScale),
						hint: `${settings.gpaScale}.0 scale`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => go({ name: "focus" }),
				className: "flex w-full items-center gap-4 rounded-2xl bg-accent px-4 py-3.5 text-left text-accent-fg transition-transform duration-150 active:scale-[0.99]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-11 place-items-center rounded-xl bg-accent-fg/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-5 fill-current" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-medium",
							children: "Start a focus block"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block text-xs opacity-80",
							children: [settings.pomodoroMin, " minutes · keep the streak"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-4 opacity-80" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "This week",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-end gap-1.5",
					children: days.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-20 w-full items-end rounded-md bg-surface-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full rounded-md bg-accent",
								style: { height: `${Math.max(d.minutes ? 8 : 0, d.minutes / maxMin * 100)}%` }
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-wide text-subtle",
							children: format(d.date, "EEEEE")
						})]
					}, d.key))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1.5 flex justify-between text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Weekly goal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular",
							children: [
								formatMinutes(weekMin),
								" / ",
								settings.weeklyHourGoal,
								"h"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: weekGoal ? weekMin / weekGoal : 0 })]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Today's classes",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-xs font-medium text-accent",
					onClick: () => go({
						name: "planner",
						tab: "timetable"
					}),
					children: "Timetable"
				}),
				children: today.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No classes on the grid today."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: today.map((slot) => {
						const c = courseById(courses, slot.courseId);
						if (!c) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							onClick: () => go({
								name: "course",
								id: c.id
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "w-16 shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium tabular",
											children: slot.start
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-subtle tabular",
											children: slot.end
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-medium",
											children: c.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted",
											children: [
												c.code,
												" · ",
												slot.room || c.room
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseChip, { course: c })
								]
							})
						}, slot.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Due soon",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-xs font-medium text-accent",
					onClick: () => go({
						name: "planner",
						tab: "agenda"
					}),
					children: "Planner"
				}),
				children: due.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Nothing open in the next ten days."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: due.map((a) => {
						const c = courseById(courses, a.courseId);
						const late = +new Date(a.dueAt) < Date.now();
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							onClick: () => compose({
								type: "assignment",
								value: a
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-medium",
										children: a.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-0.5 text-xs text-muted",
										children: [
											c?.code,
											" · ",
											relativeDue(a.dueAt)
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: late ? "danger" : a.priority === "high" ? "warn" : "muted",
									children: a.status === "doing" ? "Doing" : late ? "Late" : a.priority
								})]
							})
						}, a.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Upcoming exams",
				children: nextExams.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No exams on the horizon."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: nextExams.map((e) => {
						const c = courseById(courses, e.courseId);
						const daysOut = Math.max(0, Math.ceil((+new Date(e.startsAt) - Date.now()) / 864e5));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							onClick: () => compose({
								type: "exam",
								value: e
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid size-12 shrink-0 place-items-center rounded-xl bg-accent-soft",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-xl tabular leading-none text-accent",
											children: daysOut
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-medium",
											children: e.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted",
											children: [
												c?.code,
												" ·",
												" ",
												daysOut === 0 ? "today" : daysOut === 1 ? "tomorrow" : `${daysOut} days`
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 text-subtle" })
								]
							})
						}, e.id);
					})
				})
			}),
			goals.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Goals",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-xs font-medium text-accent",
					onClick: () => compose({ type: "goal" }),
					children: "Add"
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: goals.map((g) => {
						const pct = g.kind === "grade" ? coursePercent(g.courseId ?? "", assignments, exams) : null;
						const p = goalProgress(g, sessions, cards, pct);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							onClick: () => compose({
								type: "goal",
								value: g
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: g.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs tabular text-muted",
									children: [g.kind === "hours" ? formatHours(p.current * 60) : Math.round(p.current), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-subtle",
										children: [" / ", g.target]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: p.ratio })]
						}, g.id);
					})
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				className: "w-full",
				onClick: () => go({ name: "assistant" }),
				children: "Ask the tutor"
			})
		]
	});
}
function Library({ tab, setTab, go, compose }) {
	const [q, setQ] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.16em] text-muted",
					children: "Library"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl text-fg",
					children: "Courses, notes, cards."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon-sm",
					onClick: () => compose(tab === "notes" ? { type: "note" } : tab === "cards" ? { type: "deck" } : { type: "course" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Search the term"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 rounded-xl bg-surface-2 p-1",
				children: [
					"courses",
					"notes",
					"cards"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(t),
					className: cn("h-9 flex-1 rounded-lg text-sm font-medium capitalize", tab === t ? "bg-surface text-fg shadow-card" : "text-muted"),
					children: t
				}, t))
			}),
			tab === "courses" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Courses, {
				q,
				go
			}) : null,
			tab === "notes" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notes, {
				q,
				compose
			}) : null,
			tab === "cards" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Decks, {
				q,
				go,
				compose
			}) : null
		]
	});
}
function Courses({ q, go }) {
	const courses = useFolio((s) => s.courses);
	const assignments = useFolio((s) => s.assignments);
	const exams = useFolio((s) => s.exams);
	const sessions = useFolio((s) => s.sessions);
	const settings = useFolio((s) => s.settings);
	const hours = minutesByCourse(sessions);
	const query = q.trim().toLowerCase();
	const list = courses.filter((c) => !query || `${c.name} ${c.code} ${c.instructor}`.toLowerCase().includes(query));
	if (!list.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
		title: "No courses",
		body: "Add a course to start tracking the term."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		children: list.map((c) => {
			const pct = coursePercent(c.id, assignments, exams);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				onClick: () => go({
					name: "course",
					id: c.id
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseDot, {
							tint: c.tint,
							className: "size-3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: c.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									c.code,
									" · ",
									c.credits,
									" cr · ",
									formatHours(hours.get(c.id) ?? 0)
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium tabular",
								children: pct == null ? "—" : `${Math.round(pct)}%`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted",
								children: pct == null ? "no grades" : formatGpa(percentToGpa(pct, settings.gpaScale), settings.gpaScale)
							})]
						})
					]
				})
			}, c.id);
		})
	});
}
function Notes({ q, compose }) {
	const notes = useFolio((s) => s.notes);
	const courses = useFolio((s) => s.courses);
	const query = q.trim().toLowerCase();
	const list = notes.filter((n) => !query || `${n.title} ${n.body}`.toLowerCase().includes(query)).slice().sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
	if (!list.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
		title: "No notes",
		body: "Capture a lecture, a proof, a draft."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		children: list.map((n) => {
			const c = courses.find((x) => x.id === n.courseId);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				onClick: () => compose({
					type: "note",
					value: n
				}),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: n.title
						}), c ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseChip, { course: c }) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 line-clamp-2 text-sm text-muted",
						children: n.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[11px] text-subtle",
						children: formatShortDate(n.updatedAt)
					})
				]
			}, n.id);
		})
	});
}
function Decks({ q, go, compose }) {
	const decks = useFolio((s) => s.decks);
	const cards = useFolio((s) => s.cards);
	const courses = useFolio((s) => s.courses);
	const query = q.trim().toLowerCase();
	const list = decks.filter((d) => !query || d.name.toLowerCase().includes(query));
	if (!list.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
		title: "No decks",
		body: "Make a deck, then add cards or ask the tutor to draft them."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		children: list.map((d) => {
			const n = cards.filter((c) => c.deckId === d.id);
			const due = dueCards(n).length;
			const c = courses.find((x) => x.id === d.courseId);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				onClick: () => go({
					name: "deck",
					id: d.id
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-10 place-items-center rounded-xl bg-accent-soft text-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: d.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									n.length,
									" cards · ",
									due,
									" due ",
									c ? `· ${c.code}` : ""
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-xs font-medium text-accent",
							onClick: (e) => {
								e.stopPropagation();
								compose({
									type: "card",
									deckId: d.id
								});
							},
							children: "Add card"
						})
					]
				})
			}, d.id);
		})
	});
}
function CourseDetail({ id, go, compose }) {
	const course = useFolio((s) => s.courses.find((c) => c.id === id));
	const assignments = useFolio((s) => s.assignments.filter((a) => a.courseId === id));
	const exams = useFolio((s) => s.exams.filter((e) => e.courseId === id));
	const notes = useFolio((s) => s.notes.filter((n) => n.courseId === id));
	const decks = useFolio((s) => s.decks.filter((d) => d.courseId === id));
	const sessions = useFolio((s) => s.sessions);
	const settings = useFolio((s) => s.settings);
	if (!course) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
		title: "Course missing",
		body: "It may have been removed.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: () => go({ name: "library" }),
			children: "Back"
		})
	});
	const pct = coursePercent(id, assignments, exams);
	const rem = remainingWeight(courseItems(id, assignments, exams));
	const need = neededForTarget(pct, rem, course.targetGrade);
	const hours = (minutesByCourse(sessions).get(id) ?? 0) / 60;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "flex items-center gap-1 text-sm text-muted",
				onClick: () => go({
					name: "library",
					tab: "courses"
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Library"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-muted",
						children: course.code
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl text-fg",
						children: course.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							course.instructor,
							" · ",
							course.credits,
							" credits · ",
							course.room
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					onClick: () => compose({
						type: "course",
						value: course
					}),
					children: "Edit"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ring, {
					value: (pct ?? 0) / 100,
					size: 72,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium tabular",
						children: pct == null ? "—" : `${Math.round(pct)}`
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: pct == null ? "No graded work yet" : `${letterFromPercent(pct)} · ${formatGpa(percentToGpa(pct, settings.gpaScale), settings.gpaScale)} GPA`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted",
							children: [
								"Target ",
								course.targetGrade,
								"%",
								need != null && rem > 0 ? ` · need ${Math.max(0, need).toFixed(0)}% on remaining ${rem}%` : ""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-subtle",
							children: [hours.toFixed(1), "h focused this term"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					className: "flex-1",
					onClick: () => compose({
						type: "assignment",
						courseId: id
					}),
					children: "Assignment"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					className: "flex-1",
					onClick: () => compose({
						type: "exam",
						courseId: id
					}),
					children: "Exam"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Work",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: [...assignments, ...exams].map((x) => "dueAt" in x ? {
						at: x.dueAt,
						kind: "a",
						x
					} : {
						at: x.startsAt,
						kind: "e",
						x
					}).sort((a, b) => +new Date(a.at) - +new Date(b.at)).map((row) => row.kind === "a" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						onClick: () => compose({
							type: "assignment",
							value: row.x
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: row.x.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs tabular text-muted",
								children: typeof row.x.score === "number" ? `${row.x.score}%` : `${row.x.weight}%`
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: row.x.status
						})]
					}, row.x.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						onClick: () => compose({
							type: "exam",
							value: row.x
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: row.x.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "accent",
								children: row.x.type
							})]
						})
					}, row.x.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Notes",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-xs font-medium text-accent",
					onClick: () => compose({
						type: "note",
						courseId: id
					}),
					children: "Add"
				}),
				children: notes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No notes for this course."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						onClick: () => compose({
							type: "note",
							value: n
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: n.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "line-clamp-2 text-sm text-muted",
							children: n.body
						})]
					}, n.id))
				})
			}),
			decks.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Decks",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: decks.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						onClick: () => go({
							name: "deck",
							id: d.id
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: d.name
						})
					}, d.id))
				})
			}) : null
		]
	});
}
function DeckStudy({ id, go, compose }) {
	const deck = useFolio((s) => s.decks.find((d) => d.id === id));
	const cards = useFolio((s) => s.cards.filter((c) => c.deckId === id));
	const review = useFolio((s) => s.review);
	const queue = (0, import_react.useMemo)(() => dueCards(cards), [cards]);
	const [i, setI] = (0, import_react.useState)(0);
	const [flipped, setFlipped] = (0, import_react.useState)(false);
	const card = queue[i];
	function grade(q) {
		if (!card) return;
		review(card.id, q);
		setFlipped(false);
		setI(0);
	}
	if (!deck) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
		title: "Deck missing",
		body: "It may have been removed.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: () => go({
				name: "library",
				tab: "cards"
			}),
			children: "Back"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "flex items-center gap-1 text-sm text-muted",
				onClick: () => go({
					name: "library",
					tab: "cards"
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Library"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-muted",
						children: "Flashcards"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl",
						children: deck.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							queue.length,
							" due · ",
							cards.length,
							" total"
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					onClick: () => compose({
						type: "card",
						deckId: id
					}),
					children: "Add"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: cards.length ? (cards.length - queue.length) / cards.length : 0 }),
			!card ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				title: "Caught up",
				body: "No cards are due. Add more, or come back tomorrow.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => compose({
						type: "card",
						deckId: id
					}),
					children: "New card"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setFlipped((f) => !f),
				className: "flex min-h-56 w-full flex-col justify-center rounded-3xl border border-border bg-surface p-6 text-left shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-[0.14em] text-muted",
						children: flipped ? "Answer" : "Prompt"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-2xl leading-snug",
						children: flipped ? card.back : card.front
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-xs text-subtle",
						children: "Tap to flip"
					})
				]
			}), flipped ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-2",
				children: [
					[1, "Again"],
					[3, "Hard"],
					[4, "Good"],
					[5, "Easy"]
				].map(([q, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: q === 4 || q === 5 ? "primary" : "secondary",
					size: "sm",
					onClick: () => grade(q),
					children: label
				}, q))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				className: "w-full",
				onClick: () => setFlipped(true),
				children: "Show answer"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "All cards",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						onClick: () => compose({
							type: "card",
							value: c,
							deckId: id
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium line-clamp-1",
							children: c.front
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								c.reps,
								" reviews · due ",
								formatShortDate(c.dueAt)
							]
						})]
					}, c.id))
				})
			})
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var askTutor = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("e4b298ada733254d7dc14aac47b9f6d9ecc8198d39cd13d11e0d91f3eeec50d8"));
function parseCardsJson(text) {
	const start = text.indexOf("{");
	const end = text.lastIndexOf("}");
	if (start < 0 || end <= start) return [];
	try {
		return (JSON.parse(text.slice(start, end + 1)).cards ?? []).map((c) => ({
			front: (c.front ?? "").trim(),
			back: (c.back ?? "").trim()
		})).filter((c) => c.front && c.back).slice(0, 12);
	} catch {
		return [];
	}
}
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
function More({ go }) {
	const settings = useFolio((s) => s.settings);
	const items = [
		{
			name: "grades",
			label: "Gradebook",
			hint: "GPA, weights, what-if",
			icon: GraduationCap
		},
		{
			name: "analytics",
			label: "Analytics",
			hint: "Hours, streak, heatmap",
			icon: ChartLine
		},
		{
			name: "assistant",
			label: "Tutor",
			hint: "Explain, quiz, make cards",
			icon: MessageSquare
		},
		{
			name: "settings",
			label: "Settings",
			hint: "Profile, theme, data",
			icon: Settings
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.16em] text-muted",
				children: "More"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: settings.name || "Folio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: [settings.major, settings.school].filter(Boolean).join(" · ") || "Your academic OS"
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				onClick: () => go({ name: it.name }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-10 place-items-center rounded-xl bg-accent-soft text-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: it.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: it.hint
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-subtle" })
					]
				})
			}, it.name))
		})]
	});
}
function Grades({ go }) {
	const courses = useFolio((s) => s.courses);
	const assignments = useFolio((s) => s.assignments);
	const exams = useFolio((s) => s.exams);
	const settings = useFolio((s) => s.settings);
	const gpa = termGpa(courses, assignments, exams, settings.gpaScale);
	const [whatIf, setWhatIf] = (0, import_react.useState)({});
	const rows = courses.map((c) => {
		const items = courseItems(c.id, assignments, exams);
		const pct = coursePercent(c.id, assignments, exams);
		const rem = remainingWeight(items);
		const guess = whatIf[c.id] ?? c.targetGrade;
		return {
			c,
			pct,
			rem,
			projected: rem > 0 ? ((pct ?? 0) * (100 - rem) + guess * rem) / 100 : pct,
			need: neededForTarget(pct, rem, c.targetGrade)
		};
	});
	const projectedGpa = (() => {
		let pts = 0;
		let cr = 0;
		for (const r of rows) {
			if (r.projected == null) continue;
			pts += percentToGpa(r.projected, settings.gpaScale) * r.c.credits;
			cr += r.c.credits;
		}
		return cr ? Math.round(pts / cr * 100) / 100 : null;
	})();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Back, {
				go,
				label: "Gradebook"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Term GPA",
					value: formatGpa(gpa, settings.gpaScale),
					hint: `${settings.gpaScale}.0 scale`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "What-if",
					value: formatGpa(projectedGpa, settings.gpaScale),
					hint: "with remaining work"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					onClick: () => go({
						name: "course",
						id: r.c.id
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseDot, { tint: r.c.tint }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: r.c.code
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									r.c.credits,
									" cr · target ",
									r.c.targetGrade,
									"%"
								]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium tabular",
								children: r.pct == null ? "—" : `${Math.round(r.pct)}% ${letterFromPercent(r.pct)}`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted",
								children: r.pct == null ? "ungraded" : formatGpa(percentToGpa(r.pct, settings.gpaScale), settings.gpaScale)
							})]
						})]
					}), r.rem > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						onClick: (e) => e.stopPropagation(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex justify-between text-[11px] text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Remaining ",
								r.rem,
								"% — need",
								" ",
								r.need == null ? "—" : `${Math.max(0, r.need).toFixed(0)}%`
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular",
								children: whatIf[r.c.id] ?? ""
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: 100,
							value: whatIf[r.c.id] ?? r.c.targetGrade,
							onChange: (e) => setWhatIf((w) => ({
								...w,
								[r.c.id]: Number(e.target.value)
							})),
							className: "w-full accent-accent"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						className: "mt-3",
						value: (r.pct ?? 0) / 100
					})]
				}, r.c.id))
			})
		]
	});
}
function AnalyticsView({ go }) {
	const sessions = useFolio((s) => s.sessions);
	const courses = useFolio((s) => s.courses);
	const days = lastNDays(sessions, 7);
	const week = minutesThisWeek(sessions);
	const streak = streakDays(sessions);
	const term = sessions.reduce((n, s) => n + s.durationMin, 0);
	const byCourse = minutesByCourse(sessions);
	const cells = heatmap(sessions, 8);
	const max = Math.max(1, ...cells.map((c) => c.minutes));
	const chart = days.map((d) => ({
		name: format(d.date, "EEE"),
		hours: Math.round(d.minutes / 60 * 10) / 10
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Back, {
				go,
				label: "Analytics"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Streak",
						value: `${streak}d`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Week",
						value: formatHours(week)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Term",
						value: formatHours(term)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Last 7 days",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-44 rounded-2xl border border-border bg-surface p-2 shadow-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: chart,
							barSize: 18,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "var(--color-border)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "name",
									tick: {
										fill: "var(--color-muted)",
										fontSize: 11
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { hide: true }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									cursor: { fill: "var(--color-surface-2)" },
									contentStyle: {
										background: "var(--color-surface)",
										border: "1px solid var(--color-border)",
										borderRadius: 12,
										fontSize: 12
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "hours",
									fill: "var(--color-accent)",
									radius: [
										6,
										6,
										0,
										0
									]
								})
							]
						})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "By course",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: courses.map((c) => {
						const m = byCourse.get(c.id) ?? 0;
						const ratio = term ? m / term : 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseDot, { tint: c.tint }), c.code]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular text-muted",
								children: formatMinutes(m)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: ratio })] }, c.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Eight-week map",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-7 gap-1",
					children: cells.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						title: `${format(c.date, "d MMM")} · ${formatMinutes(c.minutes)}`,
						className: "aspect-square rounded-sm",
						style: { background: c.minutes === 0 ? "var(--color-surface-2)" : `color-mix(in oklab, var(--color-accent) ${Math.max(22, c.minutes / max * 100)}%, var(--color-surface-2))` }
					}, c.key))
				})
			})
		]
	});
}
var PROMPTS = [
	"Explain the Master theorem with one worked example.",
	"Quiz me on eigenvalues until I miss one.",
	"Build a 5-day plan for my algorithms midterm.",
	"Tighten these notes into an exam sheet."
];
function Assistant({ go }) {
	const courses = useFolio((s) => s.courses);
	const decks = useFolio((s) => s.decks);
	const saveDeck = useFolio((s) => s.saveDeck);
	const saveCard = useFolio((s) => s.saveCard);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [input, setInput] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [courseId, setCourseId] = (0, import_react.useState)(courses[0]?.id ?? "");
	async function send(text, mode = "chat") {
		const trimmed = text.trim();
		if (!trimmed || busy) return;
		const next = [...messages, {
			role: "user",
			content: trimmed
		}];
		setMessages(next);
		setInput("");
		setBusy(true);
		try {
			const res = await askTutor({ data: {
				messages: next,
				mode
			} });
			if (!res.ok) {
				toast.error(res.error);
				setMessages([...next, {
					role: "assistant",
					content: res.error
				}]);
				return;
			}
			if (mode === "cards") {
				const parsed = parseCardsJson(res.text);
				if (!parsed.length) {
					setMessages([...next, {
						role: "assistant",
						content: "I couldn't parse cards from that. Try a narrower topic."
					}]);
					return;
				}
				const name = `Tutor · ${trimmed.slice(0, 32)}`;
				const deck = {
					id: crypto.randomUUID(),
					courseId: courseId || void 0,
					name
				};
				saveDeck(deck);
				for (const c of parsed) saveCard(makeFlash(deck.id, c.front, c.back));
				toast.success(`${parsed.length} cards saved to “${name}”.`);
				setMessages([...next, {
					role: "assistant",
					content: `Saved ${parsed.length} cards to “${name}”. Open Library → Cards to study.`
				}]);
			} else setMessages([...next, {
				role: "assistant",
				content: res.text
			}]);
		} catch {
			toast.error("The tutor could not be reached.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[70vh] flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Back, {
				go,
				label: "Tutor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Explanations, quizzes, and generated decks. Calls are on you."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Attach course",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: courseId,
					onChange: (e) => setCourseId(e.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "None"
					}), courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: c.code
					}, c.id))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-1.5",
				children: PROMPTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "rounded-full bg-surface-2 px-3 py-1.5 text-left text-xs text-fg",
					onClick: () => send(p),
					children: p
				}, p))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "folio-scroll mt-4 flex-1 space-y-3",
				children: [messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
					title: "Ask Folio",
					body: "Paste a theorem, a prompt, or a messy note. Keep it specific."
				}) : messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap", m.role === "user" ? "ml-6 bg-accent text-accent-fg" : "mr-6 border border-border bg-surface"),
					children: m.content
				}, i)), busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.14em] text-muted",
					children: "Thinking…"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 space-y-2",
				onSubmit: (e) => {
					e.preventDefault();
					send(input);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: input,
					onChange: (e) => setInput(e.target.value),
					placeholder: "Ask, paste notes, or describe a deck…",
					className: "min-h-24"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "secondary",
						className: "flex-1",
						disabled: busy,
						onClick: () => void send(input, "cards"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), "Make cards"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "flex-1",
						disabled: busy,
						children: "Send"
					})]
				})]
			}),
			decks.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "mt-3 text-xs font-medium text-accent",
				onClick: () => go({
					name: "library",
					tab: "cards"
				}),
				children: [decks.length, " decks in the library"]
			}) : null
		]
	});
}
function SettingsView({ go }) {
	const settings = useFolio((s) => s.settings);
	const patch = useFolio((s) => s.patchSettings);
	const loadSeed = useFolio((s) => s.loadSeed);
	const resetAll = useFolio((s) => s.resetAll);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Back, {
				go,
				label: "Settings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Name",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: settings.name,
					onChange: (e) => patch({ name: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "School",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: settings.school,
					onChange: (e) => patch({ school: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Major",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: settings.major,
					onChange: (e) => patch({ major: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "GPA scale",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: String(settings.gpaScale),
						onChange: (e) => patch({ gpaScale: Number(e.target.value) }),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "4",
								children: "4.0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "5",
								children: "5.0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "10",
								children: "10.0"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Theme",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: settings.theme,
						onChange: (e) => patch({ theme: e.target.value }),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "light",
								children: "Light"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "dark",
								children: "Dark"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "system",
								children: "System"
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Focus min",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: settings.pomodoroMin,
							onChange: (e) => patch({ pomodoroMin: Number(e.target.value) || 25 })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Break min",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: settings.breakMin,
							onChange: (e) => patch({ breakMin: Number(e.target.value) || 5 })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Week hours",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: settings.weeklyHourGoal,
							onChange: (e) => patch({ weeklyHourGoal: Number(e.target.value) || 10 })
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Account Identity",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					className: "w-full",
					onClick: () => {
						loadSeed();
						toast.success("Loaded the sample Northridge term.");
					},
					children: "Load sample term"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					className: "w-full text-danger",
					onClick: () => {
						if (confirm("Erase all local Folio data?")) {
							resetAll();
							toast("Cleared. Add a course to begin.");
						}
					},
					children: "Erase all data"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-subtle",
				children: "Everything stays on this device. No account required."
			})
		]
	});
}
function Back({ go, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "flex items-center gap-1 text-sm text-muted",
		onClick: () => go({ name: "more" }),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " More"]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "mt-2 font-display text-3xl",
		children: label
	})] });
}
function Planner({ tab, setTab, go, compose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.16em] text-muted",
					children: "Planner"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl text-fg",
					children: "The week, in order."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon-sm",
					onClick: () => compose({ type: tab === "timetable" ? "slot" : tab === "agenda" ? "assignment" : "exam" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 rounded-xl bg-surface-2 p-1",
				children: [
					"agenda",
					"calendar",
					"timetable"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(t),
					className: cn("h-9 flex-1 rounded-lg text-sm font-medium capitalize", tab === t ? "bg-surface text-fg shadow-card" : "text-muted"),
					children: t
				}, t))
			}),
			tab === "agenda" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Agenda, {
				compose,
				go
			}) : null,
			tab === "calendar" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Month, { compose }) : null,
			tab === "timetable" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timetable, { compose }) : null
		]
	});
}
function Agenda({ compose, go }) {
	const assignments = useFolio((s) => s.assignments);
	const exams = useFolio((s) => s.exams);
	const courses = useFolio((s) => s.courses);
	const [filter, setFilter] = (0, import_react.useState)("open");
	const items = (0, import_react.useMemo)(() => {
		const a = (filter === "done" ? assignments.filter((x) => x.status === "done") : filter === "open" ? upcomingAssignments(assignments, 60) : assignments).map((x) => ({
			kind: "assignment",
			at: x.dueAt,
			id: x.id,
			data: x
		}));
		const e = (filter === "done" ? exams.filter((x) => typeof x.score === "number") : upcomingExams(exams, 90)).map((x) => ({
			kind: "exam",
			at: x.startsAt,
			id: x.id,
			data: x
		}));
		return [...a, ...e].sort((x, y) => +new Date(x.at) - +new Date(y.at));
	}, [
		assignments,
		exams,
		filter
	]);
	const groups = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const it of items) {
			const k = formatDay(it.at);
			const list = map.get(k) ?? [];
			list.push(it);
			map.set(k, list);
		}
		return [...map.entries()];
	}, [items]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1.5",
				children: [
					"open",
					"all",
					"done"
				].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter(f),
					className: cn("h-8 rounded-full px-3 text-xs font-medium capitalize", filter === f ? "bg-accent text-accent-fg" : "bg-surface-2 text-muted"),
					children: f
				}, f))
			}),
			groups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				title: "Quiet calendar",
				body: "Add an assignment or exam to fill the agenda."
			}) : groups.map(([day, list]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: day,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: list.map((it) => {
						if (it.kind === "assignment") {
							const a = it.data;
							const c = courseById(courses, a.courseId);
							const late = a.status !== "done" && +new Date(a.dueAt) < Date.now();
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								onClick: () => compose({
									type: "assignment",
									value: a
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-medium",
											children: a.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-0.5 text-xs text-muted",
											children: [
												c?.code,
												" · ",
												relativeDue(a.dueAt)
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [c ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseChip, { course: c }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											tone: late ? "danger" : a.status === "done" ? "ok" : a.priority === "high" ? "warn" : "muted",
											children: a.status === "done" ? "Done" : late ? "Late" : a.status
										})]
									})]
								})
							}, a.id);
						}
						const e = it.data;
						const c = courseById(courses, e.courseId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							onClick: () => compose({
								type: "exam",
								value: e
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: e.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-0.5 text-xs text-muted",
									children: [
										c?.code,
										" · ",
										formatClock(e.startsAt),
										" · ",
										e.location
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "accent",
									children: e.type
								})]
							})
						}, e.id);
					})
				})
			}, day)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				className: "w-full",
				onClick: () => go({ name: "grades" }),
				children: "Open gradebook"
			})
		]
	});
}
function Month({ compose }) {
	const [cursor, setCursor] = (0, import_react.useState)(() => startOfMonth(/* @__PURE__ */ new Date()));
	const assignments = useFolio((s) => s.assignments);
	const exams = useFolio((s) => s.exams);
	const courses = useFolio((s) => s.courses);
	const start = startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 });
	const end = addDays(start, 41);
	const days = eachDayOfInterval({
		start,
		end
	});
	const [selected, setSelected] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const marks = (d) => {
		return {
			a: assignments.filter((x) => isSameDay(new Date(x.dueAt), d)),
			e: exams.filter((x) => isSameDay(new Date(x.startsAt), d))
		};
	};
	const sel = marks(selected);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: format(cursor, "MMMM yyyy")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon-sm",
						variant: "ghost",
						onClick: () => setCursor(addMonths(cursor, -1)),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon-sm",
						variant: "ghost",
						onClick: () => setCursor(addMonths(cursor, 1)),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wide text-subtle",
				children: WEEKDAYS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: d }, d))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 gap-1",
				children: days.map((d) => {
					const m = marks(d);
					const on = isSameDay(d, selected);
					const today = isSameDay(d, /* @__PURE__ */ new Date());
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setSelected(d),
						className: cn("flex h-12 flex-col items-center justify-center rounded-xl text-sm tabular", !isSameMonth(d, cursor) && "text-subtle", on && "bg-accent text-accent-fg", !on && today && "bg-accent-soft text-accent"),
						children: [format(d, "d"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-0.5 flex gap-0.5",
							children: [m.a.slice(0, 2).map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1 rounded-full", on ? "bg-accent-fg" : "bg-warn") }, x.id)), m.e.slice(0, 2).map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1 rounded-full", on ? "bg-accent-fg" : "bg-accent") }, x.id))]
						})]
					}, d.toISOString());
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: format(selected, "EEEE d MMMM"),
				children: sel.a.length + sel.e.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Nothing scheduled."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [sel.e.map((e) => {
						const c = courseById(courses, e.courseId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							onClick: () => compose({
								type: "exam",
								value: e
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: e.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									c?.code,
									" · ",
									formatClock(e.startsAt)
								]
							})]
						}, e.id);
					}), sel.a.map((a) => {
						const c = courseById(courses, a.courseId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							onClick: () => compose({
								type: "assignment",
								value: a
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: a.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									c?.code,
									" · ",
									a.status
								]
							})]
						}, a.id);
					})]
				})
			})
		]
	});
}
var HOURS = Array.from({ length: 11 }, (_, i) => i + 8);
function timeToMin(t) {
	if (!t) return 0;
	const parts = t.split(":").map(Number);
	const h = parts[0] || 0;
	const m = parts[1] || 0;
	return h * 60 + m;
}
function Timetable({ compose }) {
	const slots = useFolio((s) => s.slots);
	const courses = useFolio((s) => s.courses);
	const today = (/* @__PURE__ */ new Date()).getDay() === 0 ? 6 : (/* @__PURE__ */ new Date()).getDay() - 1;
	const dayCount = slots.some((s) => s.day >= 5) ? 7 : 5;
	const startMin = 480;
	const span = 660;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "-mx-1 overflow-x-auto folio-scroll",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-w-[640px] gap-1",
				style: { gridTemplateColumns: `40px repeat(${dayCount}, 1fr)` },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
					WEEKDAYS.slice(0, dayCount).map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("rounded-lg py-1.5 text-center text-[11px] font-medium uppercase tracking-wide", i === today ? "bg-accent text-accent-fg" : "text-muted"),
						children: d
					}, d)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative h-[520px]",
						style: { gridColumn: `span ${dayCount + 1}` },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 grid",
							style: { gridTemplateColumns: `40px repeat(${dayCount}, 1fr)` },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative",
								children: HOURS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute right-1 text-[10px] tabular text-subtle",
									style: { top: `${(h * 60 - startMin) / span * 100}%` },
									children: h
								}, h))
							}), Array.from({ length: dayCount }, (_, day) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative border-l border-border",
								children: [HOURS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-x-0 border-t border-border/70",
									style: { top: `${(h * 60 - startMin) / span * 100}%` }
								}, h)), slots.filter((s) => s.day === day).map((s) => {
									const c = courseById(courses, s.courseId);
									const top = Math.max(0, Math.min(100, (timeToMin(s.start) - startMin) / span * 100));
									const height = Math.max(4, Math.min(100 - top, (timeToMin(s.end) - timeToMin(s.start)) / span * 100));
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => compose({
											type: "slot",
											value: s
										}),
										className: "absolute inset-x-1 overflow-hidden rounded-lg bg-accent-soft px-1.5 py-1 text-left",
										style: {
											top: `${top}%`,
											height: `${height}%`
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-[11px] font-medium text-accent",
											children: c?.code ?? "Class"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-[10px] text-muted",
											children: s.start
										})]
									}, s.id);
								})]
							}, day))]
						})
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			className: "w-full",
			onClick: () => compose({ type: "slot" }),
			children: "Add class block"
		})]
	});
}
var NAV = [
	{
		name: "home",
		label: "Home",
		icon: House
	},
	{
		name: "planner",
		label: "Planner",
		icon: CalendarDays
	},
	{
		name: "focus",
		label: "Focus",
		icon: Timer
	},
	{
		name: "library",
		label: "Library",
		icon: BookOpen
	},
	{
		name: "more",
		label: "More",
		icon: Menu
	}
];
function applyTheme(theme) {
	const dark = theme === "dark" || theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches;
	document.documentElement.classList.toggle("dark", dark);
}
function FolioApp() {
	const ready = useHydratedFolio();
	const theme = useFolio((s) => s.settings.theme);
	const [screen, setScreen] = (0, import_react.useState)({ name: "home" });
	const [plannerTab, setPlannerTab] = (0, import_react.useState)("agenda");
	const [libraryTab, setLibraryTab] = (0, import_react.useState)("courses");
	const [composer, setComposer] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		applyTheme(theme);
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => applyTheme(useFolio.getState().settings.theme);
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, [theme, ready]);
	function go(s) {
		if (s.name === "planner" && s.tab) setPlannerTab(s.tab);
		if (s.name === "library" && s.tab) setLibraryTab(s.tab);
		setScreen(s);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center bg-bg text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-4xl",
				children: "Folio"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs uppercase tracking-[0.18em] text-muted",
				children: "Opening the term"
			})]
		})
	});
	const tabName = [
		"home",
		"planner",
		"focus",
		"library",
		"more"
	].includes(screen.name) ? screen.name : screen.name === "course" || screen.name === "deck" ? "library" : "more";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex min-h-dvh max-w-6xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "hidden w-56 shrink-0 flex-col justify-between border-r border-border px-3 py-6 lg:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-3 font-display text-3xl",
							children: "Folio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 px-3 text-xs text-muted",
							children: "Academic OS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "mt-8 space-y-1",
							children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => go({ name: n.name }),
								className: cn("flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium", tabName === n.name ? "bg-accent-soft text-accent" : "text-muted hover:bg-surface-2"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "size-4" }), n.label]
							}, n.name))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl border border-border bg-surface p-3 shadow-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "folio-scroll flex-1 px-4 pb-28 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 lg:px-10 lg:pb-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto w-full max-w-xl lg:max-w-2xl",
							children: [
								screen.name === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Home$1, {
									go,
									compose: setComposer
								}) : null,
								screen.name === "planner" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Planner, {
									tab: plannerTab,
									setTab: setPlannerTab,
									go,
									compose: setComposer
								}) : null,
								screen.name === "focus" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Focus, {}) : null,
								screen.name === "library" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Library, {
									tab: libraryTab,
									setTab: setLibraryTab,
									go,
									compose: setComposer
								}) : null,
								screen.name === "course" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseDetail, {
									id: screen.id,
									go,
									compose: setComposer
								}) : null,
								screen.name === "deck" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeckStudy, {
									id: screen.id,
									go,
									compose: setComposer
								}) : null,
								screen.name === "more" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(More, { go }) : null,
								screen.name === "grades" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grades, { go }) : null,
								screen.name === "analytics" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalyticsView, { go }) : null,
								screen.name === "assistant" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Assistant, { go }) : null,
								screen.name === "settings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsView, { go }) : null
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto grid max-w-lg grid-cols-5",
							children: NAV.map((n) => {
								const on = tabName === n.name;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => go({ name: n.name }),
									className: cn("flex h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium", on ? "text-accent" : "text-subtle"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, {
										className: "size-5",
										strokeWidth: on ? 2.2 : 1.7
									}), n.label]
								}, n.name);
							})
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Composer, {
				kind: composer,
				onClose: () => setComposer(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				theme: theme === "dark" ? "dark" : "light"
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolioApp, {});
}
//#endregion
export { Home as component };
