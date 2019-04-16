<template>
  <v-app>
    <MainToolbar/>
    <v-content style="background-color: rgba(231,234,237,0.25);">
      <transition>
        <router-view/>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import MainToolbar from "./components/MainToolbar";

export default {
  name: 'App',
  components: {
    MainToolbar,
    HelloWorld
  },
  data () {
    return {
      //
    }
  }
}
</script>
