import NextLink from "next/link";
import { FaGithub, FaLinkedin, FaMastodon, FaRss } from "react-icons/fa";
import { RxMoon, RxSun } from "react-icons/rx";

import { useDarkMode } from "@/hooks";
import { Application } from "@/layouts/Application";

export function Footer() {
  const { isDarkModeEnabled, toggleDarkMode } = useDarkMode();

  return (
    <footer className="AppFooter" data-qa="app-footer">
      <Application.Column>
        <nav>
          <ul className="AppFooter__Nav">
            <li className="AppFooter__Nav__Item">
              <NextLink href="/contact" className="AppFooter__Link">
                Contact
              </NextLink>
            </li>

            <li className="AppFooter__Nav__Item">
              <NextLink href="/now" className="AppFooter__Link">
                Now
              </NextLink>
            </li>

            <li className="AppFooter__Nav__Item">
              <NextLink href="/uses" className="AppFooter__Link">
                Uses
              </NextLink>
            </li>
          </ul>
        </nav>

        <p className="AppFooter__Text">
          Hey, I’m Sergio! I build maintainable and performant full-stack web applications from my lovely home region,
          Asturias.
        </p>

        <div className="AppFooter__Actions">
          <ul className="AppFooter__Links">
            <li className="AppFooter__Links__Item">
              <a
                href="https://mastodon.world/@codecoolture"
                className="AppFooter__Links__Link"
                aria-label="Go to Sergio's Mastodon profile"
              >
                <FaMastodon />
              </a>
            </li>

            <li className="AppFooter__Links__Item">
              <a
                href="https://github.com/sergioalvz"
                className="AppFooter__Links__Link"
                aria-label="Go to Sergio's GitHub profile"
              >
                <FaGithub />
              </a>
            </li>

            <li className="AppFooter__Links__Item">
              <a
                href="https://www.linkedin.com/in/sergioalvarezsuarez/"
                className="AppFooter__Links__Link"
                aria-label="Go to Sergio's LinkedIn profile"
              >
                <FaLinkedin />
              </a>
            </li>

            <li className="AppFooter__Links__Item">
              <a href="/feed.xml" className="AppFooter__Links__Link" aria-label="Subscribe to this site's RSS feed">
                <FaRss />
              </a>
            </li>
          </ul>

          <button className="AppFooter__DarkModeToggle" onClick={() => toggleDarkMode()}>
            {isDarkModeEnabled ? <RxSun /> : <RxMoon />}
          </button>
        </div>
      </Application.Column>
    </footer>
  );
}
