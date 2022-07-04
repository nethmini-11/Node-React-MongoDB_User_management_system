//A bunch of API call to the server (all are async functions)
const AuthService = {
    login: async function(userInfo) {
        const res = await fetch("http://localhost:5000/login",
            {
                method: 'POST',
                body: JSON.stringify(userInfo),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
        if (res.status !== 401)
            return res.json().then(jsonData => jsonData)

        else
            return { isAuthenticated: false, user: { email: "", role: "" } }
        
    },

    register: async function (userInfo) {
        const res = await fetch("http://localhost:5000/register",
            {
                method: 'POST',
                body: JSON.stringify(userInfo),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
        const jsonData = await res.json()
        return jsonData
    },

    logout: async function() {
        const res = await fetch("http://localhost:5000/logout", { credentials: 'include' })
        const jsonData = await res.json()
        return jsonData
    },

    isAuthenticated: async function() {
        const res = await fetch("http://localhost:5000/authenticated", { credentials: 'include' })
        if (res.status !== 401)
            return res.json().then(jsonData => jsonData)

        else
            return { isAuthenticated: false, user: { email: "", role: "" } }
    }
}

export default AuthService