
import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Camera, ArrowLeft, Image, Sparkles, Zap, FileText, CheckCircle } from 'lucide-react';

interface DocumentUploadProps {
  onImageUpload: (imageUrl: string) => void;
  onBack: () => void;
}

const DocumentUpload = ({ onImageUpload, onBack }: DocumentUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageUpload(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-75"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="flex items-center mb-8 animate-fade-in">
          <Button variant="ghost" onClick={onBack} className="mr-4 hover:bg-white/50 transition-all duration-200 transform hover:scale-105">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Upload Your Document
            </h1>
            <p className="text-gray-600 mt-1">Choose how you'd like to add your medical document</p>
          </div>
        </div>

        <div className="space-y-8">
          <Card 
            className={`p-10 border-2 border-dashed transition-all duration-300 cursor-pointer relative overflow-hidden ${
              dragActive 
                ? 'border-blue-400 bg-blue-50 scale-105 shadow-xl' 
                : 'border-gray-300 hover:border-blue-300 hover:shadow-lg transform hover:scale-102'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Sparkle animation */}
            {(dragActive || isHovering) && (
              <div className="absolute inset-0 pointer-events-none">
                <Sparkles className="absolute top-4 right-4 h-6 w-6 text-blue-400 animate-pulse" />
                <Sparkles className="absolute bottom-4 left-4 h-4 w-4 text-purple-400 animate-pulse delay-75" />
                <Sparkles className="absolute top-1/2 left-1/2 h-5 w-5 text-indigo-400 animate-pulse delay-150" />
              </div>
            )}
            
            <div className="text-center">
              <div className={`mx-auto h-20 w-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg transition-all duration-300 ${
                dragActive ? 'scale-110 animate-pulse' : 'hover:scale-110'
              }`}>
                <Upload className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {dragActive ? 'Drop your document here!' : 'Drag and drop your document'}
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Or click below to browse from your device
              </p>
              <Button 
                onClick={() => inputRef.current?.click()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Image className="h-5 w-5 mr-2" />
                Choose File
              </Button>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
              />
            </div>
          </Card>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-500 rounded-full font-medium">or</span>
            </div>
          </div>

          <Card className="p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-102 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="text-center">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg hover:scale-110 transition-all duration-300">
                <Camera className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Take a Photo
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Use your device camera to capture the document instantly
              </p>
              <Button 
                onClick={() => cameraRef.current?.click()}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Camera className="h-5 w-5 mr-2" />
                Open Camera
              </Button>
              <input
                ref={cameraRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleInputChange}
                className="hidden"
              />
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-2 rounded-full mr-3">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-bold text-amber-800 text-lg">Pro Tips for Best Results</h4>
              </div>
              <ul className="text-sm text-amber-700 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Ensure good lighting and clear text
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Keep the document flat and straight
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Avoid shadows and reflections
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Make sure all text is visible
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-2 rounded-full mr-3">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-bold text-blue-800 text-lg">Supported Documents</h4>
              </div>
              <ul className="text-sm text-blue-700 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Prescriptions & medication lists
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Test results & lab reports
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Discharge summaries
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Medical forms & notes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
