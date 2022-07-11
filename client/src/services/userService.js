const baseUrl = 'http://localhost:3005/api/users';

export const getAll = async () => {
    const response = await fetch(baseUrl);
    const result = await response.json()
    return result.users;
}

export const getUserById = async (id) => {
    const response = await fetch(baseUrl + "/" + id);
    const result = await response.json()
    return result.user;
}