<template>
  <v-app>
    <v-navigation-drawer
      app
      permanent
      router
      v-model="drawer"
      color="#e2e1e4"
      :expand-on-hover="expandOnHover"
      :mini-variant="miniVariant"
      :right="right"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">你的高考</v-list-item-title>
          <v-list-item-subtitle>信心、细心、耐心</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <router-link tag="li" :to="item.router">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
      <v-main :style="note">
        <!-- Provides the application the proper gutter -->
        <v-container align="center" justify="center">
          <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>
      </v-main>
  </v-app>
</template>
<style scoped>
li {
  list-style-type: none;
}
.router-link-active {
  text-decoration: none;
}
</style>

<script>
export default {
  name: "App",
  data() {
    return {
      screenHeight: window.innerHeight,
      items: [
        // { title: "分数选大学", icon: "mdi-view-dashboard", router: "about" },
        // { title: "位次选大学", icon: "mdi-image", router: "test" },
        { title: "学校专业评估", icon: "mdi-image", router: "sousuo" },
        // { title: "分数筛选（后续删除）", icon: "mdi-image", router: "tablesel" },
        {
          title: "分数/位次选择大学",
          icon: "mdi-image",
          router: "SelectUniversityBaseScore"
        },
      ],
      right: false,
      drawer: true,
      color: "#7a7374",
      colors: ["primary", "blue", "success", "red", "teal"],
      permanent: true,
      miniVariant: false,
      expandOnHover: false,
      background: false,
      note: {
        // backgroundImage: "url('https://cdn.vuetifyjs.com/images/parallax/material.jpg')",
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "25px auto",
        // marginTop: "0px"
        background: "#e2e1e4"
      }
    };
  },
  computed: {
    scrollerHeight: function() {
      return window.innerHeight;
    }
  },
  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    window.onresize = () => {
      return (() => {
        that.screenHeight = window.innerHeight;
      })();
    };
  },
  components: {}
};
</script>
