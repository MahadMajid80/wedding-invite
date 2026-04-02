export const WEDDING_CONFIG = {
  coupleNames: {
    firstName: "Nabeen Azan",
    secondName: "Bisharat",
  },
  /** Countdown target: 14 April 2026 (6:00 PM local) */
  countdownDate: new Date("2026-04-14T18:00:00"),
  weddingDate: new Date("2024-12-15T18:00:00"),
  venue: {
    name: "La Grande Banquet",
    address:
      "R4CG+9JQ, Nasir Colony Rd, Nasir Colony Sector 32 E Korangi, Karachi",
    coordinates: {
      lat: 24.8219,
      lng: 67.1276,
    },
  },
  events: [
    {
      name: "Walima",
      date: new Date("2026-04-14T21:00:00"),
      time: "9:00 PM",
      description: "Dinner and celebration",
      venue: {
        name: "La Grande Banquet",
        address:
          "R4CG+9JQ, Nasir Colony Rd, Nasir Colony Sector 32 E Korangi, Karachi",
        coordinates: {
          lat: 24.8219,
          lng: 67.1276,
        },
      },
    },
  ],
  languages: ["en", "ur", "ar"],
} as const;

