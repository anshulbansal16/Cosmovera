'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Loader2, Camera, AlertCircle, RotateCcw, Upload } from 'lucide-react';

export function Scanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      // Cleanup camera stream when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Wait for video to be ready
        await new Promise((resolve) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = resolve;
          }
        });
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError('Failed to access camera. Please ensure camera permissions are granted and try again.');
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image file size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setSelectedImage(e.target.result as string);
        setIsScanning(false);
        stopCamera();
      }
    };
    reader.readAsDataURL(file);
  };

  const processImage = async (imageData: string) => {
    setIsLoading(true);
    setError(null);
    setIngredients([]);

    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData }),
      });

      const data = await response.json();
      console.log('API Response:', data);
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to process image');
      }

      if (data.ingredients && data.ingredients.length > 0) {
        setIngredients(data.ingredients);
      } else {
        setError('No ingredients detected. Please try again with a clearer image of the ingredient list.');
      }
    } catch (err) {
      console.error('Scan error:', err);
      if (err instanceof Error) {
        if (err.message.includes('Failed to parse ingredients')) {
          setError('Could not read the ingredients. Please ensure the ingredient list is clearly visible and try again.');
        } else if (err.message.includes('No ingredients found')) {
          setError('No ingredients were found in the image. Please make sure you\'re pointing at the ingredient list.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Failed to process image. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Could not get canvas context');
    }

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the current video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Apply image processing to improve quality
    context.filter = 'contrast(1.2) brightness(1.1)';
    context.drawImage(canvas, 0, 0);

    // Convert canvas to blob with high quality
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, 'image/jpeg', 0.95); // Increased quality
    });

    // Convert blob to base64
    const reader = new FileReader();
    const base64Promise = new Promise<string>((resolve, reject) => {
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert image to base64'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read image data'));
    });

    reader.readAsDataURL(blob);
    const base64Image = await base64Promise;
    await processImage(base64Image);
  };

  const resetScanner = () => {
    stopCamera();
    setIsScanning(false);
    setSelectedImage(null);
    setIngredients([]);
    setError(null);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-md aspect-square border-2 border-gray-200 rounded-lg overflow-hidden">
        {isScanning ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected product"
            className="w-full h-full object-contain bg-white"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Camera className="w-16 h-16 text-gray-400" />
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="flex gap-4">
        <Button
          onClick={() => {
            if (isScanning) {
              resetScanner();
            } else {
              setIsScanning(true);
              startCamera();
            }
          }}
          variant={isScanning ? "destructive" : "default"}
          disabled={isLoading}
          className="min-w-[120px]"
        >
          {isScanning ? "Stop Camera" : "Start Camera"}
        </Button>
        
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          className="hidden"
        />
        
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          disabled={isLoading}
          className="min-w-[120px]"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Image
        </Button>

        {(isScanning || selectedImage) && (
          <Button 
            onClick={() => isScanning ? captureImage() : selectedImage && processImage(selectedImage)}
            disabled={isLoading}
            className="min-w-[120px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Scan Ingredients"
            )}
          </Button>
        )}
      </div>

      {error && (
        <div className="w-full max-w-md p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

      {ingredients.length > 0 && (
        <div className="w-full max-w-md mt-4 p-4 bg-white rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Detected Ingredients:</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetScanner}
              className="h-8 w-8 p-0"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          <ul className="list-disc list-inside space-y-1">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">{ingredient}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 