import state from './state'

export default function(stateMachine) {
  return {
    // For an intiation transition on an annotations data loaded.
    toTerm: () => stateMachine.setState(state.TERM),
    toInstance: () => stateMachine.setState(state.INSTANCE),
    toViewTerm: () => stateMachine.setState(state.VIEW_TERM),
    toViewInstance: () => stateMachine.setState(state.VIEW_INSTANCE),
    // For buttan actions.
    pushView: () => pushView(stateMachine),
    pushTerm: () => pushTerm(stateMachine),
    pushRelation: () => stateMachine.setState(state.RELATION),
    pushSimple: () => pushSimple(stateMachine),
    upSimple: () => upSimple(stateMachine),
    // For key input of F or M.
    toggleInstaceRelation: () => toggleInstaceRelation(stateMachine)
  }
}

function pushView(stateMachine) {
  switch (stateMachine.currentState) {
    case state.TERM:
      stateMachine.setState(state.VIEW_TERM)
      break
    case state.INSTANCE:
    case state.RELATION:
      stateMachine.setState(state.VIEW_INSTANCE)
      break
    default:
      // Do nothig.
  }
}

function pushTerm(stateMachine) {
  switch (stateMachine.currentState) {
    case state.RELATION:
    case state.VIEW_INSTANCE:
      stateMachine.setState(state.INSTANCE)
      break
    case state.VIEW_TERM:
      stateMachine.setState(state.TERM)
      break
    default:
      // Do nothig.
  }
}

function pushSimple(stateMachine) {
  switch (stateMachine.currentState) {
    case state.INSTANCE:
      stateMachine.setState(state.TERM)
      break
    case state.VIEW_INSTANCE:
      stateMachine.setState(state.VIEW_TERM)
      break
    default:
      throw new Error(`Invalid state: ${stateMachine.currentState}`)
  }
}

function upSimple(stateMachine) {
  switch (stateMachine.currentState) {
    case state.TERM:
      stateMachine.setState(state.INSTANCE)
      break
    case state.VIEW_TERM:
      stateMachine.setState(state.VIEW_INSTANCE)
      break
    default:
      throw new Error(`Invalid state: ${stateMachine.currentState}`)
  }
}

function toggleInstaceRelation(stateMachine) {
  switch (stateMachine.currentState) {
    case state.INSTANCE:
      stateMachine.setState(state.RELATION)
      break
    case state.RELATION:
      stateMachine.setState(state.INSTANCE)
      break
    default:
      // Do nothig.
  }
}
