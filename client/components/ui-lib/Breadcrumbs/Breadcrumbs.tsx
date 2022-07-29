import { FC, useMemo } from "react";
import { Breadcrumbs as BreadcrumbsMUI } from "@mui/material";
import { Link } from "@UI/Link/Link";
import { Colors } from "@RESOURCES/colors";
import { Pages } from "../../../pages/pages.types";
import { Common } from "@RESOURCES/translations/english/common";
import { Routes } from "@skeksify/nfte-common/dist/routes";
import { useQueryField } from "../../../hooks/useQuery";
import { useRouter } from "next/router";
import { View } from "@UI/View/View";
import { RouteMaker } from "../../../pages/routeMaker";

interface Crumb {
  href?: string;
  label: string;
}

interface Props {
  page: Pages;
  lightText?: boolean;
}

type CrumbNames = "Home" | "Collections";
const crumbs: Record<CrumbNames, Crumb> = {
  Home: {
    label: Common.Home,
    href: "/",
  },
  Collections: {
    label: Common.Collections,
    href: Routes.COLLECTIONS,
  },
};

const trailByPage = (
  page: Pages,
  primeSlug?: string,
  slug?: string
): Crumb[] => {
  const trailMap: Record<Pages, Crumb[]> = {
    [Pages.Homepage]: [crumbs.Home],
    [Pages.Collections]: [crumbs.Home, crumbs.Collections],
    [Pages.Collection]: [crumbs.Home, crumbs.Collections],
    [Pages.Asset]: [
      crumbs.Home,
      crumbs.Collections,
      {
        label: `Bored Ape Yacht Club`,
        href: RouteMaker.makeCollectionPagePath(primeSlug),
      },
      { label: `#${slug}` },
    ],
  };
  return trailMap[page];
};

export const Breadcrumbs: FC<Props> = ({ page, lightText }) => {
  const slug = useQueryField("slug");
  const primeSlug = useQueryField("primeSlug");
  const { asPath } = useRouter();
  const trail: Crumb[] = useMemo(
    () => trailByPage(page, primeSlug, slug),
    [page, primeSlug, slug]
  );

  return (
    <View marginTop={20} marginBottom={20}>
      <BreadcrumbsMUI
        aria-label="breadcrumb"
        color={lightText ? "white" : undefined}
      >
        {trail.map(({ href = asPath, label }, index) => {
          const isLast = index === trail.length - 1;
          return (
            <Link
              size14
              href={href}
              color={
                lightText
                  ? Colors.White
                  : isLast
                  ? Colors.Blue1
                  : Colors.BlueDark1
              }
              fontWeight={isLast ? 500 : undefined}
              key={index}
            >
              {label}
            </Link>
          );
        })}
      </BreadcrumbsMUI>
    </View>
  );
};
