import * as Fathom from "fathom-client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useFathom = () => {
  const router = useRouter();

  useEffect(() => {
    Fathom.load("UGMTAFWE", {
      canonical: false,
      includedDomains: ["codecoolture.com"],
      url: "https://stingray.codecoolture.com/script.js",
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []);
};
