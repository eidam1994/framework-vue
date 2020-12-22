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
                <a-button key="1" type="primary">
                    Primary
                </a-button>
            </template>
        </a-page-header>
        <a-drawer
                placement="left"
                :closable="false"
                :visible="visible"
                :after-visible-change="afterVisibleChange"
                @close="onClose">
            <template slot="title">
                <div>
                    <span>Website Record</span>
                    <a-button size="small" style="float: right" icon="setting"/>
                </div>
            </template>
            <a-menu>
                <a-menu-item v-for="(item, i) in websiteList"
                             :key="i">
                    <span @click="openWebsite(item.websiteUrl, item.openTarget)">
                        <a-icon :type="item.websiteIcon"/>
                        {{item.websiteName}}
                    </span>
                    <a-button class="delBtn" size="small" style="float: right;margin-right: 0px" icon="setting"/>
                </a-menu-item>
            </a-menu>
        </a-drawer>
    </div>
</template>

<script>
    import {websiteRecordList} from "@request/api";

    export default {
        name: "Home",
        data() {
            return {
                visible: false,
                websiteList: []
            }
        },
        methods: {
            getWebsites() {
                websiteRecordList().then(res => {
                    if (res.isSuccess) {
                        this.websiteList = res.data
                    }
                })
            },
            openWebsite(url, target) {
                window.open(url, target)
            },
            afterVisibleChange(val) {
                console.log('visible', val);
            },
            showDrawer() {
                this.visible = true;
            },
            onClose() {
                this.visible = false;
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
</style>
