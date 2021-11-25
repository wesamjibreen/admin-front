<template>
    <FormLayout :data="data"></FormLayout>
</template>

<script>
    export default {
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
                                component: "tags",
                                cols: 6,
                                label: "tags",
                                model: "tags",
                                multiLang: true,
                            },
                            {
                                component: "textarea",
                                model: "description",
                                cols: 12,
                            },
                            {
                                component: "select",
                                cols: 6,
                                label: "gender",
                                model: "gender",
                            },

                            {
                                component: "date",
                                cols: 6,
                                label: "date",
                                model: "date",
                            },
                        ]
                    },
                    {
                        title: "Personal Info 2",
                        description: "This helps us to know you",
                        inputs: [
                            {
                                component: "editor",
                                model: "long_description",
                                multiLang: true,
                            },
                            {
                                component: "crud",
                                label: "items",
                                model: "items",
                                slug: "items",
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
                                                component: "tags",
                                                cols: 6,
                                                label: "tags",
                                                model: "tags",
                                                multiLang: true,
                                            },
                                            {
                                                component: "textarea",
                                                model: "description",
                                                cols: 12,
                                            },
                                            {
                                                component: "select",
                                                cols: 6,
                                                label: "gender",
                                                model: "gender",
                                            },

                                            {
                                                component: "date",
                                                cols: 6,
                                                label: "date",
                                                model: "date",
                                            },
                                        ]
                                    },
                                ]
                            },
                            {
                                component: "switch",
                                cols: 6,
                            },

                        ]
                    },
                ]
            }
        }
    }
</script>
