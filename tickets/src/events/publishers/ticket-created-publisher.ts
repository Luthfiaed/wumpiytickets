import {
  Publisher,
  EventSubjects,
  TicketCreatedEvent,
} from "@wumpiytickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: EventSubjects.TicketCreated = EventSubjects.TicketCreated;
}
