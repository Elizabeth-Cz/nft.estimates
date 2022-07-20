import { FCC } from "@DEFS/types";
import { View, ViewProps } from "@UI/View/View";

interface Props extends ViewProps {}

export const FlexView: FCC<Props> = ({ children, ...rest }) => {
  return (
    <View flex1 {...rest}>
      {children}
    </View>
  );
};
