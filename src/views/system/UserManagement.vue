<template>
    <div>
        <div class="table-operations">
            <a-button>
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
                 :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        </a-table>
    </div>
</template>
<script>
    import * as api from "@request/api";
    
    export default {
        name: 'system',
        data() {
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
                    pageSize: 10
                },
                selectedRowKeys: []
            };
        },
        methods: {
            getUserList(pagination) {
                if (pagination == undefined) {
                    api.userList().then(res => {
                        if (res.isSuccess) {
                            this.userList = res.data;
                        } else {
                            this.$message.error(res.message);
                        }
                    })
                }
            },
            updatePassword() {
                if (this.selectedRowKeys.length == 0 || this.selectedRowKeys.length > 1) {
                    this.$message.error("Please select a record.");
                    return false;
                }
            },
            onSelectChange(selectedRowKeys) {
                console.log('selectedRowKeys changed: ', selectedRowKeys);
                this.selectedRowKeys = selectedRowKeys;
            }
        },
        created() {
            this.getUserList(undefined);
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
