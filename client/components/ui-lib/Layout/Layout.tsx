import { View } from "@UI/View/View";
import { FCC } from "@DEFS/types";
import { TopBar } from "@UI/TopBar/TopBar";
import { PropsWithChildren } from "react";
import { Pages } from "../../../pages/pages.types";
import { Footer } from "@NFTE-UI/Footer/Footer";

export const maxPageWidth = 1400;

interface Props {
  page: Pages;
}

export const Layout: FCC<Props> = ({
  page,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <View
      background={"#E9EFF6"}
      // background={"linear-gradient(180deg, #F3F6F9 0%, #FFFFFF 100%);"}
      minHeight={"100vh"}
      // paddingBottom={50}
      centered
    >
      <TopBar />
      <View>
        {/*<Breadcrumbs page={page}/>*/}
        {children}
      </View>
      <Footer />
    </View>
  );
};
