"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./celeb.css";
import ScanRetina from "../scan/page";

export default function Home() {
  const modalStyle = {
    minWidth: "60%", 
    minHeight: "60%", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const [isOpen, setIsOpen] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);
  const [isCelebrating, setIsCelebrating] = useState(false);

  const [stream, setStream] = useState(null);
  const [totalCoins, setTotalCoins] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [showScanRetinaCard, setShowScanRetinaCard] = useState(false);

  const videoRef = useRef();
  const handleCelebrate = () => {
    setIsCelebrating(true);
    setTimeout(() => {
      setIsCelebrating(false);
    }, 2000); 
  };
  const handleScanRetina = async () => {
    try {
      const userMediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      setStream(userMediaStream);

      if (videoRef.current) {
        console.log("here is");
        videoRef.current.srcObject = userMediaStream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
    startRecording();

  };
  useEffect(()=>{
console.log("stream is",stream)
if(stream){
  startRecording();
}
  },[stream])
  useEffect(()=>{
    console.log("mediarec>>>>")
    if(mediaRecorderRef.current){
      console.log("chunksref>>>>")
    mediaRecorderRef.current.ondataavailable = (event) => {
      console.log("chunksref",event)

      chunksRef.current.push(event.data);
    };
  }
  },[mediaRecorderRef])
  const startRecording = () => {
    console.log("statyed",stream)
    if (stream && videoRef.current) {
      console.log("statyed inside") 
      mediaRecorderRef.current  = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        console.log("chunksref",event)

        chunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.start();
      // setTimeout(() => {
      //   stopRecording();
      // }, 1000);
      mediaRecorderRef.current.onstop = () => {
        console.log("here oes")
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'recorded-video.webm';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        chunksRef.current = [];
      };

    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      setStream(null);
    }
  };
  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const dataURL = canvas.toDataURL("image/png");

      setPhoto(dataURL);
      setTotalCoins(10);
      saveNumCoins(10);
      setShowScanRetinaCard(false);
      handleCelebrate();
    }
  };
  const stopRecording = () => {
    console.log("chunks ref>>>>>>>>>>>> on stop",chunksRef.current.length)
    if (mediaRecorderRef.current) {
      console.log("inside")
      mediaRecorderRef.current.stop();
      stopCamera()
    }
  };
  useEffect(() => {
    const num_coins = loadNumCoins();
    console.log("num coins", num_coins);
    setTotalCoins(num_coins);
    console.log("called again");
    if (!num_coins) {
      console.log("called again inside");
      setShowScanRetinaCard(true);
    }
  }, [totalCoins]);
  const loadNumCoins = () => {
    return parseInt(localStorage.getItem("numCoins")) || 0;
  };
  const saveNumCoins = (numCoins) => {
    localStorage.setItem("numCoins", numCoins.toString());
  };
  useEffect(() => {
    videoRef.current = document.getElementById("videoElement");
  }, []);

  const saveVideo = () => {
    stopRecording()
    const blob = new Blob(chunksRef.current, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recorded-video.webm';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    chunksRef.current = [];

  };
  
  return (
    <body class="bg-gray-100">
      {isCelebrating && (
      <div className="celebration-container">
        <div className="celebration text-bold text-2xl">
          🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉Congratulations you won free
          coins!🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉
        </div>
      </div>
        )}
      <Popup
        open={isOpen}
        onClose={closePopup}
        modal
        contentStyle={modalStyle}
        closeOnDocumentClick
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            Please input your information before proceeding
          </h2>
          <Formik
            initialValues={{
              name: "",
              gender: "",
              address: "",
              marriage: "",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required"),
              gender: Yup.string().required("Gender is required"),
              address: Yup.string().required("Address is required"),
              marriage: Yup.string().required("Marriage is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log("asdsad", values);
              closePopup();
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    name="name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="address"
                    type="text"
                    placeholder="Your Address"
                    name="address"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="gender"
                    as="select"
                    name="gender"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="gender"
                  >
                    Maritial Status
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="marriage"
                    as="select"
                    name="marriage"
                  >
                    <option value="">Select Status</option>
                    <option value="Male">Single</option>
                    <option value="Female">Married</option>
                    <option value="Other">Divorced</option>
                  </Field>
                  <ErrorMessage
                    name="marriage"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                      isSubmitting && "opacity-50 cursor-not-allowed"
                    }`}
                    type="submit"
                    onClick={handleScanRetina}
                  >
                    {isSubmitting ? "Submitting..." : "Proceed"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Popup>
      <nav class="bg-gray-800 py-4">
        <div class="container mx-auto flex justify-between items-center">
          <a href="#" class="text-white text-xl font-bold">
            BigCoin ID Dashboard
          </a>
          <a href="#" class="text-white text-sm text-maintheme">
          <button onClick={saveVideo}>Stop video</button>
          </a>
          <button class="text-white bg-gray-900 px-4 py-2 rounded-md hover:bg-gray-700">
            Logout
          </button>
        </div>
      </nav>
      <div class="container mx-auto py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          {showScanRetinaCard && (
            <div class="bg-white p-6 rounded-md shadow-md">
              <h2 class="text-xl font-bold mb-4">
                Scan Your Retina to get free 25 coins!
              </h2>
              <p class="text-gray-700 mb-4">
                Click the button below to initiate retina scanning process.
              </p>
              <button
                class="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700"
                onClick={openPopup}
              >
                Scan Retina
              </button>
            </div>
          )}

          <div class="col-span-2 bg-white p-6 rounded-md shadow-md">
            <h2 class="text-xl font-bold mb-4">Your Metrics</h2>
            <div class="flex justify-between items-center mb-4">
              <p class="text-gray-700">Total BigCoins:</p>
              <span class="text-purple-600 font-bold">{totalCoins}</span>
            </div>
            {showScanRetinaCard && (
              <div class="flex justify-between items-center">
                <span class="text-gray-700 italic">
                  Scan your retina to earn more BigCoins!
                </span>
              </div>
            )}
            {!showScanRetinaCard && (
              <div class="flex justify-between items-center">
                <span class="text-gray-700 italic">
                  Please refer your friends to get remaining 15 coins!
                </span>
                <p>
                  By agreeing to scanning your retina, you agree to our <a href="/privacy" className="text-blue-800">privacy policy.</a>
                </p>
              </div>
            )}
          </div>
        </div>
        
        {showScanRetinaCard && (
          <video
            ref={videoRef}
            id="videoElement"
            autoPlay
            playsInline
            className="mt-2"
          />
        )}
        {showScanRetinaCard && stream && (
          <div className="mt-4">
            <button
              onClick={takePhoto}
              class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 mt-2"
            >
              Take Photo
            </button>
          </div>
        )}
        {photo && (
          <div className="mt-2">
            <h2>Photo Preview</h2>
            <img src={photo} alt="Captured Photo" />
          </div>
        )}
      </div>
    </body>
  );
}
