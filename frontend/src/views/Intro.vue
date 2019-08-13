<template>
  <div class="starthtml">
    <div class="startBody">
      <div class="spaceships" @click="gohome">
        <div class="spaceships__head"></div>
        <div class="spaceships__body"></div>
        <div class="spaceships__foot"></div>
        <div class="alien">
          <div class="alien__body">
            <div class="alien__ear"></div>
            <div class="alien__eye"></div>
          </div>
        </div>
      </div>
      <div class="bubble">
        <img src="../assets/bubble.png" width="100px;" />
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
export default {
  mounted() {
  },
  methods: {
    gohome() {
      this.$router.push("/home");
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Cute+Font&display=swap");
.starthtml {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url("https://thumbs.gfycat.com/HarmlessPlainCobra-size_restricted.gif");
  background-size: cover;
}

.startBody {
  width: 100%;
  height: 100%;
  margin: 0;
}

*:before, *:after {
  position: absolute;
  content: "";
}

.spaceships {
  position: absolute;
  top: calc(50% - 100px);
  left: calc(50% - 165px);
  width: 330px;
  height: 200px;
  -webkit-animation: spaceships 8s infinite alternate;
          animation: spaceships 8s infinite alternate;
  -webkit-transform: scale(0.5);
          transform: scale(0.5);
}
.spaceships:hover .spaceships__head {
  -webkit-transform: rotate(68deg);
          transform: rotate(68deg);
  transition: 0.5s;
  left: 45px;
}
.spaceships__head {
  position: absolute;
  top: 10px;
  left: 50px;
  width: 215px;
  height: 131px;
  overflow: hidden;
  z-index: 10;
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
  -webkit-transform: rotate(0);
          transform: rotate(0);
  transition: 0.5s;
}
.spaceships__head:before {
  width: 215px;
  height: 181px;
  border-radius: 50%;
  background-color: #3f4952;
}
.spaceships__body {
  position: absolute;
  top: 80px;
  left: 0;
  width: 320px;
  height: 115px;
  overflow: hidden;
  border-radius: 50%;
  z-index: 5;
  background-color: #0e7972;
}
.spaceships__body:before {
  position: absolute;
  left: -12px;
  width: 320px;
  height: 115px;
  border-radius: 50%;
  background-color: #13a79d;
  top: -8px;
}
.spaceships__body:after {
  top: 10px;
  left: 56px;
  width: 203px;
  height: 50px;
  border-radius: 50% 50% 20% 20%;
  background-color: #3f4952;
}
.spaceships__light {
  width: 0;
  height: 0;
  border-bottom: 20px solid #f4ca5a;
  border-right: 20px solid transparent;
  border-left: 20px solid transparent;
}
.spaceships__foot {
  position: absolute;
  top: 165px;
  left: 120px;
  width: 70px;
  height: 50px;
  border-radius: 50%;
  background-color: #f4ca5a;
  z-index: 1;
}
.spaceships__foot:before {
  left: -73px;
  top: -10px;
  width: 70px;
  height: 50px;
  -webkit-transform: rotateZ(10deg);
          transform: rotateZ(10deg);
  border-radius: 50%;
  background-color: #f4ca5a;
}
.spaceships__foot:after {
  left: 73px;
  top: -10px;
  width: 70px;
  height: 50px;
  -webkit-transform: rotateZ(-10deg);
          transform: rotateZ(-10deg);
  border-radius: 50%;
  background-color: #f4ca5a;
}

.alien {
  position: absolute;
  width: 110px;
  height: 120px;
  top: 48px;
  z-index: 9;
  left: 108px;
  transition: 0.2s;
}
.alien__body {
  width: 110px;
  height: 93px;
  border-radius: 50% 50% 0 0;
  position: relative;
  background-color: #e86e7b;
}
.alien__eye {
  position: absolute;
  top: 15px;
  left: 23px;
  width: 63px;
  height: 62px;
  background-color: #fff;
  border-radius: 50%;
  overflow: hidden;
}
.alien__eye:before {
  position: absolute;
  top: 6px;
  left: 21px;
  width: 35px;
  height: 35px;
  background-color: #000;
  border-radius: 50%;
}
.alien__eye:after {
  position: absolute;
  top: 0;
  left: -8px;
  width: 80px;
  height: 62px;
  background-color: #e86e7b;
  border-radius: 50%;
  -webkit-animation: eye 3s infinite alternate;
          animation: eye 3s infinite alternate;
}
.alien__ear {
  position: absolute;
  top: -15px;
  left: 37px;
  width: 10px;
  height: 30px;
  -webkit-transform: rotateZ(-28deg);
  transform: rotateZ(-28deg);
  background-color: #e86e7b;
}
.alien__ear:before {
  position: absolute;
  top: -25px;
  left: -8px;
  width: 25px;
  height: 30px;
  background-color: #e86e7b;
  border-radius: 50%;
}

@-webkit-keyframes spaceships {
  0% {
    -webkit-transform: scale(0.5) translate(0, 0) rotate(0);
            transform: scale(0.5) translate(0, 0) rotate(0);
  }
  25% {
    -webkit-transform: scale(0.5) translate(0, 0) rotate(10deg);
            transform: scale(0.5) translate(0, 0) rotate(10deg);
  }
  50% {
    -webkit-transform: scale(0.5) translate(0, 0) rotate(0);
            transform: scale(0.5) translate(0, 0) rotate(0);
  }
  75% {
    -webkit-transform: scale(0.5) translate(0, 0) rotate(-10deg);
            transform: scale(0.5) translate(0, 0) rotate(-10deg);
  }
}

@keyframes spaceships {
  0% {
    -webkit-transform: scale(0.5) translate(0, 0) rotate(0);
            transform: scale(0.5) translate(0, 0) rotate(0);
  }
  25% {
    -webkit-transform: scale(0.5) translate(0, 0) rotate(10deg);
            transform: scale(0.5) translate(0, 0) rotate(10deg);
  }
  50% {
    -webkit-transform: scale(0.5) translate(0, 0) rotate(0);
            transform: scale(0.5) translate(0, 0) rotate(0);
  }
  75% {
    -webkit-transform: scale(0.5) translate(0, 0) rotate(-10deg);
            transform: scale(0.5) translate(0, 0) rotate(-10deg);
  }
}
@-webkit-keyframes eye {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  25% {
    -webkit-transform: translateY(-65px);
            transform: translateY(-65px);
  }
  50% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  75% {
    -webkit-transform: translateY(-65px);
            transform: translateY(-65px);
  }
  100% {
    -webkit-transform: translateY(-65px);
            transform: translateY(-65px);
  }
}
@keyframes eye {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  25% {
    -webkit-transform: translateY(-65px);
            transform: translateY(-65px);
  }
  50% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  75% {
    -webkit-transform: translateY(-65px);
            transform: translateY(-65px);
  }
  100% {
    -webkit-transform: translateY(-65px);
            transform: translateY(-65px);
  }
}
.bubble{
  position:absolute;
  left: 50%;
  top: 20%;
  transform: translateX(-50%);
  font-size: 100px;
  z-index: 200;
}

</style>
