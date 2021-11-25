<template>
    <!--<ValidationProvider :vid="model$" :name="model$" v-slot="{ invalid , errors , validated}" :rules="rules$">-->
    <!--<b-form-input :class="{'form-control' :true , 'is-invalid' : invalid && validated  }" v-model="input"-->
    <!--:name="model$" :type="type$"></b-form-input>-->

    <!--:class="{'form-control' :true , 'is-invalid' : invalid && validated  }"-->
    <textarea :name="model$"
              v-model="input"
              class="textarea"
              rows="4"
              :placeholder="placeholder$"
              autocomplete="off"
              autocapitalize="off"
              spellcheck="true"
    ></textarea>
    <!--<c-error :invalid="invalid" :validated="validated" :errors="errors" :properties="properties"/>-->
    <!--</ValidationProvider>-->
</template>

<script>
    import input from "../mixins/input"

    export default {
        name: "TextareaField",
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
        }
    };
</script>

<style scoped>

</style>
