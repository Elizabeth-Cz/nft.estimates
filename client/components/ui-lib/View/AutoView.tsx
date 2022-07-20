import { FCC } from "@DEFS/types";
import { View, ViewProps } from "@UI/View/View";

interface Props extends ViewProps {}

export const AutoView: FCC<Props> = ({ children, ...rest }) => {
  return (
    <View autoWidth {...rest}>
      {children}
    </View>
  );
};
