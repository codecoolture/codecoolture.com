import NextLink from "next/link";
import { Code } from "../../../../components/Code";
import { Link } from "../../../../components/Link";
import { Underline } from "../../../../components/Underline";

export function Footer() {
  return (
    <footer className="AppFooter">
      <nav>
        <ul className="AppFooter__Nav">
          <li className="AppFooter__Nav__Item">
            <NextLink href="/contact">
              <a className="AppFooter__Link">Contacto</a>
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
        Soy Sergio y vivo en Asturias. Mi principal área de interés es el diseño e implementación de arquitecturas web
        sostenibles. Ayudo a equipos de desarrollo a entregar valor de manera confiable, rápida y continua.
      </p>

      <ul className="AppFooter__Links">
        <li className="AppFooter__LinkWrapper">
          <Link href="https://twitter.com/codecoolture" target="_blank" className="AppFooter__Link">
            <Underline>Seguir @codecoolture</Underline>
          </Link>
        </li>
      </ul>

      <section className="AppFooter__Footer">
        <Code data-qa="npx-command" className="AppFooter__Code">
          $: npx codecoolture
        </Code>
      </section>
    </footer>
  );
}
