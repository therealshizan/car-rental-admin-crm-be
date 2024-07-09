import { v4 as uuidv4 } from 'uuid';

type idType = 'user' | 'driver' | 'booking' | 'invoice';

export function generateId(type: idType): string {
  const uuid = uuidv4().replace(/-/g, '');
  return `${type}_${uuid}`;
}
