// src/utils/scale.js

/**
 * Cria uma escala linear para mapear datas em posições no eixo X.
 * @param {string} startDate - Data inicial (YYYY-MM-DD)
 * @param {string} endDate - Data final (YYYY-MM-DD)
 * @param {number} width - Largura total disponível (em px)
 * @returns {function} - Função que recebe uma data e retorna a posição X
 */
export function createDateScale(startDate, endDate, width) {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const range = end - start;
  
    return function(date) {
      const t = new Date(date).getTime();
      return ((t - start) / range) * width;
    };
  }
  
  /**
   * Calcula a largura de um item no timeline com base em suas datas.
   * @param {Object} item - Objeto com { start, end }
   * @param {function} scale - Função de escala criada em createDateScale
   * @returns {number} - Largura em pixels
   */
  export function getItemWidth(item, scale) {
    return scale(item.end) - scale(item.start);
  }
  