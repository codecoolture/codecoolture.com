import React from "react";

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
  const classes = ["Date", className].filter(Boolean).join(" ");

  const timestamp = new Date(date);

  return <p className={classes}>{timestamp.toLocaleDateString("es-ES", format)}</p>;
}
