import { IncomingForm } from "formidable";
const fs = require('fs');
var mv = require('mv');
const path = require('path');

export const config = {
    api: {
        bodyParser: false
    }
};

const asyncParse = (req) =>
    new Promise((resolve, reject) => {
        const form = new IncomingForm({ multiples: true });
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });


export default async function handler(req, res) {
    console.log("Receiving");
    let uploads = [];
    let source = res;
    console.log(res);
    for (let k in req.files) {
        req.files[k].mv(source, `./public/uploads/${files.file.originalFilename}`, function (err) {
            let promise = new Promise(function (resolve, reject) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
            uploads.push(promise);
            console.log(promise);
        })
    } // end for loop
    if (req.method === "POST") {
        const result = await asyncParse(req);
        res.status(200).json({ result });
    }
}

