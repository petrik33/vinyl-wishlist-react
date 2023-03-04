export const moveArrayElement = <T,>(
  array: Array<T>, 
  sourceIdx: number,
  destinationIdx: number
) => {
  let swapDist = Math.abs(destinationIdx - sourceIdx);
  let swapSign = Math.sign(destinationIdx - sourceIdx);
  let position = sourceIdx;
  while(swapDist > 0) {
    const temp = array[position];
    array[position] 
      = array[position + swapSign];
      array[position + swapSign] = temp;
    swapDist--;
  }
}