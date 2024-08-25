// pages/api/logout.ts
'use client';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${req.cookies.token}`, // Certifique-se de que o token esteja sendo passado corretamente
      },
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch {
    res.status(500).json({ message: 'Failed to logout' });
  }
}
