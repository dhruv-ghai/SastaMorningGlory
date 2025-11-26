import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from '../config/db.js';
import { Article } from '../models/Article.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const run = async () => {
  try {
    await connectDB();
    const filePath = path.join(__dirname, '..', 'data', 'demoArticles.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const articles = JSON.parse(raw);

    await Article.deleteMany();
    await Article.insertMany(articles);
    console.log(`Seeded ${articles.length} articles`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

run();

