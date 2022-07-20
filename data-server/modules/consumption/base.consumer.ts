import { OpenSeaApiResponse } from "@APIs/OpenSea/OpenSeaFetcher";
import { PingThrottler } from "../../toolset/pingThrottler";
import { DataBuffer } from "./DataBuffer";
import { logger } from "../../toolset/logger";

export interface OpenSeaPageFetcher {
  (cursor?: string): Promise<OpenSeaApiResponse>;
}

const maxIterations = 100;
const delaySafety: number = 350;

export abstract class BaseConsumer {
  private nextPageCursor?: string;
  private pingThrottler: PingThrottler;
  private currentPageNumber: number = 0;
  private pagesLimit: number = 0;

  protected dataBuffer: DataBuffer = new DataBuffer();

  protected constructor() {
    this.pingThrottler = new PingThrottler(4, 1);
  }

  protected async fetchAllPages(
    fetchPage: OpenSeaPageFetcher,
    pagesLimit: number = 5
  ): Promise<void> {
    this.pingThrottler.init();
    this.currentPageNumber = 0;
    this.nextPageCursor = undefined;
    this.pagesLimit = pagesLimit;
    logger.start("Fetching OpenSea Data");
    await this.fetchNextPage(fetchPage);
  }

  private safeSleep = (ms: number): Promise<void> =>
    new Promise((resolve) =>
      ms ? setTimeout(resolve, ms + delaySafety) : resolve()
    );

  private async fetchNextPage(fetchPage: OpenSeaPageFetcher): Promise<void> {
    this.pingThrottler.ping();
    const { previous, assets, collection } = await fetchPage(
      this.nextPageCursor
    );
    assets && this.dataBuffer.loadRawAssetChunk(assets);
    collection && this.dataBuffer.loadRawCollection(collection);
    if (
      previous &&
      this.currentPageNumber < this.pagesLimit &&
      this.currentPageNumber < maxIterations
    ) {
      this.currentPageNumber++;
      this.nextPageCursor = previous;
      await this.safeSleep(this.pingThrottler.delayRequired());
      await this.fetchNextPage(fetchPage);
    } else {
      logger.finish(`${this.pingThrottler.getNumberOfPingsSent()} requests`);
    }
  }
}
