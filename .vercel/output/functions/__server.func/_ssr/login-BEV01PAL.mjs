import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as GROK_PROVIDERS } from "./router-BNtitLDE.mjs";
import { c as signIn, n as Field, o as authClient, r as Input, s as cn, t as Button } from "./client-DFSecBe2.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BEV01PAL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const navigate = useNavigate();
	const [tab, setTab] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function handleEmailSignIn(e) {
		e.preventDefault();
		if (!email.trim() || !password) return;
		setBusy(true);
		try {
			const res = await authClient.signIn.email({
				email,
				password
			});
			if (res.error) toast.error(res.error.message || "Sign-in failed");
			else {
				toast.success("Signed in successfully!");
				navigate({ to: "/" });
			}
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Authentication error");
		} finally {
			setBusy(false);
		}
	}
	async function handleEmailSignUp(e) {
		e.preventDefault();
		if (!email.trim() || !password || !name.trim()) return;
		setBusy(true);
		try {
			const res = await authClient.signUp.email({
				email,
				password,
				name
			});
			if (res.error) toast.error(res.error.message || "Sign-up failed");
			else {
				toast.success("Account created successfully!");
				navigate({ to: "/" });
			}
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Account creation error");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-bg p-6 text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md space-y-6 rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-4xl",
					children: "Folio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs uppercase tracking-[0.18em] text-muted",
					children: "Academic OS Account"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void signIn(p.providerId, { callbackURL: "/" }),
						className: "flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface-2 text-sm font-medium text-fg transition-colors hover:bg-surface-2/80 active:scale-[0.99]",
						children: ["Continue with ", p.label]
					}, p.providerId))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex items-center justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full border-t border-border" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute bg-surface px-3 text-xs uppercase tracking-wider text-subtle",
						children: "or email"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex rounded-xl bg-surface-2 p-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTab("signin"),
						className: cn("h-9 flex-1 rounded-lg text-xs font-medium transition-all", tab === "signin" ? "bg-surface text-fg shadow-card" : "text-muted"),
						children: "Sign In"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTab("signup"),
						className: cn("h-9 flex-1 rounded-lg text-xs font-medium transition-all", tab === "signup" ? "bg-surface text-fg shadow-card" : "text-muted"),
						children: "Create Account"
					})]
				}),
				tab === "signin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleEmailSignIn,
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email address",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "email",
								required: true,
								placeholder: "student@university.edu",
								value: email,
								onChange: (e) => setEmail(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Password",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "password",
								required: true,
								placeholder: "••••••••",
								value: password,
								onChange: (e) => setPassword(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy,
							className: "w-full",
							children: busy ? "Signing in…" : "Sign In with Email"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleEmailSignUp,
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Full name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "text",
								required: true,
								placeholder: "Maya Chen",
								value: name,
								onChange: (e) => setName(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email address",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "email",
								required: true,
								placeholder: "student@university.edu",
								value: email,
								onChange: (e) => setEmail(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Password",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "password",
								required: true,
								minLength: 6,
								placeholder: "At least 6 characters",
								value: password,
								onChange: (e) => setPassword(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy,
							className: "w-full",
							children: busy ? "Creating account…" : "Create Account"
						})
					]
				})
			] })]
		})
	});
}
//#endregion
export { Login as component };
