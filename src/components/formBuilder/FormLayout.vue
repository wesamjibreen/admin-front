<template>
    <form class="form-layout" @submit.prevent>
        <div class="form-outer">
            <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
                <div class="form-header-inner">
                    <div class="left">
                        <h3>Request a Demo</h3>
                    </div>
                    <div class="right">
                        <div class="buttons">
                            <VButton icon="lnir lnir-arrow-left rem-100" @click="onCancel" light dark-outlined>
                                Cancel
                            </VButton>
                            <VButton color="primary" raised>
                                Submit
                            </VButton>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-body">
                <Fieldset v-for="fieldset in fieldsets$" v-bind="fieldset" :formModule="formModule$"/>
            </div>
        </div>
    </form>
</template>


<script>
    import {useWindowScroll} from '@vueuse/core'
    import Fieldset from "./Fieldset";
    import formBuilder from "./mixins/formBuilder";
    import {mapState} from "vuex";
    import formModule, {
        BUSY_FIELDS,
        SET_INPUT,
        SUBMIT_FORM,
    } from  "../../store/modules/form.module";
    const {y} = useWindowScroll();
    export default {
        name: "FormLayout",
        components: {Fieldset},
        mixins: [formBuilder],
        props: {
            data: {
                required: true,
                default: []
            },
            resource: {
                required: false,
                default: "default",
            },
            inputs: {
                required: true,
            },
            crud: {
                required: false,
                default: false,
            },
            hasSubmit: {
                required: false,
                default: true,
            },
            endPoint: Function,
        },
        created() {
            this.onFormCreated();
            this.registerFormModule();
            Bus.off(`${this.moduleResourceKey}-form-submitted`);
            Bus.on(
                `${this.moduleResourceKey}-form-submitted`,
                function (formModule) {
                    this.submit();
                }.bind(this)
            );
        },
        mounted() {
            this.onFormMounted();
            this.initOnFindLoading();
            this.initOnFormHasChangesEvent();
        },
        methods: {
            onCancel() {
                this.$emit('cancel');
            },
            closeMultiLangDailog() {
                this.multiLangDialog = false;
            },
            multiLangDialogOk() {
                this.closeMultiLangDailog();
                this.submit(false);
            },
            initOnFormHasChangesEvent() {
                Bus.on(
                    "form-set-value",
                    function (formModule) {
                        if (formModule === this.moduleResourceKey) {
                            const hasUnsavedChanges =
                                this.$store.state[`${formModule}`]["unsavedChanges"];
                            if (!hasUnsavedChanges) {
                                this.$store.commit(`${formModule}/${SET_INPUT}`, {
                                    model: "unsavedChanges",
                                    value: true,
                                });
                            }
                        }
                    }.bind(this)
                );
            },
            initOnFindLoading() {
                Bus.off("form-fetch-loading");
                Bus.on(
                    "form-fetch-loading",
                    function (loading) {
                        this.find_loading = loading;
                    }.bind(this)
                );
            },
            registerFormModule() {
                // if (this.$store.hasModule(this.moduleResourceKey)) {
                //     this.$store.unregisterModule(this.moduleResourceKey);
                // }

                this.$store.registerModule(this.moduleResourceKey, formModule);
            },
            validateForm() {
                return this.$refs.observer.validate();
            },
            attachErrors(response) {
                let errors = _.get(response, "data.data", {});
                let errorCode = _.get(response, "data.error_code");
                if (errorCode === 103) this.$refs.observer.setErrors(errors);
            },
            submit(checkMultiLang = true) {
                if (this.isFormBusy) {
                    return;
                }

                return new Promise((resolve, reject) => {
                    this.validateForm().then(
                        function (valid) {
                            if (valid && checkMultiLang && this.hasEmptyMultiLangFields) {
                                this.multiLangDialog = true;
                                return;
                            }

                            if (valid) {
                                Bus.emit("before-form-submit", this.moduleResourceKey);
                                Bus.emit(
                                    `before-form-submit-${this.moduleResourceKey}`,
                                    this.moduleResourceKey
                                );

                                this.loading = true;
                                this.$store
                                    .dispatch(`${this.moduleResourceKey}/${SUBMIT_FORM}`, {
                                        _this: this,
                                        endPoint: this.endPoint$,
                                    })
                                    .then(
                                        function (data) {
                                            Bus.emit(
                                                "on-form-success",
                                                this.moduleResourceKey,
                                                data,
                                                this.crud
                                            );
                                            Bus.emit(
                                                `on-form-success-${this.moduleResourceKey}`,
                                                this.moduleResourceKey,
                                                data,
                                                this.crud
                                            );
                                            this.__showToast("success", data.message);
                                            resolve(data);
                                        }.bind(this)
                                    )
                                    .catch(
                                        function (xhr) {
                                            Bus.emit(
                                                "on-form-error",
                                                this.moduleResourceKey,
                                                xhr
                                            );
                                            Bus.emit(`on-form-error-${this.moduleResourceKey}`, xhr);

                                            let message = _.get(
                                                xhr,
                                                "data.message",
                                                this.__trans("error_while_processing")
                                            );
                                            this.attachErrors(xhr);
                                            this.__showToast("error", message);
                                            this.loading = false;
                                            reject(xhr);
                                        }.bind(this)
                                    )
                                    .finally(() => (this.loading = false));
                            } else this.__showToast("error", this.__trans("validation_error"));
                        }.bind(this)
                    );
                });
            },
            onFormCreated() {
            },
            onFormMounted() {
            },
            getFormResourceKey(resource) {
                return `${resource}Form`;
            },
        },
        computed: {
            formModule() {
                /**
                 * computed property returns registered form module key
                 *
                 * @author WeSSaM
                 */
                return `${this.resource}Form`;
            },
            isStuck() {
                return y.value > 30;
            },
            fieldsets$() {
                return this.data;
            },
            hasEmptyMultiLangFields() {
                const multiLangFields = this.inputs$.filter((input) => input.multiLang);
                if (multiLangFields.length === 0) return false;

                let _hasEmptyMultiLangFields = false;
                const formData = this.$store.state[this.moduleResourceKey];
                // check for empty multi lang fields
                multiLangFields.forEach(
                    function (input) {
                        if (!_hasEmptyMultiLangFields) {
                            this.languagesLocales.forEach(
                                function (locale) {
                                    const model = `${input.model}_${locale}`;
                                    if (!formData[model]) _hasEmptyMultiLangFields = true;
                                }.bind(this)
                            );
                        }
                    }.bind(this)
                );
                return _hasEmptyMultiLangFields;
            },

            isFormBusy() {
                const busyFields =
                    this.$store.state[`${this.moduleResourceKey}`][`${BUSY_FIELDS}`] || [];
                return busyFields.length > 0;
            },
            moduleResourceKey() {
                return this.getFormResourceKey(this.resource);
            },
            inputs$() {
                return this.inputs;
            },
            endPoint$() {
                return this.endPoint && this.endPoint instanceof Function
                    ? this.endPoint(this)
                    : {};
            },
            ...mapState({
                /**
                 * Check if page has full screen dialog
                 * @returns {boolean}
                 */
                hasDialog: (state) => state.dialog.displayed,
            }),
        },

    }
</script>

<style lang="scss">
    @import '../../scss/abstracts/_mixins.scss';
    @import '../../scss/pages/generic/_forms.scss';


    .form-layout {
        max-width: initial !important;
        margin: 0 auto;
    }
</style>