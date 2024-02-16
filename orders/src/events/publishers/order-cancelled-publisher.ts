import {
  Publisher,
  OrderCancelledEvent,
  EventSubjects,
} from "@wumpiytickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: EventSubjects.OrderCancelled = EventSubjects.OrderCancelled;
}
