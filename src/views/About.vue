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
              <!-- <v-text-field v-model="name" :counter="10" :rules="nameRules" label="位次" required></v-text-field> -->
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
              <v-btn color="error" class="mr-4">Reset Form</v-btn>
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

const { ipcRenderer } = window.require('electron');
export default {
  data() {
    return {
      alignmentsAvailable: ["start", "center", "end", "baseline", "stretch"],
      alignment: "center",
      dense: false,
      justifyAvailable: [
        "start",
        "center",
        "end",
        "space-around",
        "space-between"
      ],
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
      select: 0,
      items: ["理科", "文科"]
    };
  },

  methods: {
    Submit: () => {
      ipcRenderer.sendSync("synchronous-message", "ping"); // prints "pong"
      ipcRenderer.on("asynchronous-reply", (event, arg) => {
        console.log(arg); // prints "pong"
      });
      ipcRenderer.send('asynchronous-message', 'ping');
    }
  }
};
</script>