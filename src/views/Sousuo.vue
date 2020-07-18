<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" sm="12">
        <div class="text-h4">学校专业评估</div>
      </v-col>
    </v-row>

    <v-row align="end">
      <v-col>
        <v-text-field v-model="inp" label="高校名称" :rules="rules" hide-details="auto"></v-text-field>
      </v-col>
      <v-col>
        <v-btn class="grey lighten-1" @click="sub">搜索</v-btn>
      </v-col>
    </v-row>

    <v-sheet class="mt-5 mx-auto" elevation="6">
      <v-tabs
        background-color="grey lighten-3"
        next-icon="mdi-arrow-right-bold-box-outline"
        prev-icon="mdi-arrow-left-bold-box-outline"

      >
        <v-tabs-slider color="white"></v-tabs-slider>
        <v-tab
         
          v-for="item in items"
          :key="item.message"
          @click="liclic(item.message)"
        >{{ item.message }}</v-tab>
      </v-tabs>
    </v-sheet>

    <v-simple-table
      class="mt-1 mx-auto grey lighten-4"
      v-if="sitems.length >= 1"
      id="example-2"
    >
      <template v-slot:default>
        <tbody>
          <tr v-for="sitem in sitems" :key="sitem.message">
            <td v-for="std in sitem.message" :key="std">{{ std }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>
<script>
// @ is an alias to /src
const { ipcRenderer } = window.require("electron");

export default {
  name: "Sousuo",
  mounted: function() {
    this.$nextTick(function() {
      this.sub();
    });
  },
  components: {},
  data() {
    return {
      screenHeight1: 300,
      inp: "",
      items: [],
      sitems: []
    };
  },
  methods: {
    sub() {
      this.sitems = [];
      if(this.inp.length==0 || this.inp=="" || /^\s{1,}$/.test(this.inp)){
        this.items=[{message:"请输入要搜索的学校"}];
        return;
      }
      const result = ipcRenderer.sendSync("school_check", [this.inp]);
      this.items = result;
      //alert(result);
    },
    liclic(p) {
      //alert(p);
      const results = ipcRenderer.sendSync("school_check2", [p]);
      this.sitems = results;
    }
  }
};
</script>