import NextLink from "next/link";
import { FaGithub, FaLinkedin, FaRss, FaTwitter } from "react-icons/fa";

import { Application } from "@/layouts/Application";

export function Footer() {
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

        <ul className="AppFooter__Links">
          <li className="AppFooter__Links__Item">
            <a
              href="https://twitter.com/codecoolture"
              className="AppFooter__Links__Link"
              aria-label="Go to Sergio's Twitter profile"
            >
              <FaTwitter />
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
      </Application.Column>
    </footer>
  );
}
