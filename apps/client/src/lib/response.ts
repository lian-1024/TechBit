export const success = <T>(data: T) => {
    return {
        code: 0,
        message: 'success',
        data,
    };
}

export const failed = (message: string) => {
    return {
        code: 1,
        message,
    };
}