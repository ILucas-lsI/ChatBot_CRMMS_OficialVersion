import { VenomBot } from '../venom.js'
import { menu } from '../menu.js'
import { svs } from '../svs.js'
import { STAGES } from './index.js'

export const stageTwo = {
  async exec(params) {
    const message = params.message.trim();
    const isMsgValid = /[1|2|3|4|5|6|7|8|9|#|*]/.test(message);

    let msg =
      '❌ *Digite uma opção válida, por favor.* \n⚠️ ```APENAS UMA OPÇÃO POR VEZ``` ⚠️'

    if (isMsgValid) {
      if (['#','*'].includes(message)) {
        const option = options[message]();
        msg = option.message;
        svs[params.from].stage = option.nextStage;
        if (message === '*') {
          svs[params.from].itens = [];
        }
      } else {
        msg =
          `✅ *${menu[message].description}*, serviço solicitado com sucesso!\n\n` +
            '```Opções disponíveis:``` \n' +
            menu[message].infos.map(info => `${info.text}: ${info.link}`).join('\n') + menu[message].contacts.map(infocont => `${infocont.text}: ${infocont.link}`).join('\n') +
            '\n-----------------------------------\n # - ```Finalizar atendimento```\n * - ```Ver o menu novamente```\n'
        svs[params.from].itens.push(menu[message])
      }

      if (svs[params.from].stage === STAGES.INICIAL) {
        svs[params.from].itens = []
      }
    }
    await VenomBot.getInstance().sendText({ to: params.from, message: msg })
  },
}

const options = {
  '#': () => { 
    const message = 
      '*Atendimento finalizado.* \n\nPara iniciar um novo atendimento basta enviar uma mensagem.\n';
    return { 
      message, 
      nextStage: STAGES.INICIAL, 
    }; 
  },
  '*': () => {
    const message =
      '*Você foi redirecionado para o menu de serviços.*\n\n' +
      'Por favor, escolha um dos serviços disponíveis:\n\n';

    let serviceOptions = '';
    Object.keys(menu).forEach((value) => {
      if (menu[value] && menu[value].description) {
        serviceOptions += `${numbers[value]} - _${menu[value].description}_\n`;
      }
    });

    return {
      message: message + serviceOptions,
      nextStage: STAGES.SOL_SERV, // Redireciona diretamente para Solicitação de Serviços
    };
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
