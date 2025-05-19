import { eventController } from '../controllers/eventController';
import express from 'express';
import type { RequestHandler } from 'express';

// 创建路由器
const router = express.Router();

// 事件路由
router.get('/events', eventController.getAllEvents as RequestHandler);
router.get('/events/:id', eventController.getEventById as RequestHandler);
router.post('/events', eventController.createEvent as RequestHandler);
router.put('/events/:id', eventController.updateEvent as RequestHandler);
router.delete('/events/:id', eventController.deleteEvent as RequestHandler);

export default router;