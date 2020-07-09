'use strict';


import { app, protocol, BrowserWindow ,ipcMain, Menu} from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
import fs from 'fs'
import xlsx from 'node-xlsx'
const isDevelopment = process.env.NODE_ENV !== 'production'
let pingce:Array<Array<any>>=[];
/*function readdirs(ljs:string){
  const fs = require("fs");
  const path = require('path');
  const xlsx = require("node-xlsx");
  var filePath1 = path.resolve(ljs);
  let tt:Array<Array<any>>=[];
  let ss:Array<Array<any>>=[];
  var ls:Array<{[key:string]:any}>;
  let files = fs.readdirSync(filePath1);
  for(var i=0;i<files.length;i++){
    ls=xlsx.parse(ljs+files[i]);
    tt=ls[0]["data"];
    tt.splice(0,1);
    ss=ss.concat(tt);
  }
  //console.log(ss);
  let lens=ss.length;
  for(let i=0;i<lens;i++){
    if(ss[i].length==0){
      ss.slice(i,1);
      i--;
      lens--;
      continue;
    }else{
      console.log(ss[i]);
      ss[i][3]=ss[i][3].replace(/(\s*)/g,"");
    }
    
  }
  console.log(ss.length);
  return ss;
}
*/
let jiliang=0;
const lj='./public/excel/';
const lj1=lj+'schoolf/';
const lj2=lj+'zyf/';
const lj3=lj+'zsjz/';
let rd:Array<Array<any>>=[];
let zyfen:Array<Array<any>>=[];
let zsjz:Array<Array<any>>=[];
const reads=function(ljs:string,lis:number){
  const fs = require("fs");
  const path = require('path');
  const xlsx = require("node-xlsx");
  var ls:Array<{[key:string]:any}>;
  var filePath1 = path.resolve(ljs);
  let tt:Array<Array<any>>=[];
  let ss:Array<Array<any>>=[];
  fs.readdir(filePath1,function(err:string,files:Array<any>){
    for(var i=0;i<files.length;i++){
      ls=xlsx.parse(ljs+files[i]);
      tt=ls[0]["data"];
      //tt.splice(0,1);
      ss=ss.concat(tt);
    }
    console.log(ss.length);
    switch(lis){
      case 1:rd=ss;break;
      case 2:zyfen=ss;break;
      case 3:zsjz=ss;break;
      case 4:pingce=ss;break;
    }
    jiliang++;
  });
}

function pinggu(){
  //pingce=readdirs("./public/excel/pinggu/");
  /*reads("./src/excel/pinggu/",4);
  reads(lj1,1);
  reads(lj2,2);
  reads(lj3,3);*/
  let ls:{[key:string]:any};
  ls=require("./excel/nsch.json");
  rd=ls["data"];
  //console.log(rd[0]);
  ls={};
  ls=require("./excel/nzy.json");
  zyfen=ls["data"];
  //console.log(zyfen[0]);
  ls={};
  ls=require("./excel/nzs.json");
  zsjz=ls["data"];
 // console.log(zsjz[0]);
  ls={};
  ls=require("./excel/npgb.json");
  pingce=ls["data"];
  //console.log(pingce[0]);
}
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
]);
function createWindow() {
  Menu.setApplicationMenu(null);
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }

  win.on('closed', () => {
    win = null;
  });
  pinggu();
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});


// ipcMain.on('asynchronous-message', (event, arg) => { //主进程接收渲染进程的请求事件
//   console.log(arg); // prints "ping" //获取参数

//   event.sender.send('asynchronous-reply', 'pong'); //将事件处理结果在以另一个响应返给渲染进程
// });

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools();
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }

  createWindow();
});


