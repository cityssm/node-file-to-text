import { OfficeConverter } from 'officeparser'

export default async function officeToText(filePath: string): Promise<string> {
  const result = await OfficeConverter.convert(filePath, 'md')

  if (typeof result.value === 'string') {
    return result.value
  }

  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  return result.value.toString()
}
