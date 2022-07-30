import { CSSProperties, FC, useCallback, useState } from "react";
import { styled, TextField } from "@mui/material";
import { Common } from "@RESOURCES/translations/english/common";
import { Colors } from "@RESOURCES/colors";
import { View } from "@UI/View/View";
import { IconAnimation } from "@UI/Icon/IconAnimation";
import AirplaneLottie from "@ANIMATIONS/airplane-lottie.json";
import PencilWriteWhiteLottie from "@ANIMATIONS/pencil-write-lottie-white.json";

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

interface Props {
  clickHandler: (inputValue: string) => Promise<void>;
  namePhase?: boolean;
  error?: boolean;
}

export const DigestInput: FC<Props> = ({ clickHandler, namePhase, error }) => {
  const [animationPlay, setAnimationPlay] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const localClickHandler = useCallback(async () => {
    setAnimationPlay(true);
    await clickHandler(inputValue);
    setAnimationPlay(false);
  }, [inputValue, clickHandler]);
  return (
    <View
      autoWidth
      relative
      border={error ? "1px solid #FF6D6D" : ""}
      borderRadius={30}
    >
      <CustomTextField
        style={{ fontSize: 11 }}
        placeholder={namePhase ? Common.Name : Common.ExampleAtEmailDotCom}
        id={namePhase ? dailyDigestId : undefined}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <View
        {...sendIconStyle}
        autoWidth
        onClick={animationPlay ? undefined : localClickHandler}
      >
        {namePhase ? (
          <View
            size={39}
            borderRadius={40}
            backgroundColor={Colors.BlueDark3}
            marginTop={2}
            marginRight={2}
          >
            <IconAnimation
              size={40}
              animation={PencilWriteWhiteLottie}
              isStopped={!animationPlay}
            />
          </View>
        ) : (
          <IconAnimation
            size={43}
            animation={AirplaneLottie}
            isStopped={!animationPlay}
          />
        )}
      </View>
    </View>
  );
};
