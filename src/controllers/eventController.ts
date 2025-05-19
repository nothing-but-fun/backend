import { EventService } from '../services/eventService';
import type { Request, Response, NextFunction } from 'express';

const eventService = new EventService();

export const eventController = {
  // 获取所有事件（可以筛选历史事件）
  getAllEvents: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 解析查询参数isHistorical
      const isHistorical = req.query.isHistorical !== undefined 
        ? req.query.isHistorical === 'true' 
        : undefined;
      
      const events = await eventService.getAllEvents(isHistorical);
      
      res.status(200).json(events);
    } catch (error) {
      console.error('获取事件失败:', error);
      res.status(500).json({ error: '获取事件失败' });
    }
  },

  // 通过ID获取事件
  getEventById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const event = await eventService.getEventById(id);
      
      if (!event) {
        return res.status(404).json({ error: '事件不存在' });
      }
      
      res.status(200).json(event);
    } catch (error) {
      console.error('获取事件失败:', error);
      res.status(500).json({ error: '获取事件失败' });
    }
  },

  // 获取组织者的所有事件
  getEventsByOrganizerId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const organizerId = parseInt(req.params.id);
      const events = await eventService.getEventsByOrganizerId(organizerId);
      
      res.status(200).json(events);
    } catch (error) {
      console.error('获取组织者事件失败:', error);
      res.status(500).json({ error: '获取组织者事件失败' });
    }
  },

  // 创建事件
  createEvent: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const eventData = req.body;
      
      // 验证必填字段
      if (!eventData.title || !eventData.startTime) {
        return res.status(400).json({ error: '缺少必要的事件信息（标题和开始时间是必填项）' });
      }
      
      // 转换日期字符串为Date对象（如果是字符串）
      if (typeof eventData.startTime === 'string') {
        eventData.startTime = new Date(eventData.startTime);
      }
      
      if (eventData.endTime && typeof eventData.endTime === 'string') {
        eventData.endTime = new Date(eventData.endTime);
      }
      
      const newEvent = await eventService.createEvent(eventData);
      
      res.status(201).json(newEvent);
    } catch (error) {
      console.error('创建事件失败:', error);
      res.status(500).json({ error: '创建事件失败' });
    }
  },

  // 更新事件
  updateEvent: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const eventData = req.body;
      
      // 转换日期字符串为Date对象（如果是字符串）
      if (eventData.startTime && typeof eventData.startTime === 'string') {
        eventData.startTime = new Date(eventData.startTime);
      }
      
      if (eventData.endTime && typeof eventData.endTime === 'string') {
        eventData.endTime = new Date(eventData.endTime);
      }
      
      const updatedEvent = await eventService.updateEvent(id, eventData);
      
      if (!updatedEvent) {
        return res.status(404).json({ error: '事件不存在' });
      }
      
      res.status(200).json(updatedEvent);
    } catch (error) {
      console.error('更新事件失败:', error);
      res.status(500).json({ error: '更新事件失败' });
    }
  },

  // 删除事件
  deleteEvent: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const deletedEvent = await eventService.deleteEvent(id);
      
      if (!deletedEvent || deletedEvent.length === 0) {
        return res.status(404).json({ error: '事件不存在' });
      }
      
      res.status(200).json({ message: '事件删除成功' });
    } catch (error) {
      console.error('删除事件失败:', error);
      res.status(500).json({ error: '删除事件失败' });
    }
  }
}; 