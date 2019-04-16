<template>
	<div>
		<v-card class="center-in-x" style="background-color: cadetblue; width: 400px; margin-top: 200px">
			<v-card-title class="justify-center">
				<span class="text-none display-2">Welcome</span>
			</v-card-title>
			<v-divider class="mb-3 mx-3"/>
			<v-text-field solo class="px-3" label="ID">
			</v-text-field>
			<v-text-field solo class="px-3" label="PASSWORD">
			</v-text-field>
			<v-btn class="center-in-x mb-3">Login</v-btn>
		</v-card>
	</div>
</template>

<script>

	import "../css/CommonStyle.css"

	export default {
		name: "LoginCard"
	}
</script>

<style scoped>

</style>