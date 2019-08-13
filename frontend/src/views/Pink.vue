<template>
  <div class="startBody">
    <section>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </section>

    <div class="html">
      <div class="body">
        <div class="spaceships">
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
        <div class="textClick">
          click
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
export default {
  mounted() {
    let tl = anime.timeline({
      easing: "easeOutExpo",
      duration: 850
    });

    tl.add({
      targets: "section .item",
      width: "100%",
      backgroundColor: "#F6A9BD",
      delay: anime.stagger(100)
    });

    tl.add({
      targets: "section .item",
      delay: anime.stagger(70),
      backgroundColor: "#F4E0E1"
    });

    tl.add({
      targets: "section .item",
      backgroundColor: "#FFFFFF",
      delay: anime.stagger(50, {from: "center"})
    });

    tl.add({
      targets: ".text",
      top: "49%",
      duration: 4500,
      opacity: 1
    }, "-=1000");
    var textWrapper = document.querySelector(".effect1");
    textWrapper.innerHTML = textWrapper.textContent.replace(/([^.\s]|\w)/g, "<span class='letter'>$&</span>");

    anime.timeline()
      .add({
        targets: ".effect1 .letter",
        scale: [5, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 1350,
        delay: function(el, i) {
          return 70 * i;
        }
      }, 1500);
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Kanit:100,700");
.startBody {
  font-family: "Kanit", sans-serif;
  margin: 0;
  height: 100vh;
  overflow: hidden;
}

.container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.effect1 {
  position: absolute;
  margin: 0;
  top: 40%;
  font-size: 2.3em;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  z-index: 3;
  color: #F6A9BD;
}

.effect1 .letter {
  display: inline-block;
  line-height: 1em;
}

.text {
  position: absolute;
  font-size: 1.8em;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: #F0386B;
  font-weight: 100;
  top: 50%;
  z-index: 3;
  opacity: 0;
  top: 50%;
}

section {
  display: grid;
  grid-template-columns: repeat(10, auto);
}

.item {
  background-color: #F4E0E1;
  height: 100vh;
  z-index: 0;
}

@import url("https://fonts.googleapis.com/css?family=Cute+Font&display=swap");
.html {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.body {
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: #ffc9ed;
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
.textClick {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 70px;
  color: black;
  font-family: "Cute Font", cursive;
  z-index: 100;
}

</style>
