import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Camera, FileText, Globe, ArrowLeft, CheckCircle, Sparkles, Zap } from 'lucide-react';
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
          <div className="min-h-screen bg-gradient-to-br from-violet-100 via-sky-50 via-emerald-50 to-amber-100 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Enhanced animated background elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
              <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-75"></div>
              <div className="absolute bottom-10 left-20 w-72 h-72 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-150"></div>
              <div className="absolute bottom-20 right-40 w-64 h-64 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-300"></div>
              <div className="absolute top-1/2 left-1/2 w-88 h-88 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500 transform -translate-x-1/2 -translate-y-1/2"></div>
              
              {/* Floating elements */}
              <div className="absolute top-32 left-1/4 w-4 h-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-bounce delay-1000"></div>
              <div className="absolute bottom-32 right-1/4 w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-bounce delay-1500"></div>
              <div className="absolute top-1/2 right-20 w-3 h-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full animate-bounce delay-2000"></div>
              <div className="absolute bottom-40 left-1/3 w-5 h-5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-bounce delay-2500"></div>
            </div>
            
            <div className="max-w-md w-full space-y-8 relative z-10 animate-fade-in">
              <div className="text-center">
                <div className="mx-auto h-20 w-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg transform hover:scale-110 transition-all duration-300 animate-pulse">
                  <FileText className="h-10 w-10 text-white" />
                </div>
                <div className="flex items-center justify-center mb-4">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    MedTranslate
                  </h1>
                  <Sparkles className="h-6 w-6 text-purple-500 ml-2 animate-pulse" />
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Transform complex medical documents into simple explanations in your language using advanced AI technology
                </p>
              </div>
              
              <div className="space-y-6">
                <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-dashed border-blue-200 hover:border-blue-400 transform hover:scale-105 hover:-translate-y-1 bg-gradient-to-br from-blue-50 to-indigo-50" 
                      onClick={() => setCurrentScreen('upload')}>
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-full shadow-lg">
                      <Upload className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-1">Upload Document</h3>
                      <p className="text-sm text-gray-600">Choose from your device gallery or drag & drop</p>
                      <div className="flex items-center mt-2">
                        <Zap className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-xs text-yellow-600 font-medium">Instant processing</span>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-dashed border-green-200 hover:border-green-400 transform hover:scale-105 hover:-translate-y-1 bg-gradient-to-br from-green-50 to-emerald-50" 
                      onClick={() => setCurrentScreen('upload')}>
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-full shadow-lg">
                      <Camera className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-1">Take Photo</h3>
                      <p className="text-sm text-gray-600">Use your camera to capture documents directly</p>
                      <div className="flex items-center mt-2">
                        <Zap className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-xs text-yellow-600 font-medium">Real-time capture</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100 shadow-inner">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-full">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-blue-800 mb-2 text-lg">🔒 Privacy Protected & Secure</p>
                    <p className="text-sm text-blue-700 leading-relaxed">
                      Your documents are processed securely with end-to-end encryption and are never stored permanently. 
                      We use advanced AI to ensure your medical information stays private and confidential.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <span>AI-Powered</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse delay-75"></div>
                    <span>50+ Languages</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse delay-150"></div>
                    <span>Instant Results</span>
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
