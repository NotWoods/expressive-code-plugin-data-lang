import { ExpressiveCodeEngine } from "@expressive-code/core";
import { pluginFrames } from "@expressive-code/plugin-frames";
import { test } from "vitest";
import { pluginDataLang } from "../";

test("adds data-lang attribute to code blocks", async ({ expect }) => {
  const engine = new ExpressiveCodeEngine({
    plugins: [pluginDataLang()],
  });
  const result = await engine.render({
    code: "console.log('Hello, world!');",
    language: "js",
  });

  expect(result.renderedGroupAst.children).toHaveLength(1);
  const frame = result.renderedGroupAst.children[0];
  if (frame.type !== "element") {
    throw new Error("invalid frame type");
  }

  expect(frame.tagName).toBe("pre");
  expect(frame.properties?.dataLang).toBe("js");
});

test("adds data-lang attribute to frame", async ({ expect }) => {
  const engine = new ExpressiveCodeEngine({
    plugins: [pluginFrames(), pluginDataLang()],
  });
  const result = await engine.render({
    code: "console.log('Hello, world!');",
    language: "js",
  });

  expect(result.renderedGroupAst.children).toHaveLength(1);
  const frame = result.renderedGroupAst.children[0];
  if (frame.type !== "element") {
    throw new Error("invalid frame type");
  }

  expect(frame.tagName).toBe("figure");
  expect(frame.properties?.dataLang).toBe("js");
});
