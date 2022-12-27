import { classNames } from "@/lib/classNames";

export interface TimestampProps {
  className?: string;
  date: string;
  format?: Intl.DateTimeFormatOptions;
}

export function Timestamp({
  className,
  date,
  format = {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
}: TimestampProps) {
  const timestamp = new Date(date);

  return <p className={classNames("Date", className)}>{timestamp.toLocaleDateString("en-US", format)}</p>;
}
