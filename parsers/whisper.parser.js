import speechToText from '@cityssm/whisper-speech-to-text';
export default async function audioToText(filePath, options) {
    return await speechToText(filePath, {
        language: options?.language,
        ...options?.whisperOptions
    });
}
