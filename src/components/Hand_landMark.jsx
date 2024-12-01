'use client';
import {
	DrawingUtils,
	FilesetResolver,
	HandLandmarker,
} from '@mediapipe/tasks-vision';
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { faArrowLeft, faFaceSmile, faHand, faLanguage, faList, faMicrophone, faMicrophoneSlash, faPallet, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import * as tf from '@tensorflow/tfjs';


export default function HandLandmarks() {
	const [handsData, setHandsData] = useState([]);
	const [modelOutput, setModelOutput] = useState("");  // State for model output
	const webcamRef = useRef(null);
	const canvasRef = useRef(null);
	const [model, setModel] = useState(null);
	const [loadingMessage, setLoadingMessage] = useState('Loading model...');
	const handLandmarkerRef = useRef(null);
	const drawingUtilsRef = useRef(null);
    const router = useRouter();
	const [transcript, setTranscript] = useState('');

	// State to track whether the button is hovered
	const [isHoveredBack, setIsHoveredBack] = useState(false);
	const [isHoveredVideo, setIsHoveredVideo] = useState(false);
	const [isHoveredMic, setIsHoveredMic] = useState(false);
	const [isHoveredList, setIsHoveredList] = useState(false);
	const [isDropdownList, setIsDropdownList] = useState(false);
	const [isHoveredPhone, setIsHoveredPhone] = useState(false);

	const handleMouseEnterBack = () => setIsHoveredBack(true);
    const handleMouseLeaveBack = () => setIsHoveredBack(false);

	const handleMouseEnterList = () => setIsHoveredList(true);
    const handleMouseLeaveList = () => setIsHoveredList(false);

    const handleMouseEnterVideo = () => setIsHoveredVideo(true);
    const handleMouseLeaveVideo = () => setIsHoveredVideo(false);

    const handleMouseEnterMic = () => setIsHoveredMic(true);
    const handleMouseLeaveMic = () => setIsHoveredMic(false);

    const handleMouseEnterPhone = () => setIsHoveredPhone(true);
    const handleMouseLeavePhone = () => setIsHoveredPhone(false);

	const [isClickedMic, setIsClickedMic] = useState(false);
	const [textToSpeak, setTextToSpeak] = useState("");

	const hadlerClickList = () => {
		setIsDropdownList(!isDropdownList);
	}
	const handleClickback = () => {
        router.push('/videocall/call');
    }
    const handleClickphone = () => {
        router.push('/videocall/recents');
    }
    const hadlerClickVideo = () => {
        router.push('/videocall/call');
    }
	
    let mediaRecorder;
    let audioChunks = [];
	

	useEffect(() => {
		const loadModel = async () => {
			try {
				// Load the model from the public folder
				const loadedModel = await tf.loadLayersModel('/models/model.json');
				setModel(loadedModel);
				setLoadingMessage('Model loaded successfully');
				console.log('Model loaded successfully', loadedModel);
			} catch (error) {
				setLoadingMessage('Failed to load model');
				console.error('Failed to load model:', error);
			}
		};

		loadModel();
	}, []);
//     const hadlerClickMic = async () => {
//       setIsClickedMic(!isClickedMic);
  
//       if (!isClickedMic) {
//           // Enable microphone
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         console.log("Microphone enabled.");
        
//         // Save stream reference so we can stop it later
//         window.audioStream = stream; // Store stream globally or within a state

//         mediaRecorder = new MediaRecorder(stream);
//         mediaRecorder.start();

//         mediaRecorder.ondataavailable = (event) => {
//           audioChunks.push(event.data);
//         };

//         mediaRecorder.onstop = () => {
//           const audioBlob = new Blob(audioChunks);
//           const audioUrl = URL.createObjectURL(audioBlob);
//           const audio = new Audio(audioUrl);
//           audio.play();
//         };
//       } catch (err) {
//         console.error("Failed to enable microphone: ", err);
//       }
//       } else {
//         // Disable microphone
//         console.log("Microphone disabled.");
//         if (mediaRecorder && mediaRecorder.state !== "inactive") {
//           mediaRecorder.stop();
//         }

//         // Stop all audio tracks to completely disable the microphone
//         if (window.audioStream) {
//           const tracks = window.audioStream.getTracks();
//           tracks.forEach(track => track.stop());  // Stops all tracks (audio in this case)
//           window.audioStream = null; // Cleanup
//         }
//         }
//   };
const hadlerClickMic = async () => {
	setIsClickedMic(!isClickedMic);
  
	if (!isClickedMic) {
	  // Enable microphone and start recognition
	  try {
		console.log("Microphone enabled and speech recognition started.");
  
		// Check for browser support for the Web Speech API
		const SpeechRecognition =
		  window.SpeechRecognition || window.webkitSpeechRecognition;
  
		if (!SpeechRecognition) {
		  console.error("SpeechRecognition API is not supported in this browser.");
		  return;
		}
  
		const recognition = new SpeechRecognition();
		recognition.lang = "en-US"; // Set language for recognition
		recognition.interimResults = false; // Return final results only
		recognition.continuous = true; // Keep recognizing until stopped
  
		recognition.onstart = () => {
		  console.log("Speech recognition started.");
		};
  
		recognition.onresult = (event) => {
		  const transcript = Array.from(event.results)
			.map((result) => result[0].transcript)
			.join("");
		  console.log("Recognized text:", transcript);
		  // You can update your state or display the transcribed text
		  setTranscript(transcript);
		};
  
		recognition.onerror = (error) => {
		  console.error("Speech recognition error:", error);
		};
  
		recognition.onend = () => {
		  console.log("Speech recognition stopped.");
		};
  
		// Start recognition
		recognition.start();
  
		// Store recognition instance globally or in state to stop later
		window.recognitionInstance = recognition;
	  } catch (err) {
		console.error("Failed to enable microphone: ", err);
	  }
	} else {
	  // Disable microphone and stop recognition
	  console.log("Microphone and speech recognition disabled.");
	  if (window.recognitionInstance) {
		window.recognitionInstance.stop();
		window.recognitionInstance = null; // Cleanup
	  }
  
	  // Stop all audio tracks to completely disable the microphone
	  if (window.audioStream) {
		const tracks = window.audioStream.getTracks();
		tracks.forEach((track) => track.stop()); // Stops all tracks (audio in this case)
		window.audioStream = null; // Cleanup
	  }
	}
  };
  
  // Function to handle text-to-speech
  const hadlerClickSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "km-KH"; // Set language (optional)

      // Clear any ongoing speech to prevent queuing
      window.speechSynthesis.cancel();
  
      // Speak the text
      window.speechSynthesis.speak(utterance);
	  let voices = window.speechSynthesis.getVoices();
	  console.log(voices);
      // Log any errors that might occur
      utterance.onerror = (error) => console.error("Speech Synthesis Error:", error);
    } else {
      console.warn("Speech synthesis is not supported in this browser.");
    }
  };
  const handleKeyDown = (e) => {
	if (e.key === 'Enter') {
		hadlerClickSpeak();
	}
	};
	

	useEffect(() => {
		
		const initializeHandLandmarker = async () => {
			try {
				const vision = await FilesetResolver.forVisionTasks(
					'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
				);
				const handLandmarker = await HandLandmarker.createFromOptions(vision, {
					baseOptions: {
						modelAssetPath: '/models/hand_landmarker.task',
						delegate: 'GPU',
					},
					runningMode: 'VIDEO',
					numHands: 2,
					minHandDetectionConfidence: 0.5,
					minHandPresenceConfidence: 0.5,
					minTrackingConfidence: 0.5,
				});
				handLandmarkerRef.current = handLandmarker;
				console.log('Hand landmarker is created!');
				startCapture();
			
			} catch (error) {
				console.error('Error initializing hand landmarker:', error);
			};
		};
		initializeHandLandmarker();
	}, []);

	const startCapture = async () => {
		if (
			webcamRef.current &&
			handLandmarkerRef.current &&
			webcamRef.current.video
		) {
			const video = webcamRef.current.video;
			if (video.currentTime > 0) {
				const result = await handLandmarkerRef.current.detectForVideo(
					video,
					performance.now()
				);
				if (result.landmarks && result.handedness) {
					const handsData = result.landmarks.map((landmark, index) => ({
						landmark,
						handedness: result.handedness[index][0].categoryName,
					}));
					setHandsData(handsData);
					
					if (model) {
						const inputData = processHandDataForModel(handsData);  // Process input data for model
						const prediction = await model.predict(inputData);  // Make a prediction
						
						// Assuming the model returns a probability array (e.g., for classes "Hello", "Thank", "ILoveYou")
						const predictedClassIndex = prediction.argMax(-1).dataSync()[0];
						
						// Map index to sign language label
						const labels = ['Hello', 'Thank', 'ILoveYou']; // Your label list
						const predictedLabel = labels[predictedClassIndex];
			
						setModelOutput(predictedLabel);  // Set the predicted label as output to display in <h1>
					  }
				}
			}
		}
		requestAnimationFrame(startCapture);
	};

	const processHandDataForModel = (handsData) => {
		// You need to process the hand landmarks data to match the model input format
		// This is a placeholder - adjust based on how your model is trained
		const handFeatures = handsData.map(hand => hand.landmark.flat());  // Flatten landmarks
		return tf.tensor2d(handFeatures);  // Convert to tensor
	  };
	useEffect(() => {
		const ctx = canvasRef.current.getContext('2d');
		drawingUtilsRef.current = new DrawingUtils(ctx);
	}, []);

	useEffect(() => {
		const ctx = canvasRef.current.getContext('2d');
		if (drawingUtilsRef.current) {
			ctx.clearRect(0, 0, 1280, 720);
			handsData.forEach(({ landmark, handedness }) => {
				const isLeftHand = handedness === 'Left';
				const handColor = isLeftHand ? '#FF0000' : '#00FF00';
				const handConnect = isLeftHand ? '#00FF00' : '#FF0000';

				// Draw hand connectors
				drawingUtilsRef.current.drawConnectors(
					landmark,
					HandLandmarker.HAND_CONNECTIONS,
					{
						color: handColor,
						lineWidth: 5,
					}
				);

				drawingUtilsRef.current.drawLandmarks(landmark, {
					color: handColor,
					radius: 5,
					lineWidth: 4,
					fillColor: handConnect,
				});
			});
		}
	}, [handsData]);

	return (
		<section>
			<div className='relative w-full pt-[56.25%]'>
                <div className='flex flex-row justify-between absolute top-0 z-10 p-4 w-full'>
					<div className=' absolute  left-2'>
						<FontAwesomeIcon 
                        icon={faArrowLeft} 
                        className=" h-14 w-14 text-white hover:text-gray-300  transition duration-200 ease-in-out cursor-pointer"
                        onClick={handleClickback} onMouseEnter={handleMouseEnterBack}
                                onMouseLeave={handleMouseLeaveBack}/>
                        {isHoveredBack && (
                            <p className='text-white text-xl font-bold mt-2'>Back</p>
                        )}
					</div>
                    
					<div className='absolute top-0 mt-2 left-1/2 transform -translate-x-1/2 h-16 w-3/4 bg-none border-2 border-blue-600 rounded-lg'>
						<h1 className='text-white text-2xl font-bold text-center mt-2'>{transcript || textToSpeak}</h1>
					</div>
					<div className=' absolute top-0 right-2'>
						<FontAwesomeIcon icon={faList} className=" h-14 w-14 text-white hover:text-gray-600 transition duration-200 ease-in-out cursor-pointer" onClick={hadlerClickList}  />
						{isDropdownList && (
							 <div className='bg-none text-black font-bold text-xl mt-2 p-2 rounded shadow-lg absolute right-0'>
							 <ul>
								 <li className='flex flex-row items-center px-4 py-2 hover:bg-gray-200 cursor-pointer' >
									 <FontAwesomeIcon icon={faHand} className='mr-2 text-blue-500' />HandColor
								 </li>
								 <li className='flex flex-row items-center px-4 py-2 hover:bg-gray-200 cursor-pointer' >
									 <FontAwesomeIcon icon={faLanguage} className='mr-2' />Language
								 </li>
								 <li className='flex flex-row items-center px-4 py-2 hover:bg-gray-200 cursor-pointer' >
									 <FontAwesomeIcon icon={faFaceSmile} className='mr-2 text-green-500' />CloseFace
								 </li>
							 </ul>
						 </div>
						)}
					</div>
                    
                </div>
				<Webcam
					width='1280'
					height='720'
					mirrored
					id='webcam'
					audio={false}
					videoConstraints={{
						width: 1280,
						height: 720,
						facingMode: 'user',
					}}
					ref={webcamRef}
					className='absolute top-0 left-0 w-full h-full'
				/>
				<canvas
					ref={canvasRef}
					width='1280'
					height='720'
					style={{ transform: 'rotateY(180deg)' }}
					className='absolute top-0 left-0 w-full h-full'
				></canvas>
				<h1 className="absolute top-0 left-1/2 transform -translate-x-1/2 text-white text-3xl font-bold z-10">
          {modelOutput ? modelOutput : "Waiting for hand detection..."}
        </h1>
			</div>
			<div className='flex flex-row content-center z-10 p-2 w-full h-24 bg-white border-4 border-gray-400 rounded-lg'>
				<div className='flex justify-start items-center  w-3/5 h-16'>
					<input type="text" placeholder="Text To Sound" 
					className=" p-2 h-16 w-full items-center text-blue-600 cursor-pointer border-2 border-blue-500 rounded-xl transition duration-200 ease-in-out" 
					onChange={(e) => setTextToSpeak(e.target.value)} 
					onKeyDown={(e) => handleKeyDown(e)}/>
				</div>
				<div className='flex flex-row justify-between content-center items-center w-2/5 h-32'>
					<div className='mx-5 my-2 h-full w-full place-items-center'>
						<FontAwesomeIcon icon={faVideo} className="text-center h-12 w-12 text-blue-600 hover:text-blue-500 transition duration-200 ease-in-out cursor-pointer" onClick={hadlerClickVideo} onMouseEnter={handleMouseEnterVideo} onMouseLeave={handleMouseLeaveVideo}/>
                        {isHoveredVideo && (
                            <p className='text-blue text-xl font-bold'>Video</p>
                        )}
					</div>
					<div className='mx-5 my-2 h-full w-full place-items-center'onClick={hadlerClickMic} onMouseEnter={handleMouseEnterMic} onMouseLeave={handleMouseLeaveMic}>
                          {isClickedMic ?  <FontAwesomeIcon icon={faMicrophone} className=" text-center items-center h-12 w-12  text-blue-600 hover:text-blue-500 transition duration-200 ease-in-out" /> :  <FontAwesomeIcon icon={faMicrophoneSlash} className=" text-center items-center h-12 w-12  text-blue-600 hover:text-blue-500 transition duration-200 ease-in-out" />}
                          {isHoveredMic && (
                           <p className='text-blue text-xl font-bold'>Microphone</p>
                          )}
					</div>
					<div className='mx-5 my-2 h-full w-full place-items-center'>
						<button className=' h-12 w-36 text-center items-center text-white p-1 font-bold font-sans text-xl bg-green-600 hover:bg-green-500 transition duration-200 ease-in-out cursor-pointer border-4 border-blue-500 rounded-xl' onClick={hadlerClickSpeak}>Speack Text</button>
					</div>
					<div className='mx-5 my-2 h-full w-full place-items-center'>
						<FontAwesomeIcon icon={faPhone} className="  h-12 w-12 text-center items-center  text-red-600 hover:text-red-500 transition duration-200 ease-in-out cursor-pointer" onClick={handleClickphone} onMouseEnter={handleMouseEnterPhone} onMouseLeave={handleMouseLeavePhone}/>
                        {isHoveredPhone && (
                            <p className='text-blue text-xl font-bold'>CloseCall</p>
                        )}
					</div>
				</div>
            </div>
			
		</section>
	);
}