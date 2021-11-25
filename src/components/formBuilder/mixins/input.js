import {BUSY_FIELDS, SET_BUSY_FIELDS, SET_INPUT} from "../../../store/modules/form.module";
import {mapState} from "vuex";

export default {
    props: {
        component: String,
        value: {required: false},

        model: {
            required: true
        },
        formModule: {
            required: true
        },
        label: {
            required: true
        },
        endPoint: {
            required: false
        },
        rows: {
            required: false,
            default: 3
        },
        rules: {
            required: false
        },
        repeater: {
            required: false
        },
        multiLang: Boolean,
        locale: String
    },
    data() {
        return {
            // input: null
            repeaterFieldValue: this.defaultValue,
            // repeaterFieldValue: null
            detectChanges: false
        };
    },
    created() {
        /**
         * calling overwritten onInputCreated method
         * @author WeSSaM
         */
        this.onInputCreated();
        // this.setInputDefaultValue(this.inputValue);

        const interval = this.isEdit ? 2000 : 500;
        setTimeout(
            function () {
                this.detectChanges = true;
            }.bind(this),
            interval
        );
    },
    mounted() {
        /**
         * calling overwritten onInputMounted method
         * @author WeSSaM
         */
        this.onInputMounted();
    },
    methods: {
        getRepeaterData() {
        },
        setInputDefaultValue(value = null) {
            this.input = value || this.defaultValue;
        },

        /**
         * this method used to commit new value to vuex module
         * parameters is model : current input key  , value :  the new parsed value
         *
         * @author WeSSaM
         */
        $commit(newVal) {
            // if (this.detectChanges) {
            //     this.$root.$emit("form-set-value", this.formModule);
            // }
            //
            let model = this.model;
            let locale = this.locale$;
            let value = this.passingInput(newVal);
            // alert('$commit')
            this.$store.commit(`${this.formModule}/${SET_INPUT}`, {
                model,
                locale,
                value
            });

            // if (this.repeater) {
            //     value = this.$store.state[`${this.formModule}`][this.repeater.model];
            //     model = this.repeater.model;
            //     let index = this.repeater.rowIndex;
            //
            //     if (!value) value = [];
            //     let item = value.length > index ? value[index] : {};
            //     item[this.model] = this.passingInput(newVal);
            //     if (value.length > index) {
            //         value[index] = item;
            //     } else {
            //         value.push(item);
            //     }
            //
            //     // this.$root.$emit("repeater-field-set-value", this.repeater.model);
            //
            //     this.repeaterFieldValue = newVal;
            //     this.$store.commit(`${this.formModule}/${SET_INPUT}`, {
            //         model,
            //         value
            //     });
            // }
            // else {
            //     this.$root.$emit("form-field-set-value", this.formModule, model, value);
            //
            //     this.$store.commit(`${this.formModule}/${SET_INPUT}`, {
            //         model,
            //         value
            //     });
            // }
        },

        /**
         * this method called to passing input value to commit function
         * it can be overwritten in the input component
         * default will return parsed newVal
         * @author Mahmoud
         */
        passingInput(newVal) {
            return newVal;
        },

        /**
         * this method called directly when created hook gets fired
         * @author WeSSaM
         */
        onInputCreated() {
            /* @Todo, you can override the method then customize it as you want */
        },

        /**
         * this method called directly when mounted hook gets fired
         * @author WeSSaM
         */
        onInputMounted() {
            /* @Todo, you can override the method then customize it as you want */
        }
    },
    computed: {
        locale$() {
            return this.multiLang && this.locale ? this.locale : null;
        },
        isEdit() {
            /**
             * computed property returns if current state is edit
             * check if route params has resource id
             *
             * @author WeSSaM
             */
            return this.$route && this.$route.params && this.$route.params["id"];
        },
        defaultValue() {
            /**
             * computed property returns default input value
             * used to init input by this value
             *
             * @author WeSSaM
             */
            return null;
        },

        model$() {
            /**
             * computed property returns current input key (model)
             *
             * @author WeSSaM
             */
            return this.model;
        },

        type$() {
            /**
             * computed property returns input type
             * default is text
             *
             * @author WeSSaM
             */
            return "text";
        },

        label$() {
            /**
             * computed property return label
             *
             * @author WeSSaM
             */
            return this.label ? this.label : this.model;
        },

        placeholder$() {
            /**
             * computed property return translated placeholder
             *
             * @author WeSSaM
             */
            return this.placeholder;
            // switch (this.component) {
            //     case "select":
            //         return this.placeholder
            //             ? this.__trans(this.placeholder)
            //             : `${this.__trans("select")} ${this.__trans(this.label$)}`;
            //     case "attachment":
            //         return this.placeholder
            //             ? this.__trans(this.placeholder)
            //             : `${this.__trans("choose")} ${this.__trans(this.label$)}`;
            //     default:
            //         return this.placeholder
            //             ? this.__trans(this.placeholder)
            //             : `${this.__trans("enter")} ${this.__trans(this.label$)}`;
            // }
        },

        input: {
            /**
             * computed property using setter and getter
             * setter : place new value for this input to vuex form module directly without using local variables
             * getter : get the current value from module using mapState based on current input model
             *
             * @author WeSSaM
             */
            get() {
                // console.log("get:", this.model, this.inputValue);
                if (this.locale$)
                    return this.inputValue && this.inputValue[this.locale$] ? this.inputValue[this.locale$] : this.defaultValue;
                return this.inputValue;
            },
            set(newVal) {
                this.$commit(newVal);
            }
        },

        busyField: {
            get: function () {
                const busyFields =
                    this.$store.state[`${this.formModule}`][`${BUSY_FIELDS}`] || [];

                // if (busyFields.length === 0) return false;
                const found = busyFields.find(
                    element => element === this.busyFieldModel
                );
                return found ? true : false;
            },
            set: function (newVal) {
                const busyFields =
                    this.$store.state[`${this.formModule}`][`${BUSY_FIELDS}`] || [];

                const busyIndex = busyFields.indexOf(this.busyFieldModel);

                if (newVal) {
                    // add field to busy fields
                    if (busyIndex < 0) {
                        // console.log("push busy field");
                        busyFields.push(this.busyFieldModel);
                    }
                } else {
                    // remove field from busy fields
                    if (busyIndex > -1) {
                        // console.log("splice busy field");
                        busyFields.splice(busyIndex, 1);
                    }
                }

                this.$store.commit(`${this.formModule}/${SET_BUSY_FIELDS}`, busyFields);
            }
        },
        busyFieldModel() {
            let busyModel = this.model;
            if (this.repeater) {
                busyModel += this.repeater.rowIndex;
            }
            return busyModel;
        },

        properties() {
            /**
             * computed property returns original props
             *
             * @author WeSSaM
             */
            return {
                model: this.$model,
                component: this.component
            };
        },

        rules$() {
            /**
             * computed property returns validation rules
             *
             * @author WeSSaM
             */
            return this.rules ? this.rules : {};
        },

        inputValue: function () {
            /**
             * computed property used to bind current value to current input getter
             *
             * @author WeSSaM
             */
            if (this.repeater) {
                const repeaterData = this.$store.state[`${this.formModule}`][
                    this.repeater.model
                    ];
                const repeaterRow = repeaterData[this.repeater.rowIndex];
                this.repeaterFieldValue = _.get(
                    repeaterRow,
                    this.model,
                    this.defaultValue
                );
                // return _.get(repeaterRow, this.model, this.defaultValue);
                return this.repeaterFieldValue;
            } else {
                return _.get(this.form, this.model$, this.defaultValue);
            }
        },

        ...mapState({
            /**
             * computed property returns object form from vuex form module
             *
             * @author WeSSaM
             */
            form: function (state) {
                return _.get(state, this.formModule, {});
            }
        })
    }
    // }
};
