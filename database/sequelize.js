const { Sequelize, DataTypes } = require('sequelize')

/*
 *
 * replace these with stuff from your config, i am 100% sure you can figure out how to do that
 * 
 */

const sequelize = new Sequelize('databaseName', 'databaseUsername', 'databasePassword', {
    host: 'databaseIpOrURL',
    dialect: 'mysql'
})

exports.connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

exports.guilds = sequelize.define('Guild', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    exampleLoggingChannel: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

/*
 *
 * Getting a guild: await client.database.findByPk('guildId')
 * Getting all guilds: await client.database.findAll()
 * Editing a guild: await client.database.update({exampleLoggingChannel: 'whatever'}, {where: {id: 'guildId'}})
 * Adding a guild: await client.database.create({id: 'guildId'})
 * Deleting a guild: await client.database.destroy({where: {id: 'guildId'}})
 * 
 */