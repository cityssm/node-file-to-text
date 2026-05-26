import { OfficeConverter } from 'officeparser';
const config = {
    generatorConfig: {
        renderMetadata: false
    }
};
const metadataBlockBounds = '---\n';
export default async function officeToText(filePath, _options) {
    const result = await OfficeConverter.convert(filePath, 'md', config);
    let resultValue = 
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    typeof result.value === 'string' ? result.value : result.value.toString();
    // Remove metadata block if it exists
    if (resultValue.startsWith(metadataBlockBounds)) {
        const endOfMetadataIndex = resultValue.indexOf(metadataBlockBounds, metadataBlockBounds.length);
        if (endOfMetadataIndex !== -1) {
            resultValue = resultValue.slice(endOfMetadataIndex + metadataBlockBounds.length);
        }
    }
    resultValue = resultValue.trim();
    // Remove additional metadata block bound if it exists
    if (resultValue.startsWith(metadataBlockBounds)) {
        resultValue = resultValue.slice(metadataBlockBounds.length).trim();
    }
    return resultValue;
}
