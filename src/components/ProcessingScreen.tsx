
import { Card } from '@/components/ui/card';
import { FileText, Brain, Globe, Sparkles, Zap, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const ProcessingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { icon: FileText, label: "Scanning document with advanced OCR...", color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
    { icon: Brain, label: "AI is simplifying medical language...", color: "text-purple-600", bgColor: "bg-purple-50", borderColor: "border-purple-200" },
    { icon: Globe, label: "Preparing multilingual translation...", color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" }
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 1000);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 60);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-75"></div>
      </div>

      <Card className="p-10 max-w-lg w-full text-center relative z-10 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <div className="mb-8">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <FileText className="h-10 w-10 text-white" />
          </div>
          <div className="flex items-center justify-center mt-4">
            <Sparkles className="h-5 w-5 text-purple-500 mr-2 animate-pulse" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Processing
            </h2>
            <Sparkles className="h-5 w-5 text-purple-500 ml-2 animate-pulse" />
          </div>
          <p className="text-gray-600 mt-2">Our advanced AI is working its magic...</p>
        </div>
        
        <div className="space-y-6 mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div 
                key={index}
                className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-500 transform ${
                  isActive 
                    ? `${step.bgColor} ${step.borderColor} scale-105 shadow-lg` 
                    : isCompleted
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className={`p-2 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-white shadow-md animate-pulse' 
                    : isCompleted
                    ? 'bg-green-100'
                    : 'bg-gray-100'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <Icon className={`h-6 w-6 ${isActive ? step.color : 'text-gray-400'}`} />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <span className={`text-sm font-medium ${
                    isActive ? step.color : isCompleted ? 'text-green-700' : 'text-gray-500'
                  }`}>
                    {isCompleted ? 'Completed!' : step.label}
                  </span>
                  {isActive && (
                    <div className="flex items-center mt-1">
                      <Zap className="h-3 w-3 text-yellow-500 mr-1 animate-pulse" />
                      <span className="text-xs text-yellow-600">Processing...</span>
                    </div>
                  )}
                </div>
                {isActive && (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-300 border-t-blue-600"></div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="space-y-4">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">{progress}% Complete</span>
            <div className="flex items-center">
              <Zap className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm text-gray-600">
                {progress < 30 ? 'Scanning...' : progress < 70 ? 'Simplifying...' : 'Almost done!'}
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mt-6 flex items-center justify-center">
          <span className="animate-pulse">⚡</span>
          <span className="mx-2">Powered by advanced AI • Usually takes 10-30 seconds</span>
          <span className="animate-pulse">⚡</span>
        </p>
      </Card>
    </div>
  );
};

export default ProcessingScreen;
