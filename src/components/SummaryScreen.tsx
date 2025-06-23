
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, FileText, Brain, Globe, Languages } from 'lucide-react';

interface SummaryScreenProps {
  originalText: string;
  simplifiedText: string;
  onTranslate: (language: string) => void;
  onBack: () => void;
}

const SummaryScreen = ({ originalText, simplifiedText, onTranslate, onBack }: SummaryScreenProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const languages = [
    { value: 'spanish', label: 'Spanish (Español)', flag: '🇪🇸' },
    { value: 'hindi', label: 'Hindi (हिंदी)', flag: '🇮🇳' },
    { value: 'french', label: 'French (Français)', flag: '🇫🇷' },
    { value: 'arabic', label: 'Arabic (العربية)', flag: '🇸🇦' },
    { value: 'chinese', label: 'Chinese (中文)', flag: '🇨🇳' },
    { value: 'portuguese', label: 'Portuguese (Português)', flag: '🇵🇹' },
  ];

  const handleTranslate = () => {
    if (selectedLanguage) {
      onTranslate(selectedLanguage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Document Summary</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Original Text</h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
              <p className="text-sm text-gray-700 whitespace-pre-line">{originalText}</p>
            </div>
          </Card>

          <Card className="p-6 border-2 border-green-200">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <Brain className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Simplified Explanation</h3>
            </div>
            <div className="bg-green-50 p-4 rounded-lg max-h-64 overflow-y-auto">
              <p className="text-sm text-green-800 leading-relaxed">{simplifiedText}</p>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Languages className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Translate to Your Language</h3>
          </div>
          
          <p className="text-gray-600 mb-4">
            Choose your preferred language to get the simplified explanation translated
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a language..." />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      <span className="flex items-center">
                        <span className="mr-2">{lang.flag}</span>
                        {lang.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleTranslate}
              disabled={!selectedLanguage}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Globe className="h-4 w-4 mr-2" />
              Translate
            </Button>
          </div>
        </Card>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="font-medium text-amber-800 mb-2">Important Note:</h4>
          <p className="text-sm text-amber-700">
            This simplified explanation is for educational purposes only. Always consult with your healthcare provider for medical advice and treatment decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryScreen;
