export const updateObjectInArray = (items, objectPropName, itemId, newObjProps) => {
    return items.map(i => {
        if(i[objectPropName] === itemId) {
            return {...i, ...newObjProps}
        }
        return i
    })
}