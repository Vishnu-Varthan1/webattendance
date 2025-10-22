import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const FaceAttendance: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [studentId, setStudentId] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const [webcamError, setWebcamError] = useState('');

  const capture = useCallback(() => {
    const imgSrc = webcamRef.current?.getScreenshot();
    if (imgSrc) {
      setImage(imgSrc);
      setMessage('');
    } else {
      setMessage('Failed to capture image. Please allow camera access.');
    }
  }, []);

  const handleRegister = async () => {
    if (!studentId) {
      setMessage('Please enter Student ID');
      return;
    }
    if (!image) {
      setMessage('Please capture an image first');
      return;
    }
    try {
      const res = await axios.post('/api/face/register', { student_id: studentId, image });
      setMessage(res.data.message || 'Registered successfully');
    } catch {
      setMessage('Face registration failed');
    }
  };

  type RecognizedStudent = {
    student_id: string;
    // add other fields if needed
  };
  
  const handleRecognize = async () => {
      if (!image) {
        setMessage('Please capture an image first');
        return;
      }
      try {
        const res = await axios.post('/api/face/recognize', { image });
        if (res.data.recognized_students?.length) {
          setMessage(`Recognized: ${res.data.recognized_students.map((s: RecognizedStudent) => s.student_id).join(', ')}`);
        } else {
          setMessage('No face recognized');
        }
      } catch {
        setMessage('Face recognition failed');
      }
    };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Face Attendance</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
        videoConstraints={{ facingMode: 'user' }}
        onUserMediaError={() => setWebcamError('Webcam access denied or not available')}
        className="mx-auto rounded border border-gray-400"
      />
      {webcamError && <p className="text-red-600 text-center mt-2">{webcamError}</p>}
      <div className="flex justify-center space-x-4 mt-4 mb-4">
        <button
          onClick={capture}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Capture Photo
        </button>
        <button
          onClick={handleRecognize}
          disabled={!image}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-green-700"
        >
          Recognize Face
        </button>
        <button
          onClick={handleRegister}
          disabled={!image || !studentId}
          className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-700"
        >
          Register Face
        </button>
      </div>
      <input
        type="text"
        placeholder="Student ID"
        value={studentId}
        onChange={e => setStudentId(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      {image && <img src={image} alt="Captured" className="mx-auto rounded border border-gray-500" width={160} />}
      <p className="text-center mt-4 font-medium text-gray-700">{message}</p>
    </div>
  );
};

export default FaceAttendance;
