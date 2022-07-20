import minimist from "minimist";
import { playground } from "./modules/consumption/assets";
import { getDetails } from "./getAssetDetails";
import { dataCenter } from "@COMMON/repositories/dataCenter";
import { assetConsumer } from "./modules/consumption/Asset.consumer";
import { ConsumptionDataType } from "@COMMON/entities/Consumption";
import { collectionConsumer } from "./modules/consumption/Collection.consumer";

const printIntro = (action: string, type: string, params: string) =>
  console.log(`

### ACTION: ${action} ###
### TYPE: ${type} ###
### PARAMS: ${params} ###\n`);

enum Actions {
  FETCH = "fetch",
  CONSUME = "consume",
  PROCESS = "process",
  PLAYGROUND = "playground",
}

const catchEx = (e: Error) => {
  console.log("Caught Exception\n", e);
  process.exit();
};

const dbAction = async (action: () => Promise<void>) => {
  await dataCenter.init();
  await action().catch(catchEx);
  process.exit();
};

type ParameterOptions = "contract" | "token" | "contractSlug";

type Parameters = Record<ParameterOptions, string>;

const actionsMap: Record<Actions, (type: string, params: Parameters) => void> =
  {
    [Actions.FETCH]: (type, { contract, token }) => {
      if (type === "asset") {
        console.log("Fetching Asset");
        dbAction(async () => await getDetails(contract, token));
      }
    },
    [Actions.CONSUME]: (type, { contract, contractSlug }) => {
      if (type === "assets") {
        console.log("Consuming Assets");
        dbAction(
          async () =>
            await assetConsumer.consume(contract, ConsumptionDataType.ONETIME)
        );
      }
      if (type === "collection") {
        console.log("Consuming Assets");
        dbAction(
          async () =>
            await collectionConsumer.consume(
              contractSlug,
              ConsumptionDataType.ONETIME
            )
        );
      }
    },
    [Actions.PROCESS]: () => {},
    [Actions.PLAYGROUND]: () => {
      playground();
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
  selectedAction(type, rest as Parameters);
}

export const getArgs = () => argsObj;
