export const WEDDING_CONFIG = {
  coupleNames: {
    firstName: "Ayesha",
    secondName: "Umer Sandhu",
  },
  weddingDate: new Date("2024-12-15T18:00:00"),
  venue: {
    name: "The Grand Ballroom",
    address: "123 Luxury Avenue, City, Country",
    coordinates: {
      lat: 40.7128,
      lng: -74.0060,
    },
  },
  dressCode: "Black Tie Optional",
  events: [
    {
      name: "Nikkah Ceremony",
      date: new Date("2024-12-15T17:00:00"),
      time: "5:00 PM",
      description: "Wedding ceremony",
      venue: {
        name: "The Grand Ballroom",
        address: "123 Luxury Avenue, City, Country",
        coordinates: {
          lat: 40.7128,
          lng: -74.0060,
        },
      },
    },
    {
      name: "Baraat",
      date: new Date("2024-12-15T16:00:00"),
      time: "4:00 PM",
      description: "Groom's procession",
      venue: {
        name: "The Grand Ballroom",
        address: "123 Luxury Avenue, City, Country",
        coordinates: {
          lat: 40.7128,
          lng: -74.0060,
        },
      },
    },
    {
      name: "Reception",
      date: new Date("2024-12-15T19:00:00"),
      time: "7:00 PM",
      description: "Dinner and celebration",
      venue: {
        name: "The Grand Ballroom",
        address: "123 Luxury Avenue, City, Country",
        coordinates: {
          lat: 40.7128,
          lng: -74.0060,
        },
      },
    },
  ],
  languages: ["en", "ur", "ar"],
} as const;

