import hasPackage from '@cityssm/has-package'

/**
 * The debug namespace for this package.
 */
export const DEBUG_NAMESPACE = 'file-to-text'

/**
 * The debug namespaces string to enable debug output for this package.
 */

let DEBUG_ENABLE_NAMESPACES = `${DEBUG_NAMESPACE}:*`

if (await hasPackage('@cityssm/whisper-speech-to-text')) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  const whisperDebugNamespaces =
    (await import('@cityssm/whisper-speech-to-text/debug')) as {
      DEBUG_ENABLE_NAMESPACES: string
    }

  DEBUG_ENABLE_NAMESPACES += `,${whisperDebugNamespaces.DEBUG_ENABLE_NAMESPACES}`
}

export { DEBUG_ENABLE_NAMESPACES }
