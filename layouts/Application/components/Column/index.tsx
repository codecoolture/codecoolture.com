type ColumnProps = {
  children: React.ReactNode;
  className?: string;
};

export function Column({ children, className }: ColumnProps) {
  const classes = ["Application__Column", className].filter(Boolean).join(" ");

  return <div className={classes}>{children}</div>;
}
