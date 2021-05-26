var seeder = require('mongoose-seed');
const config = require('../../config/config')

const connect = () => {
    return new Promise((resolve) => {
        seeder.connect(config.mongourl, function () {
            resolve()
        })
    })
}

const clear = () => {
    return new Promise((resolve) => {
        seeder.clearModels(['Book'], function () {
            resolve()
        })
    })

}

const populate = () => {
    return new Promise((resolve) => {
        seeder.populateModels(data, function () {            
            resolve()
        })
    })
}

exports.reseed = async function () {    
    await connect()
    seeder.loadModels(['model/book.js'])
    await clear()
    await populate()
    seeder.disconnect()    
    return 'Reseed done'
}

const data = [
    {
        'model': 'Book',
        'documents': [
            {
                'title': 'Ulises',
                'author': 'James Joyce',
                'isbn': '123456'
            }
        ]
    }
];