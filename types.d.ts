import type { WhisperOptions } from '@cityssm/whisper-speech-to-text';
import type Tesseract from 'tesseract.js';
export interface FileToTextOptions {
    language?: FileToTextLanguage;
    tesseractOptions?: Partial<Tesseract.RecognizeOptions>;
    whisperOptions?: Partial<WhisperOptions>;
}
export type FileToTextLanguage = 'af' | 'am' | 'ar' | 'as' | 'az' | 'ba' | 'be' | 'bg' | 'bn' | 'bo' | 'br' | 'bs' | 'ca' | 'cs' | 'cy' | 'da' | 'de' | 'el' | 'en' | 'es' | 'et' | 'eu' | 'fa' | 'fi' | 'fo' | 'fr' | 'gl' | 'gu' | 'ha' | 'haw' | 'he' | 'hi' | 'hr' | 'ht' | 'hu' | 'hy' | 'id' | 'is' | 'it' | 'ja' | 'jw' | 'ka' | 'kk' | 'km' | 'kn' | 'ko' | 'la' | 'lb' | 'ln' | 'lo' | 'lt' | 'lv' | 'mg' | 'mi' | 'mk' | 'ml' | 'mn' | 'mr' | 'ms' | 'mt' | 'my' | 'ne' | 'nl' | 'nn' | 'no' | 'oc' | 'pa' | 'pl' | 'ps' | 'pt' | 'ro' | 'ru' | 'sa' | 'sd' | 'si' | 'sk' | 'sl' | 'sn' | 'so' | 'sq' | 'sr' | 'su' | 'sv' | 'sw' | 'ta' | 'te' | 'tg' | 'th' | 'tk' | 'tl' | 'tr' | 'tt' | 'uk' | 'ur' | 'uz' | 'vi' | 'yi' | 'yo' | 'yue' | 'zh';
