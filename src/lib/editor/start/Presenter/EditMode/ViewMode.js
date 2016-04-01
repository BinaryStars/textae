import Selector from '../../Selector'

export default function(editor, annotationData, selectionModel, buttonStateHelper) {
  const selector = new Selector(editor, annotationData),
    // This notify is off at relation-edit-mode.
    entitySelectChanged = _.compose(buttonStateHelper.updateByEntity, selector.entityLabel.update)

  const api = {
    setTerm() {
      changeCssClass(editor, 'term')
      removeListeners(selectionModel, entitySelectChanged, buttonStateHelper)

      selectionModel
        .on('entity.select', entitySelectChanged)
        .on('entity.deselect', entitySelectChanged)
        .on('entity.change', buttonStateHelper.updateByEntity)
    },
    setInstance() {
      changeCssClass(editor, 'instance')
      removeListeners(selectionModel, entitySelectChanged, buttonStateHelper)

      selectionModel
        .on('entity.select', entitySelectChanged)
        .on('entity.deselect', entitySelectChanged)
        .on('entity.change', buttonStateHelper.updateByEntity)
    },
    setRelation() {
      changeCssClass(editor, 'relation')
      removeListeners(selectionModel, entitySelectChanged, buttonStateHelper)
    }
  }

  return api
}

function changeCssClass(editor, mode) {
  editor
    .removeClass('textae-editor_term-mode')
    .removeClass('textae-editor_instance-mode')
    .removeClass('textae-editor_relation-mode')
    .addClass('textae-editor_' + mode + '-mode')
}

function removeListeners(selectionModel, entitySelectChanged, buttonStateHelper) {
  selectionModel
    .removeListener('entity.select', entitySelectChanged)
    .removeListener('entity.deselect', entitySelectChanged)
    .removeListener('entity.change', entitySelectChanged)
    .removeListener('entity.change', buttonStateHelper.updateByEntity)
}
