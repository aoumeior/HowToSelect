<template>
  <div class="test">
    <div>位次选择大学</div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row :align="alignment" :justify="justify">
            <v-form ref="form">
              <v-text-field v-model="name" :counter="10" :rules="nameRules" label="姓名" required></v-text-field>
              <v-text-field v-model="score" :counter="10" :rules="nameRules" label="位次" required></v-text-field>
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
      <v-progress-linear
        v-if="IsProgressShow"
        v-model="valueDeterminate"
        :buffer-value="bufferValue"
        color="deep-purple accent-4"
      />

      <v-snackbar v-model="Snackbar" :timeout="timeout">
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="Snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
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
      Snackbar: false,
      text: "数据已保存桌面",
      timeout: 2000,
      valueDeterminate: 0, // for progress
      alignment: "center",
      dense: true,
      justify: "center",
      valid: true,
      name: "",
      score: "",
      IsProgressShow: false,
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
      items: ["理科", "文科"],
      bufferValue: 20,
      interval: 0,
      interval1:0
    };
  },
  watch: {
    value(val) {
      if (val < 100) return;

      this.value = 0;
      this.bufferValue = 10; 
    }
  },

  mounted() {
    this.startBuffer();
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    Submit: function() {
      this.startBuffer();
      this.IsProgressShow = true;
      const result = ipcRenderer.sendSync("student_status", [
        this.name,
        0,
        this.score,
        this.select
      ]);
      this.Snackbar = true;
      clearInterval(this.interval1);
      this.interval1 = setInterval(() => {
        this.value = 0;
        this.bufferValue = 0;
        this.IsProgressShow = false;
        this.Snackbar = false;
        this.beforeDestroy();
      }, 2000);
    },
    Reset: function() {
      this.name = "";
      this.score = "";
      this.select = "";
    },
    startBuffer() {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.value += Math.random() * (15 - 5) + 5;
        this.bufferValue += Math.random() * (15 - 5) + 6;
      }, 500);
    }
  }
};
</script>