import * as dotenv from "dotenv";
import minimist from "minimist";
import { getDetails } from "./getAssetDetails";
import { assetConsumer } from "./modules/consumption/Asset.consumer";
import { collectionConsumer } from "./modules/consumption/Collection.consumer";
import { ConsumptionDataType } from "@skeksify/nfte-common/dist/entities/Consumption";
import { eventsConsumer } from "./modules/consumption/Event.consumer";
import { AssetEventTypes } from "@skeksify/nfte-common/dist/sub-entities/AssetEvent";
import { collectionProcessor } from "./modules/processing/Collection.processor";
import { dbAction, printIntro } from "./toolset/actions";

dotenv.config();

enum Actions {
  FETCH = "fetch",
  CONSUME = "consume",
  PROCESS = "process",
  PLAYGROUND = "playground",
}

type ParameterOptions =
  | "contract"
  | "token"
  | "contractSlug"
  | "eventType"
  | "liveData";
type TypeOptions = "asset" | "assets" | "collection" | "events";

type Parameters = Record<ParameterOptions, string>;

const actionsMap: Record<
  Actions,
  (type: TypeOptions, params: Parameters) => void
> = {
  [Actions.FETCH]: (type, { contract, token }) => {
    if (type === "asset") {
      console.log("Fetching Asset");
      dbAction(async () => await getDetails(contract, token));
    }
  },
  [Actions.CONSUME]: (
    type,
    { contract, contractSlug, token, eventType, liveData }
  ) => {
    if (type === "assets") {
      console.log("Consuming Assets");
      dbAction(
        async () =>
          await assetConsumer.consume(
            contract,
            liveData ? ConsumptionDataType.LIVE : ConsumptionDataType.ONETIME,
            token
          )
      );
    }
    if (type === "collection") {
      console.log("Consuming Assets");
      dbAction(async () => await collectionConsumer.consume(contractSlug));
    }
    if (type === "events") {
      if (!eventType) {
        throw new Error(`eventType is not defined (Received: ${eventType})`);
      }
      console.log("Consuming Events");
      dbAction(
        async () =>
          await eventsConsumer.consume(
            eventType as AssetEventTypes,
            contract,
            token
          )
      );
    }
  },
  [Actions.PROCESS]: (type, { contract }) => {
    if (type === "collection") {
      console.log("Processing Collection");
      dbAction(async () => await collectionProcessor.process(contract));
    }
  },
  [Actions.PLAYGROUND]: () => {
    // playground();
  },
};
const argsObj = minimist(process.argv.slice(2), {
  string: ["contract", "token"],
});

const {
  _: [action, type],
  ...rest
} = argsObj;

const selectedAction = actionsMap[action as Actions];

if (!selectedAction) {
  throw `"${action}" Action not found`;
} else {
  printIntro(action, type, JSON.stringify(rest));
  selectedAction(type as TypeOptions, rest as Parameters);
}

export const getArgs = () => argsObj;
