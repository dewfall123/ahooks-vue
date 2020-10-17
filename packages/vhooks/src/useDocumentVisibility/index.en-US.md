# useDocumentVisibility

A Hook can tell if the page is visible.

[visibilityState API](https://developer.mozilla.org/docs/Web/API/Document/visibilityState)

## Examples

### Basic usage

<demo src="./demo/demo.vue"
  language="vue"
  title="Basic Usage"
  desc="Listen to document visibility change.">
</demo>

### 参数

| 参数               |                                 说明 |   类型 |                                                值 |
| ------------------ | -----------------------------------: | -----: | ------------------------------------------------: |
| documentVisibility | Determine if the document is visible | string | 'visible' \| 'hidden' \| 'prerender' \| undefined |
