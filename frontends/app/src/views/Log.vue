<template>
  <div>
      <NavBar />
      <CreateLog />
      <LogList />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import CreateLog from '@/components/log/CreateLog.vue';
import LogList from '@/components/log/LogList.vue';

export default {
  name: 'Log',
  components: {NavBar, CreateLog, LogList},
  methods: {
      goBack() {
          this.$router.push({name: "Home"});
      }
  }
}
</script>
