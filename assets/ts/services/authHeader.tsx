const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'X-Bearer-Token': user.token };
    } else {
        return {};
    }
}

export default authHeader;