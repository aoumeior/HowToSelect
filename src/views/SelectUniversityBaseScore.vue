<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" sm="12">
        <div class="text-h4">分数选择大学</div>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-3">
      <v-col cols="12" sm="12">
        <v-stepper v-model="e1" class="rounded-0" style="background-color: rgba(226, 225, 228, 1);">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">输入信息</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2">筛选</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">导出</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1" style="background-color: rgba(0, 0, 0, 0);">
              <v-form ref="form" v-model="valid">
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="name"
                        color="blue-grey lighten-2"
                        :rules="nameRules"
                        label="姓名"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="score"
                        :counter="3"
                        label="分数"
                        :rules="scoreRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="select"
                        :items="itemsby"
                        :rules="[v => !!v || 'Item is required']"
                        label="文理"
                        required
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
              <v-btn color="primary" @click="e1 = 2;  Submit(); gets1();" :disabled="!valid">继续</v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card :outlined="true" class="mb-12 blue-grey lighten-5">
                <v-container>
                  <v-card-title>
                    <h2 class="display-1">根据你的选择进行筛选：</h2>
                    <v-spacer></v-spacer>
                    <span class="title">Hts</span>
                  </v-card-title>
                  <v-card-text>根据你的喜好在类别下进行选择（多选），我们可以进一步的删选相关大学。</v-card-text>

                  <v-divider class="mx-4"></v-divider>
                  <div v-for="itemq in sy" :key="itemq">
                    <v-card-text v-if="itemq.kz ===1">
                      <span v-if="itemq.kz === 1" class="subheading">{{items[itemq.bh]}}</span>
                      <v-chip-group
                        v-if="itemq.kz === 1"
                        active-class="deep-purple--text text--accent-4"
                        column
                      >
                        <v-chip
                          @click="(()=>{itemq.xx = []; itemq.xx.push('全选'); suoyin(itemq.bh);})"
                          active-class="primary--text"
                        >全选</v-chip>
                        <v-chip
                          active
                          v-for="ee in itemq.data"
                          :input="ee"
                          @click="(()=>{if(itemq.xx[0]=='全选'){itemq.xx.splice(0,1);}; itemq.xx.push(ee); suoyin(itemq.bh);})"
                          :key="ee"
                        >{{ ee }}</v-chip>
                      </v-chip-group>
                    </v-card-text>
                  </div>
                </v-container>
                <v-btn fab color="cyan accent-2" bottom right fixed @click="sheet = !sheet">预览</v-btn>
              </v-card>
              <v-btn color="primary" @click="e1 = 3">继续</v-btn>
              <v-btn @click="e1 <= 1? e1=1: e1--;" text>上一步</v-btn>
            </v-stepper-content>
            <v-stepper-content step="3">
              <v-simple-table
                class="m-10 mx-auto"
                id="example-2"
                :height="430"
                style="background-color: rgba(0, 0, 0, 0.1);"
              >
                <tbody>
                  <tr v-for="item1 in items1" :key="item1">
                    <td v-for="item2 in item1" :key="item2">{{ item2 }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
              <v-row no-gutters>
                <v-col cols="12" sm="6">
                  <v-btn color="primary" @click="tijiao">导出</v-btn>
                  <v-btn @click="e1 <= 1? e1=1: e1--;" text>上一步</v-btn>
                </v-col>
                <v-col cols="12" sm="6">
                  <button @click="fy(-1)">上一页</button>
                  <span>第{{ page }}页</span>
                  <span>/共{{ pages }}页</span>
                  <span>每页{{ zpage }} 个</span>
                  <button @click="fy(1)">下一页</button>
                </v-col>
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>

    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center" height="500px">
        <v-btn class="mt-6" @click="sheet = !sheet">关闭</v-btn>
        <v-btn class="mt-6" @click="gets1">重置</v-btn>
        <v-simple-table
          class="m-10 mx-auto"
          id="example-2"
          :height="400"
          style="background-color: rgba(0, 0, 0, 0.1);"
        >
          <template v-slot:default>
            <tbody>
              <tr v-for="item1 in items1" :key="item1">
                <td v-for="item2 in item1" :key="item2">{{ item2 }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-sheet>
    </v-bottom-sheet>
  </v-container>
</template>
<style>
/* This is for documentation purposes and will not be needed in your application */
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>
<script>
const { ipcRenderer } = window.require("electron");
export default {
  name: "SelectUniversityBaseScore",
  components: {},
  data() {
    return {
      name: "",
      select: "",
      score: "",
      itemsby: ["理科", "文科"],
      e1: 1,

      items: [],
      items1: [],
      page: 1,
      pages: 0,
      zpage: 15,
      sy: [],

      direction: "top",
      fab: true,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: "slide-y-reverse-transition",

      sheet: false,

      nameRules: [
        v => !!v || "姓名为必须字段",
        v => v.length <= 3 || "姓名必须超过三个字符"
      ],

      scoreRules: [
        v => !!v || "分数为必须字段",
        v => v.length <= 750 || v.length > 0 || "分数必须大于0，小于750分"
      ],
      valid: true
    };
  },
  methods: {
    Submit: function() {
      const result = ipcRenderer.sendSync("student_status", [
        this.name,
        this.score,
        0,
        this.select
      ]);
    },
    gets1() {
      //["学校","年份","专业","最高","平均","最低","最低位次","批次","文理","类别","第几批特色专业","专业评估",学校所在省份]
      if (this.kz == undefined || this.kz == null)
        this.__proto__.kz = [1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1];
      const s = ipcRenderer.sendSync("getzy", {});
      this.items = s[0];
      this.items1 = s[1].slice(0, this.zpage);
      if (this.sj == undefined || this.sj == null) {
        this.__proto__.sj = s[1];
      } else {
        this.sj = s[1];
      }
      if (this.sj == undefined || this.sj == null) {
        this.__proto__.yssj = s[1].slice(0);
      } else {
        this.yssj = s[1];
      }
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
    suoyin(ccc) {
      console.log(this.sy[0].xx);
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
      //每次索引完之后更新索引表
      const nsy = []; //首先根据现有索引出来的数据建立新索引
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
          nsy.push({ kz: 1, data: lssy, xx: [], bh: i });
        } else {
          nsy.push({ kz: 0, data: [], xx: [], bh: i });
        }
      }
      //新索引建立完毕，对已选择项目进行选择
      for (let oi = 0; oi < this.sy.length; oi++) {
        nsy[oi].xx = this.sy[oi].xx;
      }
      if (this.sy[ccc].xx[0] != "全选") {
        //是全选，则刷新当前bh对应的索引列，否则不刷新
        nsy[ccc].data = this.sy[ccc].data;
      }

      this.sy = nsy;
    },
    tijiao() {
      const s = ipcRenderer.sendSync("tijiaosy", [this.sy, this.kz]);
      alert(s);
    }
  }
};
</script>
