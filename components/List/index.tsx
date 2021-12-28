import React from "react";
import { classNames } from "../../lib/classNames";

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="List__Item">
      <span>{children}</span>
    </li>
  );
}

export type ListProps = {
  children: React.ReactNode;
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
