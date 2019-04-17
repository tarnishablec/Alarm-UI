<template>
	<div class="ma-2 elevation-2 white">
		<div class="px-4" style="height: 48px; display: flex; flex-direction: row;">
			<v-text-field single-line append-icon="search" style="max-width: 400px" v-model="sourceSearch">
			</v-text-field>
			<v-spacer/>
			<div style="position: relative; top: 10px">
				<v-btn class="primary elevation-2" icon @click="queryAllList">
					<v-icon>refresh</v-icon>
				</v-btn>
				<v-btn class="primary text-none elevation-2" round @click="[loadAddDialog(),dialog=true]">
					<v-icon left="">add</v-icon>
					<span>Add</span>
				</v-btn>
			</div>
		</div>

		<v-dialog persistent v-model="dialog" max-width="600px">
			<v-card class="pa-2">
				<v-card-title class="display-1 text-capitalize">{{dialogState}} Source</v-card-title>
				<v-divider/>
				<v-card-text>
					<v-text-field label="Source Name" v-model="dialogSourceName"></v-text-field>
					<v-select :items="sendTypeList" item-text="sendTypeName" item-value="sendTypeId" label="Send Type"
					          v-model=dialogSendTypeSelect>
					</v-select>
					<v-textarea label="Source Content" outline v-model="dialogSourceContent">
					</v-textarea>
					<p v-if="sendTypeList[parseInt(dialogSendTypeSelect)-1]!==undefined" class="red--text"
					   style="position: relative; bottom: 15px"
					   v-html="sendTypeList[parseInt(dialogSendTypeSelect)-1].sendTypeDesc">
					</p>
					<v-checkbox color="red" label="Whether to push the alarm" v-model="dialogIsPush"></v-checkbox>
					<div style="position: relative;right: 10px">
						<v-btn @click="dialog=false">Cancel</v-btn>
						<v-btn class="primary" @click="[submitDialog(),dialog=false]">Submit</v-btn>
					</div>
				</v-card-text>
			</v-card>
		</v-dialog>

		<v-dialog persistent v-model="deleteDialog" max-width="400px">
			<v-card class="pa-2">
				<v-card-title class="display-1 text-capitalize red--text">Attention!</v-card-title>
				<v-divider/>
				<v-card-text>
					<p style="font-size: 20px">Are you sure?</p>
					<div style="position: relative ;right: 10px;">
						<v-btn @click="deleteDialog=false">Cancel</v-btn>
						<v-btn class="red" @click="[submitDeleteDialog(willRemoveSourceId),deleteDialog=false]">Delete</v-btn>
					</div>
				</v-card-text>
			</v-card>
		</v-dialog>

		<v-data-table style="margin-top: 10px" :headers="headers" :items="sourcesList" :expand="expand" item-key="sourceId"
		              :search="sourceSearch"
		              :pagination.sync="pagination">
			<template v-slot:items="props">
				<tr @click="props.expanded=!props.expanded">
					<td>{{props.item.sourceName}}</td>
					<td>{{props.item.sendTypeName}}</td>
					<td>{{props.item.sourceContent}}</td>
					<td>{{props.item.createTime}}</td>
					<td>{{props.item.userId||'null'}}</td>
					<td>{{props.item.isPush?'yes':'no'}}</td>
					<td style="display: flex; flex-direction: row">
						<v-btn icon @click="[loadEditDialog(props.item),dialog=true]">
							<v-icon>create</v-icon>
						</v-btn>
						<v-btn icon class="red--text" @click="[loadDeleteDialog(props.item),deleteDialog=true]">
							<v-icon>delete_forever</v-icon>
						</v-btn>
					</td>
				</tr>
			</template>
			<template v-slot:expand="props">
				<v-card flat class="px-4 grey">
					<span style="font-size: 15px">
						sourceToken: [{{props.item.sourceToken}}]
					</span>
				</v-card>
			</template>
		</v-data-table>

		<v-snackbar v-model="snack" :timeout="snackTimeout" :color="snackColor">
			{{snackText}}
			<v-btn flat @click="snack = false" icon class="red--text">
				<v-icon>close</v-icon>
			</v-btn>
		</v-snackbar>
	</div>
