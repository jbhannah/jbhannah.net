declare module "rehype-react" {
  import { Node } from "hast";
  import { CreateElementLike } from "hast-to-hyperscript";
  import rehype2react from "rehype-react/types";

  class rehypeReact<H extends CreateElementLike> {
    constructor(options: rehype2react.Options<H>);

    Compiler: (node: Node) => ReturnType<H>
  }

  export default rehypeReact;
}
