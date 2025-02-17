import jsTokens from "js-tokens";

// @ts-ignore
import { parse } from "comment-parser";

interface Comment {
  comment: string;
  entity: string;
  code: string;
}

export function extractComments(code: string) {
  const comments: Comment[] = [];
  const tokens = Array.from(jsTokens(code, { jsx: true }));

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (!token || token.type !== "MultiLineComment") {
      continue;
    }

    const comment = parse(token.value)[0]?.description || token.value;

    let code = "";
    let entity = "";
    let hasSeenFirstLine = false;

    // @ts-ignore
    for (; i < tokens.length; i++) {
      const nextToken = tokens[i];

      if (!nextToken) {
        continue;
      }

      if (nextToken.type === "LineTerminatorSequence" && !hasSeenFirstLine) {
        hasSeenFirstLine = true;
        continue;
      }

      if (nextToken.type === "LineTerminatorSequence") {
        if (code) {
          break;
        } else {
          continue;
        }
      }

      if (
        !entity &&
        nextToken.type === "IdentifierName" &&
        !["export", "var", "const", "function", "let", "class"].includes(
          nextToken.value
        )
      ) {
        entity = nextToken.value;
      }

      code += nextToken.value;
    }

    comments.push({ comment, code, entity });
  }

  return comments;
}
