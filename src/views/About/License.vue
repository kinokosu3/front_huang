<template>
  <v-card
    elevation="5"
    class="bkop-light pa-6"
  >
    <h1
      class="headline"
    >
      <span>
        {{ "License" }}
      </span>
      <img
        :src="require('../../assets/CC.svg')"
        class="d-inline align-center ml-1"
        height="24"
        alt="Creative Commons: BY NC"
        style="transform: translateY(4px)"
      >
    </h1>

    <p class="subtitle-1 mt-3">
      {{ "licensed under a Creative Commons Attribution-NonCommercial 4.0 International License." }}
    </p>

    <v-btn
      v-haptic
      text
      outlined
      href="https://creativecommons.org/licenses/by-nc/4.0/"
      target="_blank"
      rel="noopener"
    >
      {{ "details" }}
      <v-icon
        right
        small
      >
        mdi-open-in-new
      </v-icon>
    </v-btn>
  </v-card>
</template>

<script>
  export default {
    name: "License"
  }
</script>

<style scoped>

</style>