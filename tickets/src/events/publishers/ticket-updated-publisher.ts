import {
  Publisher,
  EventSubjects,
  TicketUpdatedEvent,
} from "@wumpiytickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: EventSubjects.TicketUpdated = EventSubjects.TicketUpdated;
}
