const db = require('../db');

module.exports = {
    getData: async (req,res) => {
        try {
            await db.query('SELECT * from cars ORDER BY car_id ASC', (err, results) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(results.rows);
            });
        } catch (error) {
            res.status(500).send(error);
        }
    },
    createData : async (req,res) => {
        try {
            const { car_name, day_rate, month_rate, image } = req.body;
            let result = await db.query('INSERT INTO cars (car_name, day_rate, month_rate, image) VALUES ($1, $2, $3, $4)', [car_name, day_rate, month_rate, image], (err, results) => {
                if (err) {
                    res.status(500).send(err);
                }
            });
            if (result.rowCount) {
                res.status(200).send({status: 'success'});
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },
    updateData : async (req,res) => {
        try {
            const id = req.params.id;
            const { car_name, day_rate, month_rate, image } = req.body;
            let result = await db.query('UPDATE cars SET car_name = $1, day_rate = $2, month_rate = $3, image = $4 WHERE car_id = $5',
                [car_name, day_rate, month_rate, image, id], (err, results) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                }
            )
            if (result.rowCount) {
                res.status(200).send({status: 'success'});
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },
    deleteData : async (req,res) => {
        try {
            const id = req.params.id;
            let result = await db.query('DELETE FROM cars WHERE car_id = $1', [id], (err, results) => {
                if (err) {
                    res.status(500).send(err);
                }
            });
            if (result.rowCount) {
                res.status(200).send({status: 'success'});
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

}