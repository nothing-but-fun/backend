import { db } from "../config/db";
import { events } from "../db/schema/events";
import { eq, lt, gte } from "drizzle-orm";

type newEvent = typeof events.$inferInsert;
// 事件服务类
export class EventService {
  // 获取所有事件，可以通过isHistorical参数筛选历史事件或未来事件
  async getAllEvents(isHistorical?: boolean) {
    try {
      const currentDate = new Date();

      // 如果isHistorical有值，根据事件是否历史进行筛选
      if (isHistorical !== undefined) {
        return isHistorical
          ? // 历史事件：开始时间早于当前时间
            await db
              .select()
              .from(events)
              .where(lt(events.startTime, currentDate.toISOString()))
          : // 未来事件：开始时间晚于或等于当前时间
            await db
              .select()
              .from(events)
              .where(gte(events.startTime, currentDate.toISOString()));
      }

      // 如果没有指定，返回所有事件
      return await db.select().from(events);
    } catch (error) {
      console.error("获取事件失败:", error);
      throw error;
    }
  }

  // 通过ID获取事件
  async getEventById(id: number) {
    try {
      const result = await db.select().from(events).where(eq(events.id, id));
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error(`获取事件ID ${id} 失败:`, error);
      throw error;
    }
  }

  // 获取组织者的所有事件
  async getEventsByOrganizerId(organizerId: number) {
    try {
      return await db
        .select()
        .from(events)
        .where(eq(events.organizerId, organizerId));
    } catch (error) {
      console.error(`获取组织者ID ${organizerId} 的事件失败:`, error);
      throw error;
    }
  }

  // 创建新事件
  async createEvent(eventData: newEvent) {
    try {
      const result = await db.insert(events).values(eventData).returning();
      return result[0];
    } catch (error) {
      console.error("创建事件失败:", error);
      throw error;
    }
  }

  // 更新事件
  async updateEvent(id: number, eventData: Partial<newEvent>) {
    try {
      const result = await db
        .update(events)
        .set(eventData)
        .where(eq(events.id, id))
        .returning();
      return result[0];
    } catch (error) {
      console.error(`更新事件ID ${id} 失败:`, error);
      throw error;
    }
  }

  // 删除事件
  async deleteEvent(id: number) {
    try {
      return await db.delete(events).where(eq(events.id, id)).returning();
    } catch (error) {
      console.error(`删除事件ID ${id} 失败:`, error);
      throw error;
    }
  }
}
