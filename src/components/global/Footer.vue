<template>
  <v-footer
    padless
    :color="`blue darken-3`"
    class="footer-wrapper white--text"
  >
    <v-card
      flat
      tile
      width="100%"
      :color="`blue darken-3`"
      class="text-center footer--safe-area mt-1 mb-2"
    >
        <v-card-text class="white--text d-inline">
        <strong>Test Footer</strong>
        —
        <strong>{{ "0.01" }}</strong>
        <span class="overline monospace condensed ml-1">{{ "git commit" }}</span>
        </v-card-text>

    </v-card>
  </v-footer>
</template>

<script>
export default {
    name: "Footer",
}
</script>

<style>
.condensed {
  letter-spacing: .075em !important;
}
  .clear-link {
    color: inherit !important;
    text-decoration: none !important;
  }
</style>