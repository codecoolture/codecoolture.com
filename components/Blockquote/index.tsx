import React from "react";

export function Blockquote({ children }: { children: React.ReactNode }) {
  return <blockquote className="Blockquote">{children}</blockquote>;
}
