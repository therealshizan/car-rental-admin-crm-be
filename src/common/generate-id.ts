import { v4 as uuidv4 } from 'uuid';

type idType = 'user' | 'driver' | 'booking' | 'invoice';

export function generateId(type: idType): string {
  return `${type}_${uuidv4()}`;
}
