import puppeteer from "puppeteer-core";
const CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const b=await puppeteer.launch({executablePath:CHROME,headless:"new",args:["--no-sandbox","--force-device-scale-factor=1"]});
const p=await b.newPage(); await p.setViewport({width:1440,height:900,deviceScaleFactor:1});
for(const [u,o] of [["/","home-full.png"],["/solo","solo-full.png"]]){
  await p.goto("http://localhost:8080"+u,{waitUntil:"networkidle0",timeout:30000});
  await new Promise(r=>setTimeout(r,500));
  await p.screenshot({path:".debug-shots/"+o, fullPage:true});
  console.log("captured",o);
}
await b.close();
