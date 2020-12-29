<template>
    <a-page-header
            style="border-bottom: 1px solid rgb(235, 237, 240)"
            :title="title">
        <template slot="extra">
            <a-button type="link" icon="appstore"/>
            <a-button type="link" icon="home" @click="$router.push('/')"/>
        </template>
    </a-page-header>
</template>

<script>
    import {getUserInfo} from "../request/api";

    export default {
        name: "HeadBar",
        props: ["title"],
        data() {
            return {
                isLogged: false
            }
        },
        methods: {
            checkUserInfo() {
                getUserInfo().then(res => {
                    if (res.isSuccess) {
                        this.isLogged = true;
                    } else {
                        this.isLogged = false;
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
