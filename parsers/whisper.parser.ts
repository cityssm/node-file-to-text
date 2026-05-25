import speechToText from '@cityssm/whisper-speech-to-text'

import type { FileToTextOptions } from '../types.js'

export default async function audioToText(
  filePath: string,
  _options?: FileToTextOptions
): Promise<string> {
  return await speechToText(filePath)
}
