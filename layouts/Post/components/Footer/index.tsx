import { ApiArticle } from "@/cms/api/ApiArticle";

type FooterProps = { post: ApiArticle };

export function Footer({ post }: FooterProps) {
  const shareableUrl = `https://codecoolture.com${post.url}`;
  const tweet = encodeURIComponent(`Check out "${post.title}" by @codecoolture\n\n`);

  return (
    <footer className="Post__Footer">
      <nav>
        <ul className="Post__Footer__List">
          <li className="Post__Footer__ListItem">
            <a
              className="Post__Footer__Link"
              href={`https://x.com/intent/tweet?url=${encodeURIComponent(shareableUrl)}&text=${tweet}`}
            >
              Share
            </a>
          </li>

          <li className="Post__Footer__ListItem">
            <a
              className="Post__Footer__Link"
              href={`https://github.com/codecoolture/codecoolture.com/edit/trunk/cms/content${post.url}.mdx`}
            >
              Edit on GitHub
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
