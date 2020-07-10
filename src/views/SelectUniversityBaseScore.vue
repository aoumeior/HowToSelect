<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" sm="12">
        <div class="text-h4">分数选择大学</div>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-3">
      <v-col cols="12" sm="12">
        <v-stepper v-model="e1" style="background-color: rgba(226, 225, 228, 0.4);">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">输入信息</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2">筛选</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">导出</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1" style="background-color: rgba(0, 0, 0, 0);">
              <v-form>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="name" color="blue-grey lighten-2" label="姓名"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="score" :counter="3" label="分数" required></v-text-field>
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
              <v-btn color="primary" @click="e1 = 2; Submit(); gets1();">继续</v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card :outlined="true" class="mb-12 cyan lighten-4">
                <v-card-title>
                  <h2 class="display-1">选择你喜欢的专业</h2>
                  <v-spacer></v-spacer>
                  <span class="title">Hts</span>
                </v-card-title>

                <v-card-text>根据你的喜好选择你最喜欢的专业（多选），我们可以进一步的删选相关大学。</v-card-text>

                <v-divider class="mx-4"></v-divider>

                <v-card-text v-for="itemq in sy" :key="itemq">
                  <span v-if="itemq.kz === 1" class="subheading">专业名</span>

                  <v-chip-group
                    v-if="itemq.kz === 1"
                    active-class="deep-purple--text text--accent-4"
                    mandatory
                    column
                  >
                    <v-chip @click="(()=>{itemq.xx = []; itemq.xx.push('全选'); suoyin();})">全选</v-chip>
                    <v-chip
                      v-for="ee in itemq.data"
                      :input="ee"
                      @click="(()=>{itemq.xx = []; itemq.xx.push(ee); suoyin();})"
                      :key="ee"
                    >{{ ee }}</v-chip>
                  </v-chip-group>
                </v-card-text>
              </v-card>
              <v-btn color="primary" @click="e1 = 3">继续</v-btn>
              <v-btn @click="e1 <= 1? e1=1: e1--;" text>上一步</v-btn>
            </v-stepper-content>
            <v-stepper-content step="3">
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
              <v-btn color="primary" @click="tijiao">导出</v-btn>
              <v-btn @click="e1 <= 1? e1=1: e1--;" text>上一步</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
    <v-row no-gutters v-if="e1 < 3">
      <v-col cols="12" sm="12">
        <div class="text">预览：</div>
      </v-col>
    </v-row>
    <v-row no-gutters v-if="e1 < 3">
      <v-col cols="12" sm="12">
        <tr v-for="item1 in items1" :key="item1">
          >
          <td v-for="item2 in item1" :key="item2">{{ item2 }}</td>
        </tr>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped="" type="text/css">
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
      sy: []
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
    },
    tijiao() {
      const s = ipcRenderer.sendSync("tijiaosy", [this.sy, this.kz]);
      alert(s);
    }
  }
};
</script>
