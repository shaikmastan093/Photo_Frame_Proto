const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snapBtn = document.getElementById('snap');
const downloadLink = document.getElementById('download');
const shareBtn = document.getElementById('shareBtn');
const frame = document.getElementById('frame');
const preview = document.getElementById('preview');
const ctx = canvas.getContext('2d');

// Access webcam
navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
  .then(stream => {
    video.srcObject = stream;
  });

snapBtn.addEventListener('click', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Draw the webcam image
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Overlay the frame image
  ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

  // Create data URL
  const dataUrl = canvas.toDataURL('image/png');

  // Show preview image
  preview.src = dataUrl;
  preview.style.display = 'block';

  // Setup download
  downloadLink.href = dataUrl;
  downloadLink.style.display = 'inline';

  // Setup share
  if (navigator.share) {
    shareBtn.style.display = 'inline';
    shareBtn.onclick = () => {
      fetch(dataUrl)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'anirudh_selfie.png', { type: 'image/png' });
          navigator.share({
            title: 'Anirudh Live 2025 Selfie',
            text: 'Check out my concert selfie with Anirudh!',
            files: [file]
          });
        });
    };
  } else {
    shareBtn.style.display = 'none';
  }
});
