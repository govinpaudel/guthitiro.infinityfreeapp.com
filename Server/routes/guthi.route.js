const express = require('express')
const connection = require('../libraries/connection')
const router = express.Router();
const NepaliDate = require('nepali-datetime');
//get all aabas
router.get('/getAabas', async (req, res, next) => {
    let query = "select * from aabas"
    try {
        connection.query(query, (err, result) => {
            if (err) next(err.message)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
//get all states
router.get('/getStates', async (req, res, next) => {
    let query = "select * from states"
    try {
        connection.query(query, (err, result) => {
            if (err) next(err.message)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
//get all gabisas
router.get('/getGabisas', async (req, res, next) => {
    let query = `select a.*,b.state_name,c.district_name,d.palika_type_name,e.palika_name from gabisas a
    inner join states b on a.state_id=b.id
    inner join districts c on a.district_id=c.id
    inner join palika_type d on a.palika_type_id=d.id
    inner join palikas e on a.palika_id=e.id
	order by state_id,district_name,palika_type_id,palika_name,gabisa_name`;
    try {
        connection.query(query, (err, result) => {
            if (err) next(err.message)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
//get all districts
router.get('/getDistricts', async (req, res, next) => {
    let query = "select * from districts";
    try {
        connection.query(query, (err, result) => {
            if (err) next(err.message)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
//get all guthitypes
router.get('/getGuthiTypes', async (req, res, next) => {
    let query = "select id,guthi_type_name from guthi_type"
    try {
        connection.query(query, (err, result) => {
            if (err) next(err.message)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
//get tenant types
router.get('/getTenantTypes/:id', async (req, res, next) => {
    console.log(req.params.id);
    let query = "select id,tenant_type_name from tenant_type where guthi_type_id=?"
    try {
        connection.query(query, [req.params.id], (err, result) => {
            if (err) next(err.message)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
//get all states
router.get('/getAllStates', async (req, res, next) => {
    let query = "select * from states"
    try {
        connection.query(query, async (err, result) => {
            if (err) next(err.message)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
//get district state
router.get('/districtByState/:id', async (req, res, next) => {
    let query = "select DISTINCT a.district_id as id,b.district_name from gabisas a\
    inner join districts b on a.district_id=b.id\
    where a.state_id=?"
    try {
        connection.query(query, req.params.id, (err, result) => {
            if (err) next(err.message)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
//get localtype by district
router.get('/localtypesByDistrict/:id', async (req, res, next) => {
    let query = "select DISTINCT a.palika_type_id as id,b.palika_type_name from gabisas a\
    inner join palika_type b on a.palika_type_id=b.id\
    where a.district_id=? order by id"
    try {
        connection.query(query, [req.params.id], (err, result) => {
            if (err) next(err.message)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
//getlLocalsByDistrictAndType
router.get('/getPalikaByDistrictAndType/:id/:type', async (req, res, next) => {
    let query = "select DISTINCT a.palika_id as id,b.palika_name from gabisas a\
    inner join palikas b on a.palika_id=b.id\
    where a.district_id=? and a.palika_type_id=? order by id"
    try {
        connection.query(query, [req.params.id, req.params.type], (err, result) => {
            if (err) next(err.message)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
//get gabisaByDistrict
router.get('/gabisaByDistrictAndPalikaId/:id/:palika_id', async (req, res, next) => {
    let query = "select * from gabisas where district_id=? and palika_id=?"
    try {
        connection.query(query, [req.params.id, req.params.palika_id], (err, result) => {
            if (err) next(err.message)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
router.get('/getLands/:id', async (req, res, next) => {
    console.log(req.params.id)
    let query = "select a.*,b.state_name,c.district_name,d.palika_type_name,e.gabisa_name,f.area_type_name,g.palika_name,h.land_type_name,i.land_sub_type_name from shresta_details a \
inner join states b on a.state_id=b.id \
inner join districts c on c.id=a.district_id \
inner join palika_type d on d.id=a.palika_type_id \
inner join gabisas e on e.id=a.gabisa_id \
inner join area_type f on f.id=a.area_type_id \
inner join palikas g on a.palika_id=g.id \
inner join land_type h on a.land_type_id=h.id \
inner join land_sub_type i on a.land_sub_type_id=i.id \
where a.shresta_id=? and a.status=1 order by a.id"
    try {
        connection.query(query, req.params.id, (err, result) => {
            if (err) {
                console.log(err)
                next(err.message)
            }
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
router.get('/getLandById/:id', async (req, res, next) => {
    let query = "select * from shresta_details where id=?"
    try {
        connection.query(query, req.params.id, (err, result) => {
            if (err) next(err.message)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
router.get('/getWards', async (req, res, next) => {
    let query = "select * from wards"
    try {
        connection.query(query, (err, result) => {
            if (err) next(err.message)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
router.get('/getLandTypes', async (req, res, next) => {
    let query = "select * from land_type"
    try {
        connection.query(query, (err, result) => {
            if (err) next(err.message)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
router.get('/getLandSubTypes', async (req, res, next) => {
    let query = "select * from land_sub_type"
    try {
        connection.query(query, (err, result) => {
            if (err) next(err.message)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
router.get('/getPalikaTypes', async (req, res, next) => {
    let query = "select * from palika_type"
    try {
        connection.query(query, (err, result) => {
            if (err) next(err.message)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
router.get('/getPalikas', async (req, res, next) => {
    let query = "select * from palikas"
    try {
        connection.query(query, (err, result) => {
            if (err) next(err.message)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
router.get('/getAreaTypes', async (req, res, next) => {
    let query = "select * from area_type"
    try {
        connection.query(query, (err, result) => {
            if (err) next(err.message)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
router.get('/getFineOrDiscounts', async (req, res, next) => {
    let query = `select a.*,b.guthi_type_name from discounts a inner join guthi_type b on b.id=a.guthi_type_id
    order by a.guthi_type_id,a.d_type,a.d_percent`
    try {
        connection.query(query, (err, result) => {
            if (err) next(err.message)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
router.get('/getallShresta/:id', async (req, res, next) => {
    let query = "select a.*,b.guthi_type_name,c.tenant_type_name from shresta_header a\
    inner join guthi_type b on a.guthi_type_id=b.id\
    inner join tenant_type c on a.tenant_type_id=c.id\
    where office_id=?\
    order by a.id"
    try {
        connection.query(query, req.params.id, (err, result) => {
            if (err) next(err.message)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
router.get('/getGabisaById/:id', async (req, res, next) => {
    let query = "select a.* from gabisas a where a.id=?"
    try {
        connection.query(query, req.params.id, (err, result) => {
            if (err) next(err.message)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
router.get('/getShresta/:id', async (req, res, next) => {
    let query = "select a.*,b.guthi_type_name,c.tenant_type_name from shresta_header a\
    inner join guthi_type b on a.guthi_type_id=b.id\
    inner join tenant_type c on a.tenant_type_id=c.id\
    where a.id=?"
    try {
        connection.query(query, req.params.id, (err, result) => {
            if (err) next(err.message)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
router.post('/addUpdateShresta', async (req, res, next) => {
    try {
        let data = req.body
        if (data.id > 0) {
            let query = "update shresta_header set guthi_type_id=?,guthi_name=?,tenant_type_id=?,tenant_name=?,tenant_address=?,tenant_mobile_no=?,updated_by_user_id=? where id=?"
            connection.query(query, [data.guthi_type_id, data.guthi_name, data.tenant_type_id, data.tenant_name, data.tenant_address, data.tenant_mobile_no, data.userid, data.id], (err, result) => {
                if (err) {
                    console.log(err);
                    next(err.message)
                }
                else {
                    res.send({ message: "सफलतापुर्वक संशोधन भयो ।", data: result })
                }
            })

        }
        else {
            let query = "insert into shresta_header(office_id,guthi_type_id,guthi_name,tenant_type_id,tenant_name,tenant_address,tenant_mobile_no,created_by_user_id) values(?,?,?,?,?,?,?,?)"
            connection.query(query, [data.officeid, data.guthi_type_id, data.guthi_name, data.tenant_type_id, data.tenant_name, data.tenant_address, data.tenant_mobile_no, data.userid], (err, result) => {
                if (err) {
                    next(err.message);
                    console.log(err);
                }
                else {
                    res.send({ message: "सफलतापुर्वक दर्ता भयो ।", data: result })
                }
            })

        }

    } catch (err) {
        next(err.message)
    }

})
router.post('/AddOrUpdateLand', async (req, res, next) => {
    try {
        let data = req.body
        console.log(data)
        if (data.land_id > 0) {
            let query = "update shresta_details set state_id=?,district_id=?,guthi_type_id=?,palika_type_id=?,palika_id=?,gabisa_id=?,ward_no=?,kitta_no=?,land_type_id=?,land_sub_type_id=?,area_type_id=?,area=?,area_units=?,updated_by_user_id=? where id=?"
            connection.query(query, [data.state_id, data.district_id, data.guthi_type_id, data.palika_type_id, data.palika_id, data.gabisa_id, data.ward_no, data.kitta_no, data.land_type_id, data.land_sub_type_id, data.area_type_id, data.area, data.area_units, data.userid, data.land_id], (err, result) => {
                if (err) {
                    console.log(err);
                    next(err.message)
                }
                else {
                    console.log(result);
                    return res.status(200).json({ status: true, message: 'जग्गा सफलतापुर्वक संशोधन भयो।' })
                }
            })
        }
        else {
            // check if the same kitta no already exists?
            let query = "select * from shresta_details where gabisa_id=? and ward_no=? and kitta_no=? and status=1"
            connection.query(query, [data.gabisa_id, data.ward_no, data.kitta_no], (err, results) => {
                if (results.length > 0) {
                    return res.status(201).json({ status: false, message: 'यो गा.वि.स । वडा नं . कित्ता नं पहिला नै अवस्थित छ ।' })
                }
                else {
                    let query = "insert into shresta_details(shresta_id,state_id,district_id,office_id,guthi_type_id,palika_type_id,palika_id,gabisa_id,ward_no,land_type_id,land_sub_type_id,kitta_no,area_type_id,area,area_units,created_by_user_id) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                    connection.query(query, [data.shresta_id, data.state_id, data.district_id, data.office_id, data.guthi_type_id, data.palika_type_id, data.palika_id, data.gabisa_id, data.ward_no, data.land_type_id, data.land_sub_type_id, data.kitta_no, data.area_type_id, data.area, data.area_units, data.user_id], (err, result) => {
                        if (err) {
                            console.log(err)
                            next(err.message)
                        }
                        else {
                            return res.status(200).json({ status: true, message: 'जग्गा सफलतापुर्वक दर्ता भयो।' })
                        }
                    })



                }
            })
        }
    } catch (err) {
        next(err.message)
    }

})
router.get('/getRatesByOffice/:id/:type/', async (req, res, next) => {
    try {
        console.log(req.params.id);
        console.log(req.params.type)
        let query = '';
        if (req.params.type == 1) {
            let query = "SELECT a.*,b.aaba_name start_aaba_name,z.aaba_name as end_aaba_name,c.guthi_type_name,d.palika_type_name,e.land_type_name,f.land_sub_type_name,g.area_type_name FROM `rates_adhinasta` a\
    inner join aabas b on b.id=a.start_aaba_id \
    inner join aabas z on z.id=a.end_aaba_id \
    inner join guthi_type c on c.id=a.guthi_type_id \
    inner join palika_type d on d.id=a.palika_type_id \
    inner join land_type e on e.id=a.land_type_id \
    inner join land_sub_type f on f.id=a.land_sub_type_id \
    inner join area_type g on g.id=a.area_type_id where a.office_id=? order by a.start_aaba_id"
            connection.query(query, req.params.id, (err, result) => {
                if (err) next(err.message)
                res.send({ data: result })
            })
        } else {
            let query = 'SELECT a.*,d.aaba_name as start_aaba_name,e.aaba_name as end_aaba_name,b.palika_type_name,c.area_type_name FROM `rates_raitani` a\
            inner join palika_type b on a.palika_type_id=b.id\
            inner join area_type c on a.area_type_id=c.id\
						inner join aabas d on a.start_aaba_id=d.id\
						inner join aabas e on a.end_aaba_id=e.id where a.office_id=? order by a.start_aaba_id';
            connection.query(query, req.params.id, (err, result) => {
                if (err) next(err.message)
                res.send({ data: result })
            })
        }

    } catch (error) {
        next(err)
    }
})
router.get('/getRatesById/:type/:id', async (req, res, next) => {
    try {
        console.log(req.params.id);
        console.log(req.params.type)
        if (req.params.type == 1) {
            let query = "SELECT * from rates_adhinasta where id=?"
            const [results] = await connection.promise().query(query, req.params.id)
            console.log(results)
            return res.status(200).json({ status: true, data: results })
        }
        else {
            let query = "SELECT * from rates_raitani where id=?"
            const [results] = await connection.promise().query(query, req.params.id)
            console.log(results)
            return res.status(200).json({ status: true, data: results })
        }


    } catch (error) {
        next(error)
    }

})
router.get('/getInvoicesByShresta/:id', async (req, res, next) => {
    console.log(req.params.id);
    let query = "select a.*,b.nepname,c.aaba_name,d.aaba_name as tiro_aaba_name from invoice_header a\
    inner join users b on a.created_by_user_id=b.id\
    inner join aabas c on a.invoice_aaba_id=c.id\
    inner join aabas d on a.tiro_aaba_id=d.id\
    where a.shresta_id=? order by a.tiro_aaba_id"
    try {
        connection.query(query, [req.params.id], (err, result) => {
            if (err) next(err)
            res.send({ data: result })
        })
    } catch (err) {
        next(err)
    }
})
router.get('/loadInvHeaderData/:id', (req, res, next) => {
    let query = "select a.*,e.aaba_name,d.guthi_type_name,b.guthi_name,c.tenant_type_name,b.tenant_name,b.tenant_address,b.tenant_mobile_no from invoice_header a\
    inner join shresta_header b\
        inner join tenant_type c on b.tenant_type_id=c.id\
        inner join guthi_type d on b.guthi_type_id=d.id on a.shresta_id=b.id\
        inner join aabas e on e.id=a.tiro_aaba_id\
        where a.id=?"
    connection.query(query, [req.params.id], (err, result) => {
        if (err) next(err)
        res.send({ data: result })
    })

})
router.get('/getPendingPaymentByShresta/:id', (req, res, next) => {
    let query = `SELECT a.id,a.guthi_type_id,a.shresta_id,b.tenant_name,a.tiro_aaba_id,c.aaba_name,a.invoice_amount,a.discount_rate,a.discount_amount,a.fine_rate,a.fine_amount,a.final_amount,a.remarks,a.paid_status FROM invoice_header a
inner JOIN shresta_header b ON a.shresta_id = b.id 
inner join aabas c on a.tiro_aaba_id=c.id
WHERE a.shresta_id = ? and paid_status=0`
    connection.query(query, [req.params.id], (err, result) => {
        if (err) next(err)
        res.send({ data: result })
    })

})
router.get('/loadInvDetailData/:id', (req, res, next) => {
    console.log(req.params.id)
    let query = "select a.*,b.district_name,c.gabisa_name,d.area_type_name,e.land_type_name,f.land_sub_type_name,g.aaba_name from invoice_details a\
    inner join districts b on a.district_id=b.id\
    inner join gabisas c on a.gabisa_id=c.id\
    inner join area_type d on a.area_type_id=d.id\
	inner join land_type e on e.id=a.land_type_id\
    inner join aabas g on g.id=a.rate_aaba_id\
	inner join land_sub_type f on f.id=a.land_sub_type_id where a.invoice_header_id=?\
    order by a.id"
    connection.query(query, [req.params.id], (err, result) => {
        if (err) next(err)
        res.send({ data: result })
    })
})
router.post('/updatediscounts', (req, res, next) => {
    let { invoiceid, radiovalue, seldiscount } = req.body;
    console.log(invoiceid, radiovalue, seldiscount);
    if (radiovalue == 1) {
        let query = "UPDATE invoice_header AS a, (SELECT  * FROM discounts WHERE id = ?) AS b\
        SET a.fine_rate=0,a.fine_amount=0,a.discount_rate = b.d_percent,a.discount_amount=a.invoice_amount*(b.d_percent/100),a.remarks=b.d_description,a.final_amount=(a.invoice_amount-(a.invoice_amount*(b.d_percent/100)))\
        WHERE a.id = ?"
        connection.query(query, [seldiscount, invoiceid], (err, result) => {
            if (err) next(err)
            res.send({ message: "सफलतापुर्वक छुट सेभ भयो", data: result })
        })
    }
    else {
        let query = "UPDATE invoice_header AS a, (SELECT  * FROM discounts WHERE id = ?) AS b\
        SET a.fine_rate=b.d_percent,a.fine_amount=a.invoice_amount*(b.d_percent/100),a.discount_rate = 0,a.discount_amount=0,a.remarks=b.d_description,a.final_amount=(a.invoice_amount+(a.invoice_amount*(b.d_percent/100)))\
        WHERE a.id = ?"
        connection.query(query, [seldiscount, invoiceid], (err, result) => {
            if (err) next(err)
            res.send({ message: "सफलतापुर्वक जरिवाना सेभ भयो", data: result })
        })


    }
})
router.post('/addUpdateRates', async (req, res, next) => {
    let user = req.body;
    console.log('data for insert or update', user);
    if (user.guthi_type_id == 1) {
        //if guthi is adhinasta
        if (user.id > 0) {
            let query = 'update rates_adhinasta set\
        start_aaba_id=?,\
        end_aaba_id=?,\
        guthi_type_id=?,\
        palika_type_id=?,\
        land_type_id=?,\
        land_sub_type_id=?,\
        area_type_id=?,\
        rate=?,\
        unit_rate=?,\
        updated_by_user_id=? where id=?';
            connection.query(query, [user.start_aaba_id, user.end_aaba_id, user.guthi_type_id, user.palika_type_id, user.land_type_id, user.land_sub_type_id, user.area_type_id, user.rate, user.unit_rate, user.user_id, user.id], (err, result) => {
                if (err) {
                    console.log(err);
                    next(err)
                    return;
                }
                return res.status(200).json({ status: true, message: `दर संशोधन सफल भयो` })
            })
        }
        else {
            //new entry            
            for (const palika_type_id of user.palika_type_id) {
                for (const land_type_id of user.land_type_id) {
                    for (const land_sub_type_id of user.land_sub_type_id) {
                        const values = [user.office_id, user.start_aaba_id, user.end_aaba_id, user.guthi_type_id, palika_type_id, land_type_id, land_sub_type_id, user.area_type_id, user.rate, user.unit_rate, user.user_id];
                        console.log(values);
                        let query = 'insert into rates_adhinasta(office_id,start_aaba_id,end_aaba_id,guthi_type_id,palika_type_id,land_type_id,land_sub_type_id,area_type_id,rate,unit_rate,created_by_user_id) values(?,?,?,?,?,?,?,?,?,?,?)';
                        connection.query(query, values, (err, result) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                        })
                    }
                }
            }
            return res.status(200).json({ status: true, message: `दर दर्ता सफल भयो` })
        }
    }
    //if guthi is raitani
    else {
        if (user.id > 0) {
            let query = `update rates_raitani set
        start_aaba_id=?,        
        end_aaba_id=?,
        palika_type_id=?,        
        area_type_id=?,
        rate=?,
        unit_rate=?,
        updated_by_user_id=? where id=?`;
            let values = [user.start_aaba_id, user.end_aaba_id, user.palika_type_id, user.area_type_id, user.rate, user.unit_rate, user.user_id, user.id]
            connection.query(query, values, (error, results) => {
                if (error) {
                    next(error)
                    return;
                }
                return res.status(200).json({ status: true, message: `दर संशोधन सफल भयो` })

            })
        }
        else {
            //new entry
            for (const palika_type_id of user.palika_type_id) {
                let query = 'insert into rates_raitani(office_id,start_aaba_id,end_aaba_id,guthi_type_id,palika_type_id,area_type_id,rate,unit_rate,created_by_user_id) values(?,?,?,?,?,?,?,?,?)';
                connection.query(query, [user.office_id, user.start_aaba_id, user.end_aaba_id, user.guthi_type_id, palika_type_id, user.area_type_id, user.rate, user.unit_rate, user.user_id], (err, result) => {
                    if (err) {
                        next(err)
                        return;
                    }
                })
            }
            return res.status(200).json({ status: true, message: `दर सफलतापुर्वक दर्ता भएको छ` })
        }
    }


})
router.post('/addUpdateGabisa', (req, res, next) => {
    let user = req.body;
    console.log(user);
    let query = "update gabisas set state_id=?,district_id=?,palika_type_id=?,palika_id=? where id=?";
    connection.query(query, [user.state_id, user.district_id, user.palika_type_id, user.palika_id, user.id], (err, results) => {
        if (err) {
            console.log(err)
        }
        else {
            return res.status(200).json({ status: true, message: `गा.वि.स संशोधन सफल भयो` })
        }
    })
})
router.get('/getDashLandData/:officeid', (req, res, next) => {
    console.log('officeid for DashLandData', req.params.officeid);
    let query = 'select a.guthi_type_id,b.area_type_id,sum(b.area_units)as area_units from shresta_header a\
    inner join shresta_details b on b.shresta_id=a.id\
    where a.office_id=? group by a.guthi_type_id,b.area_type_id'
    connection.query(query, [req.params.officeid], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result);
            return res.status(200).json({ status: true, data: result })
        }

    })
})
router.get('/getDashRevenueData/:officeid/:aabaid', (req, res, next) => {
    let query = `SELECT office_id,aaba_id,SUM(amount) AS 'A',\
SUM(CASE WHEN mon = 4 THEN amount ELSE 0 END) AS 'B',\
    SUM(CASE WHEN mon = 5 THEN amount ELSE 0 END) AS 'C',\
    SUM(CASE WHEN mon = 6 THEN amount ELSE 0 END) AS 'D',\
    SUM(CASE WHEN mon = 7 THEN amount ELSE 0 END) AS 'E',\
    SUM(CASE WHEN mon = 8 THEN amount ELSE 0 END) AS 'F',\
    SUM(CASE WHEN mon = 9 THEN amount ELSE 0 END) AS 'G',\
	SUM(CASE WHEN mon = 10 THEN amount ELSE 0 END) AS 'H',\
	SUM(CASE WHEN mon = 11 THEN amount ELSE 0 END) AS 'I',\
	SUM(CASE WHEN mon = 12 THEN amount ELSE 0 END) AS 'J',\
	SUM(CASE WHEN mon = 1 THEN amount ELSE 0 END) AS 'K',\
	SUM(CASE WHEN mon = 2 THEN amount ELSE 0 END) AS 'L',\
	SUM(CASE WHEN mon = 3 THEN amount ELSE 0 END) AS 'M'\
    FROM invoice_tender where office_id=? and aaba_id=? group by office_id,aaba_id`;
    connection.query(query, [req.params.officeid, req.params.aabaid], (err, result) => {
        return res.status(200).json({ status: true, data: result })
    })
})
router.get('/getTenders', (req, res, next) => {
    let query = 'select * from tenders'
    connection.query(query, (err, result) => {
        return res.status(200).json({ status: true, data: result })
    })
})
router.get('/getOldTendersByShresta/:id', (req, res, next) => {
    let query = `select a.aaba_id,b.aaba_name,ndate,tender_no,sum(amount) as amount from invoice_tender a
    inner join aabas b on a.aaba_id=b.id  where shresta_id=?
    group by a.aaba_id,b.aaba_name,ndate,tender_no
    order by aaba_id`;
    console.log(req.params.id);
    connection.query(query, req.params.id, (err, result) => {
        return res.status(200).json({ status: true, data: result })
    })
})
router.post('/saveTender', async (req, res, next) => {
    try {
        let user = req.body;
        const jsDate = new Date(user.date)
        const ndate = new NepaliDate(jsDate).format('YYYY-MM-DD')
        const month = ndate.split('-')[1];
        for (const item of user.data) {
            const values = [user.office_id, user.aaba_id, item.tiro_aaba_id, item.shresta_id, user.date, ndate, month, item.id, user.tender_type_id, user.tender_no, item.final_amount, user.user_id]
            let query = 'insert into invoice_tender(office_id,aaba_id,tiro_aaba_id,shresta_id,edate,ndate,mon,invoice_id,tender_type_id,tender_no,amount,created_by_user_id) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            await connection.promise().query(query, values);
            let query1 = 'update invoice_header set paid_status=1 where id=?'
            await connection.promise().query(query1, [item.id]);
        }
        return res.status(200).json({ status: true, message: `टेन्डर सफलतापुर्वक दर्ता भयो ।` })
    } catch (error) {
        console.log(error);
    }
})

router.post('/saveOldTender', async (req, res, next) => {
    let user = req.body;
    console.log(user);
    try {
        let user = req.body;
        const values = [user.office_id, user.shresta_id, user.aaba_id, user.tender_no, user.ndate, user.amount,user.user_id]
        let query = 'insert into invoice_tender(office_id,shresta_id,aaba_id,tender_no,ndate,amount,created_by_user_id) values(?,?,?,?,?,?,?)';
        await connection.promise().query(query, values);
        return res.status(200).json({ status: true, message: `टेन्डर सफलतापुर्वक दर्ता भयो ।` });

    } catch (error) {
        console.log(error);
    }
}
)
router.get('/getLagatByOfficeId/:id', async (req, res, next) => {
    console.log(req.params.id)
    let query = `select a.office_id,h.office_name,b.guthi_type_name,a.guthi_name,c.tenant_type_name,
a.tenant_name,a.tenant_address,a.tenant_mobile_no,e.palika_name,f.gabisa_name,d.ward_no,d.kitta_no,d.area_type_id,i.land_type_name,j.land_sub_type_name,g.area_type_name,d.area,d.area_units from shresta_header a
inner join guthi_type b on a.guthi_type_id=b.id
inner join tenant_type c on a.tenant_type_id=c.id
inner join shresta_details d on a.id=d.shresta_id
inner join palikas e on e.id=d.palika_id
inner join gabisas f on f.id=d.gabisa_id
inner join area_type g on g.id=d.area_type_id
inner join offices h on h.id=a.office_id
inner join land_type i on i.id=d.land_type_id
inner join land_sub_type j on j.id=d.land_sub_type_id
where a.office_id=? and d.status=1 order by a.guthi_type_id,a.guthi_name,f.gabisa_name,d.ward_no,d.kitta_no`
    try {
        connection.query(query, [req.params.id], (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
            return res.status(200).json({ status: true, data: result })
        })
    } catch (err) {
        next(err)
    }
})
router.get('/getInvoicesByOfficeId/:id', async (req, res, next) => {
    console.log(req.params.id)
    let query = `SELECT a.office_id,d.office_name,e.guthi_type_name,b.guthi_name,b.tenant_name,b.tenant_address,a.ndate,a.edate,b.tenant_name,b.tenant_address,a.tiro_aaba_id,a.invoice_aaba_id,a.invoice_amount,a.discount_rate,a.discount_amount,a.fine_rate,a.fine_amount,a.final_amount,c.tender_no,c.amount as tender_amount FROM invoice_header a
inner join shresta_header b on a.shresta_id=b.id
inner join invoice_tender c on c.invoice_id=a.id and c.shresta_id=b.id
inner join offices d on d.id=a.office_id
inner join guthi_type e on e.id=b.guthi_type_id
where a.office_id=?
order by a.office_id,a.edate,b.tenant_name,a.tiro_aaba_id`;
    try {
        connection.query(query, [req.params.id], (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
            return res.status(200).json({ status: true, data: result })
        })
    } catch (err) {
        next(err)
    }
})
router.post('/genInvoice', async (req, res) => {
    const data = req.body;
    console.log('gen invoice lai aayeko data', data)
    try {
        //Check if lands are available
        const checkland = await checkIfLandExists(data)
        if (checkland == false) {
            return res.send({ message: `यो श्रेष्तामा जग्गा विवरण उपलब्ध छैन ।` });
        }

        // Check if invoice already exists
        const exists = await getIfExistsAlready(data);
        if (exists > 0) {
            return res.send({ message: `यो श्रेष्ता र आ.व को रसिद पहिला नै तयार भैसकेको छ ।` });
        }
        //Check if rate exists
        if (data.guthi_type_id == 1) {
            const checkRate = await checkIfAdhinastaRateExists(data);
            if (checkRate == false) {
                return res.send({ message: `यो आ.व.को दर सेट गरिएको छैन ।` });
            }
        }
        else {
            const checkRate = await checkIfRaitaniRateExists(data);
            if (checkRate == false) {
                return res.send({ message: `यो आ.व.को दर सेट गरिएको छैन ।` });
            }
        }
        // Generate invoice ID
        const invoice_no = await getLastInvNo(data);
        const data1 = { ...data, invoice_no };
        // Insert invoice header
        const headerResult = await insertIntoHeader(data1);
        const data2 = { ...data1, invoice_header_id: headerResult.insertId };
        console.log('data2', data2)
        // Insert invoice details
        const data3 = await insertIntoDetail(data2);
        //Update Rates in details table
        if (data.guthi_type_id == 1) {
            const data4 = await updateAdhinastaRatesInDetail(data3.invoice_header_id);
            if (data4 == true) {
                return res.status(200).json({ message: `रसिद नं ${data2.invoice_no} सफलतापुर्वक दर्ता भयो ।` });
            }
        }
        else {
            const data4 = await updateRaitaniRatesInDetail(data3.invoice_header_id);
            if (data4 == true) {
                return res.status(200).json({ message: `रसिद नं ${data2.invoice_no} सफलतापुर्वक दर्ता भयो ।` });
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Server Error' });
    }
});
const checkIfLandExists = async (data) => {
    const query = "select count(*) as count from shresta_details where shresta_id=?"
    const [rows] = await connection.promise().query(query, [data.shresta_id]);
    if (parseInt(rows[0].count) > 0) { return true } else { return false }
}
const checkIfRaitaniRateExists = async (data) => {
    console.log('check raitani rates', data);
    const query = "SELECT count(*) as count FROM rates_raitani WHERE ? BETWEEN start_aaba_id AND end_aaba_id and office_id=?"
    const [rows] = await connection.promise().query(query, [data.aaba_id, data.office_id]);
    if (parseInt(rows[0].count) > 0) { return true } else { return false }
}
const checkIfAdhinastaRateExists = async (data) => {
    const query = "SELECT count(*) as count FROM rates_adhinasta WHERE ? BETWEEN start_aaba_id AND end_aaba_id and office_id=?"
    const [rows] = await connection.promise().query(query, [data.aaba_id, data.office_id]);
    if (parseInt(rows[0].count) > 0) { return true } else { return false }
}
const getIfExistsAlready = async (data) => {
    const query = "SELECT COUNT(*) AS count FROM invoice_header WHERE office_id=? AND shresta_id=? AND tiro_aaba_id=?";
    const [rows] = await connection.promise().query(query, [data.office_id, data.shresta_id, data.aaba_id]);
    return parseInt(rows[0].count);
};
const getLastInvNo = async (data) => {
    const query = "SELECT COUNT(*) AS count FROM invoice_header WHERE office_id=? AND invoice_aaba_id=?";
    const [rows] = await connection.promise().query(query, [data.office_id, data.invoice_aaba_id]);
    const no = parseInt(rows[0].count) + 1;
    return `${data.office_id}-${data.invoice_aaba_id}-${no}`;
};
const insertIntoHeader = async (data) => {
    const now = new NepaliDate();
    const ndate = now.format('YYYY-MM-DD');
    const edate = new Date();
    const mon = ndate.split('-')[1];
    const query = `INSERT INTO invoice_header(invoice_no,state_id,district_id,office_id,guthi_type_id,tiro_aaba_id,invoice_aaba_id,shresta_id,edate,ndate,mon,invoice_amount,created_by_user_id)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const [result] = await connection.promise().query(query, [data.invoice_no, data.state_id, data.district_id, data.office_id, data.guthi_type_id, data.aaba_id, data.invoice_aaba_id, data.shresta_id, edate, ndate, mon, 0, data.user_id]);
    return result;
};
const insertIntoDetail = async (data) => {
    console.log('data2 came for inserting details', data)
    const query = `INSERT INTO invoice_details (
      invoice_header_id, invoice_no,guthi_type_id, shresta_id, district_id, palika_type_id, palika_id,
      gabisa_id, ward_no, land_type_id, land_sub_type_id, kitta_no, area_type_id,
      area, area_units, rate_aaba_id
    )
    SELECT 
      ?, ?,a.guthi_type_id,a.shresta_id, a.district_id, a.palika_type_id, a.palika_id,
      a.gabisa_id, a.ward_no, a.land_type_id, a.land_sub_type_id, a.kitta_no, a.area_type_id,
      a.area, a.area_units, ? FROM shresta_details a 
      WHERE a.shresta_id = ? and a.status=1 order by a.id`
    const values = [data.invoice_header_id, data.invoice_no, data.aaba_id, data.shresta_id];
    await connection.promise().query(query, values);
    return data;
}
const updateRaitaniRatesInDetail = async (invoice_header_id) => {
    console.log('for raitani rate updation header_id', invoice_header_id)
    const query = `UPDATE invoice_details AS i
    JOIN rates_raitani AS r
    ON i.rate_aaba_id BETWEEN r.start_aaba_id AND r.end_aaba_id    
    AND i.palika_type_id = r.palika_type_id
    AND i.area_type_id = r.area_type_id
    SET i.rate = r.rate,i.unit_rate = r.unit_rate,i.amount = ROUND(r.unit_rate * i.area_units, 2)
    WHERE i.invoice_header_id = ?`;
    const values = [invoice_header_id];
    await connection.promise().query(query, values);
    const query1 = `UPDATE invoice_header h 
    JOIN ( SELECT invoice_header_id, SUM(ROUND(amount,2)) AS total FROM invoice_details GROUP BY invoice_header_id)
    d ON h.id = d.invoice_header_id
    SET h.invoice_amount = d.total,h.final_amount=d.total       
    WHERE h.id = ?`;
    await connection.promise().query(query1, values);
    return true;
}
const updateAdhinastaRatesInDetail = async (invoice_header_id) => {
    console.log('for adhinasta rate updation header_id', invoice_header_id)
    const query = `UPDATE invoice_details AS i
    JOIN rates_adhinasta AS r
    ON i.rate_aaba_id BETWEEN r.start_aaba_id AND r.end_aaba_id    
    AND i.palika_type_id = r.palika_type_id
    and i.land_type_id=r.land_type_id
    and i.land_sub_type_id=r.land_sub_type_id
    AND i.area_type_id = r.area_type_id    
    SET i.rate = r.rate,i.unit_rate = r.unit_rate,i.amount = ROUND(r.unit_rate * i.area_units, 2)
    WHERE i.invoice_header_id = ?`;
    const values = [invoice_header_id];
    await connection.promise().query(query, values);
    const query1 = `UPDATE invoice_header h 
    JOIN (  SELECT invoice_header_id, SUM(ROUND(amount,2)) AS total FROM invoice_details GROUP BY invoice_header_id)
    d ON h.id = d.invoice_header_id
    SET h.invoice_amount = d.total,h.final_amount=d.total
    WHERE h.id = ?`;
    await connection.promise().query(query1, values);
    return true;
}
router.put('/updateRatesInInvoiceByid/:invid/:shrestaid', async (req, res, next) => {
    let invoice_id = req.params.invid
    let shresta_id = req.params.shrestaid
    console.log('InvoiceId:', invoice_id, 'ShrestaId: ', shresta_id);
    //lets check the guthi type first.
    try {
        const [guthiRow] = await connection.promise().query('SELECT guthi_type_id FROM shresta_header WHERE id = ?', [shresta_id]);
        const guthi_type_id = guthiRow[0].guthi_type_id;
        console.log('guthi_type_id', guthi_type_id)
        if (guthi_type_id == 1) {
            const data4 = await updateAdhinastaRatesInDetail(invoice_id);
            if (data4 == true) {
                return res.status(200).json({ status: true, message: `सफलतापुर्वक गणना भयो ।` })
            }
        }
        else {
            const data4 = await updateRaitaniRatesInDetail(invoice_id);
            if (data4 == true) {
                return res.status(200).json({ status: true, message: `सफलतापुर्वक गणना भयो ।` })
            }
        }

    } catch (error) {
        console.log(error);
    }



})
router.get('/getmonthsum/:officeid/:aabaid', async (req, res, next) => {
    console.log(req.params.officeid, req.params.aabaid)
    try {
        let query = `select a.mon,b.month_name,a.guthi_type_id,c.guthi_type_name,
        SUM(CASE WHEN tiro_aaba_id <> ? THEN final_amount ELSE 0 END) AS bakyeuta,
        SUM(CASE WHEN tiro_aaba_id = ? THEN final_amount ELSE 0 END) AS thisyear,
        SUM(final_amount) AS total from invoice_header a
        inner join months b on a.mon=b.id
        inner join guthi_type c on a.guthi_type_id=c.id
        where a.invoice_aaba_id=? and a.office_id=? and a.paid_status=1
        group by a.mon,b.month_name,a.guthi_type_id,c.guthi_type_name
        order by a.mon`
        const [results] = await connection.promise().query(query, [req.params.aabaid, req.params.aabaid, req.params.aabaid, req.params.officeid]);
        return res.status(200).json({ message: 'डाटा सफलतापुर्वक प्राप्त भयो ।', data: results });
    } catch (error) {
        next(error)
    }
})
router.get('/dupliland/:land_id', async (req, res, next) => {
    try {
        const land_id = req.params.land_id;
        console.log(land_id);
        let query = `INSERT INTO shresta_details(
  shresta_id,
  state_id,
  district_id,
  office_id,
  guthi_type_id,
  palika_type_id,
  palika_id,
  gabisa_id,
  ward_no,
  land_type_id,
  land_sub_type_id,
  kitta_no,
  area_type_id,
  area,
  area_units,
  created_by_user_id,
  updated_by_user_id,
  status,
  remarks_for_disabling
)
SELECT
  shresta_id,
  state_id,
  district_id,
  office_id,
  guthi_type_id,
  palika_type_id,
  palika_id,
  gabisa_id,
  ward_no,
  land_type_id,
  land_sub_type_id,
  kitta_no,
  area_type_id,
  area,
  area_units,
  created_by_user_id,
  updated_by_user_id,
  status,
  remarks_for_disabling
FROM shresta_details
WHERE id = ?`;
        const [results] = await connection.promise().query(query, land_id);
        return res.status(200).json({ message: 'जग्गा सफलतापुर्वक कपि भयो ।', data: results });
    } catch (error) {
        next(error)
    }





})
router.get('/getTenderByNo/:tender_no', async (req, res, next) => {
    console.log(req.params.tender_no)
    let query = `select a.*,b.guthi_name,b.tenant_name,b.tenant_address from invoice_tender a
    left join shresta_header b on a.shresta_id=b.id
    where a.tender_no=?`;
    try {
        connection.query(query, [req.params.tender_no], (err, result) => {
            if (err) {
                next(err);
            }
            return res.status(200).json({ status: true, data: result })
        })
    } catch (err) {
        next(err)
    }
})
router.get('/getTenderById/:tender_id', async (req, res, next) => {
    console.log(req.params.tender_id)
    let query = `select a.* from invoice_tender a where a.id=?`;
    try {
        connection.query(query, [req.params.tender_id], (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
            return res.status(200).json({ status: true, data: result })
        })
    } catch (err) {
        next(err)
    }
})
router.post('/updateTender', async (req, res, next) => {
    try {
        let user = req.body;
        const values = [user.aaba_id,user.shresta_id,user.ndate,user.tender_no, user.amount, user.user_id, user.id]
        console.log(values)
        let query = `update invoice_tender a
    set
    a.aaba_id=?,
    a.shresta_id=?,
    a.ndate=?,
    a.tender_no=?,
    a.amount=?,
    a.updated_by_user_id=? where a.id=?`;
        const [rows] = await connection.promise().query(query, values);
        console.log(rows);
        return res.status(200).json({ status: true, message: "भौचर विवरण संशोधन भयो।" })
    } catch (error) {
        next(error)
    }


})
router.get('/getDistinctPalika/:office_id', async (req, res, next) => {
    try {
        let values = [req.params.office_id]
        let query = `select distinct a.palika_id,b.palika_name from shresta_details a
        inner join palikas b on b.id=a.palika_id        
        where a.office_id=? order by b.palika_name`
        const [rows] = await connection.promise().query(query, values);
        return res.status(200).json({ status: true, data: rows })
    } catch (error) {
        next(error)
    }
})
router.get('/getDistinctGabisa/:palika_id', async (req, res, next) => {
    try {
        let values = [req.params.palika_id]
        let query = `select distinct a.gabisa_id,c.gabisa_name from shresta_details a        
        inner join gabisas c on c.id=a.gabisa_id
        where a.palika_id=? order by c.gabisa_name`
        const [rows] = await connection.promise().query(query, values);
        return res.status(200).json({ status: true, data: rows })
    } catch (error) {
        next(error)
    }
})
router.get('/getDistinctWards/:gabisa_id', async (req, res, next) => {
    try {
        let values = [req.params.gabisa_id]
        let query = `select distinct a.ward_no from shresta_details a        
        where a.gabisa_id=?
        order by a.ward_no`
        const [rows] = await connection.promise().query(query, values);
        return res.status(200).json({ status: true, data: rows })
    } catch (error) {
        next(error)
    }
})
router.post('/getKittaDetails', async (req, res, next) => {
    try {
        let user = req.body;
        console.log(user);
        let values = [user.office_id, user.palika_id, user.gabisa_id, user.ward_no, user.kitta_no]
        let query = `select a.shresta_id,a.guthi_type_id,e.guthi_type_name,b.guthi_name,b.tenant_name,b.tenant_address,c.palika_name,d.gabisa_name,a.ward_no,a.kitta_no,a.area,a.status from shresta_details a
inner join shresta_header b on a.shresta_id=b.id
inner join palikas c on c.id=a.palika_id
inner join gabisas d on d.id=a.gabisa_id
inner join guthi_type e on a.guthi_type_id=e.id
where a.office_id=? and a.palika_id=? and gabisa_id=? and ward_no=? and kitta_no=?`
        const [rows] = await connection.promise().query(query, values);
        return res.status(200).json({ status: true, data: rows })
    } catch (error) {
        next(error)
    }
})
module.exports = router