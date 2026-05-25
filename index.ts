import path from 'node:path'

import hasPackage from '@cityssm/has-package'
import Debug from 'debug'
import { lookup as lookupMimeType, mimes } from 'mrmime'

import { DEBUG_NAMESPACE } from './debug.config.js'
import type { FileToTextOptions } from './types.js'

const debug = Debug(`${DEBUG_NAMESPACE}:index`)

const officeParserMimeTypes = new Set([
  'application/msword',
  'application/pdf',
  'application/rtf',
  'application/vnd.ms-excel',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/html',
  'text/rtf'
])

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
mimes.docx ??=
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

const hasOfficeParser = await hasPackage('officeparser')
const hasWhisper = await hasPackage('@cityssm/whisper-speech-to-text')
const hasTesseract = await hasPackage('tesseract.js')

/**
 * Converts a file to text using the appropriate parser based on the file type.
 * @param filePath - The path to the file to be converted to text.
 * @param options - Optional settings for the conversion process, such as language preferences.
 * @returns A promise that resolves to the extracted text from the file.
 */
export default async function fileToText(
  filePath: string,
  options?: FileToTextOptions
): Promise<string> {
  debug('Processing file: %s', filePath)

  const fileName = path.basename(filePath)
  const mimeType = lookupMimeType(fileName)

  debug('Determined MIME type: %s', mimeType)

  if (mimeType === undefined) {
    throw new Error(`Unable to determine MIME type for file: ${filePath}`)
  } else if (officeParserMimeTypes.has(mimeType) && hasOfficeParser) {
    try {
      const { default: officeToText } =
        await import('./parsers/officeparser.parser.js')

      return await officeToText(filePath)
    } catch (error) {
      throw new Error('Error processing file with "officeparser".', {
        cause: error
      })
    }
  } else if (mimeType.startsWith('audio/') && hasWhisper) {
    try {
      const { default: speechToText } =
        await import('./parsers/whisper.parser.js')

      return await speechToText(filePath)
    } catch (error) {
      throw new Error(
        'Error processing audio file with "@cityssm/whisper-speech-to-text".',
        { cause: error }
      )
    }
  } else if (mimeType.startsWith('image/') && hasTesseract) {
    try {
      const { default: imageToText } =
        await import('./parsers/tesseract.parser.js')

      return await imageToText(filePath, options)
    } catch (error) {
      throw new Error('Error processing image file with "tesseract.js".', {
        cause: error
      })
    }
  } else if (mimeType.startsWith('text/')) {
    try {
      const fs = await import('node:fs/promises')
      return await fs.readFile(filePath, 'utf8')
    } catch (error) {
      throw new Error('Error reading text file.', { cause: error })
    }
  }

  throw new Error(`Error parsing file: ${filePath}`, {
    cause: {
      filePath,
      mimeType,

      hasOfficeParser,
      hasTesseract,
      hasWhisper
    }
  })
}
