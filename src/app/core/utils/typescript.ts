//Importaciones aquí

export const isNullOrEmpty = (arg: any) => {
    if (arg !== null && typeof (arg) === "object") {
        if (typeof arg.getMonth === 'function') {
            return false;
        }
        return Object.keys(arg).length === 0;
    }
    return arg === undefined || arg === null || arg === '';
};