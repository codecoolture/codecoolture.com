import NextLink from "next/link";
import { Component } from "react";
import { classNames } from "../../../../lib/classNames";

interface HeaderProps {
  hideBackLink?: boolean;
}

interface HeaderState {
  isMenuOpen: boolean;
}

export class Header extends Component<HeaderProps, HeaderState> {
  public state: HeaderState = { isMenuOpen: false };

  public render() {
    const { hideBackLink } = this.props;

    return (
      <header className={classNames("AppHeader", hideBackLink && "AppHeader--NoBackLink")}>
        {!hideBackLink && (
          <p>
            <NextLink href="/" className="AppHeader__Link">
              &lt; Back to home 🏡
            </NextLink>
          </p>
        )}

        <nav className="Menu">
          <button className="Menu__Trigger" onClick={() => this.setState({ isMenuOpen: !this.state.isMenuOpen })}>
            Menu
          </button>

          <ul className={`Menu__List ${this.state.isMenuOpen ? "Menu__List--isOpen" : ""}`}>
            <li className="Menu__List__Item Menu__Item">
              <NextLink className="AppHeader__Link" href="/blog">
                Blog
              </NextLink>
            </li>

            <li className="Menu__List__Item Menu__Item">
              <NextLink href="/notes" className="AppHeader__Link">
                Notes
              </NextLink>
            </li>

            <li className="Menu__List__Item Menu__Item">
              <NextLink href="/about" className="AppHeader__Link">
                About
              </NextLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
