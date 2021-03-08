<template>
  <div id="app">
    <div id="nav">
        <router-link to="/signup">signup.vue</router-link>|
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>|
      <router-link to="/testApi">testApi</router-link>|
       <router-link to="/main">Main</router-link>|
       <router-link to="/profil">profil</router-link>|
       <router-link to="/login">login</router-link>|
        <router-link to="/addPost">addPost</router-link>|
    
       
       
    </div>

  
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

