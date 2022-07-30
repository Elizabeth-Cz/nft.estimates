import React, { FC, useCallback, useState } from "react";
import { Text } from "@UI/Text/Text";
import { Colors } from "@RESOURCES/colors";
import { Common } from "@RESOURCES/translations/english/common";
import { DigestInput } from "@NFTE-UI/Inputs/DigestInput";
import { AutoView } from "@UI/View/AutoView";
import axios from "axios";
import { Routes } from "@skeksify/nfte-common/dist/routes";
import { getDomainRoot } from "../../../data-hall/chamber";

interface Props {}

enum ViewStates {
  SubscriptionForm,
  SubscribedMail,
  SubscribedName,
}

export const Subscribe: FC<Props> = ({}: Props) => {
  const [emailError, setEmailError] = useState<boolean>(false);
  const [subscribedEmail, setSubscribedEmail] = useState<string>("");
  const [viewState, setViewState] = useState<ViewStates>(
    ViewStates.SubscriptionForm
  );

  const subscribeMailHandler = useCallback(async (emailParam: string) => {
    const email = emailParam.trim();
    if (email) {
      if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.exec(email)) {
        setSubscribedEmail(email);
        setEmailError(false);
        await axios.post(getDomainRoot() + Routes.SUBSCRIBE, { email });
        setViewState(ViewStates.SubscribedMail);
      } else {
        setEmailError(true);
      }
    }
  }, []);

  const subscribeNameHandler = useCallback(
    async (nameParam: string) => {
      const name = nameParam.trim();
      if (name.trim()) {
        await axios.post(getDomainRoot() + Routes.SUBSCRIBE, {
          name,
          email: subscribedEmail,
        });
        setViewState(ViewStates.SubscribedName);
      }
    },
    [subscribedEmail]
  );

  if (viewState === ViewStates.SubscriptionForm) {
    return (
      <AutoView>
        <Text colorEnum={Colors.White} opacity={0.7} marginBottom={30}>
          {Common.HottestNFTDealsDesc}
        </Text>
        <DigestInput clickHandler={subscribeMailHandler} error={emailError} />
      </AutoView>
    );
  }
  if (viewState === ViewStates.SubscribedMail) {
    return (
      <AutoView>
        <Text colorEnum={Colors.White} opacity={0.7} marginBottom={30}>
          {Common.SubscribedCareToMakeItPersonal}
        </Text>
        <AutoView>
          <DigestInput clickHandler={subscribeNameHandler} namePhase />
        </AutoView>
      </AutoView>
    );
  }
  if (viewState === ViewStates.SubscribedName) {
    return (
      <AutoView>
        <Text
          colorEnum={Colors.White}
          opacity={0.7}
          marginBottom={30}
          marginTop={20}
        >
          {Common.ThankYouEXC}
        </Text>
      </AutoView>
    );
  }
  return null;
};
