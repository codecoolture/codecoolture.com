import { useDarkMode } from "@/hooks";
import { classNames } from "@/lib/classNames";

type CodeblockProps = Pick<JSX.IntrinsicElements["pre"], "children" | "className">;

export function Codeblock({ children, className }: CodeblockProps) {
  const { isDarkModeEnabled } = useDarkMode();

  return (
    <div className={classNames("Codeblock", isDarkModeEnabled && "Codeblock--Dark")}>
      <pre className={className}>{children}</pre>
    </div>
  );
}
