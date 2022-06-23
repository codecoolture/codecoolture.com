import { Figure } from "../components/Figure";
import { Application } from "../layouts/Application";

export default function Homepage() {
  return (
    <Application headerPosition="absolute" hideBackLink>
      <section className="Hero">
        <Application.Column>
          <h1>Ayudo a equipos a desarrollar mejor software y entregar valor de manera sostenible.</h1>
        </Application.Column>
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
