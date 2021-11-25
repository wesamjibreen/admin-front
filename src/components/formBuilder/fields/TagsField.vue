<template>
    <Multiselect
            v-model="input"
            mode="tags"
            :searchable="true"
            :createTag="true"
            :options="[]"
    />
</template>


<script>
    import input from "../mixins/input";
    import Multiselect from '@vueform/multiselect'

    export default {
        name: "TagsField",
        components: {
            Multiselect,
        },
        mixins: [input],
    };
</script>

