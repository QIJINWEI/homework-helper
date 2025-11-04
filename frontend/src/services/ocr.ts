import request from '@/utils/request'
export interface OcrResult { rawText: string; parsed: { type: string; question: string; options?: Record<string,string>; answer?: string }; confidence: number }
export interface ExplanationResult { analysis: string; steps: Array<{ step: number; content: string; formula?: string }> ; answer: string; keyPoints: string[]; tips: string; similarQuestions: string }
export const recognizeImage = (imageUrl: string) => request.post<OcrResult>('/api/ocr/recognize', { imageUrl })
export const generateExplanation = (data: any) => request.post<ExplanationResult>('/api/ai/explain', data)