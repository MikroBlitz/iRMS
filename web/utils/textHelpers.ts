export const getPluralName = (modelName: string): string => {
    if (modelName.endsWith('y')) {
        return modelName.slice(0, -1) + 'ies';
    }
    return modelName.endsWith('s') ? modelName : `${modelName}s`;
};

export const getSingularName = (modelName: string): string => {
    return modelName.endsWith('s') ? modelName.slice(0, -1) : modelName;
};

export const getCapSingularName = (modelName: string): string => {
    const singularModelName = getSingularName(modelName);
    return (
        singularModelName.charAt(0).toUpperCase() + singularModelName.slice(1)
    );
};

export const toTitleCase = (str: string): string => {
    return str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const toCamelCase = (str: string): string => {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w|\s+|[_-])/g, (match, index) =>
            index === 0 ? match.toLowerCase() : match.toUpperCase(),
        )
        .replace(/\s+|[_-]/g, '');
};

export const toBasicDateTime = (isoString: string | Date): string => {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
