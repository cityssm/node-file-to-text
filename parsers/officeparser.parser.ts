import { OfficeConverter } from 'officeparser'

import type { FileToTextOptions } from '../types.js'

export default async function officeToText(
  filePath: string,
  _options?: FileToTextOptions
): Promise<string> {
  const result = await OfficeConverter.convert(filePath, 'md')

  if (typeof result.value === 'string') {
    return result.value
  }

  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  return result.value.toString()
}
