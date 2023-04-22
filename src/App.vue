<template>
  <!-- 100% en todas las resoluciones con container-fluid-->
  <div class="container-fluid">
    <h1 class="tracking-in-expand">hola desde padre</h1>
    <componente-hijo :nombre="nombre" @saludar="recibirSaludo" />

    <h1>{{ saludito }}</h1>

    <h1 :class="cambiarColorNumero">{{ numero }}</h1>
    <button class="btn btn-primary" @click="aumentar()">aumentar</button>
    <button class="btn btn-primary" @click="disminuir()">disminuir</button>
    <button class="btn btn-primary" @click="resetear()">resetear</button>

    <button v-if="mostrarMic" class="btn btn-primary" @click="activandoMicrofono">mic</button>
    <h2>{{ microfono }}</h2>

    <input type="text" class="input-moderno" placeholder="ingrese texto.." />

    <div>
      <a href="https://www.linkedin.com/in/juan-maynard/" aria-label="mi link de linkedin" target="_blank"  toggle="tooltip"  title="linkedin"><i class="bi bi-linkedin"></i></a>
      <a href="https://github.com/juanmaynard91" aria-label="mi link de github"  target="_blank" toggle="tooltip"  title="github"><i class="bi bi-github"></i></a>
    </div>

    <div class="contenedora">
      <div class="items item1">item 1</div>
      <div class="items item2">item 2</div>
      <div class="items item3">item 3</div>
      <div class="items item4">item 4</div>
    </div>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, doloribus
      eos laborum ab cum eum fugit porro ipsum ex nihil. Sunt modi in quia quo
      obcaecati. Qui similique provident nesciunt. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Eius, doloribus eos laborum ab cum eum fugit
      porro ipsum ex nihil. Sunt modi in quia quo obcaecati. Qui similique
      provident nesciunt. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Eius, doloribus eos laborum ab cum eum fugit porro ipsum ex nihil.
      Sunt modi in quia quo obcaecati. Qui similique provident nesciunt. Lorem
      ipsum dolor sit amet consectetur adipisicing elit. Eius, doloribus eos
      laborum ab cum eum fugit porro ipsum ex nihil. Sunt modi in quia quo
      obcaecati. Qui similique provident nesciunt. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Eius, doloribus eos laborum ab cum eum fugit
      porro ipsum ex nihil. Sunt modi in quia quo obcaecati. Qui similique
      provident nesciunt. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Eius, doloribus eos laborum ab cum eum fugit porro ipsum ex nihil.
      Sunt modi in quia quo obcaecati. Qui similique provident nesciunt. Lorem
      ipsum dolor sit amet consectetur adipisicing elit. Eius, doloribus eos
      laborum ab cum eum fugit porro ipsum ex nihil. Sunt modi in quia quo
      obcaecati. Qui similique provident nesciunt. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Eius, doloribus eos laborum ab cum eum fugit
      porro ipsum ex nihil. Sunt modi in quia quo obcaecati. Qui similique
      provident nesciunt. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Eius, doloribus eos laborum ab cum eum fugit porro ipsum ex nihil.
      Sunt modi in quia quo obcaecati. Qui similique provident nesciunt. Lorem
      ipsum dolor sit amet consectetur adipisicing elit. Eius, doloribus eos
      laborum ab cum eum fugit porro ipsum ex nihil. Sunt modi in quia quo
      obcaecati. Qui similique provident nesciunt.
    </p>

    <button ref="scrollToBottomBtn" class="button" @click="scrollToBottom">
      <i class="bi bi-arrow-down"></i>
    </button>

    <button class="btn btn-primary" @click="compartir">Compartir en las redes papu</button>
  </div>
</template>

<script setup>
//AGREGAR TYPESCRIPT A TODO ESTO :O
import componenteHijo from "./components/componenteHijo.vue";
import { ref, computed, onMounted } from "vue";

const nombre = ref("juan");
const saludito = ref("");
const numero = ref(0);
const microfono = ref("");
const mostrarMic = ref(true);
const scrollToBottomBtn = ref(null);
let lastScrollTop = 0;

const compartir = () => {
  if (navigator.share) {
    navigator.share({
      text: "gracias por ver pa :D",
      url: "https://juanmaynard91.github.io/portfolio/html/indexES.html",
      title : "compartir en redes sociales",
    })
  }
  else {
    navigator.clipboard.writeText("link copiado!")
  }
}

//baja hasta el fondo de la pagina
const scrollToBottom = () => {
  scrollToBottomBtn.value.classList.add("hidden");
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};

const handleScroll = () => {
  const currentScrollTop = window.scrollY;

  if (currentScrollTop > lastScrollTop) {
    scrollToBottomBtn.value.classList.add("hidden");
  } else {
    scrollToBottomBtn.value.classList.remove("hidden");
  }

  lastScrollTop = currentScrollTop;
};

// Inicializar los tooltips de Bootstrap
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

function recibirSaludo(mensajeEmit) {
  saludito.value = mensajeEmit;
}

//las propiedades computadas sirven para no cargar el html del template de boludeces
const cambiarColorNumero = computed(() => {
  if (numero.value === 0) {
    return "white";
  }
  if (numero.value > 0) {
    return "green";
  }
  if (numero.value < 0) {
    return "red";
  }
});

const aumentar = () => {
  numero.value++;
};
const disminuir = () => {
  numero.value--;
};
const resetear = () => {
  numero.value = 0;
};

const activandoMicrofono = async () => {
  try {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "es-ES";
    recognition.start();
    recognition.onresult = (event) => {
      microfono.value = event.results[0][0].transcript;
      console.log(microfono.value);
    };
  } catch (e) {
    console.error(e);
  }
};

onMounted(() => {
  if (!("webkitSpeechRecognition" in window)) {
    mostrarMic.value = false;
    //window.alert("Web Speech API no está soportado en este navegador.");
  }
  window.addEventListener("scroll", handleScroll);
});
</script>

<style>
@import "./assets/estilos.css";

.contenedora {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  min-height: 5rem;
  gap: 1rem;
  padding: 1rem;
  background-color: rgb(47, 95, 255);
}
.items {
  background-color: rgb(180, 180, 180);
  width: 10rem;
  padding: 1rem;
}
.item2 {
  align-self: stretch;
}

/* color al placeholder padre */
.input-moderno,
input::placeholder {
  border: none;
  border-bottom: 1px solid #bdbdbd;
  outline: none;
  background-color: transparent;
  color: #fff;
  margin: 2rem 0;
}

.input-moderno:focus {
  border-bottom: 1px solid #5f5f5f;
  outline: none;
}

.btn {
  margin: 0 0.5rem;
  border-bottom: 2px solid black;
}

a {
  padding: 1rem;
  color: #fff;
}

/* para cuando volteas el celular de costado pa :D */
@media (orientation: landscape) {
  html,
  body {
    background-color: blue;
  }
}

.button {
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: fixed;
  bottom: 10px;
  right: 10px;
  transition: opacity 0.3s;
}

.button.hidden {
  opacity: 0;
}
</style>
