import { Application } from "@/layouts/Application";
import { classNames } from "@/lib/classNames";
import NextLink from "next/link";
import { Component } from "react";
import { FaArrowLeft } from "react-icons/fa";

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
      <header className="AppHeader">
        <Application.Column>
          <nav className={classNames("Menu", hideBackLink && "Menu--NoBackLink")}>
            {!hideBackLink && (
              <p className="Menu__BackLink">
                <NextLink href="/" className="Menu__Link">
                  <FaArrowLeft /> Home
                </NextLink>
              </p>
            )}

            <ul className={`Menu__List ${this.state.isMenuOpen ? "Menu__List--isOpen" : ""}`}>
              <li className="Menu__List__Item Menu__Item">
                <NextLink className="Menu__Link" href="/blog">
                  Blog
                </NextLink>
              </li>

              <li className="Menu__List__Item Menu__Item">
                <NextLink href="/notes" className="Menu__Link">
                  Notes
                </NextLink>
              </li>

              <li className="Menu__List__Item Menu__Item">
                <NextLink href="/about" className="Menu__Link">
                  About
                </NextLink>
              </li>
            </ul>
          </nav>
        </Application.Column>
      </header>
    );
  }
}
