# Wedding Website - Akhil & Sethu

A beautiful, interactive wedding website built with React, TypeScript, and Vite. Features a stunning timeline story section with smooth animations and responsive design.

## 🌟 Features

- **Interactive Timeline**: Horizontal scrolling timeline with smooth animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Built with Tailwind CSS and Radix UI components
- **Smooth Animations**: Powered by Framer Motion
- **Touch & Swipe Support**: Native touch gestures for mobile navigation
- **Wedding Details**: Complete ceremony and reception information
- **Gallery Section**: Beautiful photo gallery
- **RSVP System**: Guest response management
- **PWA Ready**: Progressive Web App capabilities

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd wedding-site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
wedding-site/
├── client/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── data/          # Wedding data and content
│   │   ├── hooks/         # Custom React hooks
│   │   ├── types/         # TypeScript type definitions
│   │   └── assets/        # Images and media files
│   ├── public/            # Static assets
│   └── index.html         # Main HTML file
├── attached_assets/       # Additional media assets
├── dist/                  # Build output
└── package.json          # Dependencies and scripts
```

## 🎨 Data Configuration

### Wedding Information

The main wedding data is stored in `client/src/data/weddingData.ts`. This file contains:

- **Bride & Groom Details**: Names, photos, professions, family information
- **Wedding Events**: Ceremony and reception details with dates, times, and locations
- **Gallery**: Photo collection for the gallery section
- **People**: Wedding party and family member information

### Timeline Story

The timeline story data is in `client/src/data/timelineData.ts` and includes:

- **Story Scenes**: Each scene with title, date, message, and image
- **Animation Settings**: Motion configurations for smooth transitions
- **Image Assets**: References to story images

## 🔧 Customization for Self-Hosting

### 1. Update Wedding Data

Edit `client/src/data/weddingData.ts`:

```typescript
export const weddingData = {
  groom: {
    name: "Your Name",
    fullName: "Your Full Name",
    // ... update all groom details
  },
  bride: {
    name: "Partner Name", 
    fullName: "Partner Full Name",
    // ... update all bride details
  },
  wedding: {
    date: new Date("YYYY-MM-DDTHH:mm:ss"), // Your wedding date
    ceremony: {
      place: "Your Venue Name",
      location: "Your Address",
      // ... update ceremony details
    },
    reception: {
      place: "Your Reception Venue",
      // ... update reception details
    }
  }
}
```

### 2. Update Timeline Story

Edit `client/src/data/timelineData.ts`:

```typescript
export const timelineScenes: TimelineScene[] = [
  {
    id: 'scene-1',
    title: 'Your Story Title',
    date: 'Your Date',
    message: 'Your story message...',
    image: {
      src: '/your-image.jpg', // Place images in client/public/
      alt: 'Your image description'
    }
  },
  // ... add more scenes
];
```

### 3. Replace Images

Replace the images in the following locations:

#### Story Images
Place your timeline story images in `client/public/`:
- `/phone-notification.jpg`
- `/chat.png`
- `/first_meet.png`
- `/we-meet.jpg`
- `/engagement.jpg`
- `/Wedding.png`

#### Profile & Wedding Images
Replace images in `attached_assets/`:
- `akhil_avatar_1768316293680.png` - Groom's photo
- `sethu_avatar_1768316293680.png` - Bride's photo
- `couple_1768316554062.jpeg` - Couple photo
- `couple_bg.png` - Couple background image
- `couple_video.mp4` - Couple video
- `wedding_card.png` - Wedding invitation card
- `reception_card.png` - Reception invitation card

### 4. Update Styling & Colors

The project uses Tailwind CSS. You can customize colors in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: "your-primary-color",
      accent: "your-accent-color",
      // ... customize other colors
    }
  }
}
```

### 5. Configure Fonts

Update font families in `tailwind.config.ts`:

```typescript
fontFamily: {
  display: ["Your Display Font"],
  body: ["Your Body Font"],
  script: ["Your Script Font"],
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the configuration from `vercel.json`
4. Deploy with one click

### Other Platforms

For other hosting platforms:

1. Build the project:
```bash
npm run build
```

2. Upload the `dist` folder contents to your web server

3. Configure your server to serve `index.html` for all routes (SPA routing)

## 🛠️ Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run check` - Run TypeScript type checking

## 📱 Mobile Optimization

The website is fully responsive and includes:

- Touch gesture support for timeline navigation
- Optimized layouts for mobile screens
- Progressive Web App (PWA) capabilities
- Fast loading with optimized images

## 🎯 Key Components

- **Timeline**: Interactive horizontal scrolling timeline (`client/src/components/Timeline.tsx`)
- **TimelineScene**: Individual story scenes (`client/src/components/TimelineScene.tsx`)
- **Wedding Data Hook**: Data management (`client/src/hooks/use-wedding-data.ts`)

## 🔒 Privacy & Security

- No external data collection
- All data stored locally in the codebase
- HTTPS recommended for production deployment
- Consider adding password protection for private events

## 📄 License

MIT License - Feel free to use this template for your own wedding website!

## 🤝 Contributing

This is a personal wedding website template. Feel free to fork and customize for your own use.

## 💡 Tips for Success

1. **Test on Multiple Devices**: Ensure your site works well on phones, tablets, and desktops
2. **Optimize Images**: Compress images for faster loading
3. **Update Regularly**: Keep information current as wedding plans evolve
4. **Share Early**: Send the link to guests well in advance
5. **Backup Data**: Keep backups of your customized data files

---

Made with ❤️ for Akhil & Sethu's special day