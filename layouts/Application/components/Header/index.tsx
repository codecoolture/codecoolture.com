import NextLink from "next/link";
import React, { Component } from "react";
import { Theme } from "../../Theme";

interface HeaderProps {
  hideBackLink?: boolean;
  position?: "absolute";
  theme?: Theme;
}

interface HeaderState {
  isMenuOpen: boolean;
}

export class Header extends Component<HeaderProps, HeaderState> {
  public state: HeaderState = { isMenuOpen: false };

  public render() {
    const { hideBackLink, position, theme } = this.props;

    const classes = [
      "AppHeader",
      hideBackLink && "AppHeader--NoBackLink",
      position === "absolute" && "AppHeader--Absolute",
      theme === Theme.Light && "Light",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <header className={classes}>
        {!hideBackLink && (
          <p>
            <NextLink href="/">
              <a className="AppHeader__Link">&lt; Ir a página principal 🏡</a>
            </NextLink>
          </p>
        )}

        <nav className="Menu">
          <button className="Menu__Trigger" onClick={() => this.setState({ isMenuOpen: !this.state.isMenuOpen })}>
            Menú
          </button>

          <ul className={`Menu__List ${this.state.isMenuOpen ? "Menu__List--isOpen" : ""}`}>
            <li className="Menu__List__Item Menu__Item">
              <NextLink href="/services">
                <a className="AppHeader__Link">Servicios</a>
              </NextLink>
            </li>
            <li className="Menu__List__Item Menu__Item">
              <NextLink href="/blog">
                <a className="AppHeader__Link">Artículos</a>
              </NextLink>
            </li>
            <li className="Menu__List__Item Menu__Item">
              <NextLink href="/notes">
                <a className="AppHeader__Link">Notas</a>
              </NextLink>
            </li>
            <li className="Menu__List__Item Menu__Item">
              <NextLink href="/about">
                <a className="AppHeader__Link">Sobre mí</a>
              </NextLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
