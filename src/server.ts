import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
} = process.env;

function main(): void {
  const app = express();

  app.use(express.json());

  app.get('/', (req, res) => console.log('Server is alive!!👾'));

  app.listen(PORT || 3333, () => {
    console.log(`Server is running at https://localhost:${PORT || 3333} 🚀`);
  });
}

main();
