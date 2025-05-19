# NBF Backend

基于Bun的RESTful API后端服务，使用TypeScript, Drizzle ORM和PostgreSQL。

## 特性

- 使用Bun运行时提供高性能API服务
- 基于TypeScript的类型安全架构
- 使用Drizzle ORM进行数据库操作
- PostgreSQL数据库存储
- RESTful API设计
- 模块化的项目结构（控制器、服务和数据库层）

## 项目结构

```
nbf-backend/
├── src/
│   ├── config/         # 配置文件
│   ├── controllers/    # HTTP控制器
│   ├── db/             # 数据库模型和迁移
│   ├── routes/         # 路由定义
│   ├── services/       # 业务逻辑服务
│   ├── types/          # 类型定义
│   └── index.ts        # 主入口文件
├── .gitignore
├── bun.lock
├── package.json
├── README.md
└── tsconfig.json
```

## 安装

```bash
# 克隆项目
git clone https://your-repository-url/nbf-backend.git
cd nbf-backend

# 安装依赖
bun install
```

## 环境变量

创建一个`.env`文件在项目根目录:

```
PORT=3000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/nbf_database
```

## 数据库设置

1. 确保你的PostgreSQL服务正在运行
2. 创建数据库:

```bash
createdb nbf_database
```

3. 生成并运行迁移:

```bash
# 生成迁移
bun run generate

# 运行迁移
bun run migrate
```

## 运行应用

```bash
# 开发模式
bun run dev

# 生产模式
bun run start
```

## API 接口

### 用户相关

- `GET /api/users` - 获取所有用户
- `GET /api/users/:id` - 通过ID获取用户
- `POST /api/users` - 创建新用户
- `PUT /api/users/:id` - 更新用户
- `DELETE /api/users/:id` - 删除用户

### 任务相关

- `GET /api/tasks` - 获取所有任务
- `GET /api/tasks/:id` - 通过ID获取任务
- `GET /api/users/:userId/tasks` - 获取指定用户的所有任务
- `POST /api/tasks` - 创建新任务
- `PUT /api/tasks/:id` - 更新任务
- `DELETE /api/tasks/:id` - 删除任务

### 事件相关

- `GET /events` - 获取所有事件
  - 查询参数: `isHistorical=true|false` - 筛选历史事件(已过期)或未来事件
- `GET /events/:id` - 通过ID获取事件
- `GET /organizers/:id/events` - 获取指定组织者的所有事件
- `POST /events` - 创建新事件
- `PUT /events/:id` - 更新事件
- `DELETE /events/:id` - 删除事件

## 事件API示例

### 获取所有事件

**请求**
```
GET /events
```

**响应**
```json
[
  {
    "id": 1,
    "organizerId": 101,
    "title": "科技交流会",
    "description": "探讨最新科技趋势",
    "location": "上海市浦东新区科技园",
    "startTime": "2023-06-15T09:00:00.000Z",
    "endTime": "2023-06-15T17:00:00.000Z",
    "image": "https://example.com/images/tech-event.jpg",
    "capacity": 200,
    "createdAt": "2023-05-10T08:30:00.000Z"
  },
  // ...更多事件
]
```

### 获取历史事件

**请求**
```
GET /events?isHistorical=true
```

**响应**
```json
[
  {
    "id": 1,
    "organizerId": 101,
    "title": "科技交流会",
    "description": "探讨最新科技趋势",
    "location": "上海市浦东新区科技园",
    "startTime": "2023-06-15T09:00:00.000Z",
    "endTime": "2023-06-15T17:00:00.000Z",
    "image": "https://example.com/images/tech-event.jpg",
    "capacity": 200,
    "createdAt": "2023-05-10T08:30:00.000Z"
  },
  // ...更多过期事件
]
```

### 获取即将到来的事件

**请求**
```
GET /events?isHistorical=false
```

**响应**
```json
[
  {
    "id": 2,
    "organizerId": 101,
    "title": "音乐节",
    "description": "年度音乐盛典",
    "location": "北京市朝阳区奥林匹克公园",
    "startTime": "2024-07-20T18:00:00.000Z",
    "endTime": "2024-07-20T22:00:00.000Z",
    "image": "https://example.com/images/music-festival.jpg",
    "capacity": 5000,
    "createdAt": "2023-05-15T10:30:00.000Z"
  },
  // ...更多未来事件
]
```

### 创建新事件

**请求**
```
POST /events
Content-Type: application/json

{
  "organizerId": 101,
  "title": "音乐节",
  "description": "年度音乐盛典",
  "location": "北京市朝阳区奥林匹克公园",
  "startTime": "2023-07-20T18:00:00.000Z",
  "endTime": "2023-07-20T22:00:00.000Z",
  "image": "https://example.com/images/music-festival.jpg",
  "capacity": 5000
}
```

**响应**
```json
{
  "id": 2,
  "organizerId": 101,
  "title": "音乐节",
  "description": "年度音乐盛典",
  "location": "北京市朝阳区奥林匹克公园",
  "startTime": "2023-07-20T18:00:00.000Z",
  "endTime": "2023-07-20T22:00:00.000Z",
  "image": "https://example.com/images/music-festival.jpg",
  "capacity": 5000,
  "createdAt": "2023-05-15T10:30:00.000Z"
}
```

### 更新事件

**请求**
```
PUT /events/2
Content-Type: application/json

{
  "capacity": 6000,
  "description": "年度音乐盛典 - 扩大规模"
}
```

**响应**
```json
{
  "id": 2,
  "organizerId": 101,
  "title": "音乐节",
  "description": "年度音乐盛典 - 扩大规模",
  "location": "北京市朝阳区奥林匹克公园",
  "startTime": "2023-07-20T18:00:00.000Z",
  "endTime": "2023-07-20T22:00:00.000Z",
  "image": "https://example.com/images/music-festival.jpg",
  "capacity": 6000,
  "createdAt": "2023-05-15T10:30:00.000Z"
}
```

### 删除事件

**请求**
```
DELETE /events/2
```

**响应**
```json
{
  "message": "事件删除成功"
}
```

## 开发

对于贡献者，请按照标准的Git工作流进行开发:

1. Fork项目
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的改动 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建新的Pull Request
