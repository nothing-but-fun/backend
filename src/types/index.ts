// 用户类型
export type User = {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
};

// 创建用户请求类型
export type CreateUserRequest = {
  username: string;
  email: string;
  passwordHash: string;
};

// 更新用户请求类型
export type UpdateUserRequest = Partial<{
  username: string;
  email: string;
  passwordHash: string;
}>;

// 任务类型
export type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

// 创建任务请求类型
export type CreateTaskRequest = {
  title: string;
  description?: string;
  userId: number;
};

// 更新任务请求类型
export type UpdateTaskRequest = Partial<{
  title: string;
  description: string;
  completed: boolean;
}>;

// 事件类型
export type Event = {
  id: number;
  organizerId?: number;
  title: string;
  description?: string;
  location?: string;
  startTime: Date;
  endTime?: Date;
  image?: string;
  capacity?: number;
  createdAt: Date;
};

// 创建事件请求类型
export type CreateEventRequest = {
  organizerId?: number;
  title: string;
  description?: string;
  location?: string;
  startTime: Date;
  endTime?: Date;
  image?: string;
  capacity?: number;
};

// 更新事件请求类型
export type UpdateEventRequest = Partial<{
  organizerId: number;
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
  image: string;
  capacity: number;
}>; 