<template>
    <v-date-picker v-model="input" color="green" trim-weeks>
        <template #default="{ inputValue, inputEvents }">
            <input
                    class="input"
                    type="text"
                    placeholder="Select a date"
                    :value="inputValue"
                    v-on="inputEvents"
            />
        </template>
    </v-date-picker>
    <!--<input class="input"-->
    <!--v-model="input"-->
    <!--:placeholder="placeholder$"-->
    <!--:name="model$"-->
    <!--:type="type$"/>-->
</template>

<script>
    import input from "../mixins/input";
    // import {DatePicker} from 'v-calendar';

    export default {
        name: "DateField",
        mixins: [input],
        components: {
           "v-date-picker": DatePicker
        }
    }
</script>

<style>

</style>
