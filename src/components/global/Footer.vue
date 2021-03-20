<template>
  <v-footer padless :color="`blue darken-3`" class="footer-wrapper white--text">
    <v-card
      flat
      tile
      width="100%"
      :color="`blue darken-3`"
      class="text-center footer--safe-area mt-1 mb-2"
    >
      <v-card-text class="white--text d-inline">
        <strong>Huangの管理平台</strong>
        —
        <strong>{{ "1.0" }}</strong>
        <v-btn
          icon
          :href="`https://github.com/kinokosu3/front_huang`"
          target="_blank"
        >
          <v-icon>
            {{ "mdi-github" }}
          </v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
.condensed {
  letter-spacing: 0.075em !important;
}
.clear-link {
  color: inherit !important;
  text-decoration: none !important;
}
</style>