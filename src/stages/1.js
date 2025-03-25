import { VenomBot } from '../venom.js'
import { menu } from '../menu.js'
import { svs } from '../svs.js'
import { initialStage } from './0.js'
import { STAGES } from './index.js'

export const stageOne = {
  async exec(params) {
    const message = params.message.trim()
    const isMsgValid = /[0|1]/.test(message)

    let msg =
      '❌ *Digite uma opção válida, por favor.* \n⚠️ ```APENAS UMA OPÇÃO POR VEZ``` ⚠️'

    if (isMsgValid) {
      const option = options[Number(message)]()
      msg = option.message
      svs[params.from].stage = option.nextStage || STAGES.INICIAL
    }

    await VenomBot.getInstance().sendText({ to: params.from, message: msg })

    if (svs[params.from].stage === STAGES.INICIAL) {
      await initialStage.exec(params)
    } else if (svs[params.from].stage === STAGES.FALAR_COM_ATENDENTE) {
      svs[params.from].finalStage = {
        startsIn: new Date().getTime(),
        endsIn: new Date().setSeconds(60), // 1 minute of inactivity
      }
    }
  },
}

const options = {
  1: () => {
    let message = 'Solicitação de serviços.\n\n' + 'Caso deseje *cancelar* digite "#".\n\n' + 'Por favor, digite um número correspondente as opções abaixo:\n'

    Object.keys(menu).forEach((value) => {
      message += `${numbers[value]} - _${menu[value].description}_ \n`
    })

    return {
      message,
      nextStage: STAGES.SOL_SERV,
    }
  },
  
  0: () => {
    return {
      message:
        'Encaminhando você para um atendente. \n⏳ *Aguarde um instante*.\n \n⚠️ A qualquer momento, digite *ENCERRAR* para encerrar o atendimento. ⚠️ \n \n*⚠️ Atenção ⚠️*\n\nEste contato é apenas um serviço automatizado, o atendente físico irá lhe responder em:\n*https://wa.me/qr/SF52TZCXSO5DN1*\n\n*Obrigado por entar em contato.*',
      nextStage: STAGES.FALAR_COM_ATENDENTE,
    }
  },
}
const numbers = {
  1: '1️⃣',
  2: '2️⃣',
  3: '3️⃣',
  4: '4️⃣',
  5: '5️⃣',
  6: '6️⃣',
  7: '7️⃣',
  8: '8️⃣',
  9: '9️⃣',
}