
// Speech to text utility for KaziCash app
// This enables low-literacy users to interact with the app by speaking

export interface SpeechToTextOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  onResult?: (transcript: string, isFinal: boolean) => void;
  onError?: (error: any) => void;
  onEnd?: () => void;
}

// Define missing types for SpeechRecognition API
interface SpeechRecognitionEvent {
  results: {
    [index: number]: SpeechRecognitionResult;
    length: number;
  };
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

// Define SpeechRecognition interface
interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: any) => void;
  onend: () => void;
  start(): void;
  stop(): void;
}

export class SpeechToTextService {
  private recognition: SpeechRecognition | null = null;
  private isListening = false;
  private options: SpeechToTextOptions = {
    language: 'en-US',
    continuous: true,
    interimResults: true,
  };

  constructor(options?: SpeechToTextOptions) {
    if (options) {
      this.options = { ...this.options, ...options };
    }
    this.initRecognition();
  }

  private initRecognition() {
    // Check if the browser supports SpeechRecognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      // @ts-ignore - TypeScript doesn't know about webkitSpeechRecognition
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognitionAPI() as SpeechRecognition;
      
      if (this.recognition) {
        this.recognition.lang = this.options.language || 'en-US';
        this.recognition.continuous = this.options.continuous || true;
        this.recognition.interimResults = this.options.interimResults || true;
        
        this.recognition.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = Array.from(Array.prototype.slice.call(event.results))
            .map((result: SpeechRecognitionResult) => result[0])
            .map((result: SpeechRecognitionAlternative) => result.transcript)
            .join('');
          
          const isFinal = event.results[event.results.length - 1].isFinal;
          
          if (this.options.onResult) {
            this.options.onResult(transcript, isFinal);
          }
        };
        
        this.recognition.onerror = (event: any) => {
          if (this.options.onError) {
            this.options.onError(event);
          }
        };
        
        this.recognition.onend = () => {
          this.isListening = false;
          if (this.options.onEnd) {
            this.options.onEnd();
          }
        };
      }
    }
  }

  public start() {
    if (this.recognition && !this.isListening) {
      try {
        this.recognition.start();
        this.isListening = true;
        return true;
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        return false;
      }
    }
    return false;
  }

  public stop() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
        this.isListening = false;
        return true;
      } catch (error) {
        console.error('Failed to stop speech recognition:', error);
        return false;
      }
    }
    return false;
  }

  public isSupported(): boolean {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  }
}

// Helper hook to use speech-to-text in React components
export const useSpeechToText = (options?: SpeechToTextOptions): SpeechToTextService => {
  // Create a new instance or get from a singleton
  const service = new SpeechToTextService(options);
  return service;
};
