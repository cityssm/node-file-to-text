import { createWorker } from 'tesseract.js'

import type { FileToTextOptions } from '../types.js'

export default async function imageToText(
  filePath: string,
  options?: FileToTextOptions
): Promise<string> {
  const worker = await createWorker()

  try {
    const response = await worker.recognize(filePath)
    return response.data.text
  } finally {
    await worker.terminate()
  }
}
