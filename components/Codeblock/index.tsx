import { classNames } from "../../lib/classNames";

type CodeblockProps = Pick<JSX.IntrinsicElements["pre"], "children" | "className">;

export function Codeblock({ children, className }: CodeblockProps) {
  return <pre className={classNames("Codeblock", className)}>{children}</pre>;
}
