<template>
	<v-app>
		<MainToolbar/>
		<v-content style="background-color: #fff;">
			<transition name="slide">
				<router-view/>
			</transition>
		</v-content>
		<MainFooter/>
	</v-app>
</template>

<script>
	import HelloWorld from './components/HelloWorld'
	import MainToolbar from "./components/MainToolbar";
	import MainFooter from "./components/MainFooter";

	export default {
		name: 'App',
		components: {
			MainFooter,
			MainToolbar,
			HelloWorld
		},
		data() {
			return {
				//
			}
		}
	}
</script>
