import db from '../../database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await db.query('SELECT * FROM products WHERE catalog_id IS NOT NULL');
      res.status(200).json({ data: rows });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'PUT') {
    const { products } = req.body;
    try {
      await db.query('UPDATE products SET catalog_id = NULL'); // Reset current product selections
      for (const product of products) {
        await db.query('UPDATE products SET catalog_id = ? WHERE id = ?', [product.catalog_id, product.id]);
      }
      res.status(200).json({ message: 'Products updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
