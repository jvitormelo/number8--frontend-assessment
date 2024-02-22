import { test, expect, describe } from "vitest";
import { slugify } from ".";

describe("slugify", () => {
  test("should convert text to lowercase", () => {
    const result = slugify("TEST", 1);
    expect(result).toBe("test-1");
  });

  test("should replace spaces with hyphens", () => {
    const result = slugify("Test String", 1);
    expect(result).toBe("test-string-1");
  });

  test("should append id at the end", () => {
    const result = slugify("Test", 123);
    expect(result).toBe("test-123");
  });

  test("should handle empty string", () => {
    const result = slugify("", 1);
    expect(result).toBe("-1");
  });
});
