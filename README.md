# Ultra-Luxury Wedding Invitation Website

A cinematic, emotionally immersive wedding invitation website that feels like a high-end royal wedding experience.

## Features

✨ **Cinematic Invitation Opening**
- Dark luxury background with elegant animations
- Soft orchestral music with mute toggle
- Glowing wax seal animation
- Elegant text reveals with calligraphy-style couple names

💎 **Royal Design Language**
- Premium color palettes (Champagne gold, Deep emerald, Blush rose, Royal navy)
- Soft glowing borders and paper texture backgrounds
- Elegant serif typography with calligraphy fonts
- Smooth fade & parallax scroll animations

💖 **Couple Story Section**
- Scroll-based storytelling with cinematic transitions
- Four chapters: First Meeting, Falling in Love, The Proposal, The Wedding Day
- Subtle sparkle and shimmer animations

🗓 **Wedding Details**
- Animated countdown timer
- Venue information with Google Maps integration
- Dress code display
- Event schedule timeline

🎟 **Interactive RSVP**
- Luxury RSVP card with elegant animations
- Guest count selector
- Attendance confirmation (Accept/Decline)
- Confetti celebration on acceptance

🖼 **Editorial Gallery**
- Cinematic slideshow mode
- Lightbox with elegant captions
- Auto-play option
- Mobile swipe support

💌 **Personal Message**
- Handwritten-style letter animation
- Text animates as if being written
- Elegant closing signature

💎 **Luxury Features**
- Background music toggle
- Smooth page transitions
- Elegant loading animation with couple initials
- Password protection option
- Multi-language support (English, Urdu, Arabic)
- Floating floral animations
- Confetti burst on RSVP confirmation
- Fully mobile optimized

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Add your Google Maps API key to `.env` (optional, for venue map):
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
```

4. Customize the wedding details in `lib/constants.ts`:
   - Couple names
   - Wedding date and time
   - Venue information
   - Event schedule
   - Dress code

5. Add your images to `public/images/`:
   - `gallery-1.jpg` through `gallery-4.jpg` for the gallery section

6. Run the development server:
```bash
pnpm dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Couple Names
Edit `lib/constants.ts`:
```typescript
coupleNames: {
  firstName: "Ayesha",
  secondName: "Zain",
}
```

### Wedding Date
Update the date in `lib/constants.ts`:
```typescript
weddingDate: new Date("2024-12-15T18:00:00"),
```

### Colors
Modify the color palette in `tailwind.config.ts` under the `extend.colors` section.

### Password Protection
To enable password protection, set `showPasswordProtection` to `true` in `app/page.tsx`.

## Build for Production

```bash
pnpm build
pnpm start
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Intersection Observer** - Scroll animations
- **React Confetti** - Celebration effects
- **Google Maps API** - Venue map
- **Lucide React** - Icons
- **date-fns** - Date utilities

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private project - All rights reserved

