import { Button } from "@/components/Button";
import { classNames } from "@/lib/classNames";

export type QuickContactProps = {
  children: string;
  className?: string;
  subject: string;
};

export function QuickContact({ children, className, subject }: QuickContactProps) {
  const href = `mailto:hola@codecoolture.com?subject=${subject}`;

  return (
    <Button className={classNames(className)} href={href}>
      {children}
    </Button>
  );
}
