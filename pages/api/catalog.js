// pages/api/catalog.js
import db from '../../database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await db.query('SELECT * FROM catalog');
      res.status(200).json({ data: rows });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
    const { name, description, image } = req.body;
    try {
      const [result] = await db.query(
        'INSERT INTO catalog (name, description, image) VALUES (?, ?, ?)',
        [name, description, image]
      );
      res.status(200).json({ message: 'Product added successfully', productId: result.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
