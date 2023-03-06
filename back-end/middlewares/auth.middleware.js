import jwt from "jsonwebtoken";
import { JWT_SECRET } from '../configs/jwt.config.js'
import { User } from "../models/user.model.js";
export const authCheck = async (req, res, next) => {
    try {
        let token = null;
        if (req.headers['authorization']) {
            token = req.headers['authorization'];
        }
        if (req.headers['x-xsrf-token']) {
            token = req.headers['x-xsrf-token'];
        }
        if (req.query.token) {
            token = req.query.token;
        }
        if (token === null) {
            next({
                status: 401,
                msg: "Unauthorized"
            })
        } else {
            let parts = token.split(' ');
            token = parts.pop();
            jwt.verify(token, JWT_SECRET.VAL, async (err, data) => {
                if (err) {
                    next({
                        status: 403,
                        msg: err
                    })
                } else {
                    let user = await User.findOne({ where: { id: data.id } });
                    if (user) {
                        req.auth_user = user;
                        next();
                    } else {
                        next({
                            status: 403,
                            msg: "Invalid token or user does not exit"
                        })
                    }
                }
            })

        }


    } catch (error) {
        console.log(error)
    }
}
