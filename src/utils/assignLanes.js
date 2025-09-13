/**
 * Takes an array of items and assigns them to lanes based on start/end dates.
 * @param {Array} items - Array of objects with { id, name, start, end }
 * @returns {Array[]} - Array of lanes, each lane is an array of items
 */
export function assignLanes(items) {
  // Ordena os itens pelo start date
  const sortedItems = [...items].sort((a, b) =>
    new Date(a.start) - new Date(b.start)
  );

  const lanes = [];

  function assignItemToLane(item) {
    for (const lane of lanes) {
      // Verifica se o último item da lane termina antes do novo item começar
      if (new Date(lane[lane.length - 1].end) < new Date(item.start)) {
        lane.push(item);
        return;
      }
    }
    // Se não couber em nenhuma lane, cria uma nova
    lanes.push([item]);
  }

  for (const item of sortedItems) {
    assignItemToLane(item);
  }

  return lanes;
}