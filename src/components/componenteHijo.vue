<template>
  <h1 class="text-focus-in">hola desde hijo</h1>
  <h1>el props : {{ nombre }}</h1>

  <!--icono bootstrap-->
  <button id="btn" @click="enviarMensaje"><i class="bi bi-windows"></i> Enviar emit</button>
</template>

<script>
import { defineEmits } from "vue"; // si o si tengo que importarlo

export default {
  props: ["nombre"], //siempre arriba de setup

  setup(props, { emit }) {
    //la unica manera para que esta bosta de emit funcione por ahora
    defineEmits(["saludar"]);

    const enviarMensaje = () => {
      emit("saludar", "hola rey desde componente hijo"); //emit sin la s rey
    };

    return { enviarMensaje };
  },
};
</script>

<style>
@import "../assets/estilos.css";

/*animacion texto*/
.text-focus-in {
  -webkit-animation: text-focus-in 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  animation: text-focus-in 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}
@-webkit-keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}
@keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}
</style>
