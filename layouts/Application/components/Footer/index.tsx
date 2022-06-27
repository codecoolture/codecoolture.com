import NextLink from "next/link";
import { Application } from "../..";
import { Code } from "../../../../components/Code";
import { Link } from "../../../../components/Link";
import { Underline } from "../../../../components/Underline";

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
          Hey, I&apos;m Sergio! I build maintainable and performant full-stack web applications.
        </p>

        <ul className="AppFooter__Links">
          <li className="AppFooter__LinkWrapper">
            <Link href="https://twitter.com/codecoolture" target="_blank" className="AppFooter__Link">
              <Underline>Follow @codecoolture</Underline>
            </Link>
          </li>
        </ul>
      </Application.Column>

      <section className="AppFooter__Footer">
        <Code data-qa="npx-command" className="AppFooter__Code">
          $: npx codecoolture
        </Code>
      </section>
    </footer>
  );
}