</template>

<script>
	import ResponseHandler from '../common/ResponseHandler'

	export default {
		name: "SourcesTable",
		data() {
			return {
				headers: [
					{text: 'sourceName', value: 'sourceName'},
					{text: 'sendTypeName', value: 'sendTypeName'},
					{text: 'sourceContent', value: 'sourceContent'},
					{text: 'createTime', value: 'createTime'},
					{text: 'userId', value: 'userId'},
					{text: 'isPush', value: 'isPush'},
					{test: '', sortable: false}
				],

				pagination: {
					rowsPerPage: 10,
					descending: true,
					page: 1,
					sortBy: '',
					totalItems: 0,
				},

				sourcesList: [],

				sendTypeList: [],

				dialogSourceName: "",
				dialogSendTypeSelect: 2,
				dialogSourceContent: "",
				dialogIsPush: false,
				dialogSourceId: "",

				willRemoveSourceId: "",

				dialogState: "add",

				expand: false,
				sourceSearch: "",

				dialog: false,
				deleteDialog: false,

				snack: false,
				snackColor: '',
				snackTimeout: 2500,
				snackText: 'Data updated',
			}
		},

		methods: {
			queryAllList() {
				return this.$axios.get("/source/all", {}).then(response => {
					this.sourcesList = response.data.data;
					this.showSnackBar('update success');
				})
			},
			querySendTypeList() {
				return this.$axios.get("/common/sendTypeList").then(response => {
					this.sendTypeList = response.data.data;
				})
			},

			editSource() {
				let content = {
					"isPush": this.dialogIsPush ? 1 : 0,
					"sendTypeId": this.dialogSendTypeSelect,
					"sourceContent": this.dialogSourceContent,
					"sourceName": this.dialogSourceName,
					"sourceId": this.dialogSourceId,
				};
				console.log(content);
				return this.$axios.put("/source", content);
			},

			addSource() {
				let content = {
					"isPush": this.dialogIsPush ? 1 : 0,
					"sendTypeId": this.dialogSendTypeSelect,
					"sourceContent": this.dialogSourceContent,
					"sourceName": this.dialogSourceName
				};
				return this.$axios.post("/source", content);
			},

			deleteSource(sourceId) {
				return this.$axios.delete("/source/" + sourceId);
			},

			initDialog() {
				this.dialogSourceName = "";
				this.dialogSendTypeSelect = 2;
				this.dialogSourceContent = "";
				this.dialogIsPush = false;
			},

			loadAddDialog() {
				this.initDialog();
				this.dialogState = "add";
			},

			loadEditDialog(item) {
				console.log(item);
				this.dialogState = "edit";
				this.dialogSourceName = item.sourceName;
				this.dialogSendTypeSelect = parseInt(item.sendTypeId);
				this.dialogSourceContent = item.sourceContent;
				this.dialogIsPush = item.isPush;
				this.dialogSourceId = item.sourceId;
			},

			loadDeleteDialog(item) {
				this.willRemoveSourceId = item.sourceId;
			},

			async submitDialog() {
				if (this.dialogState === "add") {
					if (!ResponseHandler.promiseResponseHandler(await this.addSource())) {
						this.showSnackBar('error!');
						return -1;
					}
				}
				if (this.dialogState === "edit") {
					if (!ResponseHandler.promiseResponseHandler(await this.editSource())) {
						this.showSnackBar('error!');
						return -1;
					}
				}

				this.queryAllList();
				return 0;
			},

			async submitDeleteDialog(id) {
				await this.deleteSource(id);
				this.queryAllList();
			},

			showSnackBar(message) {
				this.snackText = message;
				this.snack = true;
			},
		},

		created() {
			this.queryAllList();
			this.querySendTypeList();
		}
	}
</script>

<style scoped>

</style>