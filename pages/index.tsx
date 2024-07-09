import { orderBy } from "lodash";
import { GetStaticProps } from "next";
import Image from "next/image";

import { ApiArticle } from "@/cms/api/ApiArticle";
import { getBlogpostRepository, getNotesRepository } from "@/cms/repositories";
import { Heading } from "@/components/Heading";
import { Link } from "@/components/Link";
import { PostThumbnail } from "@/components/PostThumbnail";
import { Text } from "@/components/Text";
import { Application } from "@/layouts/Application";
import { isDevelopment } from "@/lib/env";

type HomepageProps = {
  publications: ApiArticle[];
};

export default function Homepage({ publications }: HomepageProps) {
  return (
    <Application hideBackLink>
      <section className="Homepage">
        <div className="Application__Column">
          <Heading el="h1" size="jumbo">
            Hola 👋
          </Heading>

          <Text size="l">
            I’m Sergio{" "}
            <Image className="Homepage__Avatar" src="/static/img/sergio.jpg" alt="" width={120} height={120} />, a
            software engineer advocating for software development best practices and good software design.
          </Text>

          <Text size="m">
            With over 10 years of experience, my approach to software development is significantly influenced by{" "}
            <Link href="https://en.wikipedia.org/wiki/Extreme_programming">Extreme Programming</Link> practices, such as
            working in small batches, test-driven development, and continuous integration. I’m particularly interested
            in software design, favoring easy-to-understand software solutions. I’ve combined long periods of working as
            a full-stack engineer with periods of leading software teams.
          </Text>

          <Heading el="h2" size="xl" className="Homepage__Heading">
            Latest publications
          </Heading>

          {publications.map((pub) => (
            <PostThumbnail className="Homepage__Publication" post={pub} key={pub.url} />
          ))}

          <Text size="m" className="Homepage__ReadMore">
            Fancy reading more? Don’t miss either the <Link href="/blog">blog</Link> or the{" "}
            <Link href="/notes">notes</Link>!
          </Text>
        </div>
      </section>
    </Application>
  );
}

export const getStaticProps: GetStaticProps<HomepageProps> = async () => {
  const blogposts = await getBlogpostRepository().all({ drafts: isDevelopment() });
  const notes = await getNotesRepository().all({ drafts: isDevelopment() });

  const publications = orderBy([...blogposts, ...notes], (article) => article.getDate(), "desc").slice(0, 5);

  return {
    props: {
      publications: publications.map((pub) => pub.toApiArticle()),
    },
  };
};
