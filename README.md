# Cosmovera - AI Cosmetics Assistant

An intelligent cosmetics assistant that helps users understand ingredients, safety, and make informed decisions about beauty products.

## Features

- AI-powered cosmetic ingredient analysis
- Real-time safety assessments
- Voice-enabled interactions
- Detailed ingredient information database
- User authentication with GitHub
- Persistent data storage with Supabase

## Tech Stack

- Next.js 14
- TypeScript
- OpenAI GPT-4
- ElevenLabs Text-to-Speech
- Supabase (Database)
- GitHub Authentication

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # OpenAI Configuration
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key

   # ElevenLabs Configuration
   NEXT_PUBLIC_ELEVENLABS_API_KEY=your_elevenlabs_api_key
   NEXT_PUBLIC_ELEVENLABS_VOICE_ID=your_elevenlabs_voice_id

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   GITHUB_ID=your_github_oauth_app_client_id
   GITHUB_SECRET=your_github_oauth_app_client_secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

### AI Assistant
- Chat with an AI expert about cosmetics
- Get detailed ingredient analysis
- Receive safety recommendations

### Ingredient Analysis
- Search for specific ingredients
- View safety ratings and details
- Get alternative suggestions
- Access scientific information

### Voice Interaction
- Enable voice responses
- Natural conversation flow
- Accessibility support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 
