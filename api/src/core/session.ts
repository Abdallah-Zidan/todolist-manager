import {v4 as uuid} from 'uuid';
import redis from './redis';

export class SessionManager {
  newSessionId(){
    return uuid();
  }
  async saveSession(data: unknown, expiryInSeconds?: number) {
    const sessionId = uuid();
    if (expiryInSeconds)
      await redis.set(sessionId, JSON.stringify(data), 'EX', expiryInSeconds);
    else
      await redis.set(sessionId, JSON.stringify(data));
    return sessionId;
  }

  async getSession(sessionId: string) {
    const session = await redis.get(sessionId);
    return session ? JSON.parse(session) : null;
  }

  async deleteSession(sessionId: string) {
    return redis.del(sessionId);
  }
}

export default new SessionManager();
