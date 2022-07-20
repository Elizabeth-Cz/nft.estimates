import React, { FC } from "react";
import Lottie from "react-lottie";

interface Props {
  size?: number;
  isStopped?: boolean;
  loop?: boolean;
  animation: object;
}

export const IconAnimation: FC<Props> = ({
  animation,
  size = 42,
  loop = false,
  isStopped,
}: Props) => {
  return (
    <Lottie
      options={{
        animationData: animation,
        loop,
      }}
      isStopped={isStopped}
      isClickToPauseDisabled={true}
      height={size}
      width={size}
    />
  );
};
