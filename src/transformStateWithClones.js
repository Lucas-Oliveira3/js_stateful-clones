'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const history = [];
  // Começamos com um clone para garantir a imutabilidade do original
  let stateCopy = { ...state };

  // assegurando actions
  // eslint-disable-next-line no-param-reassign
  actions = Array.isArray(actions) ? actions : [];

  // laço que irá realizar uma varredura em todas as actions
  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        // clear => cria um estado de objeto vazio
        stateCopy = {};
        break;
      case 'addProperties':
        // validando a existencia de actions e verificando se é um objeto
        if (action.extraData && typeof action.extraData === 'object') {
          // Mesclando o estado atual com as novas propriedades
          stateCopy = { ...stateCopy, ...action.extraData };
        }
        break;
      case 'removeProperties':
        // Verificando se a chave é do tipo array
        if (Array.isArray(action.keysToRemove)) {
          // Cria uma cópia do objeto para manipular
          stateCopy = { ...stateCopy };

          // pegandok a chave e percorrendo o array
          action.keysToRemove.forEach((key) => {
            if (key in stateCopy) {
              // deletando a chave do objeto manipulado
              delete stateCopy[key];
            }
          });
        }
        break;
      default:
    }

    /**
     * Salvando o objeto modificado em um novo array garantindo a imutabilidade
     do state  original!
     */
    history.push({ ...stateCopy });
  }

  return history;
}

module.exports = transformStateWithClones;

/*
      Informações sobre a atividade
  state => Objeto
  actions => array
  O objetivo é aplicar cada ação ao estado anterios e retornar um array
  com a modificação.
  * addProperties- adicionar todos key: valueos pares fornecidos na
  * extraDatapropriedade ao novo state;
  * removeProperties- Remover todas as chaves
  * fornecidas na keysToRemovematriz do state. (ignorar chaves inexistentes)
*/
