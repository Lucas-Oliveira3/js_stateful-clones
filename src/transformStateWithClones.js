'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  /*
  state => Objeto
  actions => array
  O objetivo é aplicar cada ação ao estado anterios e retornar um array
  com a modificação.
  */
  // addProperties- adicionar todos key: valueos pares fornecidos na
  // extraDatapropriedade ao novo state;
  // removeProperties- Remover todas as chaves
  // fornecidas na keysToRemovematriz do state. (ignorar chaves inexistentes)

  const history = [];
  // Começamos com um clone para garantir a imutabilidade do original
  let currentState = { ...state };

  // laço que irá realizar uma varredura em todas as actions
  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        // clear => cria um estado de objeto vazio
        currentState = {};
        break;
      case 'addProperties':
        // Mescla o estado atual com as novas propriedades
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        // Cria uma cópia para manipular
        currentState = { ...currentState };

        action.keysToRemove.forEach((key) => delete currentState[key]);
        break;
      default:
        // Caso venha um tipo desconhecido, mantém o estado atual
        break;
    }
    // O "pulo do gato": Salva um NOVO clone no histórico.
    // Se der push apenas em 'currentState', todos os passos do array
    // apontariam para o mesmo objeto final (referência).
    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
