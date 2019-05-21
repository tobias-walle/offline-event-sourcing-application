/** Use jsonbin as a simple persistence service. In a real application this should be a database. */
import axios from 'axios';
import { Event } from '../../shared/events/event';

const jsonBinUrl = 'https://api.jsonbin.io/b/5ce44efadbffad51f8ad0ee4';

interface JsonBin {
  todoEvents: Event[];
}

export function getFromJsonBin(): Promise<JsonBin> {
  return axios.get(`${jsonBinUrl}/latest`).then(response => response.data);
}

export async function saveToJsonBin(data: JsonBin): Promise<void> {
  await axios.put(jsonBinUrl, data);
}
