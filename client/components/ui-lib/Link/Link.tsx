import { PropsWithChildren } from "react";
import { FCC } from "@DEFS/types";
import NextLink from "next/link";
import { Link as LinkMUI } from "@mui/material";
import { Text, TextProps } from "@UI/Text/Text";

interface Props extends TextProps {
  href: string;
}

export const Link: FCC<Props> = ({
  href,
  children,
  ...textProps
}: PropsWithChildren<Props>) => {
  return (
    <NextLink href={href} passHref>
      <LinkMUI underline="hover" color="inherit">
        <Text {...textProps}>{children}</Text>
      </LinkMUI>
    </NextLink>
  );
};
