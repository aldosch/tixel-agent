import { defineTool } from "eve/tools";
import { z } from "zod";

type TicketEvent = {
  id: string;
  name: string;
  category: string;
  venue: string;
  city: string;
  date: string;
  faceValue: number;
  currency: string;
  listings: number;
  lowestPrice: number;
  highestPrice: number;
};

const EVENTS: TicketEvent[] = [
  { id: "harry-styles", name: "Harry Styles", category: "music", venue: "Rod Laver Arena", city: "Melbourne", date: "2026-12-15", faceValue: 129.5, currency: "AUD", listings: 23, lowestPrice: 115.0, highestPrice: 180.0 },
  { id: "tame-impala", name: "Tame Impala", category: "music", venue: "John Cain Arena", city: "Melbourne", date: "2026-11-20", faceValue: 149.9, currency: "AUD", listings: 18, lowestPrice: 140.0, highestPrice: 195.0 },
  { id: "post-malone", name: "Post Malone", category: "music", venue: "Marvel Stadium", city: "Melbourne", date: "2026-10-30", faceValue: 159.0, currency: "AUD", listings: 31, lowestPrice: 135.0, highestPrice: 220.0 },
  { id: "robbie-williams", name: "Robbie Williams", category: "music", venue: "Rod Laver Arena", city: "Melbourne", date: "2026-11-05", faceValue: 139.5, currency: "AUD", listings: 12, lowestPrice: 120.0, highestPrice: 175.0 },
  { id: "foo-fighters", name: "Foo Fighters", category: "music", venue: "Marvel Stadium", city: "Melbourne", date: "2026-12-01", faceValue: 169.0, currency: "AUD", listings: 28, lowestPrice: 150.0, highestPrice: 240.0 },
  { id: "guns-n-roses", name: "Guns N' Roses", category: "music", venue: "Marvel Stadium", city: "Melbourne", date: "2026-11-28", faceValue: 179.5, currency: "AUD", listings: 35, lowestPrice: 160.0, highestPrice: 280.0 },
  { id: "beyond-the-valley", name: "Beyond the Valley", category: "festival", venue: "Hanging Flats", city: "Melbourne", date: "2026-12-28", faceValue: 189.0, currency: "AUD", listings: 45, lowestPrice: 170.0, highestPrice: 250.0 },
  { id: "afl-grand-final", name: "AFL Grand Final 2026", category: "sports", venue: "MCG", city: "Melbourne", date: "2026-09-26", faceValue: 225.0, currency: "AUD", listings: 8, lowestPrice: 210.0, highestPrice: 350.0 },
  { id: "dom-dolla", name: "Dom Dolla", category: "music", venue: "Marvel Stadium", city: "Melbourne", date: "2026-09-24", faceValue: 119.0, currency: "AUD", listings: 22, lowestPrice: 99.0, highestPrice: 165.0 },
  { id: "josh-thomas", name: "Josh Thomas", category: "comedy", venue: "Comedy Theatre", city: "Melbourne", date: "2026-10-15", faceValue: 65.0, currency: "AUD", listings: 5, lowestPrice: 55.0, highestPrice: 75.0 },
];

export default defineTool({
  description:
    "Check ticket prices for events on Tixel. Search by event name, artist, or venue. Returns face value, current resale prices, and number of listings.",

  inputSchema: z.object({
    query: z
      .string()
      .min(1)
      .describe(
        "Event name, artist name, or venue to search for (e.g. 'Harry Styles', 'AFL', 'Beyond the Valley')",
      ),
  }),

  outputSchema: z.object({
    results: z.array(
      z.object({
        name: z.string(),
        venue: z.string(),
        city: z.string(),
        date: z.string(),
        faceValue: z.number(),
        currency: z.string(),
        listings: z.number(),
        lowestPrice: z.number(),
        highestPrice: z.number(),
        belowFaceValue: z.boolean(),
      }),
    ),
    total: z.number(),
  }),

  async execute({ query }) {
    const q = query.toLowerCase().trim();

    const matches = EVENTS.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q),
    );

    return {
      results: matches.map((e) => ({
        name: e.name,
        venue: e.venue,
        city: e.city,
        date: e.date,
        faceValue: e.faceValue,
        currency: e.currency,
        listings: e.listings,
        lowestPrice: e.lowestPrice,
        highestPrice: e.highestPrice,
        belowFaceValue: e.lowestPrice < e.faceValue,
      })),
      total: matches.length,
    };
  },
});
