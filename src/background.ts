'use strict'

import { app, protocol, BrowserWindow ,ipcMain} from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
import fs from 'fs'
import xlsx from 'node-xlsx'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      //nodeIntegration: (process.env
          //.ELECTRON_NODE_INTEGRATION as unknown) as boolean
      nodeIntegration:true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

function sjhq1(n:string,f:number,w:number,wl:string):number{
  //console.log(app.getAppPath());
  let lspat=__dirname;
  //lspat.replace("\dist_electron");
  const pat =app.getPath("desktop")+"\\";
  console.log(pat);
  //const txt = require("./json/fsschool.json");
  //console.log(txt);
  //const hui=fs.readFileSync('json/fsschool.json');
  const datas=require("./json/fsschool.json");
  //console.log(datas);
  const rd=datas["RECORDS"];
  const len1=rd.length;
  const up=30;
  const down=30;//上下30分区间
  const fenshu=f;//分数
  const srwl=wl;
  let wenli;
  let wlbj="wen";
  if(srwl=="理科"){
      wlbj="li";
      wenli="文科";
  }else{
      wenli="理科";
  }//wenli对实际输入取反，因为存在”科类“属性的学校
  let weici;
  const fenduanbiao=require('./json/fenduanbiao.json');
  /*
    //后续拿到2020分段表之后在这里添加对应关系 
  */ 
  
  let k=0;
  const xq:{[key:string]:any}={};
  let bs=-1;
  let ida;
  let km;
  let x;
  for(let j=0;j<len1;j++){//选取符合范围的数据
      bs=-1;
      km=rd[j]["wenli"];
      if(km==wenli){
          continue;
      }else{
          x=parseInt(rd[j]["mins"]);
          if(!isNaN(x) && x){
              if(x>fenshu-down && x<fenshu+up){
                  bs=j;
              }
          }
          else{
              x=parseInt(rd[j]["avgs"]);
              if(!isNaN(x) && x){
                  if(x>fenshu-20-down && x<fenshu-20+up){
                      bs=j;
                  }
              }
              else{
                  x=parseInt(rd[j]["maxs"]);
                  if(!isNaN(x) && x){
                      if(x>fenshu-40-down && x<fenshu-40+up){
                          bs=j;
                      }
                  }
              }
          }
          if(bs>=0){
              ida=rd[j]["school_id"];
              if(!xq[ida+""]){
                  xq[ida+""]=[];	
                  //console.log(id);
              }
              xq[ida+""].push(j);
              bs=-1;
          }
      }
  }
  
  const zylist:{[key:string]:any}={};//保存对应学校专业的索引
  k=0;
  
  //const hui2=fs.readFileSync(pat+'huizong.json');
  const datas2=require("./json/huizong.json");
  const zyfen=datas2["RECORDS"];
  let j;
  let i;
  let id;
  for(id in xq){
      if(!zylist[id]){
          zylist[id]=[];	
      }
      for(j=0;j<zyfen.length;j++){
          if(zyfen[j+""]["school_id"]==id){
              if(zyfen[j+""]["local_type"]==wenli){
                  continue;
              }
              zylist[id+""].push(j);//得到由schooidl索引的字典集合
          }
      }
  }
  
  //let schinf1=fs.readFileSync(pat+'nschinf.json');
  const schinf:{[key:string]:any}=require("./json/nschinf.json");
  const xdata=[["学校","年份","最高分","平均分","最低分","最低位次","城市","985/211","双一流","批次","文理","招生简章"]];
  for(x in xq){
      for(i=0;i<xq[x].length;i++){
          if(isNaN(parseInt(rd[xq[x][i]]["min_section"])) && !isNaN(parseInt(rd[xq[x][i]]["mins"]))){
            let lists=fenduanbiao[wlbj+parseInt(rd[xq[x][i]]["years"])];
            let lens=lists.length;
            let suoyin=lens-parseInt(rd[xq[x][i]]["mins"])+99;
            rd[xq[x][i]]["min_section"]=lists[suoyin];
          }
          xdata.push([schinf[x]["sname"],rd[xq[x][i]]["years"],rd[xq[x][i]]["maxs"],rd[xq[x][i]]["avgs"],rd[xq[x][i]]["mins"],rd[xq[x][i]]["min_section"],schinf[x]["city"],schinf[x]["a985"],schinf[x]["syl"],rd[xq[x][i]]["pici"],rd[xq[x][i]]["wenli"]]);
      }	
  }
  
  const writes=function(loads:string,sj:any){
      const buffer=xlsx.build([
          {
              name:"sheet1",
              data:sj
          }
      ]);
      fs.writeFileSync(loads,buffer,{'flag':'w'});
  }
  writes(pat+n+" 学校.xlsx",xdata);
  
  let ssy;
  const zydata=[["学校","年份","专业","最高","平均","最低","最低位次","批次","文理"]];
  for(x in zylist){
      for(i=0;i<zylist[x].length;i++){
          ssy=zyfen[zylist[x][i]];
          if(ssy["mins"]>0){
            let lists=fenduanbiao[wlbj+ssy["years"]];
            let listlen=fenduanbiao[wlbj+ssy["years"]].length;
            let suoyin=listlen-ssy["mins"]+99;
            ssy["min_section"]=lists[suoyin];
          }
          zydata.push([schinf[x]["sname"],ssy["years"],ssy["spe_name"],ssy["maxs"],ssy["avg"],ssy["mins"],ssy["min_section"],ssy["batch_name"],ssy["local_type"]]);
      }
  }
  writes(pat+n+"专业.xlsx",zydata);
  return 1;
}




ipcMain.on("asd",(event,arg)=>{
  //console.log(app.getAppPath("src"));
  let ss=sjhq1(arg[0],arg[1],arg[2],arg[3]);
  event.returnValue = "查询结果存放至桌面";
  /*const fs = require("fs");
  const xlsx = require("node-xlsx");*/
});


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
