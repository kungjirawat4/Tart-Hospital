// /* eslint-disable ts/no-use-before-define */
// import React, { useEffect, useRef } from 'react';
// import Webcam from 'react-webcam';

// const WebcamCapture = ({ onScan }) => {
//   const webcamRef = useRef<any>(null);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       capture();
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const videoConstraints = {
//     width: 580,
//     height: 320,
//     facingMode: 'environment',
//   };

//   const capture = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     onScan(imageSrc);
//   };

//   return (
//     <div>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         screenshotQuality={0.8}
//         videoConstraints={videoConstraints}
//         onClick={() => capture()}
//       />
//       {/* <button onClick={capture}>Capture photo</button> */}
//     </div>
//   );
// };

// export default WebcamCapture;

import React, { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';

type WebcamCaptureProps = {
  onScan: (imageSrc: string | null) => void;
};

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onScan }) => {
  const webcamRef = useRef<Webcam | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      // eslint-disable-next-line ts/no-use-before-define
      capture();
    }, 1000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const videoConstraints = {
    width: 580,
    height: 320,
    facingMode: 'environment',
  };

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      onScan(imageSrc);
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        screenshotQuality={0.8}
        videoConstraints={videoConstraints}
        onClick={capture}
      />
    </div>
  );
};

export default WebcamCapture;
