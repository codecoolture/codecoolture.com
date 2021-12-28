type ClassNames = Array<string | false | undefined>;

export function classNames(...classes: ClassNames): string {
  return classes.filter(Boolean).join(" ");
}
