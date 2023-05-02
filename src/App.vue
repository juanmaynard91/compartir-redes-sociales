<template>
  <!-- 100% en todas las resoluciones con container-fluid-->
  <div class="container-fluid">
    <h1 class="tracking-in-expand">hola desde padre</h1>
    <componente-hijo :nombre="nombre" @saludar="recibirSaludo" />

    <h1>{{ saludito }}</h1>

    <h1 :class="cambiarColorNumero">{{ numero }}</h1>
    <div class="separar-botones">
      <button id="btn" @click="aumentar()">aumentar</button>
      <button id="btn" @click="disminuir()">disminuir</button>
      <button id="btn" @click="resetear()">resetear</button>
    </div>

    <button v-if="mostrarMic" id="btn" @click="activandoMicrofono">mic</button>
    <h2>{{ microfono }}</h2>

    <div>
      <a href="https://www.linkedin.com/in/juan-maynard/" aria-label="mi link de linkedin" target="_blank" toggle="tooltip" title="linkedin"><i class="bi bi-linkedin"></i></a>
      <a href="https://github.com/juanmaynard91" aria-label="mi link de github" target="_blank" toggle="tooltip" title="github"><i class="bi bi-github"></i></a>
    </div>

    <div class="contenedora">
      <div class="items item1">item 1</div>
      <div class="items item2">item 2</div>
      <div class="items item3">item 3</div>
      <div class="items item4">item 4</div>
    </div>

    <p>
      El desarrollo frontend se refiere a la creación y diseño de la interfaz de
      usuario de un sitio web o aplicación. Es la parte del desarrollo web que
      se enfoca en lo que el usuario ve y con lo que interactúa, como los
      botones, menús, formularios y demás elementos visuales. El trabajo del
      desarrollador frontend implica utilizar lenguajes de programación como
      HTML, CSS y JavaScript para crear diseños atractivos, funcionales y
      responsivos que funcionen en diferentes dispositivos y navegadores.
      También es importante tener en cuenta las mejores prácticas de
      accesibilidad, usabilidad y rendimiento para garantizar una experiencia de
      usuario óptima. Además de la creación de la interfaz de usuario, el
      desarrollador frontend también trabaja en la integración de elementos
      dinámicos y funcionales, como animaciones, efectos de transición y
      funcionalidades interactivas como formularios y botones. También puede
      trabajar en la integración de librerías y frameworks, como React o
      Angular, para simplificar el proceso de desarrollo y mejorar la calidad
      del código. En resumen, el desarrollo frontend es una parte esencial del
      desarrollo web y de aplicaciones, ya que es responsable de crear la
      experiencia de usuario y la apariencia visual del producto final. El
      trabajo del desarrollador frontend requiere habilidades técnicas y
      creativas para diseñar y desarrollar soluciones innovadoras que satisfagan
      las necesidades de los usuarios.
    </p>

    <button ref="scrollToBottomBtn" class="button" @click="scrollToBottom">
      <i class="bi bi-arrow-down"></i>
    </button>

    <button id="btn" @click="compartir"><i class="bi bi-share-fill"></i> Compartir</button>
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

//compartir en las redes sociales
const compartir = () => {
  if (navigator.share) {
    navigator.share({
      title: "compartir en redes sociales",
      text: "gracias por compartir pa :D",
      url: "https://juanmaynard91.github.io/portfolio/html/indexES.html",
    });
  } else {
    navigator.clipboard.writeText("link copiado!");
  }
};

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
