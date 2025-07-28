const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snapBtn = document.getElementById('snap');
const downloadLink = document.getElementById('download');
const shareBtn = document.getElementById('shareBtn');
const retakeBtn = document.getElementById('retakeBtn');
const frame = document.getElementById('frame');
const preview = document.getElementById('preview');
const ctx = canvas.getContext('2d');
const cameraArea = document.querySelector('.camera-area');

// Access webcam
navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
  .then(stream => {
    video.srcObject = stream;
  });

snapBtn.addEventListener('click', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Draw camera + frame
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

  const dataUrl = canvas.toDataURL('image/png');

  // Show preview only
  preview.src = dataUrl;
  preview.style.display = 'block';

  // Hide camera and snap button
  cameraArea.style.display = 'none';
  snapBtn.style.display = 'none';

  // Show download and share
  downloadLink.href = dataUrl;
  downloadLink.style.display = 'inline';

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

  // Show retake option
  retakeBtn.style.display = 'inline';
});

retakeBtn.addEventListener('click', () => {
  // Reset view
  preview.style.display = 'none';
  cameraArea.style.display = 'block';
  snapBtn.style.display = 'inline';
  downloadLink.style.display = 'none';
  shareBtn.style.display = 'none';
  retakeBtn.style.display = 'none';
});
