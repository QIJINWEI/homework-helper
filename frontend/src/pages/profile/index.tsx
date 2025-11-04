import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'

const ProfilePage = () => {
  const token = Taro.getStorageSync('token')
  return (
    <View className='page' style={{ padding: '30rpx' }}>
      <Text style={{ fontSize: '32rpx', fontWeight: 600 }}>个人中心</Text>
      <Text style={{ display: 'block', marginTop: '16rpx', fontSize: '26rpx', color: '#666' }}>
        当前状态：{token ? '已登录' : '未登录'}
      </Text>
      {!token && (
        <Button style={{ marginTop: '24rpx' }} onClick={() => Taro.showToast({ title: '请集成登录模块', icon: 'none' })}>
          去登录
        </Button>
      )}
    </View>
  )
}
export default ProfilePage