import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { RAG_CONTENT } from '../data/ragContent';
import { PaperAirplaneIcon } from './Icons';
import { useLanguage } from '../i18n';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'model';
}

const interconnections = [
  'UE (PCI/CBCA)',
  'NSEC – híbridos offshore',
  'SINEA (MAERCP)',
  'SIEPAC / MER',
  'Colombia–Panamá (bilateral)',
  'GMS (Gran Mekong)',
  'BBIN',
  'Laos–Tailandia (PPA, interconexión)',
  'Itaipú – HVDC'
];

const systemInstruction = `Eres un asistente experto en modelos de interconexión eléctrica. Tu base de conocimiento es exclusivamente el documento proporcionado. Responde a las preguntas del usuario basándote únicamente en el siguiente texto. Sé conciso y directo. Si la respuesta no está en el texto, indica claramente que la información no se encuentra en el documento. No inventes información. El documento es:\n\n---\n${RAG_CONTENT}\n---`;

export const ConversationalAI: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedInterconnection, setSelectedInterconnection] = useState(interconnections[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  useEffect(() => {
      if(loading) {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
  }, [loading, messages[messages.length-1]?.text])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (error) {
        setError(null);
    }
  };

  const handleSendMessage = async (messageText: string) => {
    if (loading || !messageText.trim()) return;

    setError(null);
    const userMessage: Message = { id: Date.now().toString(), text: messageText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const modelMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: modelMessageId, text: '', sender: 'model' }]);

    try {
        if (!process.env.API_KEY) {
            throw new Error("API key not configured.");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const prompt = t('ai.userPrompt', { question: messageText });

        const responseStream = await ai.models.generateContentStream({
            model: "gemini-2.5-flash",
            contents: [
                { role: 'user', parts: [{ text: systemInstruction }] },
                { role: 'model', parts: [{ text: t('ai.systemReady') }] },
                { role: 'user', parts: [{ text: prompt }] }
            ]
        });

        let fullResponse = "";
        for await (const chunk of responseStream) {
            const chunkText = chunk.text;
            fullResponse += chunkText;
            setMessages(prev => prev.map(msg => 
                msg.id === modelMessageId ? { ...msg, text: fullResponse } : msg
            ));
        }

    } catch (e: any) {
        console.error("Error with Gemini API:", e);
        setError(t('ai.error'));
        setMessages(prev => prev.filter(msg => msg.id !== modelMessageId));
    } finally {
        setLoading(false);
    }
  };

  const handlePresetQuery = (question: string) => {
    const fullQuestion = t('ai.presetPrompt', { interconnection: selectedInterconnection, question: question.toLowerCase() });
    handleSendMessage(fullQuestion);
  };

  const questions = [
    t('ai.question.whoPays'),
    t('ai.question.howPays'),
    t('ai.question.whoRisks'),
    t('ai.question.stateParticipation'),
    t('ai.question.benefitTransfers')
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow flex flex-col">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{t('ai.title')}</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
          {t('ai.subtitle')}
        </p>
      </div>

      <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col bg-gray-900 border border-gray-700/80 rounded-lg shadow-2xl overflow-hidden">
        
        <div className="flex-grow p-6 overflow-y-auto space-y-6">
          {messages.length === 0 && (
             <div className="text-center text-gray-500 my-8">
              <div className="p-4 bg-gray-800/50 rounded-lg inline-block">
                <p>{t('ai.welcomeTitle')}</p>
                <p className="text-sm mt-2">{t('ai.welcomeSubtitle')}</p>
              </div>
            </div>
          )}
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 animate-fade-in ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'model' && <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex-shrink-0 flex items-center justify-center text-cyan-400 font-bold text-xs">{t('ai.avatar')}</div>}
              <div className={`max-w-prose p-3 rounded-lg ${msg.sender === 'user' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-200'}`}>
                <div className="text-sm prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />').replace(/\* /g, '• ').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></div>
              </div>
            </div>
          ))}
           {loading && messages[messages.length - 1]?.sender === 'model' && (
            <div className="flex gap-3 justify-start animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex-shrink-0 flex items-center justify-center text-cyan-400 font-bold text-xs">{t('ai.avatar')}</div>
              <div className="max-w-prose p-3 rounded-lg bg-gray-800 text-gray-200">
                <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                    <span className="text-sm text-gray-400">...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        
        <div className="p-4 bg-gray-950/50 border-t border-gray-700/80">
          <div className="mb-4">
              <label htmlFor="interconnection-select" className="block text-xs text-gray-400 mb-1">
                {t('ai.guidedLabel')}
              </label>
              <select 
                id="interconnection-select" 
                value={selectedInterconnection}
                onChange={e => setSelectedInterconnection(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-md border-gray-700 focus:ring-cyan-500 focus:border-cyan-500 text-sm mb-2"
              >
                {interconnections.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
              <div className="flex flex-wrap gap-2">
                {questions.map(q => (
                  <button key={q} onClick={() => handlePresetQuery(q)} disabled={loading} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {q}
                  </button>
                ))}
              </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="flex items-center gap-3"
          >
            <div className="flex-grow bg-gray-800 text-white rounded-lg border-gray-600 focus-within:ring-1 focus-within:ring-cyan-500 flex items-center">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder={t('ai.placeholder')}
                    className="flex-grow bg-transparent border-0 focus:ring-0 w-full"
                    disabled={loading}
                />
                {error && !loading && (
                    <div className="flex items-center gap-2 pr-4 text-sm text-red-400 font-medium">
                        {error}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                )}
            </div>
            <button type="submit" disabled={loading || !input.trim()} className="p-2 bg-cyan-600 text-white rounded-full hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex-shrink-0">
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
       <style>{`
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
            .prose-invert {
                --tw-prose-body: #d1d5db;
                --tw-prose-headings: #ffffff;
                --tw-prose-lead: #a1a1aa;
                --tw-prose-links: #22d3ee;
                --tw-prose-bold: #ffffff;
                --tw-prose-counters: #a1a1aa;
                --tw-prose-bullets: #4b5563;
                --tw-prose-hr: #374151;
                --tw-prose-quotes: #f3f4f6;
                --tw-prose-quote-borders: #374151;
                --tw-prose-captions: #a1a1aa;
                --tw-prose-code: #ffffff;
                --tw-prose-pre-code: #d1d5db;
                --tw-prose-pre-bg: #1f2937;
                --tw-prose-th-borders: #4b5563;
                --tw-prose-td-borders: #374151;
            }
        `}</style>
    </div>
  );
};
