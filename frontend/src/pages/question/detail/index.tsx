import { useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { getQuestionDetail } from '@/services/question'

const QuestionDetailPage = () => {
  const router = useRouter()
  const id = Number(router.params.id)
  const [question, setQuestion] = useState<any>()

  useEffect(() => {
    if (id) {
      getQuestionDetail(id).then((data: any) => setQuestion(data))
    }
  }, [id])

  if (!question) return <View style={{ padding: '30rpx' }}><Text>加载中...</Text></View>

  return (
    <View className='page' style={{ padding: '24rpx' }}>
      <Text style={{ fontSize: '32rpx', fontWeight: 600 }}>{question.content}</Text>
      {question.imageUrl && (
        <Image src={question.imageUrl} mode='widthFix' style={{ width: '100%', marginTop: '24rpx', borderRadius: '12rpx' }} />
      )}
      {question.options && (
        <View style={{ marginTop: '24rpx' }}>
          {Object.entries(question.options).map(([k, v]: any) => (
            <Text key={k} style={{ display: 'block', padding: '8rpx 0' }}>{k}. {v}</Text>
          ))}
        </View>
      )}
      <Text style={{ marginTop: '24rpx', fontSize: '28rpx', color: '#FA6400' }}>正确答案：{question.correctAnswer}</Text>

      {question.explanation && (
        <View style={{ marginTop: '32rpx', background: '#fff', padding: '24rpx', borderRadius: '12rpx' }}>
          <Text style={{ fontSize: '30rpx', fontWeight: 600 }}>AI解析</Text>
          <Text style={{ display: 'block', marginTop: '16rpx' }}>{question.explanation.analysis}</Text>
          <Text style={{ fontWeight: 600, marginTop: '20rpx' }}>解题步骤：</Text>
          {question.explanation.steps?.map((s: any) => (
            <Text key={s.step} style={{ display: 'block', marginTop: '10rpx' }}>{s.step}. {s.content}</Text>
          ))}
          <Text style={{ marginTop: '20rpx', color: '#6190E8' }}>知识点：{(question.explanation.keyPoints || []).join('、')}</Text>
        </View>
      )}
    </View>
  )
}

export default QuestionDetailPage