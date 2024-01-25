const sqlite3 = require('sqlite3').verbose()
// const db = new sqlite3.Database('words')

const DBSOURCE = 'db.sqlite';

let db = new sqlite3.Database(DBSOURCE, (err: Error) => {
    if (err) {
      // Cannot open database
      console.log("Cannot open database");
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`
        CREATE TABLE words (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mot TEXT,
            livre TEXT,
            page INTEGER,
            date TEXT
        )
        `,
        (err: Error) => {
            if (err) {
                // Table already created
                console.log("Table already created");
            } else {
                // Table just created, creating some rows
                console.log("Table just created, creating some rows");
                var insert = `
                INSERT INTO words(id, mot, livre, page, date)
                VALUES(?, ?, ?, ?, ?)`
                db.run(insert, ["id", 1])
                db.run(insert, ["mot", "Testing"])
                db.run(insert, ["livre", "Madame Bovary"])
                db.run(insert, ["page", 14])
                db.run(insert, ["date", "12/21/23"])
            }
        });  
    }
});

module.exports = db