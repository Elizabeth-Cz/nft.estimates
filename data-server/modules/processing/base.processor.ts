import { ChangingNumber } from "@skeksify/nfte-common/dist/sub-entities/ChangingNumber";
import { RankedChangingNumber } from "@skeksify/nfte-common/dist/sub-entities/RankedChangingNumber";

export class BaseProcessor {
  protected buildChangingNumber(
    target?: ChangingNumber,
    value?: number,
    previousValue?: number
  ): ChangingNumber {
    if (!target) {
      return new ChangingNumber({ value });
    } else {
      if (value !== undefined) {
        target.value = value;
        if (previousValue !== undefined) {
          target.changePercent = (value / previousValue) * 100 - 100;
        }
      }
      return target;
    }
  }

  protected buildRankedChangingNumber(
    target?: RankedChangingNumber,
    selfValue?: ChangingNumber,
    collectionRank?: ChangingNumber,
    globalRank?: ChangingNumber
  ): RankedChangingNumber {
    if (!target) {
      return new RankedChangingNumber({
        selfValue,
        collectionRank,
        globalRank,
      });
    } else {
      if (selfValue !== undefined) {
        target.selfValue = selfValue;
      }
      if (collectionRank !== undefined) {
        target.collectionRank = collectionRank;
      }
      if (globalRank !== undefined) {
        target.globalRank = globalRank;
      }
      return target;
    }
  }
}
