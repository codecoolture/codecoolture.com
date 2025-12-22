import { classNames } from "@/lib/classNames";

type CodeblockProps = React.JSX.IntrinsicElements["pre"];

export function Codeblock({ className, ...props }: CodeblockProps) {
  return <pre className={classNames("Codeblock", className)} {...props} />;
}
