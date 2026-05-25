import type { FileToTextOptions } from './types.js';
/**
 * Converts a file to text using the appropriate parser based on the file type.
 * @param filePath - The path to the file to be converted to text.
 * @param options - Optional settings for the conversion process, such as language preferences.
 * @returns A promise that resolves to the extracted text from the file.
 */
export default function fileToText(filePath: string, options?: FileToTextOptions): Promise<string>;
export type { FileToTextOptions } from './types.js';
