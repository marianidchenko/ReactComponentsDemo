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

export const getOne = async (userId) => {
    const response = await fetch(`${baseUrl}/${userId}`)
    const result = await response.json();

    return result.user;
};

export const create = async (userData) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
    if (response.ok) {
        const result = await response.json();
        return result.user;
    }
    else {
        throw {message: 'Can not create user'}
    }
}

export const update = async (userData, id) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
    const result = await response.json();
    return result.user;
}

export const remove = async (id) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
    });

    const result = await response.json();

    return result;
}