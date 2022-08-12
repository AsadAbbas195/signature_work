<template>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  text-align: center;
}
#loader {
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid #f6770bdb;
  width: 25px;
  height: 25px;
  margin: 0 5px;
  -webkit-animation: spin 2s linear infinite;
  /* Safari */
  animation: spin 2s linear infinite;
}

#sign-in,
#sign-out,
#revoke-access-button {
  cursor: pointer;
  background: #f67d15db;
  padding: 7px;
  border: 1px solid #f0750b;
  border-radius: 5px;
  color: #fff;
  font-weight: 800;
}
#btnDiv {
  margin-bottom: 5px;
}
/* Safari */

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
