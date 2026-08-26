export interface RehypeKatexOptions {
  displayMode?: boolean
  output?: "htmlAndMathml" | "html" | "mathml"
  leqno?: boolean
  fleqn?: boolean
  throwOnError?: boolean
  errorColor?: string
  macros?: Record<string, string>
  minRuleThickness?: number
  colorIsTextColor?: boolean
  strict?: boolean | string | ((...args: unknown[]) => unknown)
  trust?: boolean | ((...args: unknown[]) => unknown)
  maxSize?: number
  maxExpand?: number
  globalGroup?: boolean
}

export function rehypeKatex(
  options?: RehypeKatexOptions | null,
): (tree: unknown, file?: unknown) => unknown

export default rehypeKatex
