# 🎬 AI Face Animator

Transform your photos into seamless animated videos with AI-powered face preservation and smooth transitions.

## ✨ Features

- 📸 **Batch Image Upload** - Upload multiple photos easily with drag-and-drop
- 🤖 **AI Face Preservation** - Maintains facial features, landmarks, and expressions throughout animation
- 🎨 **Smart Transitions** - Smooth morphing between images using interpolation
- ⚙️ **Scene Configuration** - Customize transition duration, frame rate, and video quality
- 📊 **Real-time Progress** - Track animation generation with live progress updates
- 💾 **High-Quality Export** - Download your animation in multiple quality settings
- 🔧 **Advanced Settings** - Control facial preservation and transition smoothing

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/oriland123/ai-face-animator.git
cd ai-face-animator
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

4. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```
PORT=5000
NODE_ENV=development
HUGGING_FACE_API_KEY=your_key_here
RUNWAYML_API_KEY=your_key_here
REPLICATE_API_KEY=your_key_here
```

5. Create necessary directories:
```bash
mkdir -p uploads output
```

6. Start the application:

**Terminal 1 - Backend:**
```bash
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

7. Open your browser and navigate to `http://localhost:3000`

## 📖 Usage Guide

### Step 1: Upload Images
- Click the upload area or drag & drop your photos
- Support for JPG, PNG, WebP, and GIF formats
- You need at least 2 images to create an animation
- Maximum 20 images per project

### Step 2: Configure Scene
- **Transition Duration**: Set how long each transition takes (0.5-5 seconds)
- **Frame Rate**: Choose between 24 FPS (cinematic), 30 FPS (standard), or 60 FPS (smooth)
- **Video Quality**: Select output quality (360p, 720p, or 1080p)
- **Face Preservation**: Enable to maintain facial features and expressions
- **Smooth Transitions**: Enable for seamless morphing effects

### Step 3: Generate Animation
- Review the summary of your project
- Click "Generate Animation" to start processing
- Wait for the animation to be generated (progress updates shown)
- The process uses AI to:
  - Extract facial features from each image
  - Generate smooth transition frames
  - Preserve facial landmarks and expressions
  - Compile everything into a video

### Step 4: Download & Share
- Preview your animation in the built-in video player
- Download the MP4 file to your computer
- Create another animation or start fresh

## 🏗️ Project Structure

```
ai-face-animator/
├── server.js                 # Express server entry point
├── package.json             # Backend dependencies
├── .env.example             # Environment variables template
├── routes/
│   ├── upload.js           # Image upload endpoints
│   ├── animation.js        # Animation generation endpoints
│   └── video.js            # Video download endpoints
├── client/
│   ├── package.json        # Frontend dependencies
│   ├── public/
│   │   └── index.html      # HTML template
│   └── src/
│       ├── index.js        # React entry point
│       ├── App.js          # Main app component
│       ├── App.css         # Global styles
│       └── components/
│           ├── ImageUploader.js      # Image upload component
│           ├── SceneConfigurator.js  # Scene settings component
│           ├── VideoGenerator.js     # Animation generator component
│           └── AnimationPreview.js   # Video preview component
├── uploads/                 # Temporary image storage
└── output/                  # Generated video output
```

## 🔌 API Endpoints

### Upload Endpoints
- `POST /api/upload/image` - Upload a single image
- `POST /api/upload/images` - Upload multiple images
- `GET /api/upload/list/:sessionId` - List uploaded images
- `DELETE /api/upload/:sessionId/:filename` - Delete an image

### Animation Endpoints
- `POST /api/animation/create` - Create animation job
- `GET /api/animation/status/:jobId` - Check job status

### Video Endpoints
- `GET /api/video/preview/:jobId` - Stream video preview
- `GET /api/video/download/:jobId` - Download video file
- `DELETE /api/video/:jobId` - Delete generated video

## 🧠 AI Technologies Used

### Face Detection & Feature Extraction
- Hugging Face Face Detection API
- Facial landmark identification
- Expression and lighting analysis

### Animation Generation
- Interpolation algorithms for smooth transitions
- Morphing effects between image sequences
- Real-time feature preservation

### Video Compilation
- FFmpeg for video encoding
- Multiple quality and frame rate options
- Hardware acceleration support

## ⚙️ Technology Stack

### Backend
- **Express.js** - Web framework
- **Multer** - File upload handling
- **Axios** - HTTP client
- **FFmpeg** - Video processing
- **dotenv** - Environment configuration

### Frontend
- **React 18** - UI library
- **Tailwind CSS** - Styling
- **React Dropzone** - Drag-and-drop uploads
- **React Icons** - Icon components
- **Axios** - API communication

## 📋 Requirements

- Minimum 2 images, maximum 20 per project
- Image formats: JPG, PNG, WebP, GIF
- Maximum file size: 50MB per image
- Minimum face size: 100x100 pixels
- Video duration: Max 60 seconds
- Processing time: 30 seconds - 5 minutes depending on settings

## 🎯 Performance Tips

1. **Image Quality**: Use high-quality, well-lit photos
2. **Face Positioning**: Front-facing or 3/4 angles work best
3. **Consistency**: Similar lighting and angles improve results
4. **Transitions**: Longer transitions create smoother animations
5. **Frame Rate**: Higher FPS = smoother but larger file size
6. **Resolution**: Match image resolution to desired output quality

## 🐛 Troubleshooting

### Upload fails
- Check file size (max 50MB)
- Verify image format (JPG, PNG, WebP, GIF)
- Ensure valid image files

### Animation generation times out
- Use fewer images
- Reduce quality setting
- Try shorter transitions
- Check server logs

### Poor animation quality
- Use better quality source images
- Ensure consistent lighting
- Try front-facing angles
- Increase transition duration
- Enable face preservation

### Video playback issues
- Try different browser
- Check browser video codec support
- Download and play locally
- Verify MP4 format compatibility

## 🔐 Security & Privacy

- Images are processed server-side
- Temporary uploads deleted after processing
- Output videos stored temporarily
- No images sent to external services by default
- CORS enabled for API access

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review API endpoint details

## 🎓 Advanced Configuration

### Custom FFmpeg Settings
Edit the video compilation function in `routes/animation.js` to customize FFmpeg parameters.

### API Integration
Replace AI service calls with your preferred providers:
- OpenAI Vision API
- Google Cloud Vision
- AWS Rekognition
- MediaPipe Face Detection

### Database Integration
Add MongoDB or PostgreSQL for:
- User accounts
- Project history
- Animation storage
- Usage analytics

## 🚀 Future Enhancements

- [ ] User authentication and profiles
- [ ] Cloud storage integration
- [ ] Batch processing
- [ ] Real-time preview
- [ ] Mobile app
- [ ] Advanced face editing
- [ ] Multi-face support
- [ ] Custom music/audio
- [ ] Effect filters
- [ ] Social sharing

---

**Made with ❤️ by the AI Face Animator Team**
