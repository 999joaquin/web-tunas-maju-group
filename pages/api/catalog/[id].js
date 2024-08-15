import db from '../../../database';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name, description, image, featured } = req.body;

    // Ensure that at least one field is provided
    if (!name && !description && !image && featured === undefined) {
      return res.status(400).json({ error: 'At least one field (name, description, image, or featured) must be provided.' });
    }

    try {
      // If `featured` is being set, check the current number of featured products
      if (featured === 1) {
        const [featuredCount] = await db.query('SELECT COUNT(*) as count FROM catalog WHERE featured = 1');
        if (featuredCount[0].count >= 3) {
          return res.status(400).json({ error: 'You can only feature up to 3 products.' });
        }
      }

      // Update the product in the database
      const [result] = await db.query(
        'UPDATE catalog SET name = COALESCE(?, name), description = COALESCE(?, description), image = COALESCE(?, image), featured = ? WHERE id = ?',
        [name, description, image, featured ? 1 : 0, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Product not found.' });
      }

      res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
