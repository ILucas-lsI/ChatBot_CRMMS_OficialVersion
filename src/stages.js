import {
  initialStage,
  stageOne,
  stageTwo,
  finalStage,
} from './stages/index.js'

import { svs } from './svs.js';

export const stages = [
  {
    descricao: '',
    stage: initialStage,
  },
  {
    descricao: '',
    stage: stageOne,
  },
  {
    descricao: '',
    stage: stageTwo,
  },
  {
    descricao: '',
    stage: finalStage,
  },
]

export function getStage({ from }) {
  if (svs[from]) {
    return svs[from].stage
  }

  svs[from] = {
    stage: 0,
    itens: [],
    address: '',
  }

  return svs[from].stage
}