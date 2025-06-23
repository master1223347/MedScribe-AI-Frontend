
import { Card } from '@/components/ui/card';
import { FileText, Brain, Globe } from 'lucide-react';

const ProcessingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Processing Document</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-700">Extracting text with OCR...</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <Brain className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-700">Simplifying medical language...</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg opacity-50">
            <Globe className="h-4 w-4 text-purple-600" />
            <span className="text-sm text-purple-700">Preparing for translation...</span>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
        </div>
        
        <p className="text-sm text-gray-600 mt-4">
          This usually takes 10-30 seconds
        </p>
      </Card>
    </div>
  );
};

export default ProcessingScreen;
