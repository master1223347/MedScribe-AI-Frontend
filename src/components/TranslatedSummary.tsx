
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Globe, RotateCcw } from 'lucide-react';

interface TranslatedSummaryProps {
  simplifiedText: string;
  translatedText: string;
  language: string;
  onBack: () => void;
  onNewDocument: () => void;
}

const TranslatedSummary = ({ simplifiedText, translatedText, language, onBack, onNewDocument }: TranslatedSummaryProps) => {
  const languageNames = {
    spanish: { name: 'Spanish', flag: '🇪🇸' },
    hindi: { name: 'Hindi', flag: '🇮🇳' },
    french: { name: 'French', flag: '🇫🇷' },
    arabic: { name: 'Arabic', flag: '🇸🇦' },
    chinese: { name: 'Chinese', flag: '🇨🇳' },
    portuguese: { name: 'Portuguese', flag: '🇵🇹' },
  };

  const currentLanguage = languageNames[language as keyof typeof languageNames] || { name: 'Unknown', flag: '🌐' };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Translation Complete</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Simplified (English)</h3>
            </div>
            <div className="bg-green-50 p-4 rounded-lg max-h-80 overflow-y-auto">
              <p className="text-sm text-green-800 leading-relaxed">{simplifiedText}</p>
            </div>
          </Card>

          <Card className="p-6 border-2 border-blue-200">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <Globe className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <span className="mr-2">{currentLanguage.flag}</span>
                {currentLanguage.name} Translation
              </h3>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg max-h-80 overflow-y-auto">
              <p className="text-sm text-blue-800 leading-relaxed" dir="auto">{translatedText}</p>
            </div>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex-1"
          >
            <Globe className="h-4 w-4 mr-2" />
            Choose Different Language
          </Button>
          <Button 
            onClick={onNewDocument}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Process New Document
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-2">✅ What we did:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Extracted text using advanced OCR</li>
              <li>• Simplified complex medical terms</li>
              <li>• Translated to your preferred language</li>
            </ul>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-medium text-amber-800 mb-2">⚠️ Remember:</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• This is for educational purposes only</li>
              <li>• Always consult your healthcare provider</li>
              <li>• Don't make medical decisions based on this alone</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatedSummary;
