      import db from '../../../database';

      export default async function handler(req, res) {
        const { slide } = req.query;

        if (req.method === 'GET') {
          try {
            const [rows] = await db.query('SELECT * FROM banners WHERE slide_number = ?', [slide]);
            res.status(200).json(rows[0] || {});
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
        } else if (req.method === 'PUT') {
          const { text, image } = req.body;
          try {
            await db.query(
              'INSERT INTO banners (slide_number, text, image) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE text = ?, image = ?',
              [slide, text, image, text, image]
            );
            res.status(200).json({ message: 'Banner updated successfully' });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
        } else if (req.method === 'DELETE') {
          try {
            await db.query('DELETE FROM banners WHERE slide_number = ?', [slide]);
            res.status(200).json({ message: 'Banner deleted successfully' });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
        } else {
          res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
          res.status(405).end(`Method ${req.method} Not Allowed`);
        }
      }
