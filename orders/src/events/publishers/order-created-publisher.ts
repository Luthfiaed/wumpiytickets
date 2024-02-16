import {
  EventSubjects,
  OrderCreatedEvent,
  Publisher,
} from "@wumpiytickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: EventSubjects.OrderCreated = EventSubjects.OrderCreated;
}
