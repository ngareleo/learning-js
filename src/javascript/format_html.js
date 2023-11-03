// Task of this job is to take html and add formatting

// we need to represent this in a ds that will print out to the stdout
// we will nested objects

/**
 * const html = {
 *  "div": {
 *    "h1": "Hello traveller"
 *  }
 * }
 */

/**
 *
 * @param {string} html
 * @returns {object}
 */

// TODO: Make errors more tracable
export function readHtmlContent(html) {
  const outerGrabber = /^<(\w+\d*)>(.+)<\/(\w+\d*)>$/g;
  const m = html.matchAll(outerGrabber).next().value;
  if (!m) {
    throw SyntaxError("Input did not match HTML");
  }
  const [, start, next, end] = m;
  if (start && end && start === end) {
    if (next && next.match(outerGrabber)) {
      return {
        element: start,
        content: readHtmlContent(next),
      };
    }
    return {
      element: start,
      content: next,
    };
  }

  throw new SyntaxError(
    `Opening tag and closing tag should be similar. Found opening tag ${start} and closing tag ${end}`
  );
}
