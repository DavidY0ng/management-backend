import pkg from 'pg';

const { Client } = pkg;

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "admin",
    database: "postgres"
})

async function connect() {
   
    await client.connect();
}

async function query(sqlQuery, callback) {
    try {
        const result = await client.query(sqlQuery);
        callback(null, result);
    } catch (error) {
        callback(error);
    }
}

async function end() {
   
    await client.end();
}

export { connect, query, end };