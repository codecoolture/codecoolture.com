import { forwardRef } from "react";
import { classNames } from "../../lib/classNames";

export type ButtonProps = {
  children: string;
  className?: string;
  href?: string;
};

export const Button = forwardRef<HTMLAnchorElement, ButtonProps>(function Button(props, ref) {
  // NOTE: there is an open issue with the `forwardRef` API:
  // https://github.com/yannickcr/eslint-plugin-react/issues/3140
  //
  // eslint-disable-next-line react/prop-types
  const { children, className, href } = props;

  return (
    <a className={classNames("Button", className)} href={href} ref={ref}>
      {children}
    </a>
  );
});
