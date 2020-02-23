import axios from './util/axios';

export async function getDrawing(id) {
  try {
    const res = await axios.get(`/api/drawing/${id}`);
    if (!res || !res.data || !res.data.success) throw new Error('Failed to download drawing');
    return res.data.drawData;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default getDrawing;
