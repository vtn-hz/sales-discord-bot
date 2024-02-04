const sales = require("../lib/sales/sales")

module.exports = (message, client) => {
    sales.dispatch(message, client)
}