import { IncomingForm } from "formidable";
const fs = require('fs');
var mv = require('mv');

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

            let uploads = [];
            for (let k in files.file) {
                // console.log(files.file[k].filepath);
                mv(files.file[k].filepath, `./public/uploads/${files.file[k].originalFilename}`, function (err) {
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

        });
    });


export default async function handler(req, res) {
    console.log("Receiving");
    if (req.method === "POST") {
        const result = await asyncParse(req);
        res.status(200).json({ result });
    }
}

