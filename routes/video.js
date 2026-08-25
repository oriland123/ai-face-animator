const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Get generated video
router.get('/download/:jobId', (req, res) => {
  const videoPath = path.join(process.env.OUTPUT_DIR || 'output', `animation_${req.params.jobId}.mp4`);
  
  if (!fs.existsSync(videoPath)) {
    return res.status(404).json({ error: 'Video not found' });
  }

  res.download(videoPath);
});

// Stream video for preview
router.get('/preview/:jobId', (req, res) => {
  const videoPath = path.join(process.env.OUTPUT_DIR || 'output', `animation_${req.params.jobId}.mp4`);
  
  if (!fs.existsSync(videoPath)) {
    return res.status(404).json({ error: 'Video not found' });
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': end - start + 1,
      'Content-Type': 'video/mp4'
    });
    fs.createReadStream(videoPath, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4'
    });
    fs.createReadStream(videoPath).pipe(res);
  }
});

// Delete video
router.delete('/:jobId', (req, res) => {
  const videoPath = path.join(process.env.OUTPUT_DIR || 'output', `animation_${req.params.jobId}.mp4`);
  
  fs.unlink(videoPath, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete video' });
    }
    res.json({ success: true });
  });
});

module.exports = router;
