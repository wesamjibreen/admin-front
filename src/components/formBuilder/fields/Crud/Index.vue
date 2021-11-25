<template>
    <div class="crud-container">
        <GDialog v-model="dialog" fullscreen>
            <FormLayout :data="data" @cancel="dialog = false"/>
        </GDialog>

        <VButton
                @click="onOpen"
                color="primary"
                size="big"
                type="submit"
                lower
                solid>
            {{trans('add_new')}}
        </VButton>

        <div>
            <ul>
                <li v-for="(item,index) in items">

                    <VButton
                            @click="removeItem(item,index)"
                            color="danger"
                            size="big"
                            type="submit"
                            lower
                            solid>
                        {{trans('delete')}}
                    </VButton>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {GDialog} from 'gitart-vue-dialog'
    import input from "../../mixins/input";
    import crudFormBuilder from "../../mixins/crudFormBuilder";

    export default {
        name: "Index",
        mixins: [input, crudFormBuilder],
        components: {
            GDialog,
        },
        props: {
            slug: {
                default: "dialog"
            }
        },
        data() {
            return {
                data: [
                    {
                        title: "Personal Info",
                        description: "This helps us to know you",
                        inputs: [
                            {
                                component: "input",
                                cols: 6,
                                label: "first_name",
                                model: "first_name",
                                multiLang: true,
                            },
                            {
                                component: "input",
                                cols: 6,
                                label: "last_name",
                                model: "last_name",
                                multiLang: true,
                            },
                            {
                                component: "textarea",
                                cols: 12,
                                multiLang: true,
                            },
                            {
                                component: "select",
                                cols: 6,
                                label: "first_name",
                                model: "first_name",
                                multiLang: true,
                            },
                            {
                                component: "tags",
                                cols: 6,
                                label: "last_name",
                                model: "last_name",
                                multiLang: true,
                            },

                            {
                                component: "date",
                                cols: 6,
                                label: "date",
                                model: "date",
                                multiLang: true,

                            },
                        ]
                    },
                    {
                        title: "Personal Info 2",
                        description: "This helps us to know you",
                        inputs: [
                            {
                                component: "switch",
                                cols: 6,
                                multiLang: true,
                            },
                            {
                                component: "editor",
                                multiLang: true,
                            },
                            {
                                component: "crud",
                                multiLang: true,
                            }


                        ]
                    },
                ],
                items: [],
                dialog: false
            }
        },
        methods: {
            onOpen() {
                this.dialog = true;
            },
            removeItem(item, index) {

            }
        },
    }
</script>

<style>
    @import '../../../../scss/abstracts/_mixins.scss';
    @import '../../../../scss/pages/generic/_forms-stepper.scss';
</style>