var express = require('express');
var fs = require("fs");
const axios = require("axios");
const bcrypt = require("bcrypt");
var router = express.Router();
var parseMS = require("parse-ms-js");
var { getStandardResponse, getApi, getV2, checkChar, errorResponse, GtResponse } = require("../lib/func");
const { get } = require('express/lib/response');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render()
});

router.get("/api/hek/tokeninfo", function (req, res, next) {
    const tokens = req.query.token

    if (!tokens) {
        return res.json(getStandardResponse(400, "Please input your token..."))
    }
    else {
        axios.get('https://discord.com/api/v6/users/@me', {
            headers: {
                "authorization": tokens
            }
        })
        .then(ress => {
            if (ress.status == 401) {
                return res.json(getStandardResponse(401, "Your Token is not valid, please check your token..."))
            }
            if (ress.data.id) {
                if (!ress.premium_type) {
                    nitros = "Nitro"
                } else {
                    if (ress.premium_type === 1) {
                        nitros = "Nitro Classic"
                    }
                    if (ress.premium_type === 2) {
                        nitros = "Nitro Gaming"
                    }
                }
                res.json({
                    status: 200,
                    message: `Successfully`,
                    data: {
                        token: tokens,
                        id: ress.data.id,
                        tag: `${ress.data.username}#${ress.data.discriminator}`,
                        email: ress.data.email,
                        phone: ress.data.phone,
                        nitro: nitros
                    }
                })
            }
        })
        .catch(err => {
            console.log(`${err}`)
            res.json(errorResponse())
        })
    }
})

router.get("/api/hek/genpass", function (req, res, next) {
    const pass = req.query.pass
    const pns = 12

    if (!pass) {
        return res.json(getStandardResponse(400, `Password Parameternya Mana Koncol`))
    }
    else {
        bcrypt.hash(pass, pns, (err, has) => {
            if (err) {
                return res.json(getStandardResponse(500, `Something Error`))
            }
            else {
                return res.json({
                    status : 200,
                    normalpass : pass,
                    hashpass : has
                })
            }
        })
    }
})

router.get("/api/gtps/reader", function (req, res, next) {
    const target = req.query.ip

    const packet1 = ["growtopia1.com", "growtopia2.com"];
    const packet2 = ["37", "38"];

    const host = packet1[Math.floor(Math.random() * packet1.length)];
    const contentlength = packet2[Math.floor(Math.random() * packet2.length)];

    if (!target) {
        return res.json(getStandardResponse(400, "Please input the ip parameter..."))
    }
    else {
        axios.post(`http://${target}/growtopia/server_data.php`, {
            headers: {
                "Accept": "*/*",
                "Host": host,
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": contentlength,
                "user-agent": ""
            },
            data: 'version=3%2E82&platform=0&protocol=146'
        })
        .then(ress => {
            return res.json(getStandardResponse(200, `${ress.data}`))
        })
        .catch(err => {
            console.log(`Error : ${err}`)
            res.json(GtResponse(target))
        })
    }
})

router.get("/api/hek/vpn", function (req, res, next) {
    const ips = req.query.ip
    const url = `http://v2.api.iphub.info/ip/${ips}`

    if (!ips) {
        return res.json(getStandardResponse(400, "Please enter the ip parameter..."))
    }
    else if (ips === "127.0.0.1" || ips === "0.0.0.0" || ips.startsWith("192.168")) {
        return res.json(getStandardResponse(403, "Tester ip detected by system, please use a valid ip.."))
    }
    else {
        axios.get(url, {
            headers: {
                "X-Key": getApi()
            }
        })
        .then(ress => {
            if (ress.data.block > 0) {
                res.json(getStandardResponse(200, "True"))
            }
            else if (ress.data.block < 0) {
                res.json({
                    status: 500,
                    message: `Api Was Got Banned...`
                })
            }
            else {
                res.json(getStandardResponse(200, "False"))
            }
        })
        .catch(err => {
            console.log(`Error : ${err}`)
            res.json(errorResponse())
        })
    }
})

router.get("/api/hek/track", function (req, res, next) {
    const ips = req.query.ip
    const url = `https://api.freegeoip.app/json/${ips}?apikey=${getV2()}`

    if (!ips) {
        return res.json(getStandardResponse(400, "Please Enter the ip parameter...."))
    }
    else if (ips === "127.0.0.1" || ips === "0.0.0.0" || ips.startsWith("192.168")) {
        return res.json(getStandardResponse(403, "Tester ip detected by system, please use a valid ip.."))
    }
    else {
        axios.get(url, {
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
            }
        })
        .then(ress => {
            const ct = ress.data.country_name;
            const cty = ress.data.city;
            const rg = ress.data.region_name;

            if (ct === undefined || ct === null) return ct = "Not Tracked"
            if (cty === undefined || cty === null) return cty = "Not Tracked"
            if (rg === undefined || rg === null) return rg = "Not Tracked"

            res.json({
                status: 200,
                data: `${ct}, ${cty}, ${rg}`
            })
        })
        .catch(err => {
            console.log(`Error : ${err}`)
            res.json(errorResponse())
        })
        
    }
})

router.get("/api/gtps/flag", function (req, res, next) {
    const ips = req.query.ip
    const url = `https://api.freegeoip.app/json/${ips}?apikey=${getV2()}`

    if (!ips) {
        return res.json(getStandardResponse(400, "Please Enter the ip parameter...."))
    }
    else if (ips === "127.0.0.1" || ips === "0.0.0.0" || ips.startsWith("192.168")) {
        return res.json(getStandardResponse(403, "Tester ip detected by system, please use a valid ip.."))
    }
    else {
        axios.get(url, {
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
            }
        })
        .then(ress => {
            const ct = ress.data.country_code
            if (ct === undefined || ct === null) return ct = "Not Tracked"

            res.json({
                status: 200,
                data: `${ct}`
            })
        })
        .catch(err => {
            console.log(`Error : ${err}`)
            res.json(errorResponse())
        })
        
    }
})

module.exports = router;
