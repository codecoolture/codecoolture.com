import React from "react";
import { FaTwitter } from "react-icons/fa";

import { Text } from "../../../../components/Text";

const Chip = ({ children, href, type }: { children: React.ReactNode; href: string; type: "twitter" }) => {
  const classes = ["Post__Footer__Chip", `Post__Footer__Chip--is-${type}`].join(" ");

  return (
    <a className={classes} href={href} target="blank">
      <FaTwitter className="Post__Footer__Chip__Icon" />
      {children}
    </a>
  );
};

export function Footer() {
  return (
    <footer className="Post__Footer">
      <Text>
        Si tienes cualquier duda o comentario, podemos continuar la conversación en{" "}
        <Chip type="twitter" href="https://twitter.com/codecoolture">
          Twitter
        </Chip>
      </Text>
    </footer>
  );
}
