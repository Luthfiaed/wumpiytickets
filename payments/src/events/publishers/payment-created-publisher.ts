import {
  EventSubjects,
  PaymentCreatedEvent,
  Publisher,
} from "@wumpiytickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: EventSubjects.PaymentCreated = EventSubjects.PaymentCreated;
}
