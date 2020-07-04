<template>
  <div class="about">
    <div>分数选择大学</div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row :align="alignment" :justify="justify">
            <v-form ref="form">
              <v-text-field v-model="name" :counter="10" :rules="nameRules" label="姓名" required></v-text-field>
              <v-text-field v-model="score" :counter="10" :rules="nameRules" label="分数" required></v-text-field>
              <v-select
                v-model="select"
                :items="items"
                :rules="[v => !!v || 'Item is required']"
                label="文理"
                required
              ></v-select>

              <v-checkbox
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
              ></v-checkbox>
              <v-btn :disabled="!valid" color="success" class="mr-4" @click="Submit">提交</v-btn>
              <v-btn color="error" class="mr-4" @click="Reset">重置</v-btn>
              <v-btn color="warning">Reset Validation</v-btn>
            </v-form>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped>
.about {
  margin: 10px;
}
</style>
<script>
const { ipcRenderer } = window.require("electron");
export default {
  data() {
    return {
      alignment: "center",
      dense: true,
      justify: "center",
      valid: true,
      name: "",
      score: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      select: "",
      items: ["理科", "文科"]
    };
  },

  methods: {
    Submit: function() {
      // eslint-disable-next-line no-undef
      alert(
        ipcRenderer.sendSync("asd", [this.name, this.score, 0, this.select])
      );
    },
    Reset: function() {
      this.name = "";
      this.score = "";
      this.select = "";
    }
  }
};
</script>