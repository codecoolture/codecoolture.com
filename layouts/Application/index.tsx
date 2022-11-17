import React from "react";
import { Article } from "./components/Article";
import { Column } from "./components/Column";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export interface ApplicationProps {
  children: React.ReactNode;
  hideBackLink?: boolean;
}

export function Application({ children, hideBackLink }: ApplicationProps) {
  return (
    <div className="App">
      <Header hideBackLink={hideBackLink} />

      <main className="App__Main">{children}</main>

      <Footer />
    </div>
  );
}

Application.Article = Article;

Application.Column = Column;
