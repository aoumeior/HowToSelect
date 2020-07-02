<template>
  <div class="about">
    姓名<input v-model="n" />
    分数<input v-model="f" /><br />
    位次<input v-model="w" />
    文理<select v-model="wl">
      <option selected>理科</option>
      <option>文科</option>
    </select><br />
    <button class="btn" v-on:click="djssss">aaa</button><br />
    <img src="../assets/logo.png" id="img"/>
  </div>
</template>
<script>
 
const {ipcRenderer} =window.require('electron');
export default {
  name:"About",
  components:{
  },
  data:function(){
    return {};
  },
  methods:{
    djssss:function (){
      alert(ipcRenderer.sendSync("asd",[this.n,this.f,this.w,this.wl]));
      return 0;
    }
  }
}
</script>