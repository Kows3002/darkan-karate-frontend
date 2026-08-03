import { events } from "@/data/events";

export function EventList() {
  const orderedEvents = [...events].sort((a, b) => b.date.localeCompare(a.date));
  return <div className="event-ledger" aria-label="Darkan event calendar">
    {orderedEvents.map((event, index) => <article className={`event-ledger__item event-ledger__item--${event.status.toLowerCase()}`} key={event.slug}>
      <div className="event-ledger__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
      <div className="event-ledger__date"><time dateTime={event.date}>{event.displayDate}</time><span>{event.status}</span></div>
      <div className="event-ledger__copy"><p>{event.slug.includes("tournament") ? "Competition" : "Student progression"}</p><h3>{event.title}</h3>{event.description && <div>{event.description}</div>}</div>
      <span className="event-ledger__mark" aria-hidden="true" />
    </article>)}
  </div>;
}
