import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.all('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use('/assets', express.static('assets'));
app.use('/js', express.static('js'));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