function sjhq2(n:string,f:number,w:number,wl:string):number{
  //console.log(n);
  //console.log(rd[1]);
  const fs = require("fs");
  const path = require('path');
  const xlsx = require("node-xlsx");
  const fenduanbiao=require('./json/fenduanbiao.json');
  
  const pat =app.getPath("desktop")+"\\";
  
  //把所有数据读取，得到三个二维数组
  const jz:{[key:string]:any}={};
  for(let iii=0;iii<zsjz.length;iii++){
    jz[zsjz[iii][0]]=zsjz[iii][1];
  }
  //console.log(jz);
  const up=30;
  const down=30;
  const wcup=1000;
  const wcdown=1000;
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
  let k=0;
  const xq:{[key:string]:any}={};
  let bs=-1;
  let ida;
  let km;
  let x;
  //学校分数:[school_name,years,mins,avgs,maxs,min_section,leixing,batch_name,local_type]
  for(let j=0;j<rd.length;j++){//选取符合范围的数据
      bs=-1;
      km=rd[j][8];
      if(km==wenli){
          continue;
      }else{
        x=parseInt(rd[j][5]);
        if(!isNaN(x) && x && w>0){
          if(x>w-wcdown && x<w-0+wcup){
            bs=j;
          }
        }else{
          x=parseInt(rd[j][2]);
          if(!isNaN(x) && x){
              if(x>fenshu-down && x<fenshu-0+up){
                  bs=j;
              }
          }
          else{
              x=parseInt(rd[j][3]);
              if(!isNaN(x) && x){
                  if(x>fenshu-20-down && x<fenshu-20+up){
                      bs=j;
                  }
              }
              else{
                  x=parseInt(rd[j][4]);
                  if(!isNaN(x) && x){
                      if(x>fenshu-40-down && x<fenshu-40+up){
                          bs=j;
                      }
                  }
              }
          }
        }
          
        if(bs>=0){
          ida=rd[j][0];
          if(!xq[ida]){
              xq[ida]=[];	
              //console.log(id);
          }
          //xq[ida].push(j);
          bs=-1;
        }
      }
  }
  for(let mp in xq){
    for(let cc in rd){
      if(mp==rd[cc][0] && rd[cc][8]!=wenli){
        xq[mp].push(cc);
      }
    }
  }


  let sfsy:Array<any>=[];
  for(let ms in xq){//按年份排序
    xq[ms].sort((a:number,b:number)=>rd[b][2]-rd[a][2]);
    xq[ms].sort((a:number,b:number)=>rd[b][1]-rd[a][1]);
    sfsy.push(ms);
  }
  //建立关于学校列表学校和分数的对应关系索引，进行学校排序
  sfsy.sort((a:string,b:string)=>rd[xq[a][0]][5]-rd[xq[b][0]][5]);
  //console.log(sfsy);
  //专业分数:school_name	years	batch_name	mins	avgs	maxs	min_section	local_type	s_name

  const zylist:{[key:string]:any}={};//保存对应学校专业的索引
  let j;
  let i;
  let id;
  for(id in xq){
      if(!zylist[id]){
          zylist[id]=[];	
      }
      for(j=0;j<zyfen.length;j++){
          if(zyfen[j][0]==id){
              if(zyfen[j][7]==wenli){
                  continue;
              }
              zylist[id].push(j);//得到由schooidl索引的字典集合
          }
      }
  }
  
  for(let mss in zylist){//按年份排序
    zylist[mss].sort((a:number,b:number)=>zyfen[b][3]-zyfen[a][3]);
    zylist[mss].sort((a:number,b:number)=>zyfen[b][1]-zyfen[a][1]);
  }
  //let schinf1=fs.readFileSync(pat+'nschinf.json');
  const schinf:{[key:string]:any}=require("./json/n.json");
  const xdata=[["学校","年份","最高分","平均分","最低分","最低位次","城市","985/211","双一流","公办/民办","批次","文理","招生简章"]];
  for(x in sfsy){
      for(i=0;i<xq[sfsy[x]].length;i++){
          let s985="-";
          let city="-";
          let syl="-";
          let sn="-";
          let gw="";
          if(schinf[sfsy[x]]){
            s985=schinf[sfsy[x]]['a985'];
            city=schinf[sfsy[x]]['city'];
            syl=schinf[sfsy[x]]['syl'];
            sn=schinf[sfsy[x]]['school_nature'];
            gw=schinf[sfsy[x]]['guanwang'];
          }
          let tts=rd[xq[sfsy[x]][i]];
          let lins:string=jz[sfsy[x]] || gw;
          xdata.push([sfsy[x],tts[1],tts[4],tts[3],tts[2],tts[5],city,s985,syl,sn,tts[7],tts[8],lins]);
      }	
  }
  //console.log(xdata);
  
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
  const zydata=[["学校","年份","专业","最高","平均","最低","最低位次","批次","文理","类别","第几批特色专业","专业评估"]];
  for(x in sfsy){
      for(i=0;i<zylist[sfsy[x]].length;i++){
          ssy=zyfen[zylist[sfsy[x]][i]];
          zydata.push([sfsy[x],ssy[1],ssy[8],ssy[5],ssy[4],ssy[3],ssy[6],ssy[2],ssy[7],ssy[10],ssy[11],ssy[12]]);
      }
  }
  writes(pat+n+"专业.xlsx",zydata);
  //console.log(zydata);
  return 1;
}



ipcMain.on("student_status",(event,arg)=>{
  //console.log(app.getAppPath("src"));
  let ss=sjhq2(arg[0],arg[1],arg[2],arg[3]);
  event.returnValue = "查询结果存放至桌面";
  /*const fs = require("fs");
  const xlsx = require("node-xlsx");*/
});

ipcMain.on("school_check",(event,arg)=>{//查询该学校是否在pingce当中
  console.log(arg);
  //console.log(pingce);
  let ret:Array<any>=[];
  const cx=function(a:string){
    let i=0;
    for(;i<ret.length;i++){
      if(a==ret[i]['message']){
        return false;
      }
    }
    return true;
  }
  //let x:Array<any>=[];
  let x=0;
  for(;x<pingce.length;x++){
    //console.log(pingce[x]);
    if(pingce[x][4].indexOf(arg[0])>=0 && cx(pingce[x][4])){
      ret.push({message:pingce[x][4]});
    }
  }
  console.log(ret);
  event.returnValue = ret;
  /*const fs = require("fs");
  const xlsx = require("node-xlsx");*/
});
ipcMain.on("school_check2",(event,arg)=>{
  console.log(arg);
  let ret:Array<any> = [{message:["学校","学科","类别编号","类别","评估"]}];
  
  const sc:{[key:string]:number}={
      'A+':5,
      'A':4,
      'A-':3,
      'B+':2,
      'B':1,
      'B-':0,
      'C+':-1,
      'C':-2,
      'C-':-3
    };
    
  for(let x=0;x<pingce.length;x++){
    if(pingce[x][4]==arg[0]){
      ret.push({message:[pingce[x][4],pingce[x][2],pingce[x][1],pingce[x][0],pingce[x][3]]});
    }
  }
  console.log(ret);
  ret.sort((a:any,b:any)=>sc[b['message'][4]]-sc[a['message'][4]]);

  event.returnValue = ret;
  /*const fs = require("fs");
  const xlsx = require("node-xlsx");*/
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})