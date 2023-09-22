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

            let uploads = [];
            let links = [];
            for (let k in files.file) {
                const ext = files.file[k].originalFilename.split('.').pop();
                const newFilename = Date.now() + '.' + ext;
                const link = `${process.env.BASE}/uploads/${newFilename}`;
                // console.log(files.file[k].filepath);
                mv(files.file[k].filepath, `./public/uploads/${newFilename}`, function (err) {
                    let promise = new Promise(function (resolve, reject) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                    links.push(link);
                    uploads.push(promise);
                    // console.log(promise);
                    // console.log(link);
                    resolve({ fields, files, uploads, links });
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

