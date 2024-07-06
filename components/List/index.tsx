import { classNames } from "@/lib/classNames";

function Item({ children, id }: Pick<JSX.IntrinsicElements["li"], "children" | "id">) {
  return (
    <li className="List__Item" id={id}>
      <div className="List__Item__Wrapper">{children}</div>
    </li>
  );
}

export type ListProps = Pick<JSX.IntrinsicElements["ul"], "children"> & {
  type?: "bullet" | "number";
};

export function List({ children, type = "bullet" }: ListProps) {
  const ListType = type === "bullet" ? "ul" : "ol";

  return (
    <ListType className={classNames("List", type === "bullet" && "List--Bullet", type === "number" && "List--Number")}>
      {children}
    </ListType>
  );
}

List.Item = Item;
