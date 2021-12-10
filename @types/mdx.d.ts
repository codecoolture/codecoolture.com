declare module "*.mdx" {
  const MDXComponent: (props: any) => JSX.Element;

  export default MDXComponent;

  export const metadata: any;
}
