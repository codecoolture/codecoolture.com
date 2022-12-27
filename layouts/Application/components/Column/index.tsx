import { classNames } from "@/lib/classNames";

type ColumnProps = {
  children: React.ReactNode;
  className?: string;
};

export function Column({ children, className }: ColumnProps) {
  return <div className={classNames("Application__Column", className)}>{children}</div>;
}
