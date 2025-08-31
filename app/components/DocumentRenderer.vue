<script lang="ts" setup>
  import type { PropType } from 'vue'
  import { h } from 'vue'

  // Keystone document node types
  interface TextNode {
    text: string
    bold?: boolean
    italic?: boolean
    underline?: boolean
    strikethrough?: boolean
    code?: boolean
  }

  interface ElementNode {
    type: string
    children: Array<TextNode | ElementNode>
    href?: string // for links
  }

  type DocumentNode = TextNode | ElementNode

  const props = defineProps({
    document: {
      type: Array as PropType<ElementNode[]>,
      required: true,
    },
  })

  // Render a single text node with formatting
  function renderText (node: TextNode) {
    const parts = node.text.split('\n')
    const nodes = parts.flatMap((part, idx) =>
      idx === 0 ? [part] : [h('br'), part],
    )

    let el: any = nodes

    if (node.bold) {
      el = h('strong', {}, el)
    }
    if (node.italic) {
      el = h('em', {}, el)
    }
    if (node.underline) {
      el = h('u', {}, el)
    }
    if (node.strikethrough) {
      el = h('s', {}, el)
    }
    if (node.code) {
      el = h('code', { class: 'bg-gray-100 px-1 rounded' }, el)
    }

    return el
  }

  // Recursive renderer for elements
  function renderNode (node: DocumentNode): any {
    if ('text' in node) {
      return renderText(node)
    }

    const children = node.children.map(renderNode)

    switch (node.type) {
      case 'paragraph': {
        return h('p', { class: 'mb-4 leading-relaxed' }, children)
      }

      case 'linebreak': { // <-- handle explicit line breaks
        return h('br')
      }

      case 'heading': {
        return h('h2', { class: 'text-2xl font-bold mt-6 mb-3' }, children)
      }

      case 'blockquote': {
        return h('blockquote', { class: 'border-l-4 pl-4 italic my-4' }, children)
      }

      case 'link': {
        return h(
          'a',
          { href: node.href || '#', class: 'text-blue-600 underline' },
          children,
        )
      }

      case 'ul': {
        return h('ul', { class: 'list-disc ml-6 mb-4' }, children)
      }

      case 'ol': {
        return h('ol', { class: 'list-decimal ml-6 mb-4' }, children)
      }

      case 'li': {
        return h('li', {}, children)
      }

      case 'code': {
        return h('pre', { class: 'bg-gray-100 p-3 rounded' }, [
          h('code', {}, children),
        ])
      }

      case 'divider': {
        return h('hr', { class: 'my-6' })
      }

      default: {
        return h('div', {}, children)
      }
    }
  }

</script>

<template>
  <div>
    <component
      :is="renderNode(node)"
      v-for="(node, i) in document"
      :key="i"
    />
  </div>
</template>
