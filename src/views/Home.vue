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
                title="Basic Drawer"
                placement="left"
                :closable="false"
                :visible="visible"
                :after-visible-change="afterVisibleChange"
                @close="onClose"
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </a-drawer>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                visible: false
            }
        },
        methods: {
            afterVisibleChange(val) {
                console.log('visible', val);
            },
            showDrawer() {
                this.visible = true;
            },
            onClose() {
                this.visible = false;
            }
        }
    }
</script>

<style scoped>

</style>
