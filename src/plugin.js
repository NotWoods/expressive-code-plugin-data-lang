// @ts-check

/**
 * Plugin to inject a data-lang attribute for Expressive Code.
 *
 * Adds the language of the code block as a attribute to the rendered code block's frame (a `<figure>` element).
 * @example
 * Given the following code block:
 * ```js
 * console.log('Hello, World!');
 * ```
 *
 * The rendered code block will look like this:
 * ```html
 * <div class="expressive-code">
 *   <figure class="frame" data-lang="js">
 *     ...
 *   </figure>
 * </div>
 *
 * @returns {import('expressive-code').ExpressiveCodePlugin}
 */
export function pluginDataLang() {
  return {
    name: "data-lang",
    hooks: {
      postprocessRenderedBlock({ codeBlock, renderData }) {
        if (renderData.blockAst.properties) {
          renderData.blockAst.properties.dataLang = codeBlock.language;
        }
      },
    },
  };
}

export default pluginDataLang;
