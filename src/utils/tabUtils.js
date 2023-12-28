export const createTab = (label, key, children) => {
    return (
        {
            key: key,
            label: label,
            children: children
        }
    )
}