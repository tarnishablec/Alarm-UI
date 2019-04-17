<template>
	<div class="fill-height">
		<v-parallax height="" style="height: 100%" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
			<login-card/>
		</v-parallax>
	</div>
</template>

<script>
	import LoginCard from "../components/LoginCard";

	export default {
		name: "Login",
		components: {LoginCard}
	}
</script>

<style scoped>

</style>