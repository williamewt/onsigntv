<template>
  <v-card
    max-width="80%"
    class="mt-5 mx-auto"
  >
    <v-card-title>Current Temperature for Location</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              label="Latitude"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              label="Longitude"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-container>
        <v-btn color="primary">Show Temperature</v-btn>

        <div class="mt-5 text-center">
          Temperature at lat, lng is <span style="font-size: 28px;">28ºC</span>
        </div>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "home"
};
</script>
