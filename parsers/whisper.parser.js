import speechToText from '@cityssm/whisper-speech-to-text';
export default async function audioToText(filePath, _options) {
    return await speechToText(filePath);
}
