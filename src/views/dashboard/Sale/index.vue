<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <el-tabs>
                    <el-tab-pane label="销售额" name="name"></el-tab-pane>
                    <el-tab-pane label="访问量" name="name2"></el-tab-pane>
                </el-tabs>
                <div>
                    <div>本日</div>
                    <div>本周</div>
                    <div>本月</div>
                    <div>本年</div>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
     
export default {
    name: 'Sale',
};
    
</script>
  
<style scoped>
    .clearfix{
        display: flex;
        justify-content: space-between;
    }
</style>