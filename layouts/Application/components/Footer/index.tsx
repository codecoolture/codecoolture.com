import NextLink from "next/link";
import { FaGithub, FaLinkedin, FaRss, FaTwitter } from "react-icons/fa";
import { Application } from "../..";

export function Footer() {
  return (
    <footer className="AppFooter">
      <Application.Column>
        <nav>
          <ul className="AppFooter__Nav">
            <li className="AppFooter__Nav__Item">
              <NextLink href="/contact">
                <a className="AppFooter__Link">Contact</a>
              </NextLink>
            </li>

            <li className="AppFooter__Nav__Item">
              <NextLink href="/now">
                <a className="AppFooter__Link">Now</a>
              </NextLink>
            </li>

            <li className="AppFooter__Nav__Item">
              <NextLink href="/uses">
                <a className="AppFooter__Link">Uses</a>
              </NextLink>
            </li>
          </ul>
        </nav>

        <p className="AppFooter__Text">
          Hey, I&apos;m Sergio! I build maintainable and performant full-stack web applications from my lovely home
          region, Asturias.
        </p>

        <ul className="AppFooter__Links">
          <li className="AppFooter__Links__Item">
            <a href="https://twitter.com/codecoolture" className="AppFooter__Links__Link">
              <FaTwitter />
            </a>
          </li>

          <li className="AppFooter__Links__Item">
            <a href="https://github.com/sergioalvz" className="AppFooter__Links__Link">
              <FaGithub />
            </a>
          </li>

          <li className="AppFooter__Links__Item">
            <a href="https://www.linkedin.com/in/sergioalvarezsuarez/" className="AppFooter__Links__Link">
              <FaLinkedin />
            </a>
          </li>

          <li className="AppFooter__Links__Item">
            <a href="/feed.xml" className="AppFooter__Links__Link">
              <FaRss />
            </a>
          </li>
        </ul>
      </Application.Column>
    </footer>
  );
}
