<template>
  <v-container>
    <v-card color="#26c6da" max-width="400">
      <v-card-text class="headline font-weight-bold">你必须输入一个高校才能显示高校评估情况。</v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-content>
            <v-row align="end">
              <v-col>
                <v-text-field v-model="inp" label="高校名称" :rules="rules" hide-details="auto"></v-text-field>
              </v-col>
              <v-col>
                <v-btn color="primary" @click="sub">搜索</v-btn>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-card-actions>
    </v-card>
    <v-sheet class="mt-5 mx-auto" elevation="6">
      <v-tabs
        v-if="items.length >= 1"
        background-color="cyan"
        dark
        next-icon="mdi-arrow-right-bold-box-outline"
        prev-icon="mdi-arrow-left-bold-box-outline"
        show-arrows
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab
          v-for="item in items"
          :key="item.message"
          @click="liclic(item.message)"
        >{{ item.message }}</v-tab>
      </v-tabs>
    </v-sheet>

    <v-simple-table
      class="m-10 mx-auto"
      v-if="sitems.length >= 1"
      id="example-2"
      :height="screenHeight1"
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