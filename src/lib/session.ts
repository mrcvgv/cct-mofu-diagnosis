const SID_KEY = "mofu_sid";
const RETAKE_KEY = "mofu_retakes";

export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem(SID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SID_KEY, id);
  }
  return id;
}

export function getRetakeCount(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(sessionStorage.getItem(RETAKE_KEY) ?? "0", 10);
}

export function incrementRetakeCount(): number {
  if (typeof window === "undefined") return 0;
  const next = getRetakeCount() + 1;
  sessionStorage.setItem(RETAKE_KEY, String(next));
  return next;
}
