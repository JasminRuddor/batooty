<template>
  <dashboard :batooty="batooty" />
</template>

<script>
import Vue from 'vue'
import batooty from '@batooty/core'
import { Dashboard } from '@batooty/vue'

export default {
  name: 'App',
  components: {
    Dashboard,
  },
  computed: {
    batooty: () => new batooty(),
  },
}
</script>

<style src="@batooty/core/dist/style.css"></style>
<style src="@batooty/dashboard/dist/style.css"></style>
