type ClassNames = Array<string | undefined>;

export function classNames(...classes: ClassNames): string {
  return classes.filter(Boolean).join(" ");
}
