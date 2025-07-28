# AI Central Knowledge Hub

A comprehensive, user-friendly web platform that serves as a centralized resource hub for AI learning, exploration, and implementation across your organization. Built with Next.js, React, and TypeScript.

## 🎯 Purpose

The AI Central Knowledge Hub empowers employees with foundational and advanced AI knowledge while supporting AI upskilling, knowledge sharing, mentorship, and tracking implementation impact across all organizational levels.

## 🚀 Features

### 🧠 AI Literacy Hub
- **Learning Workshops Repository**: Access past and ongoing workshops with advanced filtering by level, topic, and date
- **Upcoming Events Calendar**: Register for events with automated reminders and calendar integration
- **Best Practices Sharing**: Community-driven platform for sharing AI implementation knowledge

### 📚 Workshop Management
- **Advanced Filtering**: Filter by skill level, topic, facilitator, and date
- **Rich Workshop Cards**: Include facilitator info, duration, participant count, ratings, and topics
- **Resource Access**: Direct links to recordings, materials, and presentations
- **Registration System**: Event registration with calendar integration

### 📅 Event Management
- **Calendar-style Display**: Visual event scheduling with capacity tracking
- **Registration Capabilities**: Full registration system with capacity management
- **Calendar Integration**: "Add to Calendar" functionality for Outlook/Google Calendar
- **Real-time Status**: Live capacity updates and registration alerts

### 💡 Knowledge Sharing
- **Best Practices Repository**: Community-contributed implementation guides
- **Interactive Features**: Like, comment, and share functionality
- **Content Categorization**: Organized by category with tagging system
- **Search & Discovery**: Advanced search across all content types

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Responsive Design**: Mobile-first approach

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-central-knowledge-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Homepage
│   ├── workshops/         # Workshop pages
│   ├── events/            # Event pages
│   └── best-practices/    # Best practices pages
├── components/            # Reusable React components
│   └── Header.tsx         # Navigation header
├── lib/                   # Utility functions and data
│   └── data.ts           # Sample data and TypeScript interfaces
├── public/               # Static assets
└── README.md            # Project documentation
```

## 🎨 Design System

The application uses a cohesive design system with:

- **Color Palette**: Primary blue theme with semantic color variations
- **Typography**: Inter font family for optimal readability
- **Components**: Reusable card system with hover effects
- **Spacing**: Consistent spacing scale using Tailwind CSS
- **Responsive**: Mobile-first responsive design

## 📱 Key Pages

### Homepage (`/`)
- Hero section with platform overview
- Featured workshops showcase
- Upcoming events preview
- Statistics dashboard
- AI Literacy Hub sections

### Workshops (`/workshops`)
- Advanced filtering and search
- Workshop repository with detailed cards
- Registration and calendar integration
- Resource access (recordings, materials)

### Events (`/events`)
- Calendar-style event display
- Registration management
- Capacity tracking
- Real-time status updates

### Best Practices (`/best-practices`)
- Community knowledge sharing
- Interactive content (likes, comments)
- Content submission form
- Advanced categorization

## 🔧 Customization

### Adding New Data
Edit `lib/data.ts` to add new workshops, events, or best practices:

```typescript
export const workshops: Workshop[] = [
  // Add new workshop objects here
]
```

### Styling Changes
Modify `tailwind.config.js` for design system updates:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Custom color palette
      }
    }
  }
}
```

### Component Customization
All components are in the `components/` directory and can be easily modified.

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub repository
2. Connect to Vercel
3. Deploy automatically

### Other Platforms
```bash
npm run build
npm start
```

## 📊 Features Implementation Status

- ✅ **Workshop Repository**: Complete with filtering and search
- ✅ **Event Registration**: Full registration system with capacity tracking
- ✅ **Best Practices Platform**: Community-driven knowledge sharing
- ✅ **Calendar Integration**: "Add to Calendar" functionality
- ✅ **Responsive Design**: Mobile-optimized interface
- ✅ **Advanced Filtering**: Multi-criteria filtering across all content
- 🔄 **User Authentication**: Ready for integration
- 🔄 **Real Calendar API**: Ready for Outlook/Google integration
- 🔄 **File Upload System**: Ready for materials management
- 🔄 **Analytics Dashboard**: Foundation in place

## 🎯 Target Audience

- **Employees across all levels** (entry to leadership)
- **AI champions and implementation teams**
- **Mentors and learners within AI programs**
- **Leadership seeking AI use-case impact visibility**

## 📈 Success Metrics

The platform is designed to track:
- Workshop registration and completion rates
- Knowledge sharing participation
- Implementation tracking across teams
- Cross-departmental collaboration
- ROI measurement for AI initiatives

## 🤝 Contributing

This platform is designed to be easily extensible. Key areas for contribution:
- Additional workshop types and formats
- Enhanced filtering capabilities
- Integration with existing organizational systems
- Advanced analytics and reporting features

## 📝 License

MIT License - see LICENSE file for details.

## 🆘 Support

For questions about implementation or customization, refer to the Product.md file for detailed requirements and specifications.

---

**Built with ❤️ for AI learning and organizational growth** # AICentral
