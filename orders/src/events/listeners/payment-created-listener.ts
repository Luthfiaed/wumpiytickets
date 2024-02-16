import {
  Listener,
  EventSubjects,
  PaymentCreatedEvent,
  OrderStatus,
} from "@wumpiytickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/orders";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: EventSubjects.PaymentCreated = EventSubjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    order.set({
      status: OrderStatus.Completed,
    });
    await order.save();

    // TODO: emit order updated event walaupun so far ga bakal ada yang make sih wk

    msg.ack();
  }
}
