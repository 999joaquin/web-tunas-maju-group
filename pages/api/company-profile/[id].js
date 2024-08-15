import db from '../../../database';

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  switch (method) {
    case 'GET':
      try {
        const [rows] = await db.query("SELECT * FROM company_profile WHERE id = ?", [id]);
        if (rows.length === 0) {
          res.status(404).json({ error: 'Company profile not found' });
        } else {
          res.status(200).json({ data: rows[0] });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    case 'PUT':
      const { description, image } = req.body;
      try {
        const [result] = await db.query("UPDATE company_profile SET description = ?, image = ? WHERE id = ?", [description, image, id]);
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Company profile not found' });
        } else {
          res.status(200).json({ message: 'Company profile updated successfully' });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const [result] = await db.query("DELETE FROM company_profile WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Company profile not found' });
        } else {
          res.status(200).json({ message: 'Company profile deleted successfully' });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
