import { connectToDb } from "@skeksify/nfte-common/dist/db/connect";

export const printIntro = (action: string, type: string, params: string) =>
  console.log(`

### ACTION: ${action} ###
### TYPE: ${type} ###
### PARAMS: ${params} ###\n`);
const catchEx = (e: Error) => {
  console.log("Caught Exception\n", e);
  process.exit();
};
export const dbAction = async (action: () => Promise<void>) => {
  await connectToDb();
  await action().catch(catchEx);
  process.exit();
};
