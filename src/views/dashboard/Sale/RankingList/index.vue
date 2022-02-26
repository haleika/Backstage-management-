<template>
  <div class="listCard">
    <div style="font-size: 18px; font-weight: bold">{{title}}排名</div>
    <ul>
      <li>
        <span class="rindex">0</span>
        <span>肯德基</span>
        <span class="rvalue">12312</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "RankingList",
  props:['title']
};
</script>
  
<style scoped>
.listCard {
  padding: 0;
}
ul {
  list-style: none;
  width: 100%;
  height: 400px;
  padding: 0;
}
li {
  height: 8%;
}
.rindex {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
  line-height: 20px;
}
.rvalue {
  float: right;
}
</style>