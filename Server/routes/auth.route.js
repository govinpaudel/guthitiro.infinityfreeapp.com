const express = require('express')
const connection = require('../libraries/connection')
const bcrypt = require('bcryptjs')
const router = express.Router();
const { signAccessToken, signRefreshToken, verifyAccesstoken, verifyRefreshtoken } = require('../libraries/jwt_helper');

router.post('/register', async (req, res, next) => {
    const data = req.body;
    // console.log(data);
    try {
        const query = "select * from users where username=? or email=?";
        connection.query(query, [data.username, data.email], (err, result) => {
            if (!err) {
                if (result.length > 0) {
                    return res.status(200).json({ status: false, message: `Email:${result[0].email} or Username:${result[0].username} is already registered.` })
                }
                else {
                    const hash = bcrypt.hashSync(data.password, 10);
                    const query = "insert into users (username,email,password,nepname,engname,contactno,office_id,role,status) values(?,?,?,?,?,?,?,?,?)";
                    connection.query(query, [data.username, data.email, hash, data.nepname, data.engname, data.contactno, data.officeid, "1", "0"], (err, result) => {
                        if (!err) {
                            return res.status(200).json({ status: true, message: `Userid ${data.username} is registered successfully.` })
                        }
                        else {
                            next(err.message)
                        }
                    });
                }
            }
            else {
                next(err.message)
            }
        })

    } catch (err) {
        next(err)
    }
})
router.post('/login', async (req, res, next) => {
    let user = req.body
    const query = "select a.*,b.state_id,b.office_name,c.state_name,d.id as district_id,d.district_name,e.id as aaba_id from users a\
    inner join offices b on a.office_id=b.id\
    inner join states c on b.state_id=c.id\
	inner join districts d on b.district_id=d.id\
	inner join aabas e on e.is_current=1\
	where a.username=?"
    connection.query(query, [user.username], async (err, result) => {
        try {            
            if (err) {
                console.log(err);
                return;
            }
            if (result.length > 0) {
                // console.log(result);
                if (result[0].status == false) {
                    return res.status(401).json({ status: false, message: `प्रयोगकर्ता सक्रिय गरिएको छैन । कृपया व्यवस्थापकलाई सम्पर्क गर्नुहोला ।` })
                }
                else {
                    const checkPassword = bcrypt.compareSync(user.password, result[0].password)
                    if (!checkPassword) {
                        return res.status(401).json({ status: false, message: `प्रयोगकर्ता वा पासवर्ड मिलेन ।` })
                    }
                    else {
                        const datatoadd = result[0]
                        delete datatoadd.password;
                        const atoken = await signAccessToken(result[0].id)
                        const rtoken = await signRefreshToken(result[0].id)
                        return res.status(200).json({ status: true, access_token: atoken, refresh_token: rtoken, data: datatoadd, message: `सफलतापुर्वक लगईन भयो ।` })
                    }
                }
            }
            else {
                return res.status(401).json({ status: false, message: `प्रयोगकर्ता वा पासवर्ड मिलेन ।` })
            }
        } catch (error) {
            return res.status(401).json({ status: false, message: `प्रयोगकर्ता वा पासवर्ड मिलेन ।` })
        }
    })
})
router.post('/changepassword', verifyAccesstoken, async (req, res, next) => {
    let user = req.body;
    const query = 'select * from users where id=?';
    connection.query(query, [user.user_id], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result);
            console.log(user);
            if (result.length > 0) {
                const checkPassword = bcrypt.compareSync(user.old_password, result[0].password)
                if (!checkPassword) {
                    return res.status(401).json({ status: false, message: `पुरानो पासवर्ड मिलेन ।` })
                }
                else {
                    const newpassword = bcrypt.hashSync(user.new_password, 10);
                    let query = 'update users set password=? where id=?';
                    connection.query(query, [newpassword, user.user_id], (err, result) => {
                        if (err) {
                            return res.status(401).json({ status: false, message: `पासवर्ड परिवर्तन सफल हुन सकेन ।` })
                        }
                        else {
                            res.status(200).json({ status: true, message: "पासवर्ड परिवर्तन सफल भयो ।" })
                        }
                    })

                }
            }
        }
    })
})
router.post('/refresh-token', async (req, res, next) => {
    try {
        const { oldrefreshToken } = req.body
        if (!oldrefreshToken) throw createError.BadRequest()
        const userid = await verifyRefreshtoken(oldrefreshToken)
        const accessToken = await signAccessToken(userid)
        const refreshToken = await signRefreshToken(userid)
        res.send({ accessToken, refreshToken })
    } catch (err) {
        next(err.message)
    }
})
router.get('/getAllOffices', async (req, res, next) => {
    let query = "select * from offices"
    try {
        const [result]=await connection.promise().query(query);
        return res.status(200).json({ status: true, message: `कार्यालय लिष्ट प्राप्त भयो ।`,data:result })        
    } catch (err) {
        next(err)
    }
})

module.exports = router