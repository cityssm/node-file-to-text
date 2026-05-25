import speechToText from '@cityssm/whisper-speech-to-text';
export default async function audioToText(filePath) {
    return await speechToText(filePath);
}
