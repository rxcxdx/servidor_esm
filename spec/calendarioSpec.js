import yup from "yup";

describe("calendario", () => {
  it("mês", () => {
    const joker = yup.date().validateSync("2025-05");
    expect(joker.getDate()).toBe(1);
    expect(joker.getMonth()).toBe(4);
    expect(joker.getFullYear()).toBe(2025);
  });
  it("dia", () => {
    const joker = yup.date().validateSync("2025-05-01");
    expect(joker.getDate()).toBe(1);
    expect(joker.getMonth()).toBe(4);
    expect(joker.getFullYear()).toBe(2025);
  });
  it("offset", () => {
    const joker = yup.date().validateSync("2025-05-01T00:00:00-03:00");
    expect(joker.getDate()).toBe(1);
    expect(joker.getMonth()).toBe(4);
    expect(joker.getFullYear()).toBe(2025);
  });
  it("utc", () => {
    const joker = yup.date().validateSync("2025-05-01T03:00:00.000Z");
    expect(joker.getDate()).toBe(1);
    expect(joker.getMonth()).toBe(4);
    expect(joker.getFullYear()).toBe(2025);
  });
});
