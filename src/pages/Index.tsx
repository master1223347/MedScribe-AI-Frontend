
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Camera, FileText, Globe, ArrowLeft, CheckCircle } from 'lucide-react';
import DocumentUpload from '@/components/DocumentUpload';
import DocumentPreview from '@/components/DocumentPreview';
import ProcessingScreen from '@/components/ProcessingScreen';
import SummaryScreen from '@/components/SummaryScreen';
import TranslatedSummary from '@/components/TranslatedSummary';

type Screen = 'home' | 'upload' | 'preview' | 'processing' | 'summary' | 'translated';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [simplifiedText, setSimplifiedText] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('spanish');
  const [translatedText, setTranslatedText] = useState<string>('');

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setCurrentScreen('preview');
  };

  const handleProcessDocument = () => {
    setCurrentScreen('processing');
    
    // Simulate OCR and AI processing
    setTimeout(() => {
      setExtractedText("Patient: John Doe\nDiagnosis: Hypertension (High Blood Pressure)\nMedication: Lisinopril 10mg, once daily\nInstructions: Monitor blood pressure daily. Avoid high sodium foods. Return in 2 weeks for follow-up.");
      setSimplifiedText("You have high blood pressure. Take your medicine (Lisinopril) once a day. Check your blood pressure every day. Don't eat too much salt. Come back to see the doctor in 2 weeks.");
      setCurrentScreen('summary');
    }, 3000);
  };

  const handleTranslate = (language: string) => {
    setSelectedLanguage(language);
    setCurrentScreen('processing');
    
    // Simulate translation
    setTimeout(() => {
      const translations = {
        spanish: "Tienes presión arterial alta. Toma tu medicina (Lisinopril) una vez al día. Revisa tu presión arterial todos los días. No comas mucha sal. Regresa a ver al doctor en 2 semanas.",
        hindi: "आपका रक्तचाप उच्च है। अपनी दवा (लिसिनोप्रिल) दिन में एक बार लें। हर दिन अपना रक्तचाप जांचें। बहुत नमक न खाएं। 2 सप्ताह में डॉक्टर से मिलने वापस आएं।",
        french: "Vous avez une tension artérielle élevée. Prenez votre médicament (Lisinopril) une fois par jour. Vérifiez votre tension artérielle tous les jours. Ne mangez pas trop de sel. Revenez voir le médecin dans 2 semaines."
      };
      setTranslatedText(translations[language as keyof typeof translations] || translations.spanish);
      setCurrentScreen('translated');
    }, 2000);
  };

  const resetApp = () => {
    setCurrentScreen('home');
    setUploadedImage(null);
    setExtractedText('');
    setSimplifiedText('');
    setTranslatedText('');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
              <div className="text-center">
                <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">MedTranslate</h1>
                <p className="text-gray-600">Upload medical documents and get simple explanations in your language</p>
              </div>
              
              <div className="space-y-4">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-blue-200 hover:border-blue-400" 
                      onClick={() => setCurrentScreen('upload')}>
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Upload className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Upload Document</h3>
                      <p className="text-sm text-gray-600">Choose from your device gallery</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-green-200 hover:border-green-400" 
                      onClick={() => setCurrentScreen('upload')}>
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Camera className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Take Photo</h3>
                      <p className="text-sm text-gray-600">Use your camera directly</p>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium">Privacy Protected</p>
                    <p>Your documents are processed securely and not stored permanently.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'upload':
        return <DocumentUpload onImageUpload={handleImageUpload} onBack={() => setCurrentScreen('home')} />;
      
      case 'preview':
        return <DocumentPreview 
          imageUrl={uploadedImage!} 
          onConfirm={handleProcessDocument}
          onBack={() => setCurrentScreen('upload')}
          onReupload={() => setCurrentScreen('upload')}
        />;
      
      case 'processing':
        return <ProcessingScreen />;
      
      case 'summary':
        return <SummaryScreen 
          originalText={extractedText}
          simplifiedText={simplifiedText}
          onTranslate={handleTranslate}
          onBack={() => setCurrentScreen('preview')}
        />;
      
      case 'translated':
        return <TranslatedSummary 
          simplifiedText={simplifiedText}
          translatedText={translatedText}
          language={selectedLanguage}
          onBack={() => setCurrentScreen('summary')}
          onNewDocument={resetApp}
        />;
      
      default:
        return null;
    }
  };

  return renderScreen();
};

export default Index;
