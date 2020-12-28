<template>
    <div>
        <a-page-header @back="showDrawer" title="Title"
                       sub-title="This is a subtitle"
                       style="border: 1px solid rgb(235, 237, 240)">
            <template slot="backIcon">
                <a-icon type="pic-left"/>
            </template>
            <template slot="extra">
                <a-button key="3">
                    Operation
                </a-button>
                <a-button key="2">
                    Operation
                </a-button>
                <a-button type="link" icon="user" v-show="!isLogged" @click="loginVisible = !loginVisible"/>
                <a-button type="link" icon="logout" v-show="isLogged" @click="logout"/>
            </template>
        </a-page-header>
        <a-drawer
                placement="left"
                :closable="false"
                :visible="visible"
                @close="onClose">
            <template slot="title">
                <div>
                    <span>Website Record</span>
                    <a-button @click="changeFlag = !changeFlag" size="small" style="float: right" icon="setting"/>
                </div>
            </template>
            <a-list :data-source="websiteList">
                <a-list-item slot="renderItem" slot-scope="item, index">
                    <a-icon :type="item.websiteIcon" style="margin-right: 20px"/>
                    <a-list-item-meta :description="item.websiteName"
                                      @click="openWebsite(item.websiteUrl, item.openTarget)">
                    </a-list-item-meta>
                    <a-button style="height: 22px;width: 22px" v-show="changeFlag" type="danger" size="small"
                              icon="minus"/>
                </a-list-item>
            </a-list>
            <a-button @click="websiteVisible = !websiteVisible" block v-show="changeFlag">
                ADD WEBSITE
            </a-button>
        </a-drawer>
        <a-modal
                v-model="websiteVisible"
                title="ADD WEBSITE"
                centered
                @ok="() => onSubmit()"
                :maskClosable="false">
            <a-form-model ref="ruleForm" :model="websiteForm" :rules="rules" :label-col="{ span: 6 }"
                          :wrapper-col="{ span: 14 }">
                <a-form-model-item ref="websiteName" label="Website Name" prop="websiteName">
                    <a-input v-model="websiteForm.websiteName"/>
                </a-form-model-item>
                <a-form-model-item ref="websiteUrl" label="Website Url" prop="websiteUrl">
                    <a-input v-model="websiteForm.websiteUrl"/>
                </a-form-model-item>
                <a-form-model-item ref="websiteIcon" label="Website Icon" prop="websiteIcon">
                    <a-input v-model="websiteForm.websiteIcon"/>
                </a-form-model-item>
                <a-form-model-item label="Open Target" prop="openTarget">
                    <a-select v-model="websiteForm.openTarget">
                        <a-select-option value="_blank">
                            Blank
                        </a-select-option>
                        <a-select-option value="_self">
                            Self
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <a-modal
                v-model="loginVisible"
                title="LOGIN"
                centered
                @ok="() => onLogin()"
                okText="Login"
                :maskClosable="false">
            <a-form-model ref="loginForm" :model="loginForm" :rules="rules" :label-col="{ span: 6 }"
                          :wrapper-col="{ span: 14 }">
                <a-form-model-item ref="username" label="Username" prop="username">
                    <a-input v-model="loginForm.username"/>
                </a-form-model-item>
                <a-form-model-item ref="password" label="Password" prop="password">
                    <a-input v-model="loginForm.password" type="password"/>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
    import * as api from "@request/api";

    export default {
        name: "Home",
        data() {
            return {
                isLogged: false,
                visible: false,
                websiteList: [],
                changeFlag: false,
                websiteVisible: false,
                loginVisible: false,
                loginForm: {
                    username: '',
                    password: ''
                },
                websiteForm: {
                    websiteName: '',
                    websiteUrl: '',
                    websiteIcon: '',
                    openTarget: ''
                },
                rules: {
                    websiteName: [
                        {required: true, message: 'Please input Website Name', trigger: 'blur'}
                    ],
                    websiteUrl: [
                        {required: true, message: 'Please input Website Url', trigger: 'blur'}
                    ],
                    websiteIcon: [
                        {required: true, message: 'Please input Website Icon', trigger: 'blur'}
                    ],
                    openTarget: [
                        {required: true, message: 'Please select Open Target', trigger: 'change'}
                    ],
                    username: [
                        {required: true, message: 'Please input Username', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: 'Please input Password', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            getWebsites() {
                api.websiteRecordList().then(res => {
                    if (res.isSuccess) {
                        this.websiteList = res.data
                    }
                })
            },
            openWebsite(url, target) {
                window.open(url, target)
            },
            showDrawer() {
                this.visible = true;
            },
            onClose() {
                this.visible = false;
            },
            onSubmit() {
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        api.saveWebsiteRecord(this.websiteForm).then(res => {
                            if (res.isSuccess) {

                            } else {
                                this.$message.error(res.message);
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            onLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        api.login(this.loginForm).then(res => {
                            if (res.isSuccess) {
                                this.$message.success("Login Success!");
                                this.isLogged = true;
                                this.loginVisible = false;
                            } else {
                                this.$message.error(res.message);
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            logout() {
                this.$confirm({
                    title: 'Logout',
                    content: 'Do you want to logout?',
                    centered: true,
                    onOk() {
                        api.logout().then(res => {
                            debugger
                            if (res.isSuccess) {
                                this.$message.success("Logout Success!");
                                this.isLogged = false;
                            } else {
                                this.$message.error(res.message);
                            }
                        })
                    },
                    onCancel() {},
                });
            }
        },
        created() {
            this.getWebsites();
        }
    }
</script>

<style scoped>
    .ant-menu-vertical {
        border-right: none;
    }

    .ant-list-item-meta {
        cursor: pointer;
    }
</style>
