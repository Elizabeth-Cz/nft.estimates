import { useEffect, useMemo, useState } from "react";

export const useMediaQuery = (query: string) => {
  const mediaMatch = useMemo(
    () =>
      typeof window !== "undefined" ? window.matchMedia(query) : undefined,
    [query]
  );
  const [matches, setMatches] = useState<boolean>(!!mediaMatch?.matches);

  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaMatch?.addListener(handler);
    return () => mediaMatch?.removeListener(handler);
  }, []);

  return matches;
};

type ScreenSizes = "xs" | "sm" | "md" | "lg" | "xl";
const screenSizeToMediaQuery: Record<ScreenSizes, string> = {
  xs: "(min-width: 10px)",
  sm: "(min-width: 600px)", //576?
  md: "(min-width: 900px)", // Not 768
  lg: "(min-width: 1200px)", // Not 992
  xl: "(min-width: 1536px)", // Not 1200
};
const sizesInCheckOrder: ScreenSizes[] = ["xl", "lg", "md", "sm"];

export const useScreenSize = () => {
  const screenMap: Record<ScreenSizes, boolean> = {
    xs: true,
    sm: useMediaQuery(screenSizeToMediaQuery["sm"]),
    md: useMediaQuery(screenSizeToMediaQuery["md"]),
    lg: useMediaQuery(screenSizeToMediaQuery["lg"]),
    xl: useMediaQuery(screenSizeToMediaQuery["xl"]),
  };
  return sizesInCheckOrder.find((size) => !!screenMap[size]) || "xs";
};
