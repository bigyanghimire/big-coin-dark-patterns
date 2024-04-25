'use client'
import { useState, useRef } from 'react';

const ScanRetina = () => {
  // Define state variables
  const [stream, setStream] = useState(null);
  const [photo, setPhoto] = useState(null);

  const videoRef = useRef();

  const handleScanRetina = async () => {
    try {
      const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

      setStream(userMediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = userMediaStream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
      setStream(null);
    }
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const dataURL = canvas.toDataURL('image/png');

      setPhoto(dataURL);
    }
  };

  return (
    <div>
      <button onClick={handleScanRetina}>Scan Retina</button>
      {stream && (
        <div>
          <video ref={videoRef} autoPlay playsInline />
          <button onClick={takePhoto}>Take Photo</button>
        </div>
      )}
      {photo && (
        <div>
          <h2>Photo Preview</h2>
          <img src={photo} alt="Captured Photo" />
        </div>
      )}
    </div>
  );
};

export default ScanRetina;
