import { useEffect, useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getQuestionList } from '@/services/question'

const IndexPage = () => {
  const [total, setTotal] = useState(0)
  const [questionsPreview, setQuestionsPreview] = useState<any[]>([])

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    try {
      const data: any = await getQuestionList({ pageNum: 1, pageSize: 5 })
      setTotal(data.total || 0)
      setQuestionsPreview(data.rows || [])
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <View className='page'>
      <View style={{ padding: '20rpx' }}>
        <Text style={{ fontSize: '36rpx', fontWeight: 600 }}>智能作业助手</Text>
        <Text className='text-muted' style={{ display: 'block', marginTop: '8rpx' }}>
          拍照识别 · OCR解析 · AI题解
        </Text>
      </View>

      <View style={{ padding: '20rpx', background: '#fff', margin: '20rpx', borderRadius: '16rpx' }}>
        <Text style={{ fontSize: '30rpx', fontWeight: 500 }}>快速入口</Text>
        <View style={{ display: 'flex', marginTop: '24rpx', gap: '24rpx' }}>
          <Button size='mini' onClick={() => Taro.navigateTo({ url: '/pages/camera/index' })}>
            拍照识别
          </Button>
          <Button size='mini' onClick={() => Taro.navigateTo({ url: '/pages/question/list/index' })}>
            题库
          </Button>
          <Button size='mini' onClick={() => Taro.navigateTo({ url: '/pages/collection/list/index' })}>
            收藏
          </Button>
        </View>
      </View>

      <View style={{ padding: '20rpx', background: '#fff', margin: '20rpx', borderRadius: '16rpx' }}>
        <Text style={{ fontSize: '30rpx', fontWeight: 500 }}>最近题目</Text>
        {questionsPreview.map(q => (
          <View
            key={q.id}
            style={{ padding: '16rpx 0', borderBottom: '1px solid #eee' }}
            onClick={() => Taro.navigateTo({ url: `/pages/question/detail/index?id=${q.id}` })}
          >
            <Text style={{ fontSize: '28rpx' }}>{q.content?.slice(0, 40)}{q.content?.length > 40 ? '...' : ''}</Text>
            <Text className='text-muted' style={{ display: 'block', marginTop: '8rpx', fontSize: '24rpx' }}>
              {q.subject} · {q.difficulty}
            </Text>
          </View>
        ))}
        {questionsPreview.length === 0 && (
          <Text className='text-muted' style={{ fontSize: '26rpx' }}>暂无题目，点击“拍照识别”开始添加。</Text>
        )}
      </View>
    </View>
  )
}

export default IndexPage