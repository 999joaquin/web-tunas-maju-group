import db from '../../database';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const [rows] = await db.query("SELECT * FROM company_profile");
        res.status(200).json({ data: rows });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    case 'POST':
      const { description, image } = req.body;
      try {
        const [result] = await db.query("INSERT INTO company_profile (description, image) VALUES (?, ?)", [description, image]);
        res.status(201).json({ id: result.insertId });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
