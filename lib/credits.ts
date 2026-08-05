export type LedgerEvent =
  | "grant"
  | "reserve"
  | "consume"
  | "release"
  | "refund"
  | "expire"
  | "adjustment";
export type Entry = { amount: number; type: LedgerEvent };
export function balance(entries: Entry[]) {
  const value = entries.reduce((sum, e) => sum + e.amount, 0);
  if (value < 0) throw new Error("Credit balance cannot be negative");
  return value;
}
export function reserve(entries: Entry[], amount: number) {
  if (!Number.isInteger(amount) || amount <= 0)
    throw new Error("Reservation must be a positive integer");
  if (balance(entries) < amount) throw new Error("Insufficient credits");
  return [...entries, { amount: -amount, type: "reserve" as const }];
}
