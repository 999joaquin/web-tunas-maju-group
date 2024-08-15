import db from '../../../database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Query to get the featured products from the catalog, limited to 3
      const [rows] = await db.query(`
        SELECT * FROM catalog WHERE featured = 1 LIMIT 3;
      `);
      res.status(200).json({ data: rows });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
