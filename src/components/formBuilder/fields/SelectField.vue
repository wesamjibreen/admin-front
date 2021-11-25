<template>
    <Multiselect
            v-model="input"
            class="input"
            placeholder="Select a size"
            :options="[
                      '1-5 Employees',
                      '5-25 Employees',
                      '25-50 Employees',
                      '50-100 Employees',
                      '100+ Employees',
                    ]"
    />
</template>


<script>
    import input from "../mixins/input";
    import options from "../mixins/options";
    import Multiselect from '@vueform/multiselect'

    export default {
        name: "SelectField",
        components: {
            Multiselect,
        },
        mixins: [input,options],
    };
</script>

