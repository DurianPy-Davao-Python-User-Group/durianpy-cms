import fs from 'fs'
import path from 'path'
import { COLLECTION_GROUPS } from '@/constants/collections'

import type { Endpoint } from 'payload'

import { getCollectionGroupItems } from '@/constants/collections'

const GROUP_SLUG = COLLECTION_GROUPS.DURIANPY_WEBSITE

function getCommentStartBefore(content: string, index: number): number {
  const commentEnd = content.lastIndexOf('*/', index)
  if (commentEnd === -1) return index

  const commentStart = content.lastIndexOf('/**', commentEnd)
  if (commentStart === -1) return index

  const between = content.slice(commentEnd + 2, index)
  return /^\s*$/.test(between) ? commentStart : index
}

function extractInterfaceBlock(content: string, interfaceName: string): string | null {
  const declaration = `export interface ${interfaceName}`
  const declarationIndex = content.indexOf(declaration)

  if (declarationIndex === -1) return null

  const startIndex = getCommentStartBefore(content, declarationIndex)
  const braceStart = content.indexOf('{', declarationIndex)

  if (braceStart === -1) return null

  let braceDepth = 0
  for (let i = braceStart; i < content.length; i += 1) {
    const char = content[i]

    if (char === '{') braceDepth += 1
    if (char === '}') braceDepth -= 1

    if (braceDepth === 0) {
      return content.slice(startIndex, i + 1)
    }
  }

  return null
}

function getCollectionTypeMapFromConfig(typesFileContent: string): Map<string, string> {
  const map = new Map<string, string>()
  const collectionsBlockMatch = typesFileContent.match(/collections:\s*\{([\s\S]*?)\n\s*\};/)

  if (!collectionsBlockMatch) return map

  const collectionsBlock = collectionsBlockMatch[1]
  const collectionEntryRegex = /^\s*(?:'([^']+)'|([A-Za-z0-9_-]+)):\s*([A-Za-z0-9_]+);\s*$/gm

  let entryMatch: RegExpExecArray | null
  while ((entryMatch = collectionEntryRegex.exec(collectionsBlock)) !== null) {
    const slug = entryMatch[1] ?? entryMatch[2]
    const typeName = entryMatch[3]

    if (!slug || !typeName) continue
    map.set(slug, typeName)
  }

  return map
}

export const durianpyWebsiteTypesEndpoint: Endpoint = {
  method: 'get',
  path: '/durianpy-website-types',
  handler: async () => {
    try {
      const fullTypes = fs.readFileSync(
        path.resolve(process.cwd(), 'src/payload-types.ts'),
        'utf-8',
      )

      const groupCollectionSlugs = [...getCollectionGroupItems(GROUP_SLUG)].sort((a, b) =>
        a.localeCompare(b),
      )

      const collectionTypeMap = getCollectionTypeMapFromConfig(fullTypes)

      const missingTypeMappings: string[] = []
      const selectedTypeNames = groupCollectionSlugs
        .map((slug) => {
          const typeName = collectionTypeMap.get(slug)
          if (!typeName) missingTypeMappings.push(slug)
          return typeName
        })
        .filter((name): name is string => Boolean(name))

      if (missingTypeMappings.length > 0) {
        return new Response(
          JSON.stringify({
            error: 'Missing collection to type mappings in payload-types.ts',
            group: GROUP_SLUG,
            missingCollectionSlugs: missingTypeMappings,
          }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          },
        )
      }

      const missingInterfaceBlocks: string[] = []
      const extractedInterfaces = selectedTypeNames
        .map((typeName) => {
          const block = extractInterfaceBlock(fullTypes, typeName)
          if (!block) missingInterfaceBlocks.push(typeName)
          return block
        })
        .filter((block): block is string => Boolean(block))

      if (missingInterfaceBlocks.length > 0) {
        return new Response(
          JSON.stringify({
            error: 'Could not extract one or more interfaces from payload-types.ts',
            group: GROUP_SLUG,
            missingInterfaces: missingInterfaceBlocks,
          }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          },
        )
      }

      const typeSyncHeader = `// Auto-generated from src/payload-types.ts\n// Group: ${GROUP_SLUG}\n// Collections: ${groupCollectionSlugs.join(', ')}`
      const payload = `${typeSyncHeader}\n\n${extractedInterfaces.join('\n\n')}`

      return new Response(payload, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-store',
        },
      })
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: 'Failed to generate durianpy-website type sync payload',
          message: error instanceof Error ? error.message : 'Unknown error',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }
  },
}
