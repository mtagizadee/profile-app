export const NotFoundException = () => {
    const error = new Error('Data is not found');
    error.name = '404';
    return error
}