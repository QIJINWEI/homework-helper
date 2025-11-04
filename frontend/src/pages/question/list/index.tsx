import { useEffect, useState } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getQuestionList } from '@/services/question'

const QuestionListPage = () => {
  const [list, setList] = useState<any[]>([])
  const [pageNum, setPageNum] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const load = async (reset = false) => {
    const targetPage = reset ? 1 : pageNum
    const data: any = await getQuestionList({ pageNum: targetPage, pageSize: 20 })
    const rows = data.rows || []
    setHasMore(rows.length === 20)
    setList(reset ? rows : list.concat(rows))
    setPageNum(targetPage + 1)
  }

  useEffect(() => { load(true) }, [])

  return (
    <ScrollView scrollY style={{ height: '100vh' }} onScrollToLower={() => hasMore && load()}>
      <View style={{ padding: '20rpx' }}>
        {list.map(q => (
          <View
            key={q.id}
            style={{ background: '#fff', padding: '20rpx', marginBottom: '16rpx', borderRadius: '12rpx' }}
            onClick={() => Taro.navigateTo({ url: `/pages/question/detail/index?id=${q.id}` })}
          >
            <Text style={{ fontSize: '28rpx', fontWeight: 500 }}>{q.content.slice(0, 60)}{q.content.length > 60 ? '...' : ''}</Text>
            <Text style={{ display: 'block', marginTop: '10rpx', fontSize: '24rpx', color: '#999' }}>
              {q.subject} · {q.difficulty}
            </Text>
          </View>
        ))}
        {!list.length && <Text style={{ color: '#999' }}>暂无题目</Text>}
        {!hasMore && list.length > 0 && <Text style={{ display: 'block', textAlign: 'center', color: '#999', padding: '20rpx' }}>已到底部</Text>}
      </View>
    </ScrollView>
  )
}

export default QuestionListPage