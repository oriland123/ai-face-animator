# Installation Guide

## System Requirements

- Operating System: Windows, macOS, or Linux
- Node.js: v14.0.0 or higher
- npm: v6.0.0 or higher (comes with Node.js)
- Memory: Minimum 4GB RAM
- Storage: 2GB free space (for images and videos)
- Internet: Required for API calls

## Step-by-Step Installation

### 1. Install Node.js

**Windows & macOS:**
- Visit https://nodejs.org/
- Download LTS version
- Run installer and follow prompts
- Verify installation:
```bash
node --version
npm --version
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install nodejs npm
```

### 2. Clone Repository

```bash
git clone https://github.com/oriland123/ai-face-animator.git
cd ai-face-animator
```

### 3. Backend Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### 4. Frontend Setup

```bash
cd client
npm install
cd ..
```

### 5. Configure Environment Variables

Edit `.env` file:

```env
# Server
PORT=5000
NODE_ENV=development

# API Keys (get from respective services)
HUGGING_FACE_API_KEY=your_token_here
RUNWAYML_API_KEY=your_key_here
REPLICATE_API_KEY=your_token_here

# Upload Configuration
MAX_FILE_SIZE=50000000
UPLOAD_DIR=uploads
OUTPUT_DIR=output

# Video Processing
VIDEO_FPS=30
VIDEO_QUALITY=high
MAX_VIDEO_DURATION=60
```

### 6. Get API Keys

#### Hugging Face
1. Visit https://huggingface.co/join
2. Create account
3. Go to Settings → Access Tokens
4. Create new token
5. Copy and paste in `.env`

#### Replicate (Optional)
1. Visit https://replicate.com
2. Sign up
3. Go to API tokens
4. Copy token
5. Add to `.env`

#### Runway ML (Optional)
1. Visit https://runwayml.com
2. Sign up
3. Get API key from dashboard
4. Add to `.env`

### 7. Create Directories

```bash
mkdir -p uploads output
```

### 8. Start Application

**Terminal 1 - Backend:**
```bash
npm start
```

Expected output:
```
Server running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

Browser should open to `http://localhost:3000`

## Development Mode

### Using Nodemon

For auto-restart on code changes:

```bash
npm run dev
```

### Using React DevTools

Install React DevTools browser extension for debugging.

## Docker Setup (Optional)

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000 3000

CMD ["npm", "start"]
```

### docker-compose.yml

```yaml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=development
      - PORT=5000
    volumes:
      - ./uploads:/app/uploads
      - ./output:/app/output

  frontend:
    build: ./client
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

## Troubleshooting Installation

### "npm command not found"
- Node.js not installed
- Solution: Install from nodejs.org

### "Port 5000 already in use"
- Change PORT in `.env`
- Or kill process: `lsof -i :5000` (macOS/Linux)

### "CORS errors"
- Frontend and backend not aligned
- Check API endpoint in frontend
- Verify server is running

### "Out of memory"
- Close other applications
- Increase Node memory: `node --max-old-space-size=4096 server.js`

### "Module not found"
- Run `npm install` again
- Delete `node_modules` and reinstall
- Clear npm cache: `npm cache clean --force`

## Deployment

### Heroku

1. Create Heroku account
2. Install Heroku CLI
3. Login: `heroku login`
4. Create app: `heroku create your-app-name`
5. Set environment: `heroku config:set PORT=5000`
6. Deploy: `git push heroku main`

### AWS/Azure/Google Cloud

See deployment guides in documentation.

## Next Steps

1. Check Usage Guide in README.md
2. Upload sample images
3. Configure scene settings
4. Generate your first animation
5. Explore advanced settings

## Support

- Check troubleshooting section
- Review server logs
- Open GitHub issue
- Contact development team
