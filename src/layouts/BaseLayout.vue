<template>
    <component :is="layout"></component>
</template>

<script>
    import AuthLayout from "./AuthLayout";
    import AppLayout from "./AppLayout";

    export default {
        name: "BaseLayout",
        components: {
            AppLayout,
            AuthLayout,
        },
        computed: {
            layout() {
                return this.isAuthenticated ? "AppLayout" : "AuthLayout";
            },
            isAuthenticated() {
                return !!localStorage.getItem('token')
            }
        }
    }
</script>

<style scoped>

</style>