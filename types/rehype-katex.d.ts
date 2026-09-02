import type {Root} from 'hast'
import type {KatexOptions} from 'katex'
import type {VFile} from 'vfile'

export type Options = Omit<KatexOptions, 'displayMode' | 'throwOnError'>

declare function rehypeKatex(
  options?: Readonly<Options> | null | undefined
): (tree: Root, file: VFile) => undefined

export default rehypeKatex
