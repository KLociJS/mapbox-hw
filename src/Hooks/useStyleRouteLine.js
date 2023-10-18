import { useState } from "react";

export default function useStyleRouteLine() {
  const [lineWidth, setLineWidth] = useState(5);
  const [color, setColor] = useState("#1c71d8");

  return {
    lineWidth,
    setLineWidth,
    color,
    setColor,
  };
}
