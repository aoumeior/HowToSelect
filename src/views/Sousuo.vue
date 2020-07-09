<template>
    <div class="sousuo">
      <input  v-model="inp" style="border:black #BBBBBB 2px; border-radius:5px; " /><button @click="sub">搜索</button>
      <ul id="example-1">您要搜索的是：
          <a v-for="item in items" :key="item.message" @click="liclic(item.message)" href="#"> {{ item.message }} .</a>
      </ul>
      <table id="example-2">
        <tr v-for="sitem in sitems" :key="sitem.message">
          <td v-for="std in sitem.message" :key="std">
            | {{ std }} 
          </td>
        </tr>
      </table>
    </div>
</template>
<script>
// @ is an alias to /src
const { ipcRenderer } = window.require("electron");

export default {
  name: 'Sousuo',
  components: {
  },
  data(){
    return {
      inp:"input here",
      items:[],
      sitems:[]
    }
  },
  methods:{
    sub(){
      this.sitems=[]
      const result = ipcRenderer.sendSync("school_check", [
        this.inp
      ]);
      this.items=result;
      //alert(result);
    },
    liclic(p){
      //alert(p);
      const results = ipcRenderer.sendSync("school_check2", [
        p
      ]);
      this.sitems=results;
    }
  }
}
</script>