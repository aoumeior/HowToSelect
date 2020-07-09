const fs = require("fs");
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
				tt.splice(0,1);
				//console.log(tt);
				for(var m=0;m<tt.length;m++){
					for(var n=0;n<tt[m].length;n++){
						if(typeof(tt[m][n])=="string"){
							if(!isNaN(parseInt(tt[m][n]))){
								tt[m][n]=parseInt(tt[m][n]);
							}else{
								tt[m][n]=tt[m][n].replace(/(\s*)/g, "");
							}
						}
					}
				}
				ss=ss.concat(tt);
	}
	
	return ss;
}

school_score=reads(lj1);
zy_score=reads(lj2);
zsjz=reads(lj3);
/*处理一下特色专业*/
var tszy=reads(lj+"dijipi/");
//for(var s=0;s<tszy.length;s++){}

//console.log(tszy);
//评估表
var pgb=reads(lj+"pinggu/");
//console.log(pgb);

//二级学科对照关系
var kmb=reads("./xuekeguanxi/");
var lenk=kmb.length;
for(var i=0;i<lenk;i++){
	if(kmb[i][0]==null){
		kmb.splice(i,1);
		i--;
		lenk--;
	}else{
		//console.log(kmb[i]);
		kmb[i][1]=kmb[i][1].replace(/(\(|（).{1,}(\)|）)/g,"");
		kmb[i][0]=kmb[i][0].replace("类","");
		//if(i<1000){console.log(kmb[i]);}
		
	}
	
}

var schinf=require("./n.json");
var fenduanbiao=require("./fenduanbiao.json");

var len1=school_score.length;
for(var i=0;i<len1;i++){
	if(parseInt(school_score[i][1])!=2018 && parseInt(school_score[i][1])!=2019 || school_score[i][7]=="专科批"){
		school_score.splice(i,1);
		i--;
		len1--;
		continue;
	}
	if(schinf[school_score[i][0]]){
		school_score[i].push(schinf[school_score[i][0]]['sid']);
		if(school_score[i][8]=="理科"){
			var wlbj="li";
		}else{
			var wlbj="wen";
		}
		if(!isNaN(parseInt(school_score[i][2])) ){
			var lists=fenduanbiao[wlbj+parseInt(school_score[i][1])];
        	var lens=lists.length;
        	var suoyin=lens-parseInt(school_score[i][2])+99;
        	school_score[i][5]=lists[suoyin];
		}
		
	}else{
		school_score.splice(i,1);
		i--;
		len1--;
	}
	//console.log(school_score.length);
}
len2=zy_score.length;
var s,b;
for(var i=0;i<len2;i++){
	if(parseInt(zy_score[i][1])!=2018 && parseInt(zy_score[i][1])!=2019 || zy_score[i][8]==undefined || zy_score[i][8]=="-"){
		zy_score.splice(i,1);
		i--;
		len2--;
		continue;
	}
	if(schinf[zy_score[i][0]]){
		zy_score[i][9]=schinf[zy_score[i][0]]['sid'];
		if(zy_score[i][7]=="理科"){
			var wlbj="li";
		}else{
			var wlbj="wen";
		}
		if(!isNaN(parseInt(zy_score[i][3])) ){
			var lists=fenduanbiao[wlbj+parseInt(zy_score[i][1])];
        	var lens=lists.length;
        	var suoyin=lens-parseInt(zy_score[i][3])+99;
        	zy_score[i][6]=lists[suoyin];
		}
	}else{
		zy_score.splice(i,1);
		i--;
		len2--;
		continue;
	}
	//先进行kmb科目表匹配
	zy_score[i][10]="";
	for(var k=0;k<kmb.length;k++){
		if((zy_score[i][0].indexOf(kmb[k][2])>=0 || kmb[k][2].indexOf(zy_score[i][0])>=0) && (zy_score[i][8].indexOf(kmb[k][1])>=0)){
			zy_score[i][10]=kmb[k][0];
		}
	}
	if(zy_score[i][10]==null || zy_score[i][10]==""){//没有匹配到，有可能本来就是一级专业
		for(var k=0;k<kmb.length;k++){
			if((zy_score[i][0].indexOf(kmb[k][2])>=0 || kmb[k][2].indexOf(zy_score[i][0])>=0) && (zy_score[i][8].indexOf(kmb[k][0])>=0)){
				zy_score[i][10]=kmb[k][0];
				break;
			}
		}
	}
	if(zy_score[i][10]==null || zy_score[i][10]==""){//没有匹配到，可能缺数据，从别的学校找类似
		for(var k=0;k<kmb.length;k++){
			if((zy_score[i][8].indexOf(kmb[k][1])>=0 || kmb[k][1].indexOf(zy_score[i][8].replace(/(\(|（).{1,}(\)|）)/g,"").replace("类",""))>=0)){
				zy_score[i][10]=kmb[k][0];
				break;
			}
		}
	}
	zy_score[i][11]="";
	for(s=0;s<tszy.length;s++){//特色专业匹配
		//if(zy_score[i][0]==tszy[s][1]){console.log("特专 "+zy_score[i][0]+"'"+zy_score[i][8]+"'"+tszy[s][2]);}
		if(zy_score[i][8] != null && zy_score[i][8] != ""){
			if((zy_score[i][0].indexOf(tszy[s][1])>=0 || tszy[s][1].indexOf(zy_score[i][0])>=0) && (zy_score[i][8].indexOf(tszy[s][2])>=0)){
				zy_score[i][11]=tszy[s][0];
			}
		}
		
	}
	zy_score[i][12]="";
	for(b=0;b<pgb.length;b++){
		//if(zy_score[i][0]==pgb[b][4]){console.log("评 估"+zy_score[i][0]+"'"+zy_score[i][8]+"'"+pgb[b][2]);}
		if(zy_score[i][10] != null && zy_score[i][10] != ""){
			if((zy_score[i][0].indexOf(pgb[b][4])>=0 || zy_score[i][0].indexOf(pgb[b][4])>=0) && (zy_score[i][10].indexOf(pgb[b][2])>=0 || pgb[b][2].indexOf(zy_score[i][10])>=0)){
				zy_score[i][12]=pgb[b][3];
			}
		}
	}
	//console.log(zy_score.length);
}

len3=zsjz.length;
for(var i=0;i<len3;i++){
	if(schinf[zsjz[i][0]]){
		zsjz[i].push(schinf[zsjz[i][0]]['sid']);
	}else{
		zsjz.splice(i,1);
		i--;
		len3--;
	}
}
const writes=function(loads,sj){
      const buffer=xlsx.build([
          {
              name:"sheet1",
              data:sj
          }
      ]);
      fs.writeFileSync(loads,buffer,{'flag':'w'});
  }
writes("s1.xlsx",school_score);
writes("s2.xlsx",zy_score);
writes("s3.xlsx",zsjz);
/*var ntxt1=JSON.stringify({'data':school_score});
var ntxt2=JSON.stringify({'data':zy_score});
var ntxt3=JSON.stringify({'data':zsjz});
var psa="./json/";
fs.writeFile(psa+"school_score.json",ntxt1,function(){console.log("文件写入完毕");});
fs.writeFile(psa+"zy_score.json",ntxt2,function(){console.log("文件写入完毕");});
fs.writeFile(psa+"zsjz.json",ntxt3,function(){console.log("文件写入完毕");});*/
//console.log(school_score);
//console.log(school_score);
//console.log(school_score);