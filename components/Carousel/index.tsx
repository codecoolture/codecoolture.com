import React, { useEffect, useRef, useState } from "react";

export interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  delay: number;
}

type UseIntervalCallback = (...args: any[]) => void;

function useInterval(callback: UseIntervalCallback, delay: number) {
  const savedCallback = useRef<UseIntervalCallback>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (undefined !== savedCallback.current) {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);

      return () => clearInterval(id);
    }
  }, [delay]);
}

export function Carousel({ delay, children, className }: CarouselProps) {
  const classes = [className].filter(Boolean).join(" ");

  const numberOfChilds = React.Children.count(children);

  const [currentChildrenIndex, setChildrenIndex] = useState(0);

  useInterval(() => {
    if (currentChildrenIndex === numberOfChilds - 1) {
      setChildrenIndex(0);
      return;
    }

    setChildrenIndex(currentChildrenIndex + 1);
  }, delay);

  return <div className={classes}>{React.Children.toArray(children)[currentChildrenIndex]}</div>;
}
