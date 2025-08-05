# 🎵 Boomy - AI Music Generation SaaS

A production-ready SaaS application that generates original music using state-of-the-art AI models. Create unique tracks from simple text descriptions, custom lyrics, or style prompts with our comprehensive music generation platform.

## ✨ Features

### 🎼 AI Music Generation

- **ACE-Step Model**: Generate high-quality music using advanced AI models
- **Multiple Generation Modes**:
  - Simple text descriptions
  - Custom lyrics input
  - Described lyrics with AI assistance
- **Instrumental Tracks**: Generate music without vocals
- **LLM-Powered Lyrics**: Qwen2-7B model for intelligent lyric generation

### 🎨 AI Thumbnail Generation

- **Stability AI Integration**: Generate custom thumbnails using sdxl-turbo
- **Automatic Visuals**: Every track gets a unique visual representation

### ⚡ Performance & Scalability

- **Serverless GPU Processing**: Modal integration for fast, scalable generation
- **Background Queue System**: Inngest-powered task management
- **Real-time Processing**: Handle multiple users simultaneously

### 💳 Monetization & Payments

- **Credit-Based System**: Fair usage model with credit packs
- **Polar.sh Integration**: Seamless payment processing
- **Flexible Pricing**: Multiple credit pack options

### 👥 User Experience

- **Modern Authentication**: BetterAuth for secure user management
- **Community Music Feed**: Discover, play, and like user-generated music
- **Personal Dashboard**: Manage, play, and publish your tracks
- **Responsive Design**: Beautiful UI with Next.js, Tailwind CSS & Shadcn UI

## 🛠️ Tech Stack

### Frontend

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: Beautiful, accessible components
- **BetterAuth**: Modern authentication solution

### Backend & AI

- **Python & FastAPI**: High-performance API backend
- **Modal**: Serverless GPU processing
- **Inngest**: Background job processing
- **ACE-Step**: State-of-the-art music generation
- **Qwen2-7B**: LLM for lyric generation
- **Stability AI**: Thumbnail generation

### Infrastructure

- **Neon**: Serverless PostgreSQL database
- **AWS S3**: File storage for audio and images
- **Polar.sh**: Payment processing and subscription management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- Docker (optional)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/boomy.git
   cd boomy
   ```

2. **Install frontend dependencies**

   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**

   ```bash
   cd ../backend
   pip install -r requirements.txt
   ```

4. **Set up environment variables**

   ```bash
   # Frontend (.env.local)
   DATABASE_URL="your-neon-database-url"
   POLAR_SECRET_KEY="your-polar-secret"
   MODAL_TOKEN_ID="your-modal-token"
   MODAL_TOKEN_SECRET="your-modal-secret"

   # Backend (.env)
   AWS_ACCESS_KEY_ID="your-aws-key"
   AWS_SECRET_ACCESS_KEY="your-aws-secret"
   S3_BUCKET_NAME="your-s3-bucket"
   ```

5. **Start the development servers**

   ```bash
   # Frontend
   cd frontend
   npm run dev

   # Backend
   cd ../backend
   uvicorn main:app --reload
   ```

## 📁 Project Structure

```
boomy/
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # React components
│   │   ├── lib/            # Utilities and configurations
│   │   └── styles/         # Global styles
│   └── public/             # Static assets
├── backend/                 # FastAPI application
│   ├── api/                # API routes
│   ├── models/             # AI models and processing
│   └── utils/              # Helper functions
└── docs/                   # Documentation
```

## 🎯 Key Features Explained

### AI Music Generation

Our platform uses the ACE-Step model to generate high-quality music from text descriptions. Users can:

- Describe the mood, genre, and style they want
- Provide custom lyrics for the AI to work with
- Use AI-assisted lyric generation for inspiration

### Credit System

Users purchase credit packs through Polar.sh to generate music. Each generation costs credits, ensuring fair usage and sustainable service.

### Background Processing

Inngest handles the queue system, allowing users to submit generation requests and receive notifications when their music is ready.

### Community Features

Users can discover music from the community, like tracks, and share their own creations in a social music platform.

## 🔧 Development

### Adding New Features

1. Create feature branch: `git checkout -b feature/new-feature`
2. Implement changes with proper TypeScript types
3. Add tests for new functionality
4. Submit pull request with detailed description

### Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add JSDoc comments for complex functions

## 🚀 Deployment

### Frontend (Vercel)

```bash
npm run build
vercel --prod
```

### Backend (Railway/Render)

```bash
pip install -r requirements.txt
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Environment Setup

Ensure all environment variables are configured in your deployment platform:

- Database connections
- API keys for AI services
- AWS credentials for S3
- Polar.sh integration keys

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Modal](https://modal.com) for serverless GPU processing
- [Polar.sh](https://polar.sh) for payment processing
- [Stability AI](https://stability.ai) for image generation
- [BetterAuth](https://better-auth.com) for authentication
- [Inngest](https://inngest.com) for background job processing

## 📞 Support

- **Documentation**: [docs.boomy.ai](https://docs.boomy.ai)
- **Issues**: [GitHub Issues](https://github.com/yourusername/boomy/issues)
- **Discord**: [Join our community](https://discord.gg/boomy)

---

Built with ❤️ by the Boomy team
