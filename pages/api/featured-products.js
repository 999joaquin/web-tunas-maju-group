import db from '../../database';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { productId } = req.body;
    
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    try {
      // Ensure only 3 products are featured
      const [featuredCount] = await db.query('SELECT COUNT(*) as count FROM featured_products');
      if (featuredCount[0].count >= 3) {
        return res.status(400).json({ error: 'Only 3 products can be featured' });
      }

      // Insert into the featured_products table
      const [result] = await db.query('INSERT INTO featured_products (product_id) VALUES (?)', [productId]);
      return res.status(201).json({ id: result.insertId });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
