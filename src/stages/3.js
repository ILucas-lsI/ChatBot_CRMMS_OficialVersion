
import { VenomBot } from '../venom.js'
import { svs } from '../svs.js'
import { STAGES } from './index.js'

export const finalStage = {
  async exec({ from, message }) {
    const msg = message.trim().toUpperCase()

    const currentDate = new Date()
    const history = svs[from].finalStage

    if (history.endsIn < currentDate.getTime() || msg == 'ENCERRAR') {
      svs[from].stage = STAGES.INICIAL
      return VenomBot.getInstance().sendText({
        to: from,
        message: '*Atendimento encerrado pelo usuário e/ou por inatividade, obrigado por entrar em contato!*',
      });
    } else{
      message = 'Por favor aguarde...'
    };
    svs[from].finalStage.endsIn = new Date().setSeconds(60) // more 1 minute of inactivity
  },
}

