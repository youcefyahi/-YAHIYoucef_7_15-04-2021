<template>
<div class="testApi">
   

<h2>Test api methide post api placeholrder </h2>
<ul>
    <div class="truc" v-for="(item, index) in posts" :key="index">{{item.title}}</div>
</ul>
</div>


</template>

<script>
import {mapState} from 'vuex'
export default {
name:"testApi",
mounted(){
    this.$store.dispatch('loadPosts')
},
computed:{
    ...mapState(['posts'])
}
};

</script>
    
