import speechToText from '@cityssm/whisper-speech-to-text'

import type { FileToTextOptions } from '../types.js'

export default async function audioToText(
  filePath: string,
  options?: FileToTextOptions
): Promise<string> {
  return await speechToText(filePath, {
    language: options?.language,
    ...options?.whisperOptions
  })
}
