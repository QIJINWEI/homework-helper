import request from '@/utils/request'

export interface Collection {
  id: number
  name: string
  description?: string
  icon?: string
  sort?: number
  createTime?: string
}

export const getCollections = () => request.get('/api/collections')
export const createCollection = (data: Partial<Collection>) => request.post('/api/collections', data)
export const addQuestionToCollection = (collectionId: number, questionId: number) =>
  request.post(`/api/collections/${collectionId}/questions`, { questionId })
export const removeQuestionFromCollection = (collectionId: number, questionId: number) =>
  request.delete(`/api/collections/${collectionId}/questions/${questionId}`)