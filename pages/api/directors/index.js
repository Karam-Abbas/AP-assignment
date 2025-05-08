import fs from 'node:fs'
import path from 'path';
export default function handler(req,res){
    const p = path.join(process.cwd(),'data','data.json')
    const data = fs.readFileSync(p)
    const arr = JSON.parse(data);
    const directors = arr.directors;
    if(req.method==='GET'){
        res.status(200).json(directors);
    }
}