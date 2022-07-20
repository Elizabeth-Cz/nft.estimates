export class PingThrottler {
  startTime: number = 0;
  maxPings: number;
  timeframe: number;
  pingLog: number[] = [];

  constructor(maxPings: number, secondsTimeframe: number) {
    this.maxPings = maxPings;
    this.timeframe = secondsTimeframe * 1000;
  }

  public init() {
    this.pingLog = [];
    this.startTime = Date.now();
  }

  public ping() {
    const now = Date.now();
    this.pingLog.push(now);
  }

  public delayRequired(): number {
    if (this.pingLog.length < this.maxPings) {
      return 0;
    }
    const furthestPing = this.pingLog.at(-this.maxPings) || 0;
    return Math.max(this.timeframe - (Date.now() - furthestPing), 0);
  }

  public getNumberOfPingsSent(): number {
    return this.pingLog.length;
  }
}
