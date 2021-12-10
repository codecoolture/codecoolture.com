import React from "react";

import { Link } from "../Link";

interface QuickContactProps {
  children: React.ReactText;
  subject: string;
}

export function QuickContact({ children, subject }: QuickContactProps) {
  const href = `mailto:hola@codecoolture.com?subject=${subject}`;

  return (
    <Link href={href} className="QuickContact">
      {children}
    </Link>
  );
}
