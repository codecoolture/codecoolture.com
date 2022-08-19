import { Link } from "../components/Link";
import { Application } from "../layouts/Application";

export default function Homepage() {
  return (
    <Application hideBackLink>
      <section className="Homepage">
        <div className="Application__Column">
          <p className="Homepage__Text">
            Hi there! 👋 I&apos;m Sergio, a software engineer advocating for software development best practices and
            good software design.
          </p>

          <p className="Homepage__Text">
            I&apos;m still working on this website, but you&apos;re free to browse around and check out the{" "}
            <Link href="./blog">blog</Link> and <Link href="./notes">notes</Link>!
          </p>
        </div>
      </section>
    </Application>
  );
}
