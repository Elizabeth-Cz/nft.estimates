import { BaseRepository } from "./base.repository";
import { Subscription } from "../entities/Subscription";

class SubscriptionRepository extends BaseRepository<
  Subscription,
  typeof Subscription
> {
  constructor() {
    super(Subscription);
  }
}

export const subscriptionRepository = new SubscriptionRepository();
