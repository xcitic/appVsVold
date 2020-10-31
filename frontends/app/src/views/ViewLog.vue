<template>
    <div>
        <NavBar />
        <p>{{ log.title }}</p>
    </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue';

export default {
    name: "ViewLog",
    components: {NavBar},
    props: {
        log: {
            type: Object,
            required: true
        }
    }
}
</script>