import { useMemo } from "react";

interface UseCalculateDimensionsProps {
  width: number;
  height: number;
}

function roundToNearest4(value: number) {
  return Math.round(value / 4) * 4;
}

export default function useCalculateDimensions({
  width,
  height,
}: UseCalculateDimensionsProps) {
  const dimensions = useMemo(() => {
    const trackWidth = width;
    const trackHeight = height;
    const trackRadius = height / 2;

    const thumbHeight = height * 1.6;
    const thumbWidth = thumbHeight;
    const thumbRadius = thumbHeight / 2;
    const thumbTop = -(thumbHeight / 6);

    const labelMarginBottom = roundToNearest4(thumbHeight * 0.37) / 4;

    const iconSize = height * 1.2;

    return {
      trackWidth,
      trackHeight,
      trackRadius,
      thumbWidth,
      thumbHeight,
      thumbRadius,
      thumbTop,
      iconSize,
      labelMarginBottom,
    };
  }, [height, width]);

  return dimensions;
}
