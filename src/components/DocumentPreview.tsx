
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Check } from 'lucide-react';

interface DocumentPreviewProps {
  imageUrl: string;
  onConfirm: () => void;
  onBack: () => void;
  onReupload: () => void;
}

const DocumentPreview = ({ imageUrl, onConfirm, onBack, onReupload }: DocumentPreviewProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Preview Document</h1>
        </div>

        <Card className="p-6 mb-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Please review your document
            </h3>
            <p className="text-gray-600">
              Make sure the text is clear and readable before processing
            </p>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <img 
              src={imageUrl} 
              alt="Uploaded document" 
              className="w-full h-auto max-h-96 object-contain rounded-lg shadow-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              onClick={onReupload}
              className="flex-1"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Upload Different Image
            </Button>
            <Button 
              onClick={onConfirm}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <Check className="h-4 w-4 mr-2" />
              Process Document
            </Button>
          </div>
        </Card>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">What happens next?</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>1. We'll extract text from your document using OCR</li>
            <li>2. Complex medical terms will be simplified</li>
            <li>3. You can translate the result into your preferred language</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
