import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'stores.json');

// Функция для чтения данных из файла
const readStores = () => {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Функция для записи данных в файл
const writeStores = (stores) => {
  fs.writeFileSync(dataFile, JSON.stringify(stores, null, 2));
};

export default function handler(req, res) {
  if (req.method === 'GET') {
    const stores = readStores();
    res.status(200).json(stores);
  } 
  else if (req.method === 'POST') {
    const stores = readStores();
    const newStore = {
      id: Date.now(),
      ...req.body
    };
    stores.push(newStore);
    writeStores(stores);
    res.status(201).json(newStore);
  }
}