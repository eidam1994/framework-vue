<template>
    <div>
        <div class="table-operations">
            <a-button @click="addRole">
                Add Role
            </a-button>
            <a-button @click="updateUsersOfRole">
                Update Users Of Role
            </a-button>
        </div>
        <a-table :columns="columns"
                 :data-source="roleList"
                 :rowKey="record => record.id"
                 :pagination="pagination"
                 :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: 'radio' }"
                 @change="handleTableChange">
        </a-table>
        <a-modal
                v-model="roleVisible"
                title="ADD ROLE"
                centered
                @ok="() => onAddRole()"
                okText="OK"
                :maskClosable="false">
            <a-form-model ref="roleForm" :model="roleForm" :rules="rules" :label-col="{ span: 8 }"
                          :wrapper-col="{ span: 14 }">
                <a-form-model-item ref="roleName" label="Role Name" prop="roleName">
                    <a-input v-model="roleForm.roleName"/>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <a-modal
                v-model="userRoleVisible"
                title="SELECT USERS"
                centered
                @ok="() => onSubmit()"
                :maskClosable="false">
            <a-transfer
                    :data-source="unselectedUsers"
                    show-search
                    :target-keys="selectedUsers"
                    :render="item => item.title"
                    @change="handleChange"
            />
        </a-modal>
    </div>
</template>
<script>
    import * as api from "@request/api";

    export default {
        name: 'system',
        data() {
            return {
                roleList: [],
                columns: [
                    {
                        title: 'RoleName',
                        dataIndex: 'roleName',
                    }
                ],
                pagination: {
                    current: 1,
                    pageSize: 10,
                    total: 0,
                },
                selectedRowKeys: [],
                roleVisible: false,
                userRoleVisible: false,
                roleForm: {
                    roleName: ''
                },
                rules: {
                    roleName: [
                        {required: true, message: 'Please input role name.', trigger: 'blur'}
                    ],
                },
                roleId: '',
                unselectedUsers: [],
                selectedUsers: []
            };
        },
        methods: {
            getRoleList() {
                api.roleList({"size": this.pagination.pageSize, "current": this.pagination.current}).then(res => {
                    if (res.isSuccess) {
                        this.roleList = res.data.records;
                        this.pagination.total = res.data.total;
                    } else {
                        this.$message.error(res.message);
                    }
                })
            },
            addRole() {
                this.roleVisible = true;
            },
            onAddRole() {
                this.$refs.roleForm.validate(valid => {
                    if (valid) {
                        api.addRole(this.roleForm).then(res => {
                            if (res.isSuccess) {
                                this.getRoleList();
                                this.$message.success("Add Role Success.");
                                this.roleVisible = false;
                                this.$refs.roleForm.resetFields();
                            } else {
                                this.$message.error(res.message);
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            onSelectChange(selectedRowKeys) {
                this.selectedRowKeys = selectedRowKeys;
                this.roleId = selectedRowKeys[0];
            },
            handleTableChange(pagination, filters, sorter) {
                this.pagination = pagination;
                this.getRoleList();
            },
            handleChange(targetKeys, direction, moveKeys) {
                console.log(targetKeys, direction, moveKeys);
                this.selectedUsers = targetKeys;
            },
            updateUsersOfRole() {
                if (this.selectedRowKeys.length == 0 || this.selectedRowKeys.length > 1) {
                    this.$message.error("Please select a record.");
                    return false;
                }
                this.unselectedUsers = [];
                this.selectedUsers = [];
                this.userRoleVisible = true;
                this.getUsersOfRole();
            },
            getUsersOfRole() {
                api.getUsersOfRole({"roleId": this.roleId}).then(res => {
                    if (res.isSuccess) {
                        for (let i = 0; i < res.data.allUsers.length; i++) {
                            let allUsers = res.data.allUsers;
                            const data = {
                                key: allUsers[i].id,
                                title: allUsers[i].username
                            }
                            this.unselectedUsers.push(data);
                        }
                        this.selectedUsers = res.data.selectedUsers;
                    }
                })
            },
            onSubmit() {
                let userIds = "";
                this.selectedUsers.forEach(function (item, index) {
                    userIds += (item + ",");
                })
                api.updateUsersOfRole({"roleId": this.roleId, "userIds": userIds}).then(res => {
                    if (res.isSuccess) {
                        this.userRoleVisible = false;
                    }
                })
            }
        },
        created() {
            this.getRoleList();
        }
    };
</script>
<style>
    .table-operations {
        margin: 16px 0px 16px 16px;
    }

    .table-operations > button {
        margin-right: 8px;
    }

    .ant-table-pagination.ant-pagination {
        margin-right: 16px;
    }
</style>
