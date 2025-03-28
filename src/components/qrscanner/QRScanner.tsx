// import jsQR from 'jsqr';

// import React, { useState } from 'react';
// import WebcamCapture from './WebcamCapture';

// const QRScanner = () => {
//   const [qrCode, setQrCode] = useState('');

//   const handleScan = (imageSrc: string) => {
//     if (imageSrc) {
//       const image = new Image();
//       image.src = imageSrc;
//       image.onload = () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = image.width;
//         canvas.height = image.height;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
//         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//         const code: any = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: 'dontInvert' });
//         if (code) {
//           setQrCode(code.data);
//           console.log('code: ', code.data);
//         }
//       };
//     }
//   };

//   return (
//     <div>
//       <WebcamCapture onScan={handleScan} />
//     </div>
//   );
// };

// export default QRScanner;

// import jsQR from 'jsqr';
// import React, { useState } from 'react';
// import WebcamCapture from './WebcamCapture';

// const QRScanner = () => {
//   const [_qrCode, setQrCode] = useState('');

//   const handleScan = (imageSrc: string) => {
//     if (imageSrc) {
//       const image = new Image();
//       image.src = imageSrc;
//       image.onload = () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = image.width;
//         canvas.height = image.height;
//         const ctx = canvas.getContext('2d');

//         if (!ctx) {
//           console.error('Canvas context is null');
//           return;
//         }

//         ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
//         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//         const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: 'dontInvert' });

//         if (code) {
//           setQrCode(code.data);
//           // eslint-disable-next-line no-console
//           console.log('QR Code: ', code.data);
//         }
//       };
//     }
//   };

//   return (
//     <div>
//       <WebcamCapture onScan={handleScan} />
//     </div>
//   );
// };

// export default QRScanner;

import jsQR from 'jsqr';
import React, { useState } from 'react';
import WebcamCapture from './WebcamCapture';

const QRScanner = () => {
  const [_qrCode, setQrCode] = useState('');

  const handleScan = (imageSrc: string | null) => {
    if (!imageSrc) {
      return;
    }

    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        console.error('Canvas context is null');
        return;
      }

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: 'dontInvert' });

      if (code) {
        setQrCode(code.data);
        // eslint-disable-next-line no-console
        console.log('QR Code: ', code.data);
      }
    };
  };

  return (
    <div>
      <WebcamCapture onScan={handleScan} />
    </div>
  );
};

export default QRScanner;
