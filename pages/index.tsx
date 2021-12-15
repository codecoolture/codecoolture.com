import NextLink from "next/link";
import React from "react";
import { Figure } from "../components/Figure";
import { Link } from "../components/Link";
import { Application } from "../layouts/Application";

export default function Homepage() {
  return (
    <Application headerPosition="absolute" hideBackLink>
      <section className="Hero">
        <Application.Column>
          <h1>Ayudo a equipos a desarrollar mejor software y entregar valor de manera sostenible.</h1>
        </Application.Column>
      </section>

      <Application.Column>
        <section className="Briefs">
          <div className="Brief Brief--Consulting">
            <h2>Consultoría</h2>

            <p>Soluciones basadas en mi experiencia trabajando con diferentes tecnologías, proyectos y equipos.</p>

            <NextLink href="/services/consulting" passHref>
              <Link className="Brief__Button">Saber más</Link>
            </NextLink>
          </div>

          <div className="Brief Brief--Training">
            <h2>Formación</h2>

            <p>
              Sesiones prácticas sobre buenas prácticas de desarrollo de software (<em>test-driven development</em>,
              CI/CD), React o el ecosistema JavaScript.
            </p>

            <NextLink href="/services/workshops" passHref>
              <Link className="Brief__Button">Saber más</Link>
            </NextLink>
          </div>
        </section>
      </Application.Column>

      <section className="Picture">
        <Figure
          alt="Sergio facilitando una sesión sobre TDD y la práctica deliberada de software (Spotahome, Madrid 2019)"
          src="/static/img/gdcr19.jpeg"
          title="En acción facilitando una sesión sobre TDD y la práctica deliberada de software (Spotahome, Madrid 2019)"
        />
      </section>
    </Application>
  );
}
