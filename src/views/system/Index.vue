<template>
    <div style="height: 100%">
        <head-bar class="header" :title="'Back-office Management Center'"></head-bar>
        <a-menu mode="inline" :open-keys="openKeys" style="width: 256px" @openChange="onOpenChange">
            <a-sub-menu key="sub1">
                <span slot="title"><a-icon type="idcard" /><span>Permission System</span></span>
                <a-menu-item key="1" @click="currentTabComponent = 'user'">
                    User Management
                </a-menu-item>
                <a-menu-item key="2" @click="currentTabComponent = 'role'">
                    Role Management
                </a-menu-item>
                <a-menu-item key="3">
                    Permission Management
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
                <span slot="title"><a-icon type="appstore" /><span>Navigation Two</span></span>
                <a-menu-item key="5">
                    Option 5
                </a-menu-item>
                <a-menu-item key="6">
                    Option 6
                </a-menu-item>
                <a-sub-menu key="sub3" title="Submenu">
                    <a-menu-item key="7">
                        Option 7
                    </a-menu-item>
                    <a-menu-item key="8">
                        Option 8
                    </a-menu-item>
                </a-sub-menu>
            </a-sub-menu>
            <a-sub-menu key="sub4">
                <span slot="title"><a-icon type="setting" /><span>Navigation Three</span></span>
                <a-menu-item key="9">
                    Option 9
                </a-menu-item>
                <a-menu-item key="10">
                    Option 10
                </a-menu-item>
                <a-menu-item key="11">
                    Option 11
                </a-menu-item>
                <a-menu-item key="12">
                    Option 12
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
        <keep-alive>
            <component style="margin-left: 256px" v-bind:is="currentTabComponent"></component>
        </keep-alive>
    </div>
</template>
<script>
    import HeadBar from "@components/HeadBar";
    export default {
        name: 'system',
        components: {
            "head-bar": HeadBar,
            "user": () => import("@views/system/authentication/UserManagement"),
            "role": () => import("@views/system/authentication/RoleManagement")
        },
        data() {
            return {
                rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
                openKeys: ['sub1'],
                currentTabComponent: ''
            };
        },
        methods: {
            onOpenChange(openKeys) {
                const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
                if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                    this.openKeys = openKeys;
                } else {
                    this.openKeys = latestOpenKey ? [latestOpenKey] : [];
                }
            },
        },
    };
</script>
<style scoped>
    .ant-menu {
        width : 100% ;
        position : absolute ;
        top : 65px ;
        bottom : 0px ;
        left : 0px ;
    }
</style>
