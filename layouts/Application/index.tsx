import React from "react";

import { Article } from "./components/Article";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Theme } from "./Theme";

export interface ApplicationProps {
  children: React.ReactNode;
  headerPosition?: "absolute";
  hideBackLink?: boolean;
  theme?: Theme;
}

export function Application({ children, headerPosition, hideBackLink, theme }: ApplicationProps) {
  return (
    <div className="App">
      <Header hideBackLink={hideBackLink} theme={theme} position={headerPosition} />

      <main className="App__Main">{children}</main>

      <Footer />
    </div>
  );
}

Application.Article = Article;
