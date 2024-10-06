import path from "path";
import fs from 'fs';

export async function openDataJson(fileName: string) {
    const file = path.join(process.cwd(), 'data', fileName);
    const fileData = await fs.promises.readFile(file, 'utf-8');
    const fileJson = JSON.parse(fileData);

    return fileJson
}