<template>
    <div>
        <p>{{ log.title }}</p>
    </div>
</template>
<script>
export default {
    name: "ViewLog",
    props: {
        log: {
            type: Object,
            required: true
        }
    }
}
</script>