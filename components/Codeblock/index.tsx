import { useDarkMode } from "@/hooks";
import { classNames } from "@/lib/classNames";

type CodeblockProps = Pick<JSX.IntrinsicElements["pre"], "children" | "className">;

export function Codeblock({ children }: CodeblockProps) {
  const { isDarkModeEnabled } = useDarkMode();

  return <pre className={classNames("Codeblock", isDarkModeEnabled && "Codeblock--Dark")}>{children}</pre>;
}
