# Public Assets Directory

This folder contains static assets that are served directly by Next.js. Files in this directory can be accessed from the root URL path.

## Directory Structure

```
public/
├── images/
│   ├── workshops/          # Workshop-related images
│   ├── events/            # Event photos and banners
│   ├── facilitators/      # Facilitator profile photos
│   ├── logos/             # Company and partner logos
│   └── best-practices/    # Images for best practice posts
├── icons/                 # App icons and favicons
├── documents/             # PDFs, presentations, etc.
└── README.md             # This file
```

## Usage Examples

### In React Components

```typescript
// Workshop image
<img src="/images/workshops/ml-intro.jpg" alt="Machine Learning Workshop" />

// Facilitator photo
<img src="/images/facilitators/dr-sarah-chen.jpg" alt="Dr. Sarah Chen" />

// Logo
<img src="/images/logos/company-logo.png" alt="Company Logo" />
```

### Using Next.js Image Component (Recommended)

```typescript
import Image from 'next/image'

<Image
  src="/images/workshops/ml-intro.jpg"
  alt="Machine Learning Workshop"
  width={400}
  height={300}
  className="rounded-lg"
/>
```

### In CSS/Tailwind

```css
background-image: url('/images/events/ai-conference-banner.jpg');
```

## File Naming Conventions

- Use lowercase letters and hyphens for filenames
- Be descriptive: `workshop-deep-learning-fundamentals.jpg`
- Include dimensions in filename if needed: `logo-company-300x100.png`

## Supported Formats

- **Images**: JPG, PNG, SVG, WebP, AVIF
- **Documents**: PDF, DOC, DOCX, PPT, PPTX
- **Videos**: MP4, WebM
- **Other**: Any static file type

## Optimization Tips

1. **Compress images** before uploading
2. **Use WebP format** for better compression
3. **Provide alt text** for accessibility
4. **Use Next.js Image component** for automatic optimization
5. **Consider responsive images** for different screen sizes

## Example File Organization

```
workshops/
├── intro-to-ml-banner.jpg
├── deep-learning-cover.png
└── ai-ethics-thumbnail.webp

facilitators/
├── dr-sarah-chen-headshot.jpg
├── prof-michael-rodriguez.png
└── dr-emily-watson-profile.webp

events/
├── nlp-workshop-banner.jpg
├── computer-vision-event.png
└── ai-strategy-discussion.webp
```

## Access URLs

All files in the public directory are accessible via:
- `http://localhost:3000/images/workshops/example.jpg`
- `http://localhost:3000/documents/workshop-slides.pdf`
- `http://localhost:3000/logos/company-logo.svg` 