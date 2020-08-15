const DB = require('../db/mysql');

class Trip {
    constructor() {
        if(!Trip.instance) {
            Trip.instance = this;
        }
        return Trip.instance;
    }

    async get() {

        try {

            // fetch vehicles from table vehicles
            const [rows] = await DB.query(`select 
                id,
                registration_number, 
                amount, 
                visit_type, 
                date_format(entry_date,"%Y-%m-%d") as entry_date, 
                time(entry_date) as entry_time,
                date_format(exit_date,"%Y-%m-%d") as exit_date, 
                time(exit_date) as exit_time
            from trips 
            where date(entry_date)=date(NOW())
            order by id desc`); 
            return { trips: rows };

        } catch(err) {
            return { error: err.message }
        }

    }

    async create(data) {

        try {

            // check if the vehicle is already registered for round trip and its comming back
            // update it exit date
            const commingBack = await this.updateExitDate(data.registration_number);

            // vehicle is not comming back
            if(!commingBack) {

                // if one way trip, by default exit date will be requivalent to entry date
                if(data.visit_type === 'one-way') {
                    await DB.query('insert into trips (registration_number, amount, visit_type, entry_date, exit_date) values (?, ?, ?, NOW(), NOW())',[data.registration_number, data.amount, data.visit_type]);
                }

                // if round trip, by default exit date will be null
                if(data.visit_type === 'round-trip') {
                    await DB.query('insert into trips (registration_number, amount, visit_type) values (?, ?, ?)',[data.registration_number, data.amount, data.visit_type]);
                }

            }

            // return all trips 
            return await this.get();

        } catch(err) {
            return { error: err.message }
        }

    }

    async updateExitDate(registration_number) {

        // fetch vehicles from table vehicles
        const [rows] = await DB.query(`select id from trips where registration_number=? and exit_date is null and date(entry_date)=date(NOW())`, [registration_number]); 
        
        // if id is present, update the exit date to current time
        if(rows[0] && rows[0].id) {
            await DB.query(`update trips set exit_date=NOW() where id=?`, [rows[0].id])
            return true;
        }
        return false;

    }

}

const instance = new Trip();
module.exports = instance;