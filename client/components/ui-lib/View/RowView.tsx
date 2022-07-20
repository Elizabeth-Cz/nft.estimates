import { FCC } from "@DEFS/types";
import { View, ViewProps } from "@UI/View/View";

interface Props extends ViewProps {}

export const RowView: FCC<Props> = ({ children, ...rest }) => {
  return (
    <View row {...rest}>
      {children}
    </View>
  );
};
