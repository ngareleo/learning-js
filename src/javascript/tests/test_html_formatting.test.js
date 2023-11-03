import { readHtmlContent } from "../format_html";

const correctHtmlWithNoNesting = "<h1>Hello Traveller</h1>";
const incorrectHtmlWithNoNesting = "<h1>Hello Traveller<h1>";

test("test correct html with no nesting", () => {
  const h = readHtmlContent(correctHtmlWithNoNesting);
  expect(h).toStrictEqual({ element: "h1", content: "Hello Traveller" });
});

test("test incorrect html should throw error", () => {
  expect(() => readHtmlContent(incorrectHtmlWithNoNesting)).toThrow();
});
