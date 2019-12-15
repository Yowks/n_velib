const getJSON = require('get-json');
import Database from './Database';

class Stations {
    
    constructor() {
        this.db = new Database();
    }

    async getData(filter_type = null, filter_val = null) {
        let query_request = "SELECT * FROM `data`";
        if(filter_type == 'coordones' && filter_val !== null){ query_request += "WHERE `geo` = '"+ filter_val +"' "}
        if(filter_type == 'adress' && filter_val !== null){ query_request += "WHERE `station_nom` = '"+ filter_val +"' "}
        return this.db.query(query_request)
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


