<template>
  <div
    :class="{
      'drawer-logo blue': true,
      'darken-4': dark,
      'darken-3': !dark
    }"
  >
    <v-img
      :src="require('../../assets/test.png')"
      aspect-ratio="1"
      height="128px"
      contain
    />
    <div class="white--text description">
      <v-row
        align="center"
        justify="center"
        class="flex-column"
      >
        <span>{{ "one span" }}</span>
        <!-- <span>{{ "two span" }}</span> -->
      </v-row>
    </div>
  </div>
</template>

<script>
import Theme from "@/mixins/Theme";
export default {
    name: "Logo",
    mixins: [Theme]
}
</script>

<style>

</style>