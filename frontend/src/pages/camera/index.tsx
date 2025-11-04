import { useState } from 'react'
import { View, Button, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import request from '@/utils/request'
import { recognizeImage, generateExplanation } from '@/services/ocr'
import { createQuestion } from '@/services/question'

const CameraPage = () => {
  const [imageUrl, setImageUrl] = useState<string>()
  const [ocrLoading, setOcrLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [ocrResult, setOcrResult] = useState<any>()
  const [explanation, setExplanation] = useState<any>()

  const chooseImage = () => {
    Taro.chooseImage({
      count: 1,
      sourceType: ['camera', 'album'],
      success: async res => {
        const path = res.tempFilePaths[0]
        try {
          const uploaded = await request.uploadFile(path)
          setImageUrl(uploaded)
        } catch (e) {
          console.error(e)
        }
      }
    })
  }

  const doOCR = async () => {
    if (!imageUrl) return Taro.showToast({ title: '请先上传图片', icon: 'none' })
    setOcrLoading(true)
    try {
      const data = await recognizeImage(imageUrl)
      setOcrResult(data)
    } catch (e) {
      console.error(e)
    } finally {
      setOcrLoading(false)
    }
  }

  const doExplain = async () => {
    if (!ocrResult?.parsed) return Taro.showToast({ title: '需要OCR结果', icon: 'none' })
    setAiLoading(true)
    try {
      const payload = {
        question: ocrResult.parsed.question,
        options: ocrResult.parsed.options,
        answer: ocrResult.parsed.answer,
        type: ocrResult.parsed.type,
        subject: '未分类'
      }
      const data = await generateExplanation(payload)
      setExplanation(data)
    } catch (e) {
      console.error(e)
    } finally {
      setAiLoading(false)
    }
  }

  const saveQuestion = async () => {
    if (!ocrResult?.parsed) return
    try {
      const res: any = await createQuestion({
        questionType: ocrResult.parsed.type,
        subject: '未分类',
        difficulty: 'easy',
        content: ocrResult.parsed.question,
        options: ocrResult.parsed.options,
        correctAnswer: ocrResult.parsed.answer || '',
        imageUrl,
        ocrRawText: ocrResult.rawText,
        explanation
      })
      Taro.showToast({ title: '保存成功', icon: 'success' })
      if (res?.id) {
        Taro.navigateTo({ url: `/pages/question/detail/index?id=${res.id}` })
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <View className='page' style={{ padding: '20rpx' }}>
      <Button onClick={chooseImage} type='primary'>拍照 / 选图</Button>
      {imageUrl && (
        <Image src={imageUrl} mode='widthFix' style={{ width: '100%', marginTop: '20rpx', borderRadius: '12rpx' }} />
      )}
      <View style={{ marginTop: '20rpx' }}>
        <Button disabled={!imageUrl || ocrLoading} onClick={doOCR}>OCR识别{ocrLoading ? '中...' : ''}</Button>
      </View>
      {ocrResult && (
        <View style={{ background: '#fff', padding: '20rpx', marginTop: '20rpx', borderRadius: '12rpx' }}>
          <Text style={{ fontWeight: 600 }}>识别题干：</Text>
          <Text style={{ display: 'block', marginTop: '12rpx' }}>{ocrResult.parsed.question}</Text>
          {ocrResult.parsed.options && (
            <View style={{ marginTop: '12rpx' }}>
              {Object.entries(ocrResult.parsed.options).map(([k, v]) => (
                <Text key={k} style={{ display: 'block' }}>{k}. {v}</Text>
              ))}
            </View>
          )}
          <Text style={{ display: 'block', marginTop: '12rpx', color: '#6190E8' }}>
            答案：{ocrResult.parsed.answer || '未识别'} · 置信度 {ocrResult.confidence}
          </Text>
        </View>
      )}
      <View style={{ marginTop: '20rpx' }}>
        <Button disabled={!ocrResult || aiLoading} onClick={doExplain}>AI解析{aiLoading ? '中...' : ''}</Button>
      </View>
      {explanation && (
        <View style={{ background: '#fff', padding: '20rpx', marginTop: '20rpx', borderRadius: '12rpx' }}>
          <Text style={{ fontWeight: 600 }}>题目分析：</Text>
          <Text style={{ display: 'block', marginTop: '12rpx' }}>{explanation.analysis}</Text>
          <Text style={{ fontWeight: 600, marginTop: '16rpx' }}>步骤：</Text>
          {explanation.steps?.map((s: any) => (
            <Text key={s.step} style={{ display: 'block', marginTop: '8rpx' }}>{s.step}. {s.content}</Text>
          ))}
          <Text style={{ marginTop: '16rpx', color: '#FA6400' }}>正确答案：{explanation.answer}</Text>
        </View>
      )}
      <View style={{ marginTop: '20rpx' }}>
        <Button type='warn' disabled={!explanation} onClick={saveQuestion}>保存到题库</Button>
      </View>
    </View>
  )
}

export default CameraPage