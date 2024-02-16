import Queue from "bull";
import { ExpirationCompletePublisher } from "../events/publishers/expiration-complete-publisher";
import { natsWrapper } from "../nats-wrapper";

interface ExpirationJobPayload {
  orderId: string;
}

const expirationQueue = new Queue<ExpirationJobPayload>("order:expiration", {
  redis: {
    host: "expiration-redis-srv",
  },
});

expirationQueue.process(async (job) => {
  new ExpirationCompletePublisher(natsWrapper.client).publish({
    orderId: job.data.orderId,
  });
});

export { expirationQueue };
