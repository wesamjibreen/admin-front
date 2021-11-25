<script >
    // export interface VAvatarProps {
    //   picture?: string
    //   pictureDark?: string
    //   placeholder?: string
    //   badge?: string
    //   initials?: string
    //   size?: VAvatarSize
    //   color?: VAvatarColor
    //   dotColor?: VAvatarDotColor
    //   squared?: boolean
    //   dot?: boolean
    // }
    import {defineProps} from "vue";

    // export type VAvatarSize = 'small' | 'medium' | 'large' | 'big' | 'xl'
    // export type VAvatarColor =
    //   | 'primary'
    //   | 'success'
    //   | 'info'
    //   | 'warning'
    //   | 'danger'
    //   | 'h-purple'
    //   | 'h-orange'
    //   | 'h-blue'
    //   | 'h-green'
    //   | 'h-red'
    //   | 'h-yellow'
    // export type VAvatarDotColor =
    //   | 'primary'
    //   | 'success'
    //   | 'info'
    //   | 'warning'
    //   | 'danger'
    export default {
        setup() {
            let props = defineProps();
            if (!props)
                props = {
                    picture: undefined,
                    pictureDark: undefined,
                    placeholder: 'https://via.placeholder.com/50x50',
                    initials: '?',
                    badge: undefined,
                    size: undefined,
                    color: undefined,
                    dotColor: undefined,
                }
            return {
                props,
                ...props
            }
        }
    }

    // const props = withDefaults(defineProps(), {
    //     picture: undefined,
    //     pictureDark: undefined,
    //     placeholder: 'https://via.placeholder.com/50x50',
    //     initials: '?',
    //     badge: undefined,
    //     size: undefined,
    //     color: undefined,
    //     dotColor: undefined,
    // })
    // alert(picture);
</script>

<template>
    <div
            class="v-avatar"
            :class="[
      size && `is-${props.size}`,
      dot && 'has-dot',
      dotColor && `dot-${props.dotColor}`,
      squared && dot && 'has-dot-squared',
    ]"
    >
        <slot name="avatar">
            <img
                    v-if="props.picture"
                    class="avatar"
                    :class="[
          props.squared && 'is-squared',
          props.pictureDark && 'light-image',
        ]"
                    :src="props.picture"
                    alt=""
                    @error.once="(event) => useViaPlaceholderError(event, '150x150')"
            />
            <span
                    v-else
                    class="avatar is-fake"
                    :class="[
          props.squared && 'is-squared',
          props.color && `is-${props.color}`,
        ]"
            >
        <span>{{ props.initials }}</span>
      </span>
            <img
                    v-if="props.picture && props.pictureDark"
                    class="avatar dark-image"
                    :class="[props.squared && 'is-squared']"
                    :src="props.pictureDark"
                    alt=""
                    @error.once="(event) => useViaPlaceholderError(event, '150x150')"
            />
        </slot>

        <slot name="badge">
            <img
                    v-if="props.badge"
                    class="badge"
                    :src="props.badge"
                    alt=""
                    @error.once="(event) => useViaPlaceholderError(event, '150x150')"
            />
        </slot>
    </div>
</template>
