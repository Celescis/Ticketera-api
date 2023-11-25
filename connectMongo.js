const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_URI)
        console.log('MongoDB se conecto!')
    } catch (error) {
        console.log('No se pudo conectar' + error.message)
    }
}

module.exports = connect