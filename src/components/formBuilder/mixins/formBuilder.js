// import {EMPTY_FORM, GET_FORM, SET_FORM, SET_INPUT} from "../../../store/modules/form.module";
import basic from "./basic";

export default {
    mixins: [basic],
    data() {
        return {}
    },
    methods: {
        /**
         * re-init form values to initial state
         * default resource is {default}
         *
         * @author WeSSaM
         */
        // resetForm(form = null) {
        //     form = form || this.formModule;
        //     // this.setForm({}, form);
        //     // alert('resetForm');
        //
        //     this.$store.commit(`${form}/${EMPTY_FORM}`, this)
        // },


        /**
         * init form event listeners
         * @author WeSSaM
         */
        // initEvents() {
        //     this.$root.$off('on-form-success');
        //     this.$root.$on('on-form-success', function (formModule, data, isFromCrud = false) {
        //         if (formModule !== this.formModule)
        //             return;
        //
        //         if (this.redirect && !this.hasDialog && !isFromCrud)
        //             this.$router.push(this.redirectTo);
        //
        //         if (this.hasDialog) {
        //             this.$store.commit(SET_DIALOG_DISPLAYED, false);
        //             this.$root.$emit('form-dialog-success', formModule, data);
        //         }
        //
        //         if (isFromCrud)
        //             this.$root.$emit('crud-dialog-success', formModule, data);
        //
        //
        //         this.resetForm();
        //         this.onSubmitSuccess(data);
        //     }.bind(this));
        //
        //     this.$root.$on('on-form-error', function (formModule, data) {
        //         if (formModule !== this.formModule)
        //             return;
        //
        //         this.onSubmitError(data);
        //     }.bind(this));
        // },


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
    },
}
