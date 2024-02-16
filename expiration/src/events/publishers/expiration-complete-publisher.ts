import {
  EventSubjects,
  ExpirationCompleteEvent,
  Publisher,
} from "@wumpiytickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: EventSubjects.ExpirationComplete = EventSubjects.ExpirationComplete;
}
