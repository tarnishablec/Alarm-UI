<template>
	<div>
		<v-card class="self-center-x flex-row pa-3" style="background-color: cadetblue; width: 700px;">
			<v-container fluid>
				<v-layout row>
					<v-flex grow class="md6 ">
						<v-img :src="logoImage" width="200px" style="top: 50px;left: 30px"/>
					</v-flex>
					<v-divider vertical style=""/>
					<v-flex grow class="md6 ">
						<div class="pt-2" style=" position: relative;top: 10px;left: 15px;">
								<v-text-field solo class="px-3" label="USERNAME" v-model="userName" >
								</v-text-field>
								<v-text-field solo class="px-3" label="PASSWORD" v-model="password" >
								</v-text-field>
								<v-btn class="self-center-x mb-3" @click="tryLogin" :loading="loading">Login</v-btn>
						</div>
					</v-flex>
				</v-layout>
			</v-container>
		</v-card>
		<v-snackbar class="text-uppercase" v-model="loginSnack" :timeout="timeout">
			{{loginFeedbackText}}
			<v-btn flat @click="loginSnack = false" icon class="red--text">
				<v-icon>close</v-icon>
			</v-btn>
		</v-snackbar>
	</div>
</template>

<script>

	import "../css/CommonStyle.css"

	export default {
		name: "LoginCard",
		data() {
			return {
				loginSnack: false,
				timeout: 3000,
				loginFeedbackText: '',

				loading: false,

				userName: '',
				password: '',
				logoImage: require('@/assets/vSkySoftware-final-White.png')
			}
		},

		methods: {
			tryLogin() {
				let content = {
					"password": this.password,
					"userName": this.userName
				};
				this.loading = true;
				return this.$axios.post("/user/login", content).then(response => {
					if (response.data.resultCode === 200) {
						console.log(content);
						this.loginFeedbackText = 'Login succeed';
						localStorage.setItem("alarmToken", response.data.data.token);
						this.$router.push('/');
					} else {
						this.loginFeedbackText = 'Login failed';
					}
					this.loading = false;
					this.loginSnack = true;
					console.log(localStorage.getItem("alarmToken"));
				})
			}
		}
	}
</script>

<style scoped>

</style>