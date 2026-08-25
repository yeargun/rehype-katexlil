export interface RehypeKatexOptions {
  displayMode?: boolean
  throwOnError?: boolean
  errorColor?: string
}

export function rehypeKatex(
  options?: RehypeKatexOptions,
): (tree: unknown, file?: unknown) => unknown

export default rehypeKatex
