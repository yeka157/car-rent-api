const db = require('../db');
const { updateData } = require('./car');

module.exports = {
    getData: async (req, res) => {
        try {
            await db.query('SELECT o.*, c.car_name from orders o JOIN cars c ON c.car_id = o.car_id', (err, results) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(results.rows);
            })
        } catch (error) {
            res.status(500).send(error);
        }
    },
    createData: async (req, res) => {
        try {
            const { car_id, pickup_date, dropoff_date, pickup_location, dropoff_location } = req.body;
            let result = await db.query('INSERT INTO orders (car_id, pickup_date, dropoff_date, pickup_location, dropoff_location) VALUES ($1, $2, $3, $4, $5)',
                [car_id, pickup_date, dropoff_date, pickup_location, dropoff_location], (err, results) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                })
            if (result.rowCount) {
                res.status(200).send({ status: 'success' });
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },
    updateData: async (req, res) => {
        try {
            const id = req.params.id;
            const { car_id, pickup_date, dropoff_date, pickup_location, dropoff_location } = req.body;
            let result = await db.query('UPDATE orders SET car_id = $1, pickup_date = $2, dropoff_date = $3, pickup_location = $4, dropoff_location = $5 WHERE order_id = $6', 
                [car_id, pickup_date, dropoff_date, pickup_location, dropoff_location, id], (err, results) => {
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
    deleteData: async (req, res) => {
        try {
            const id = req.params.id;
            let result = await db.query('DELETE FROM orders WHERE order_id = $1', [id], (error, results) => {
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