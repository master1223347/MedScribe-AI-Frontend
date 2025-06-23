
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Check, Sparkles, Zap, Brain, FileText } from 'lucide-react';

interface DocumentPreviewProps {
  imageUrl: string;
  onConfirm: () => void;
  onBack: () => void;
  onReupload: () => void;
}

const DocumentPreview = ({ imageUrl, onConfirm, onBack, onReupload }: DocumentPreviewProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-75"></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="flex items-center mb-8 animate-fade-in">
          <Button variant="ghost" onClick={onBack} className="mr-4 hover:bg-white/50 transition-all duration-200 transform hover:scale-105">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Preview Document
            </h1>
            <p className="text-gray-600 mt-1">Review your document before AI processing</p>
          </div>
        </div>

        <Card className="p-8 mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">
                Document Ready for Processing
              </h3>
              <Sparkles className="h-6 w-6 text-purple-600 ml-2 animate-pulse" />
            </div>
            <p className="text-gray-600 text-lg">
              Make sure the text is clear and readable before our AI processes it
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-8 shadow-inner">
            <img 
              src={imageUrl} 
              alt="Uploaded document" 
              className="w-full h-auto max-h-96 object-contain rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="outline" 
              onClick={onReupload}
              className="flex-1 border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 py-3 text-lg font-semibold"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Upload Different Image
            </Button>
            <Button 
              onClick={onConfirm}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Check className="h-5 w-5 mr-2" />
              Process with AI
              <Zap className="h-4 w-4 ml-2 animate-pulse" />
            </Button>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-full w-fit mx-auto mb-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-blue-800 mb-2">1. OCR Scanning</h4>
              <p className="text-sm text-blue-700">
                Extract text using advanced optical character recognition
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-full w-fit mx-auto mb-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-purple-800 mb-2">2. AI Simplification</h4>
              <p className="text-sm text-purple-700">
                Transform complex medical terms into simple language
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-full w-fit mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-green-800 mb-2">3. Translation</h4>
              <p className="text-sm text-green-700">
                Translate into your preferred language instantly
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
