<template>
    <div>
        <div class="table-operations">
            <a-button @click="userVisible = !userVisible">
                Add User
            </a-button>
            <a-button @click="updatePassword">
                Update Password
            </a-button>
        </div>
        <a-table :columns="columns"
                 :data-source="userList"
                 :rowKey="record => record.id"
                 :pagination="pagination"
                 :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: 'radio' }"
        @change="handleTableChange">
        </a-table>
        <a-modal
                v-model="passwordVisible"
                title="UPDATE PASSWORD"
                centered
                @ok="() => onUpdatePassword()"
                okText="OK"
                :maskClosable="false">
            <a-form-model ref="passwordForm" :model="passwordForm" :rules="rules" :label-col="{ span: 8 }"
                          :wrapper-col="{ span: 14 }">
                <a-form-model-item ref="password" label="New Password" prop="password">
                    <a-input v-model="passwordForm.password" type="password"/>
                </a-form-model-item>
                <a-form-model-item ref="confirmPassword" label="Confirm Password" prop="confirmPassword">
                    <a-input v-model="passwordForm.confirmPassword" type="password"/>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <a-modal
                v-model="userVisible"
                title="ADD USER"
                centered
                @ok="() => onSubmit()"
                :maskClosable="false">
            <a-form-model ref="userForm" :model="userForm" :rules="rules" :label-col="{ span: 8 }"
                          :wrapper-col="{ span: 14 }">
                <a-form-model-item ref="username" label="Username" prop="username">
                    <a-input v-model="userForm.username"/>
                </a-form-model-item>
                <a-form-model-item ref="password" label="Password" prop="password" :required="true">
                    <a-input v-model="userForm.password" type="password"/>
                </a-form-model-item>
                <a-form-model-item ref="confirmPassword" label="Confirm Password" prop="confirmPassword"
                                   :required="true">
                    <a-input v-model="userForm.confirmPassword" type="password"/>
                </a-form-model-item>
                <a-form-model-item ref="email" label="Email" prop="email">
                    <a-input v-model="userForm.email"/>
                </a-form-model-item>
                <a-form-model-item ref="phoneNumber" label="Phone Number" prop="phoneNumber">
                    <a-input v-model="userForm.phoneNumber"/>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>
<script>
    import * as api from "@request/api";

    export default {
        name: 'system',
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input the password'));
                } else {
                    if (this.passwordForm.confirmPassword !== '') {
                        this.$refs.passwordForm.validateField('confirmPassword');
                    }
                    if (this.userForm.confirmPassword !== '') {
                        this.$refs.userForm.validateField('confirmPassword');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input the password again'));
                } else if (value !== this.passwordForm.password && value !== this.userForm.password) {
                    callback(new Error("Two inputs don't match!"));
                } else {
                    callback();
                }
            };
            return {
                userList: [],
                columns: [
                    {
                        title: 'Username',
                        dataIndex: 'username',
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email',
                    },
                    {
                        title: 'PhoneNumber',
                        dataIndex: 'phoneNumber',
                    }
                ],
                pagination: {
                    current: 1,
                    pageSize: 10,
                    total: 0,
                },
                selectedRowKeys: [],
                passwordVisible: false,
                userVisible: false,
                passwordForm: {
                    username: '',
                    password: '',
                    confirmPassword: ''
                },
                userForm: {
                    username: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                    phoneNumber: ''
                },
                rules: {
                    username: [
                        {required: true, message: 'Please input Username', trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePass, trigger: 'change'}],
                    confirmPassword: [
                        {validator: validatePass2, trigger: 'change'}]
                }
            };
        },
        methods: {
            getUserList() {
                api.userList({"size": this.pagination.pageSize, "current": this.pagination.current}).then(res => {
                    if (res.isSuccess) {
                        this.userList = res.data.records;
                        this.pagination.total = res.data.total;
                    } else {
                        this.$message.error(res.message);
                    }
                })
            },
            updatePassword() {
                if (this.selectedRowKeys.length == 0 || this.selectedRowKeys.length > 1) {
                    this.$message.error("Please select a record.");
                    return false;
                }
                this.passwordVisible = true;
            },
            onUpdatePassword() {
                this.$refs.passwordForm.validate(valid => {
                    if (valid) {
                        api.updatePassword(this.passwordForm).then(res => {
                            if (res.isSuccess) {
                                this.$message.success("Update Password Success.");
                                this.passwordVisible = false;
                                this.$refs.passwordForm.resetFields();
                            } else {
                                this.$message.error(res.message);
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            onSubmit() {
                this.$refs.userForm.validate(valid => {
                    if (valid) {
                        api.addUser(this.userForm).then(res => {
                            if (res.isSuccess) {
                                this.userVisible = false;
                                this.$message.success("Add User Success.");
                                this.getUserList(undefined);
                                this.$refs.userForm.resetFields();
                            } else {
                                this.$message.error(res.message);
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            onSelectChange(selectedRowKeys, selectedRows) {
                console.log('selectedRowKeys changed: ', selectedRows);
                this.selectedRowKeys = selectedRowKeys;
                this.passwordForm.username = selectedRows[0].username;
            },
            handleTableChange(pagination, filters, sorter) {
                this.pagination = pagination;
                this.getUserList();
            },
        },
        created() {
            this.getUserList();
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
