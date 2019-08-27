<template>
  <v-app>
    <div>
      <v-app-bar
        color="dark"
        dark
      >
        <v-toolbar-title>OnSign TV Temperature App</v-toolbar-title>
      </v-app-bar>
    </div>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  })
};
</script>
