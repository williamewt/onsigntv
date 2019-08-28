<template>
  <v-container
    class="fill-height"
    fluid
  >
    <!-- Aligning card in center of page -->
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="8"
      >
        <!-- Content card -->
        <v-card class="elevation-12">
          <v-card-title>Current Temperature for Location</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <!-- Latitude Input -->
                  <v-text-field
                    :value="lat"
                    @input="inputData('lat', $event)"
                    label="Latitude"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <!-- Longitude Input -->
                  <v-text-field
                    :value="lng"
                    @input="inputData('lng', $event)"
                    label="Longitude"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-container>
              <!-- Button that calls the temperature show function -->
              <v-btn
                color="primary"
                @click="getTemperatureAndLocationInfo()"
              >Show Temperature</v-btn>

              <div
                class="mt-5 text-center"
                v-if="temperature"
              >
                <!-- location that will display the temperature -->
                <p>Temperature at {{lat}}, {{lng}} is <span style="font-size: 28px;">{{temperature}}</span></p>
                <!-- location that will display the location city and state -->
                <p>{{location}}</p>
              </div>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal to view error messages -->
    <v-dialog
      v-model="error"
      persistent
      max-width="390"
    >
      <v-card>
        <v-card-title class="headline">Warning!</v-card-title>
        <v-card-text>
          {{error}}
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="green darken-1"
            text
            @click="$store.commit('CLEAR_ERROR')"
          >Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Loading Modal -->
    <v-dialog
      v-model="loading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Please, Wait...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "home",

  // Function performed when page load finishes
  mounted() {
    this.getCurrentLocation();
  },

  //store state data as a computed property
  computed: mapState({
    loading: state => state.loading,
    error: state => state.error,
    lat: state => state.lat,
    lng: state => state.lng,
    location: state => state.location,
    temperature: state => state.temperature
  }),

  methods: {
    //store actions
    ...mapActions(["getCurrentLocation", "getTemperatureAndLocationInfo"]),
    
    /**
     * Function to change store state properties
     * @param {String} key
     * @param {*} value
     */
    inputData(key, value) {
      // check if a value has been passed
      if (value) {
        value = (value * 1).toFixed(3)
      }

      this.$store.commit("SET_STATE", { key, value: value });
      this.$store.commit("SET_STATE", { key: "temperature", value: "" });
    }
  }
};
</script>
