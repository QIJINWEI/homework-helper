# 智能作业助手 (Homework Helper)

基于 Taro(React) + SpringBoot(RuoYi) 的智能题目识别与解析系统

## 功能特性

✨ **核心功能**
- 📸 拍照识别题目
- 🔍 OCR智能解析
- 🤖 AI生成详细题解
- 📚 个人题库管理
- ⭐ 题目收藏分类
- 📊 学习数据统计

## 技术栈

### 前端
- **框架**: Taro 3.x + React 18
- **UI组件**: Taro UI
- **状态管理**: Zustand
- **网络请求**: Axios
- **支持平台**: 微信小程序、H5、支付宝小程序

### 后端
- **框架**: Spring Boot 2.7.x
- **基础**: RuoYi-Vue 3.8.x
- **数据库**: MySQL 8.0
- **缓存**: Redis 7.0
- **文档**: Swagger 3.0

### 第三方服务
- **OCR**: 腾讯云OCR / 百度OCR
- **AI**: OpenAI GPT-4 / 文心一言
- **存储**: 腾讯云COS / 阿里云OSS

## 项目结构

```
homework-helper/
├── frontend/                    # 前端项目
│   ├── src/
│   │   ├── pages/              # 页面
│   │   │   ├── index/         # 首页
│   │   │   ├── camera/        # 拍照识别
│   │   │   ├── question/      # 题目管理
│   │   │   ├── collection/    # 收藏夹
│   │   │   └── profile/       # 个人中心
│   │   ├── components/         # 组件
│   │   ├── services/           # API服务
│   │   ├── store/              # 状态管理
│   │   └── utils/              # 工具函数
│   ├── config/                 # 配置
│   └── package.json
│
├── backend/                     # 后端项目
│   ├── ruoyi-admin/            # 管理后台模块
│   ├── ruoyi-system/           # 系统模块
│   ├── ruoyi-homework/         # 作业助手核心模块
│   │   ├── controller/         # 控制器
│   │   ├── service/            # 服务层
│   │   ├── domain/             # 实体类
│   │   ├── mapper/             # 数据访问层
│   │   └── thirdparty/         # 第三方服务集成
│   │       ├── ocr/           # OCR服务
│   │       ├── ai/            # AI服务
│   │       └── oss/           # 对象存储
│   ├── ruoyi-common/           # 公共模块
│   ├── ruoyi-framework/        # 框架核心
│   └── sql/                    # 数据库脚本
│   
└── docs/                        # 文档
    ├── api/                    # API文档
    ├── deploy/                 # 部署文档
    └── images/                 # 图片资源
```

## 快速开始

### 环境要求

- Node.js >= 16.x
- JDK >= 1.8
- MySQL >= 8.0
- Redis >= 6.0
- Maven >= 3.6

### 前端安装

```bash
cd frontend
npm install
# 或
yarn install
```

### 前端运行

```bash
# 微信小程序
npm run dev:weapp

# H5
npm run dev:h5

# 支付宝小程序
npm run dev:alipay
```

### 前端构建

```bash
# 微信小程序
npm run build:weapp

# H5
npm run build:h5
```

### 后端安装

```bash
cd backend
mvn clean install
```

### 数据库初始化

```bash
# 执行SQL脚本
mysql -u root -p < sql/homework_helper.sql
```

### 后端配置

编辑 `backend/ruoyi-admin/src/main/resources/application.yml`

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/homework_helper
    username: root
    password: your_password
  
  redis:
    host: localhost
    port: 6379

# 第三方服务配置
homework:
  ocr:
    provider: tencent  # tencent/baidu
    app-id: your_app_id
    secret-key: your_secret_key
  
  ai:
    provider: openai  # openai/wenxin
    api-key: your_api_key
    model: gpt-4
  
  oss:
    provider: tencent  # tencent/aliyun
    bucket: your_bucket
    region: ap-guangzhou
    access-key: your_access_key
    secret-key: your_secret_key
```

### 后端运行

```bash
cd backend/ruoyi-admin
mvn spring-boot:run
```

访问地址：
- 前端H5：http://localhost:10086
- 后端API：http://localhost:8080
- Swagger文档：http://localhost:8080/swagger-ui.html

## 核心功能说明

### 1. 拍照识别流程

```
用户拍照 → 图片上传 → OCR识别 → 结果确认 → AI解析 → 保存题库
```

### 2. OCR识别

支持识别多种题型：
- 单选题
- 多选题
- 判断题
- 填空题
- 解答题

### 3. AI解析

生成内容包括：
- 题目分析
- 分步骤解答
- 知识点归纳
- 解题技巧
- 相似题型推荐

### 4. 题库管理

- 个人题库分类
- 题目标签管理
- 收藏夹功能
- 学习记录统计

## API文档

启动后端服务后访问：http://localhost:8080/swagger-ui.html

主要接口：

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/upload/image` | POST | 上传图片 |
| `/api/ocr/recognize` | POST | OCR识别 |
| `/api/ai/explain` | POST | AI生成解析 |
| `/api/questions` | POST | 创建题目 |
| `/api/questions` | GET | 获取题目列表 |
| `/api/questions/{id}` | GET | 获取题目详情 |
| `/api/collections` | POST | 创建收藏夹 |

## 部署说明

### Docker部署

```bash
# 构建镜像
docker-compose build

# 启动服务
docker-compose up -d
```

### Nginx配置

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location /api/ {
        proxy_pass http://localhost:8080/;
    }
    
    location / {
        root /var/www/html;
        index index.html;
    }
}
```

## 开发指南

### 代码规范

- 前端：ESLint + Prettier
- 后端：阿里巴巴Java开发手册

### 提交规范

使用 Conventional Commits 规范：

```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试
chore: 构建工具或辅助工具的变动
```

## 常见问题

### 1. OCR识别不准确？

- 确保图片清晰
- 光线充足
- 题目完整

### 2. AI解析失败？

- 检查API密钥配置
- 确认网络连接
- 查看API额度

### 3. 小程序无法上传图片？

- 检查服务器域名配置
- 确认HTTPS证书有效

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 许可证

MIT License

## 联系方式

- 作者：QIJINWEI
- GitHub：[@QIJINWEI](https://github.com/QIJINWEI)

## 致谢

- [Taro](https://taro.jd.com/)
- [RuoYi-Vue](https://gitee.com/y_project/RuoYi-Vue)
- [腾讯云OCR](https://cloud.tencent.com/product/ocr)
- [OpenAI](https://openai.com/)