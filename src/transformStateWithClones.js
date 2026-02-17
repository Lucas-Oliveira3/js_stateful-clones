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
  // clear => cria um estado de objeto vazio
  // addProperties- adicionar todos key: valueos pares fornecidos na
  // extraDatapropriedade ao novo state;
  // removeProperties- Remover todas as chaves
  // fornecidas na keysToRemovematriz do state. (ignorar chaves inexistentes)

  // Passar os valores da state para meu novo array;
  const listState = [];
  let currentState = { ...state };

  // laço que irá realizar uma varredura em todas as actions
  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties') {
      // Mescla o estado atual com as novas propriedades
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      // Cria uma cópia para manipular
      currentState = { ...currentState };

      action.keysToRemove.forEach((key) => {
        delete currentState[key];
      });
    }
  }
  listState.push({ ...currentState });

  return listState;
}

module.exports = transformStateWithClones;
