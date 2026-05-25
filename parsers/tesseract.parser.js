import { createWorker } from 'tesseract.js';
export default async function imageToText(filePath, _options) {
    const worker = await createWorker();
    try {
        const response = await worker.recognize(filePath);
        return response.data.text;
    }
    finally {
        await worker.terminate();
    }
}
