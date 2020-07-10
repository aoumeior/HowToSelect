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
                      <v-text-field
                        v-model="name"
                        :disabled="isUpdating"
                        color="blue-grey lighten-2"
                        label="姓名"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select :items="items" label="学校"></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-autocomplete
                        v-model="friends"
                        :disabled="isUpdating"
                        :items="people"
                        chips
                        color="blue-grey lighten-2"
                        label="专业名"
                        item-text="name"
                        item-value="name"
                        multiple
                      >
                        <template v-slot:selection="data">
                          <v-chip
                            v-bind="data.attrs"
                            :input-value="data.selected"
                            close
                            @click="data.select"
                            @click:close="remove(data.item)"
                          >
                            <v-avatar left>
                              <v-img :src="data.item.avatar"></v-img>
                            </v-avatar>
                            {{ data.item.name }}
                          </v-chip>
                        </template>
                        <template v-slot:item="data">
                          <template v-if="typeof data.item !== 'object'">
                            <v-list-item-content v-text="data.item"></v-list-item-content>
                          </template>
                          <template v-else>
                            <v-list-item-avatar>
                              <img :src="data.item.avatar" />
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title v-html="data.item.name"></v-list-item-title>
                              <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                            </v-list-item-content>
                          </template>
                        </template>
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
              <v-btn color="primary" @click="e1 = 2">继续</v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card outlined="true" class="mb-12 cyan lighten-4" height="300px">
                <v-card-title>
                  <h2 class="display-1">选择你喜欢的专业</h2>
                  <v-spacer></v-spacer>
                  <span class="title">Hts</span>
                </v-card-title>

                <v-card-text>根据你的喜好选择你最喜欢的专业（多选），我们可以进一步的删选相关大学。</v-card-text>

                <v-divider class="mx-4"></v-divider>

                <v-card-text>
                  <span class="subheading">专业名</span>

                  <v-chip-group
                    v-model="selection"
                    active-class="deep-purple--text text--accent-4"
                    mandatory
                  >
                    <v-chip>计算机科学与技术</v-chip>
                    <v-chip>医学检验技术</v-chip>
                    <v-chip>临床</v-chip>
                    <v-chip>材料</v-chip>
                  </v-chip-group>
                </v-card-text>
              </v-card>
              <v-btn color="primary" @click="e1 = 3">继续</v-btn>
              <v-btn @click="e1 <= 1? e1=1: e1--;" text>上一步</v-btn>
            </v-stepper-content>
            <v-stepper-content step="3">
              <v-card class="mb-12" color="grey lighten-1" height="400px"></v-card>
              <v-btn color="primary" @click="e1 = 1">导出</v-btn>
              <v-btn @click="e1 <= 1? e1=1: e1--;" text>上一步</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped="" type="text/css">
</style>
<script>
export default {
  name: "SelectUniversityBaseScore",
  components: {},
  data() {
    return {
      e1: 1
    };
  }
};
</script>
