import React from "react";

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
  const classes = ["List", type === "bullet" && "List--Bullet", type === "number" && "List--Number"]
    .filter(Boolean)
    .join(" ");

  const ListType = type === "bullet" ? "ul" : "ol";

  return <ListType className={classes}>{children}</ListType>;
}

List.Item = Item;
