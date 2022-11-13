// const apiKey = "79e1d640a73a4ff2a99cfd23d81622a3"
// const apiKey = "b0b56a6c3140436dace9811e16503480"
const apiKey = "79e1d640a73a4ff2a99cfd23d81622a3"

export const Links = {
    News: (q, year, month, day, sortBy) => {
        if (q == "") {
            q = "Restaurants"
        }
        if (sortBy == "") {
            sortBy = "publishedAt"
        }
        return `https://newsapi.org/v2/everything?q=${q}&from=${year}-${month}-${day}&sortBy=${sortBy}&apiKey=${apiKey}`
    }
}