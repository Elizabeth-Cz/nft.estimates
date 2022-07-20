import { CSSProperties, FC, useState } from "react";
import { styled, TextField } from "@mui/material";
import { Common } from "@RESOURCES/translations/english/common";
import { Colors } from "@RESOURCES/colors";
import { View } from "@UI/View/View";
import { IconAnimation } from "@UI/Icon/IconAnimation";
import AirplaneLottie from "@ANIMATIONS/airplane-lottie.json";

export const dailyDigestId = "DailyDigest";

const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    // color: 'green',
  },
  "& .MuiInput-underline:after": {
    // borderBottomColor: 'green',
  },
  "& .MuiOutlinedInput-root": {
    "": {},
    "& input": {
      height: 10,
      background: "rgba(255, 255, 255, 0.1)",
      border: "2px solid rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(24px)",
      color: Colors.White,
      borderRadius: "30px",
    },
    "& input::placeholder": {
      color: Colors.White,
      opacity: 0.7,
      fontSize: 16,
    },
    "& fieldset": {
      border: 0,
    },
    "&:hover fieldset": {},
    "&.Mui-focused fieldset": {},
  },
});

const sendIconStyle: CSSProperties = {
  position: "absolute",
  top: 2,
  right: 2,
};

export const DigestInput: FC = () => {
  const [animationPlay, setAnimationPlay] = useState<boolean>(false);
  return (
    <View autoWidth relative>
      <CustomTextField
        style={{ fontSize: 11 }}
        placeholder={Common.ExampleAtEmailDotCom}
        id={dailyDigestId}
      />
      <View
        {...sendIconStyle}
        autoWidth
        onClick={animationPlay ? undefined : () => setAnimationPlay(true)}
      >
        <IconAnimation
          size={43}
          animation={AirplaneLottie}
          isStopped={!animationPlay}
        />
      </View>
    </View>
  );
};
