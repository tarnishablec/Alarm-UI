<template>
	<div>
		<v-navigation-drawer dark app v-model="drawerL" clipped>
			<v-list>
				<v-list-tile>
					<v-list-tile-action>
						<v-icon @click="toPlayground">home</v-icon>
					</v-list-tile-action>
					<v-list-tile-title>Home</v-list-tile-title>
				</v-list-tile>

				<v-list-group
								prepend-icon="account_circle"
								value="true"
				>
					<template v-slot:activator>
						<v-list-tile>
							<v-list-tile-title>Users</v-list-tile-title>
						</v-list-tile>
					</template>
					<v-list-group
									no-action
									sub-group
									value="true"
					>
						<template v-slot:activator>
							<v-list-tile>
								<v-list-tile-title>Admin</v-list-tile-title>
							</v-list-tile>
						</template>

						<v-list-tile
										v-for="(admin, i) in admins"
										:key="i"
										@click=""
						>
							<v-list-tile-title v-text="admin[0]"></v-list-tile-title>
							<v-list-tile-action>
								<v-icon v-text="admin[1]"></v-icon>
							</v-list-tile-action>
						</v-list-tile>
					</v-list-group>

					<v-list-group
									sub-group
									no-action
					>
						<template v-slot:activator>
							<v-list-tile>
								<v-list-tile-title>Actions</v-list-tile-title>
							</v-list-tile>
						</template>
						<v-list-tile
										v-for="(crud, i) in cruds"
										:key="i"
										@click=""
						>
							<v-list-tile-title v-text="crud[0]"></v-list-tile-title>
							<v-list-tile-action>
								<v-icon v-text="crud[1]"></v-icon>
							</v-list-tile-action>
						</v-list-tile>
					</v-list-group>
				</v-list-group>
			</v-list>
		</v-navigation-drawer>

		<v-navigation-drawer dark app v-model="drawerR" right clipped>

		</v-navigation-drawer>
		<v-toolbar dark app height="40px" clipped-left clipped-right>
			<v-toolbar-side-icon @click="drawerL=!drawerL"/>

			<v-toolbar-title class="text-uppercase">
				<span class="font-weight-bold text-none" @click="$router.push('/about')">Alarm-UI</span>
			</v-toolbar-title>

			<v-spacer/>

			<v-btn @click="drawerR=!drawerR" flat icon>
				<v-icon>notifications</v-icon>
			</v-btn>

			<v-btn icon flat>
				<v-icon>person</v-icon>
			</v-btn>
		</v-toolbar>
	</div>
</template>

<script>

	export default {
		name: "MainToolbar",
			methods:{
			toPlayground(){
				this.$router.push("playground");
			}
			},
		data() {
			return {
				drawerL: true,
				drawerR: false,
				admins: [
					['Management', 'people_outline'],
					['Settings', 'settings']
				],
				cruds: [
					['Create', 'add'],
					['Read', 'insert_drive_file'],
					['Update', 'update'],
					['Delete', 'delete']
				],
			}
		}
	}
</script>

<style scoped>

</style>