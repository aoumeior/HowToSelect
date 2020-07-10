<template>
  <div class="tablesel">
    <button @click="gets1">刷新(需设置一个加载完毕自动获取)</button>
    <button @click="tijiao">提交索引</button>
    <table>
      <tr>
        <td></td>
        <td v-for="itemq in sy" :key="itemq">
          <!--<el-select v-if="itemq.kz==1"  v-model="form.selectMultiple" placeholder="多选框" multiple>
                <el-option v-for="ee in itemq.data" :key="ee" label="ee" value="ee">{{  ee }}</el-option>
          </el-select>-->
          <select
            v-model="itemq.xx"
            v-if="itemq.kz==1"
            style="height:100px; width:100px"
            multiple
            @change="suoyin()"
          >
            <option>全选</option>
            <option v-for="ee in itemq.data" :key="ee">{{ ee }}</option>
          </select>
        </td>
      </tr>
      <tr>
        <td></td>
        <td v-for="item in items" :key="item">{{ item }}</td>
      </tr>
      <tr v-for="item1 in items1" :key="item1">
        >
        <td v-for="item2 in item1" :key="item2">{{ item2 }}</td>
      </tr>
    </table>
    <button @click="fy(-1)">上一页</button>
    <span>第{{ page }}页</span>
    <span>/共{{ pages }}页</span>
    <span>每页{{ zpage }} 个</span>
    <button @click="fy(1)">下一页</button>
  </div>
</template>

<script>
// @ is an alias to /src
const { ipcRenderer } = window.require("electron");
//let sj=[];
//sj=[{kz:0,data:[]}]
export default {
  name: "Tablesel",
  components: {},
  data() {
    return {
      items: [],
      items1: [],
      page: 1,
      pages: 0,
      zpage: 15,
      sy: []
    };
  },
  methods: {
    gets1() {
      //["学校","年份","专业","最高","平均","最低","最低位次","批次","文理","类别","第几批特色专业","专业评估",学校所在省份]
      this.__proto__.kz = [1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1];
      const s = ipcRenderer.sendSync("getzy", {});
      this.items = s[0];
      this.items1 = s[1].slice(0, this.zpage);
      this.__proto__.sj = s[1];
      this.__proto__.yssj = s[1].slice(0);
      //alert(this.sj);
      this.pages = parseInt(s[1].length / this.zpage) + 1;
      this.sy = [];
      //建立全局索引
      //this.__proto__.sy=[];
      //let lsp=[];
      //this.sy.push({kz:1,data:[55,66,88,99]});
      let lssy = [];
      for (let i = 0; i < this.kz.length; i++) {
        if (this.kz[i] == 1) {
          lssy = [];
          for (let j = 0; j < this.sj.length; j++) {
            let p = 0;
            for (let k = 0; k < lssy.length; k++) {
              if (lssy[k] == this.sj[j][i]) {
                p = 1;
                break;
              }
            }
            if (p == 0) {
              lssy.push(this.sj[j][i]);
            }
          }
          this.sy.push({ kz: 1, data: lssy, xx: ["全选"], bh: i });
        } else {
          this.sy.push({ kz: 0, data: [], xx: [], bh: i });
        }
      }
    },
    fy(s) {
      //alert(this.sy[0].xx);
      const p = this.page + s;
      if (p > 0 && p < this.pages + 1) {
        this.items1 = this.sj.slice((p - 1) * this.zpage, p * this.zpage);
        this.page = p;
      }
    },
    suoyin() {
      //alert(a);alert(b);
      this.page = 1;
      const ls = [];
      let lss = 0;
      for (let i = 0; i < this.yssj.length; i++) {
        lss = 0;
        for (let p = 0; p < this.sy.length; p++) {
          if (this.kz[p] == 1 && this.sy[p].xx[0] != "全选") {
            for (let j = 0; j < this.sy[p].xx.length; j++) {
              if (this.sy[p].xx[j] == this.yssj[i][p]) {
                lss += 1;
                break;
              }
            }
          } else {
            lss += 1;
          }
        }
        if (lss == this.sy.length) {
          ls.push(this.yssj[i]);
        }
      }
      this.sj = ls;
      this.items1 = this.sj.slice(0, this.zpage);
      this.pages = parseInt(this.sj.length / this.zpage) + 1;
    },
    tijiao() {
      const s = ipcRenderer.sendSync("tijiaosy", [this.sy, this.kz]);
      alert(s);
    }
  }
};
</script>