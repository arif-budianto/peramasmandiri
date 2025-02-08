import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  const today = new Date().toISOString().split('T')[0];
  const key = `visitors:${today}`;

  if (request.method === 'GET') {
    try {
      // Get current count from Edge Config
      let count = (await get(key)) || 0;
      count = Number(count) + 1;
      
      return NextResponse.json({ count }, {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
        },
      });
    } catch (error) {
      console.error('Edge Config error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch visitor count' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}