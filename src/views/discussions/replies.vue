<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getDiscussions">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="discussions" highlight-current-row v-loading="listLoading"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="title" label="主题" sortable>
            </el-table-column>
            <el-table-column prop="user_id" label="用户" sortable>
            </el-table-column>
            <el-table-column prop="content" label="内容" sortable>
            </el-table-column>
            <el-table-column prop="comments_count" label="评论数" sortable>
            </el-table-column>
            <el-table-column prop="created" label="发布时间" sortable>
            </el-table-column>
            <el-table-column prop="age" label="状态" sortable>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="reply(scope.$index, scope.row)">回复</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">禁用</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--编辑界面-->
        <el-dialog title="回复评论" v-model="replyFormVisible" :close-on-click-modal="false">
            <el-form :model="replyForm" label-width="80px" :rules="replyFormRules" ref="replyForm">
                <el-form-item label="标题" prop="username">
                    <el-input v-model="replyForm.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="nickname">
                    <el-input type="textarea" v-model="replyForm.content" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="replyFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="submitReply" :loading="replyLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getDiscussions, reply } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				discussions: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

                //编辑界面数据
				replyFormVisible: false,//编辑界面是否显示
				replyLoading: false,
				replyFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				replyForm: {
					id: 0,
					user_id: 0,
					title: '',
					content: ''
				}
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getDiscussions();
			},
			//获取用户列表
			getDiscussions() {
				let params = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getDiscussions().then((res) => {
					this.total = res.total;
					this.discussions = res.data;
					this.offset = res.offset;
					this.limit = res.limit;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getDiscussions();
					});
				}).catch(() => {

				});
			},

			reply: function (index, row) {
				this.replyFormVisible = true;
				this.replyForm.title = row.title;
				this.replyForm.id = row.id;
			},

			submitReply: function () {
				this.$refs.replyForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.replyLoading = true;
                            let params = Object.assign({}, this.replyForm);
                            console.log(params);
							reply(params.id, params).then((res) => {
								this.replyLoading = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.replyFormVisible = false;
								this.getDiscussions();
							});
						});
					}
				});
			},
		},
		mounted() {
			this.getDiscussions();
		}
	}


</script>

<style scoped>

</style>