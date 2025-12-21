import { classNames } from "@/lib/classNames";

type CodeblockProps = Pick<React.JSX.IntrinsicElements["pre"], "children" | "className">;

export function Codeblock({ children }: CodeblockProps) {
  return <pre className={classNames("Codeblock")}>{children}</pre>;
}
