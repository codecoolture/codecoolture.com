import { classNames } from "@/lib/classNames";

type CodeProps = Pick<JSX.IntrinsicElements["code"], "className" | "children"> & {
  "data-qa"?: string;
};

export function Code({ children, className, ...props }: CodeProps) {
  return (
    <code className={classNames("Code", className)} {...props}>
      {children}
    </code>
  );
}
