import request from '@/utils/request'
export interface Question { id: number; questionType: string; subject: string; difficulty: string; content: string; options?: Record<string,string>; correctAnswer: string; imageUrl?: string; explanation?: any; createdAt: string }
export interface QuestionListParams { pageNum: number; pageSize: number; subject?: string; difficulty?: string; keyword?: string }
export const getQuestionList = (params: QuestionListParams) => request.get('/api/questions', params)
export const getQuestionDetail = (id: number) => request.get(`/api/questions/${id}`)
export const createQuestion = (data: any) => request.post('/api/questions', data)
export const updateQuestion = (id: number, data: any) => request.put(`/api/questions/${id}`, data)
export const deleteQuestion = (id: number) => request.delete(`/api/questions/${id}`)