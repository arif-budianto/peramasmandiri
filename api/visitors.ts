import { kv } from '@vercel/kv';

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  const today = new Date().toISOString().split('T')[0];
  const key = `visitors:${today}`;

  if (request.method === 'GET') {
    try {
      // Get current count
      let count = await kv.get(key) || 0;
      
      // Increment count for new visit
      await kv.incr(key);
      
      // Set expiry for 24 hours from now
      await kv.expire(key, 24 * 60 * 60);
      
      return new Response(JSON.stringify({ count }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to fetch visitor count' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}