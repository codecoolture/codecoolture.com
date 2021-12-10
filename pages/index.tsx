import NextLink from "next/link";
import React from "react";
import { Figure } from "../components/Figure";
import { Link } from "../components/Link";
import { Application } from "../layouts/Application";

export default function Homepage() {
  return (
    <Application headerPosition="absolute" hideBackLink>
      <section className="Hero">
        <h1>¡Hola!</h1>

        <p>
          Ayudo a equipos a construir mejores productos digitales, entregar valor de manera sostenible y (volver a)
          divertirse escribiendo código 🚀
        </p>
      </section>

      <section className="Briefs">
        <div className="Brief Brief--Consulting">
          <h1>Consultoría</h1>
          <p>Soluciones basadas en mi experiencia trabajando con diferentes tecnologías, proyectos y equipos.</p>

          <NextLink href="/services/consulting" passHref>
            <Link className="Brief__Button">Saber más</Link>
          </NextLink>
        </div>

        <div className="Brief Brief--Training">
          <h1>Formación</h1>
          <p>
            Sesiones prácticas sobre buenas prácticas de desarrollo de software (<em>test-driven development</em>,
            CI/CD), React o el ecosistema JavaScript.
          </p>

          <NextLink href="/services/workshops" passHref>
            <Link className="Brief__Button">Saber más</Link>
          </NextLink>
        </div>
      </section>
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
