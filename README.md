# Node File to Text

**Converts most common file types into clean text or Markdown.**

## Installation

Include all available parsers.

```bash
npm install @cityssm/file-to-text
```

Base installation. Parsers can be installed as needed.

```bash
npm install @cityssm/file-to-text --no-optional
```

## Available Parsers

⭐ Only plain text parsing is available out-of-the-box. ⭐

All parsers are considered **optional dependencies** so you can choose which
parsers to include.

### Office Files

Support for Office files (i.e. docx, pdf, pptx) relies on
[`officeparser`](https://www.npmjs.com/package/officeparser).

### Image Files

Support for image files (i.e. jpg, png, gif) relies on
[`tesseract.js`](https://www.npmjs.com/package/tesseract.js).

### Audio Files

Support for audio file transcriptions (i.e. wav, mp3) relies on
[`@cityssm/whisper-speech-to-text`](https://www.npmjs.com/package/@cityssm/whisper-speech-to-text).
See the package prerequisites, which include Python, FFmpeg, and OpenAI Whisper.
