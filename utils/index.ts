import path from 'node:path';
import fs from 'node:fs/promises';
import { IProduct } from '@/pages/products/[productId]';

export const getProducts = async (): Promise<IProduct[]> => {
    const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
    const jsonString = await fs.readFile(filePath, { encoding: 'utf-8' });
    return JSON.parse(jsonString);
}