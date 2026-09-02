import type {Root} from 'hast'
import type {Plugin} from 'unified'
import rehypeKatex, {type Options} from '@itslil/rehype-katex'

const options: Options = {macros: {'\\RR': '\\mathbb{R}'}, strict: 'ignore'}
const plugin: Plugin<[(Readonly<Options> | null | undefined)?], Root> = rehypeKatex

void options
void plugin
