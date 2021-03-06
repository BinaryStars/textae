import * as lineHeight from '../../editor/start/View/lineHeight'
import updateLineHeight from './updateLineHeight'
import updateTypeGapEnable from './updateTypeGapEnable'
import updateTypeGapValue from './updateTypeGapValue'

const CONTENT = `
    <div class="textae-editor__setting-dialog">
        <div>
            <label class="textae-editor__setting-dialog__label">Type Gap</label>
            <input type="number" class="textae-editor__setting-dialog__type-gap type-gap" step="1" min="0" max="5">
        </div>
        <div>
            <label class="textae-editor__setting-dialog__label">Line Height</label>
            <input type="number" class="textae-editor__setting-dialog__line-height line-height" step="1" min="50" max="500">
            px
        </div>
    </div>
`

export default function(editor, displayInstance) {
  let $content = $(CONTENT)

  bind($content, editor, displayInstance)

  return $content[0]
}

function bind($content, editor, displayInstance) {
  bindChangeTypeGap(
    $content,
    editor,
    displayInstance
  )

  bindChangeLineHeight(
    $content,
    editor
  )
}

function bindChangeTypeGap($content, editor, displayInstance) {
  let onTypeGapChange = debounce300(
    (e) => {
      displayInstance.changeTypeGap(e.target.value)
      updateLineHeight(editor, $content)
    }
  )

  return $content
    .on(
      'change',
      '.type-gap',
      onTypeGapChange
    )
}

function bindChangeLineHeight($content, editor) {
  let onLineHeightChange = debounce300(
    (e) => {
      lineHeight.set(editor[0], e.target.value)
      redrawAllEditor()
    }
  )

  return $content
    .on(
      'change',
      '.line-height',
      onLineHeightChange
    )
}

// Redraw all editors in tha windows.
function redrawAllEditor() {
  const event = new Event('resize')
  window.dispatchEvent(event)
}

function debounce300(func) {
  return _.debounce(func, 300)
}

function sixteenTimes(val) {
  return val * 16
}
