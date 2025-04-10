import { svs } from '../svs.js'
import { VenomBot } from '../venom.js'
import { STAGES } from './index.js'

export const initialStage = {
  async exec({ from }) {
    svs[from].stage = STAGES.MENU

    const venombot = await VenomBot.getInstance()

    const message = `

      👋 Olá, como vai? *Posso te ajudar?* 🙋‍♂️
      Eu sou o Lucas, *assistente virtual* do ${venombot.getSessionName}.
      -----------------------------------

      Por favor, digite um número correspondente as opções abaixo:\n
      1️⃣ - Falar com os setores.\n
      0️⃣ - Falar com um atendente.
    `
    await venombot.sendText({ to: from, message })
  },
}
