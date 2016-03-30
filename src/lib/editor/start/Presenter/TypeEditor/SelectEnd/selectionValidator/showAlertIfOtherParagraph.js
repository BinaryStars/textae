import deferAlert from '../deferAlert'

export default function(selection) {
  if (isInSameParagraph(selection)) {
    return true
  }

  deferAlert('It is ambiguous for which span you want to adjust the boundary. Select the span, and try again.')
  return false
}

function isInSameParagraph(selection) {
  var anchorParagraphId = getParagraphId(selection.anchorNode),
    focusParagraphId = getParagraphId(selection.focusNode)

  return anchorParagraphId === focusParagraphId
}

function getParagraphId(node) {
  return node.parentNode.closest('.textae-editor__body__text-box__paragraph').id
}
