
/**
 * Joins all the string items of an array with comma between then and "and" on the last item
 * @param {*} arr 
 */
export const strJoinAnd = (arr) => {
    return [arr.slice(0, -1).join(', '), arr.slice(-1)[0]].join(arr.length < 2 ? '' : ' and ');
}