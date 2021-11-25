<template>
    <div class="form-fieldset">
        <div class="fieldset-heading columns">
            <div class="column is-6">
                <h4>Personal Info</h4>
                <p>This helps us to know you</p>
            </div>
            <div class="column is-6 tabs is-toggle is-toggle-rounded">
                <ul class="floating-tabs">
                    <li :class="{'is-active' : currentLanguage === language.locale}" v-for="language in languages">
                        <a href="javascript:;" @click="currentLanguage = language.locale">
                            <span>{{ language.symbol}}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="columns is-multiline">
            <div v-for="input in multiLangInputs" :class="`column is-${input.cols ?? 12}`">
                <VField>
                    <label> {{ getInputLabel(input) }} ({{ currentLanguage.toUpperCase() }})</label>
                    <VControl icon="feather:user">
                        <component :is="`${input.component}-field`" :formModule="formModule" :locale="currentLanguage"
                                   v-bind="input"/>
                        <!--<input type="text" class="input" placeholder="" autocomplete="given-name"/>-->
                    </VControl>
                </VField>
            </div>
        </div>
        <div class="columns is-multiline">
            <div v-for="input in nonMultiLangInputs" :class="`column is-${input.cols ?? 12}`">
                <VField>
                    <label>{{ getInputLabel(input) }} </label>
                    <VControl icon="feather:user">
                        <component :is="`${input.component}-field`" :formModule="formModule" :locale="currentLanguage"
                                   v-bind="input"/>
                    </VControl>
                </VField>
            </div>

            <!--<div class="column is-6">-->
            <!--<VField>-->
            <!--<label>Last Name</label>-->
            <!--<VControl icon="feather:user">-->
            <!--<input-->
            <!--type="text"-->
            <!--class="input"-->
            <!--placeholder=""-->
            <!--autocomplete="family-name"-->
            <!--/>-->
            <!--</VControl>-->
            <!--</VField>-->
            <!--</div>-->
            <!--<div class="column is-12">-->
            <!--<VField>-->
            <!--<label>Email Address</label>-->
            <!--<VControl icon="feather:mail">-->
            <!--<input-->
            <!--type="email"-->
            <!--class="input"-->
            <!--placeholder=""-->
            <!--autocomplete="email"-->
            <!--inputmode="email"-->
            <!--/>-->
            <!--</VControl>-->
            <!--</VField>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "Fieldset",
        props: {
            title: String,
            description: String,
            formModule: String,
            inputs: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                currentLanguage: null
            }
        },
        created() {
            if (!this.currentLanguage)
                this.currentLanguage = _.get(this, 'languages.0.value', "ar");
            console.log('multiLangInputs', this.multiLangInputs);
        },
        methods: {
            getInputLabel(input) {
                return this.trans(input.label ?? input.model);
            }
        },
        computed: {
            computedInputs() {
                return this.inputs;
            },
            multiLangInputs() {
                return _.filter(this.computedInputs, (input) => {
                    return input.multiLang;
                })
            },
            nonMultiLangInputs() {
                return _.filter(this.computedInputs, function (input) {
                    return !input.multiLang;
                })
            },
            languages() {
                return [
                    {
                        symbol: "AR",
                        locale: "ar",
                        label: 'العربية',
                    },
                    {
                        symbol: "EN",
                        locale: "en",
                        label: 'English',
                    },
                    {
                        symbol: "TR",
                        locale: "tr",
                        label: 'Turkish',
                    },
                ];
            }
        }
    }
</script>

<style>
    .floating-tabs {
        float: right;
    }

    .form-fieldset {
        max-width: 800px !important;
    }
</style>