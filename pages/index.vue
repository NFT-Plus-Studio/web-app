<template>
    <div>
        <div id="dashboard-header-container" class="mb-5">
            <h1 class="text-h5">Dashboard</h1>
            <ProjectCreateButton />
        </div>
        <ProjectItem />
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#dashboard-header-container {
    display: flex;
    justify-content: space-between;
}
</style>
