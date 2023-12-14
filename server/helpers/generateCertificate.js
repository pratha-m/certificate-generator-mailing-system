import {ejs,fs,puppeteer} from "../packages/packages.js";

export const generateCertificate=async(user_name,no_of_trees)=>{
    const ejsPath="views/certificate.ejs"

    const fileRead=fs.readFileSync(ejsPath,"utf-8");

    const html=ejs.render(fileRead,{name:user_name,no_of_trees:no_of_trees});

    const browser=await puppeteer.launch({headless:"new"});

    const page=await browser.newPage();

    await page.setContent(html);

    const pdfBuffer=await page.pdf({format:"A4"});

    await browser.close();

    return pdfBuffer;
}