// // import InputField from "./InputField.vue"
// import TextareaField from "./TextareaField.vue"
// import SelectField from "./SelectField.vue"
// import TagsField from "./TagsField.vue"
// // import DateField from "./DateField.vue"
// // import EditorField from "./EditorField.vue"
// import SwitchField from "./SwitchField.vue"
// import CrudField from "./Crud/Index.vue"


// const InputField = defineAsyncComponent(() =>
//     import("./InputField.vue")
// );
// const SelectField = defineAsyncComponent(() =>
//     import("./SelectField.vue")
// );
// const TagsField = defineAsyncComponent(() =>
//     import("./TagsField.vue")
// );
// const DateField = defineAsyncComponent(() =>
//     import("./DateField.vue")
// );
// const EditorField = defineAsyncComponent(() =>
//     import("./EditorField.vue")
// );
// const TextareaField = defineAsyncComponent(() =>
//     import("./TextareaField.vue")
// );
// const SwitchField = defineAsyncComponent(() =>
//     import("./SwitchField.vue")
// );
// const CrudField = defineAsyncComponent(() =>
//     import("./Crud/Index.vue")
// );
import {defineAsyncComponent} from 'vue'


const resolveComponents = function (components) {
    let resolvedComponents = {};
    Object.entries(components).forEach((component) => {
        resolvedComponents[component[0]] = defineAsyncComponent(() =>
            import(`${component[1]}`)
        );
    });
    return resolvedComponents;
};

const components = {
    InputField: "./InputField.vue",
    SelectField: "./SelectField.vue",
    TagsField: "./TagsField.vue",
    SwitchField: "./SwitchField.vue",
    TextareaField: "./TextareaField.vue",
    // DateField: "./DateField.vue",
    EditorField: "./EditorField.vue",
    CrudField: "./Crud/Index.vue",
};


export default resolveComponents(components);
// export default {
//     InputField,
//     DateField,
//     EditorField,
//     TagsField,
//     SelectField,
//     CrudField,
//     TextareaField,
//     SwitchField,
//     // SelectField: () => import("./SelectField.vue"),
//     // TagsField: "./TagsField.vue",
//     // SwitchField: "./SwitchField.vue",
//     // TextareaField: "./TextareaField.vue",
//     // InputField: "./InputField.vue",
//     // CrudField: "./CrudField.vue",
// };
// console.log(components);

// const InputField = defineAsyncComponent(
//     () => new Promise((resolve, reject) => {
//         resolve(import( "./InputField.vue"))
//     })
// );
// const resolvedComponents = {};
// Object.entries(components).forEach(function (value) {
//     resolvedComponents[value[0]] = defineAsyncComponent(
//         () => new Promise((resolve, reject) => {
//             resolve(import( value[1]))
//         })
//     )
// });
// console.log(resolvedComponents);
// export default components;
// export default Object.entries(components).map(function (value) {
//     return defineAsyncComponent(
//         () => new Promise((resolve, reject) => {
//             resolve(import( value[0]))
//         })
//     )
//     // console.log('value', value);
// })
// console.log(_.map(components, function (path, component) {
//     return defineAsyncComponent(
//         () => new Promise((resolve, reject) => {
//             resolve(import( path))
//         })
//     )
// }));
// export default _.map(components, function (path, component) {
//     return defineAsyncComponent(
//         () => new Promise((resolve, reject) => {
//             resolve(import( path))
//         })
//     )
// })
//
// export default {
//     InputField,
//     SelectField,
//     // DateField,
//     // EditorField,
//     TagsField,
//     SwitchField,
//     CrudField,
//     TextareaField
// }