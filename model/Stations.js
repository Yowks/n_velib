const getJSON = require('get-json');
import Database from './Database';

class Stations {
    
    constructor() {
        this.db = new Database();
    }

    async getData() {
        return this.db.query("SELECT * FROM `data`")
            .then(([rows]) => {
                return rows;
            })
            .catch(err => {
                console.log(err);
                
                return false;
            });        
    } 

}

module.exports = Stations;


