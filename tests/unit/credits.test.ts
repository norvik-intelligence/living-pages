import { describe, expect, it } from "vitest";
import { balance, reserve } from "../../lib/credits";
describe("credit ledger", () => {
  it("calculates signed ledger entries", () => {
    expect(
      balance([
        { amount: 100, type: "grant" },
        { amount: -25, type: "consume" },
      ]),
    ).toBe(75);
  });
  it("rejects over-reservation", () => {
    expect(() => reserve([{ amount: 10, type: "grant" }], 11)).toThrow(
      "Insufficient",
    );
  });
  it("never returns a negative balance", () => {
    expect(() => balance([{ amount: -1, type: "consume" }])).toThrow(
      "cannot be negative",
    );
  });
});
