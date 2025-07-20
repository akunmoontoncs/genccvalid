import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { content } = req.body;
    if (typeof content !== 'string') {
      res.status(400).json({ message: 'Invalid content' });
      return;
    }
    const filePath = path.join(process.cwd(), 'public', 'cc.txt');
    fs.writeFile(filePath, content, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to cc.txt:', err);
        res.status(500).json({ message: 'Gagal untuk menyimpan' });
        return;
      }
      res.status(200).json({ message: 'Berhasil di simpan' });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
