<template>
    <!--<ValidationProvider :vid="model$" :name="model$" v-slot="{ invalid , errors , validated}" :rules="rules$">-->
    <!--:class="{'input' :true , 'is-invalid' : invalid && validated  }"-->
        <input class="input"
               v-model="input"
               :placeholder="placeholder$"
               :name="model$"
               :type="type$"/>
        <!--<c-error :invalid="invalid" :validated="validated" :errors="errors" :properties="properties"/>-->
    <!--</ValidationProvider>-->
</template>


<script>
    import input from "../mixins/input";

    export default {
        name: "InputField",
        mixins: [input],
        computed: {
            defaultValue() {
                /**
                 * computed property returns default input value
                 * used to init input by this value
                 *
                 * @author WeSSaM
                 */
                return '';
            },
        },
    };
</script>

<style scoped>
</style>
