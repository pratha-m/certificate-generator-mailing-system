import {ejs,fs,puppeteer} from "../packages/packages.js";
import { dotenv } from "../packages/packages.js";
dotenv.config();

export const generateCertificate=async(user_name,no_of_trees)=>{
    const ejsPath="views/certificate.ejs"

    const fileRead=fs.readFileSync(ejsPath,"utf-8");

    const html=ejs.render(fileRead,{name:user_name,no_of_trees:no_of_trees});

    // const browser=await puppeteer.launch({headless:"new"});
    const browser=await puppeteer.launch({
        args:[
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote"
        ],
        executablePath:process.env.NODE_ENV==='production' ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()
    }); 

    const page=await browser.newPage();

    await page.setContent(html);

    const pdfBuffer=await page.pdf({format:"A4"});

    await browser.close();

    return pdfBuffer;
}