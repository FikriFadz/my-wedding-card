type CalendarDetails = {
  uid: string;
  start: string;
  end: string;
  summary: string;
  location: string;
  description: string;
};

const escapeIcs = (value: string) => value.replace(/[\\;,]/g, (character) => `\\${character}`).replace(/\n/g, "\\n");

export function createCalendarFile(details: CalendarDetails): string {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Fikri Husna//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    `UID:${details.uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=Asia/Kuala_Lumpur:${details.start}`,
    `DTEND;TZID=Asia/Kuala_Lumpur:${details.end}`,
    `SUMMARY:${escapeIcs(details.summary)}`,
    `LOCATION:${escapeIcs(details.location)}`,
    `DESCRIPTION:${escapeIcs(details.description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
