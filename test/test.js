/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
import assert from 'node:assert';
import { describe } from 'node:test';
import Debug from 'debug';
import { DEBUG_ENABLE_NAMESPACES } from '../debug.config.js';
import fileToText from '../index.js';
Debug.enable(DEBUG_ENABLE_NAMESPACES);
await describe('file-to-text', async () => {
    const supportedSampleFiles = [
        'sample.docx',
        'sample.md',
        'sample.pdf',
        'sample.png',
        'sample.txt',
        'sample.wav'
        // 'private.docx'
    ];
    const unsupportedSampleFiles = ['unsupported.bin'];
    for (const fileName of supportedSampleFiles) {
        await describe(`should process "${fileName}" correctly`, async () => {
            const filePath = `./test/samples/${fileName}`;
            try {
                const text = await fileToText(filePath);
                console.log(`Text output for ${fileName}:\n${text}\n`);
                assert.ok(text.length > 0, `Expected non-empty text output for ${fileName}`);
                assert.ok(text.includes('sample'), `Expected text output to include "sample" for ${fileName}`);
            }
            catch (error) {
                console.error(`Error processing ${fileName}:`, error);
                assert.fail(`Failed to process ${fileName}: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    for (const fileName of unsupportedSampleFiles) {
        await describe(`should throw an error for unsupported file "${fileName}"`, async () => {
            const filePath = `./test/samples/${fileName}`;
            try {
                await fileToText(filePath);
                assert.fail(`Expected an error to be thrown for ${fileName}`);
            }
            catch (error) {
                assert.ok(error instanceof Error, `Expected an Error to be thrown for ${fileName}`);
                assert.ok(error.message.includes('Error parsing file'), `Expected error message to indicate unsupported file type for ${fileName}`);
            }
        });
    }
});
