var fs=require("fs");
const path = require('path');
const xlsx = require("node-xlsx");
const lj='./';
const lj1=lj+'schoolf/';
const lj2=lj+'zyf/';
const lj3=lj+'zsjz/';
var school_score=[];
var zy_score=[];
var zsjz=[];
var ls;
const reads=function(ljs){
	var filePath1 = path.resolve(ljs);
	var tt=[];
	var ss=[];
	var files=fs.readdirSync(filePath1);
	for(var i=0;i<files.length;i++){
				ls=xlsx.parse(ljs+files[i]);
				tt=ls[0]["data"];
				//tt.splice(0,1);
				//console.log(tt);
				/*for(var m=0;m<tt.length;m++){
					for(var n=0;n<tt[m].length;n++){
						if(typeof(tt[m][n])=="string"){
							if(!isNaN(parseInt(tt[m][n]))){
								tt[m][n]=parseInt(tt[m][n]);
							}else{
								tt[m][n]=tt[m][n].replace(/(\s*)/g, "");
							}
						}
					}
				}*/
				ss=ss.concat(tt);
	}
	
	return ss;
}

school_score=xlsx.parse("./s1.xlsx");
school_score=school_score[0]["data"];
zy_score=xlsx.parse("./s2.xlsx");
zy_score=zy_score[0]["data"];
zsjz=xlsx.parse("./s3.xlsx");
zsjz=zsjz[0]["data"];
var pgb=reads(lj+"pinggu/");


var nsch={'data':school_score};
var nzy={'data':zy_score};
var nzs={'data':zsjz};
var npgb={'data':pgb};

var ntxt=JSON.stringify(nsch);
fs.writeFile("nsch.json",ntxt,function(){console.log("文件写入完毕");});
ntxt=JSON.stringify(nzy);
fs.writeFile("nzy.json",ntxt,function(){console.log("文件写入完毕");});
ntxt=JSON.stringify(nzs);
fs.writeFile("nzs.json",ntxt,function(){console.log("文件写入完毕");});
ntxt=JSON.stringify(npgb);
fs.writeFile("npgb.json",ntxt,function(){console.log("文件写入完毕");});