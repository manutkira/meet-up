<template>
    <v-alert type="warning" color="red darken-2" info dismissible @input="onClose">
        {{text}}
    </v-alert>
</template>

<script>
export default {
    props: ['text'],
    methods: {
        onClose(){
            this.$emit('dismissed')
        }
    }
}
</script>