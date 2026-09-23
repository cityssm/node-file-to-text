import { createWorker } from 'tesseract.js'

import type { FileToTextLanguage, FileToTextOptions } from '../types.js'

const LANGUAGE_CODE_MAP: Partial<Record<FileToTextLanguage, string>> = {
  af: 'afr',
  am: 'amh',
  ar: 'ara',
  as: 'asm',
  az: 'aze',
  ba: 'bak',
  be: 'bel',
  bg: 'bul',
  bn: 'ben',
  bo: 'bod',
  br: 'bre',
  bs: 'bos',
  ca: 'cat',
  cs: 'ces',
  cy: 'cym',
  da: 'dan',
  de: 'deu',
  el: 'ell',
  en: 'eng',
  es: 'spa',
  et: 'est',
  eu: 'eus',
  fa: 'fas',
  fi: 'fin',
  fo: 'fao',
  fr: 'fra',
  gl: 'glg',
  gu: 'guj',
  ha: 'hau',
  haw: 'haw',
  he: 'heb',
  hi: 'hin',
  hr: 'hrv',
  ht: 'hat',
  hu: 'hun',
  hy: 'hye',
  id: 'ind',
  is: 'isl',
  it: 'ita',
  ja: 'jpn',
  jw: 'jav',
  ka: 'kat',
  kk: 'kaz',
  km: 'khm',
  kn: 'kan',
  ko: 'kor',
  la: 'lat',
  lb: 'ltz',
  ln: 'lin'
}

export default async function imageToText(
  filePath: string,
  options?: FileToTextOptions
): Promise<string> {
  const workerLanguage =
    options?.language === undefined || !(options.language in LANGUAGE_CODE_MAP)
      ? undefined
      : LANGUAGE_CODE_MAP[options.language]

  const worker = await createWorker(workerLanguage)

  const tesseractOptions: Partial<Tesseract.RecognizeOptions> =
    options?.tesseractOptions ?? {}

  try {
    const response = await worker.recognize(filePath, tesseractOptions)
    return response.data.text
  } finally {
    await worker.terminate()
  }
}
