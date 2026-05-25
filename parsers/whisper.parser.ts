import speechToText from '@cityssm/whisper-speech-to-text'

export default async function audioToText(filePath: string): Promise<string> {
  return await speechToText(filePath)
}
