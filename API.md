# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Currently no authentication required. Future versions will support API tokens.

## Rate Limiting
- 100 requests per minute per IP
- Video generation: 5 concurrent jobs

---

## Upload Endpoints

### Upload Single Image
```http
POST /upload/image
```

**Headers:**
```
Content-Type: multipart/form-data
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| image | File | Yes | Image file (JPG, PNG, WebP, GIF) |

**Response:**
```json
{
  "success": true,
  "file": {
    "filename": "123456-789.jpg",
    "path": "/uploads/default/123456-789.jpg",
    "size": 2048576,
    "mimetype": "image/jpeg",
    "url": "/uploads/default/123456-789.jpg"
  }
}
```

**Curl Example:**
```bash
curl -X POST http://localhost:5000/api/upload/image \
  -F "image=@/path/to/image.jpg"
```

---

### Upload Multiple Images
```http
POST /upload/images
```

**Headers:**
```
Content-Type: multipart/form-data
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| images | File[] | Yes | Multiple image files (max 20) |

**Response:**
```json
{
  "success": true,
  "count": 3,
  "files": [
    {
      "filename": "123456-789.jpg",
      "path": "/uploads/default/123456-789.jpg",
      "size": 2048576,
      "mimetype": "image/jpeg",
      "url": "/uploads/default/123456-789.jpg"
    }
  ]
}
```

**Curl Example:**
```bash
curl -X POST http://localhost:5000/api/upload/images \
  -F "images=@image1.jpg" \
  -F "images=@image2.jpg" \
  -F "images=@image3.jpg"
```

---

### List Uploaded Images
```http
GET /upload/list/:sessionId
```

**Parameters:**
| Name | Type | Location | Required |
|------|------|----------|----------|
| sessionId | String | Path | Yes |

**Response:**
```json
{
  "files": [
    {
      "filename": "image1.jpg",
      "url": "/uploads/sessionId/image1.jpg"
    }
  ]
}
```

---

### Delete Image
```http
DELETE /upload/:sessionId/:filename
```

**Parameters:**
| Name | Type | Location | Required |
|------|------|----------|----------|
| sessionId | String | Path | Yes |
| filename | String | Path | Yes |

**Response:**
```json
{
  "success": true
}
```

---

## Animation Endpoints

### Create Animation
```http
POST /animation/create
```

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "images": [
    "/uploads/sessionId/image1.jpg",
    "/uploads/sessionId/image2.jpg"
  ],
  "sceneConfig": {
    "transitionDuration": 1.5,
    "framerate": 30,
    "quality": "high",
    "preserveFaceFeatures": true,
    "smoothTransitions": true
  },
  "jobId": "job_1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "jobId": "job_1234567890",
  "status": "queued"
}
```

**Curl Example:**
```bash
curl -X POST http://localhost:5000/api/animation/create \
  -H "Content-Type: application/json" \
  -d '{
    "images": ["url1", "url2"],
    "sceneConfig": {
      "transitionDuration": 1,
      "framerate": 30,
      "quality": "high"
    }
  }'
```

---

### Get Animation Status
```http
GET /animation/status/:jobId
```

**Parameters:**
| Name | Type | Location | Required |
|------|------|----------|----------|
| jobId | String | Path | Yes |

**Response:**
```json
{
  "jobId": "job_1234567890",
  "status": "processing",
  "progress": 45,
  "result": null,
  "error": null,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Status Values:**
- `queued` - Waiting to be processed
- `processing` - Currently generating
- `completed` - Ready to download
- `failed` - Error occurred

**Curl Example:**
```bash
curl -X GET http://localhost:5000/api/animation/status/job_1234567890
```

---

## Video Endpoints

### Preview Video
```http
GET /video/preview/:jobId
```

**Parameters:**
| Name | Type | Location | Required |
|------|------|----------|----------|
| jobId | String | Path | Yes |

**Response:** Video stream (MP4)

**Headers:**
```
Content-Type: video/mp4
Accept-Ranges: bytes
```

**Curl Example:**
```bash
curl -X GET http://localhost:5000/api/video/preview/job_1234567890 -o preview.mp4
```

---

### Download Video
```http
GET /video/download/:jobId
```

**Parameters:**
| Name | Type | Location | Required |
|------|------|----------|----------|
| jobId | String | Path | Yes |

**Response:** Video file download

**Headers:**
```
Content-Type: video/mp4
Content-Disposition: attachment; filename="animation_jobId.mp4"
```

---

### Delete Video
```http
DELETE /video/:jobId
```

**Parameters:**
| Name | Type | Location | Required |
|------|------|----------|----------|
| jobId | String | Path | Yes |

**Response:**
```json
{
  "success": true
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "At least 2 images are required"
}
```

### 404 Not Found
```json
{
  "error": "Video not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "An error occurred",
  "message": "Detailed error message (development only)"
}
```

---

## Configuration Parameters

### Scene Configuration Object
```json
{
  "transitionDuration": 1,        // 0.5-5 seconds
  "framerate": 30,               // 24, 30, or 60 FPS
  "quality": "high",             // low, medium, high
  "preserveFaceFeatures": true,   // Boolean
  "smoothTransitions": true       // Boolean
}
```

### File Constraints
- **Max file size**: 50MB
- **Supported formats**: JPG, PNG, WebP, GIF
- **Max images**: 20 per project
- **Min images**: 2 per project
- **Max video duration**: 60 seconds

---

## JavaScript SDK Example

```javascript
class AnimatorAPI {
  constructor(baseUrl = 'http://localhost:5000/api') {
    this.baseUrl = baseUrl;
  }

  // Upload images
  async uploadImages(files) {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    
    const response = await fetch(`${this.baseUrl}/upload/images`, {
      method: 'POST',
      body: formData
    });
    return response.json();
  }

  // Create animation
  async createAnimation(images, config) {
    const response = await fetch(`${this.baseUrl}/animation/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images, sceneConfig: config })
    });
    return response.json();
  }

  // Check status
  async getStatus(jobId) {
    const response = await fetch(`${this.baseUrl}/animation/status/${jobId}`);
    return response.json();
  }

  // Get video URL
  getVideoUrl(jobId) {
    return `${this.baseUrl}/video/preview/${jobId}`;
  }
}

// Usage
const api = new AnimatorAPI();
const images = await api.uploadImages([file1, file2]);
const result = await api.createAnimation(images, { transitionDuration: 1 });
```

---

## Pagination

Currently not implemented. All results returned in single response.

## WebSocket Support

Not yet implemented. Use polling for status updates.

## Webhook Support

Not yet implemented. Check status via polling.
