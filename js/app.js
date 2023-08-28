// Declaración de variables
let tags = []; // Almacenará las etiquetas ingresadas por el usuario
const inputTagContainer = document.querySelector("#input-tag"); // Contenedor de entrada de etiquetas
const tagsContainer = document.createElement("div"); // Contenedor de etiquetas
const inputTag = document.createElement("span"); // Etiqueta de entrada

// Manejo del evento click en el contenedor de entrada de etiquetas
inputTagContainer.addEventListener("click", (e) => {
  // Si se hace clic en el contenedor de entrada o en un contenedor de etiquetas
  if (
    e.target.id === "input-tag" ||
    e.target.classList.contains("tag-container")
  ) {
    inputTag.focus(); // Enfoca la etiqueta de entrada para editarla
  }
});

// Configuración de la etiqueta de entrada
inputTag.ariaRoleDescription = "textbox"; // Propiedad para accesibilidad
inputTag.contentEditable = "true"; // Permite editar el contenido
inputTag.classList.add("input"); // Agrega una clase CSS
inputTag.focus(); // Enfoca automáticamente la etiqueta de entrada

// Agrega clases CSS a los contenedores
inputTagContainer.classList.add("input-tag-container");
tagsContainer.classList.add("tag-container");

// Agrega elementos al DOM (Document Object Model)
inputTagContainer.appendChild(tagsContainer); // Agrega el contenedor de etiquetas al contenedor de entrada
tagsContainer.appendChild(inputTag); // Agrega la etiqueta de entrada al contenedor de etiquetas

// Manejo del evento keydown en la etiqueta de entrada
inputTag.addEventListener("keydown", (e) => {
    
    // Si se presiona la tecla Enter y el contenido de la etiqueta de entrada no está vacío
    if (e.key === "Enter" && inputTag.textContent !== "") {
      e.preventDefault(); // Evita el comportamiento por defecto del Enter
      // Si la etiqueta no existe aún, la agrega a la lista de etiquetas
      if (!existTag(inputTag.textContent)) {
        tags.push(inputTag.textContent); // Agrega la etiqueta a la lista
        inputTag.textContent = ""; // Limpia el contenido de la etiqueta de entrada para la siguiente
        renderTags(); // Actualiza la visualización de las etiquetas
      }
    } else if (
      e.key === "Backspace" &&
      inputTag.textContent === "" &&
      tags.length > 0
    ) {
      // Si se presiona la tecla Backspace, la etiqueta de entrada está vacía y hay etiquetas en la lista
      tags.pop(); // Elimina la última etiqueta de la lista
      renderTags(); // Actualiza la visualización de las etiquetas
    }
  });
  
// Función para renderizar las etiquetas en el contenedor de etiquetas
function renderTags() {
  tagsContainer.innerHTML = ""; // Limpia el contenido del contenedor de etiquetas
  const html = tags.map((tag) => {
    const tagElement = document.createElement("div"); // Crea un elemento de etiqueta
    const tagButton = document.createElement("button"); // Crea un botón para eliminar la etiqueta
    tagElement.classList.add("tag-item"); // Agrega una clase CSS al elemento de etiqueta
    tagButton.textContent = "X"; // Agrega contenido al botón
    tagButton.addEventListener("click", (e) => {
      removeTag(tag); // Maneja el evento click en el botón para eliminar la etiqueta
    });
    tagElement.appendChild(document.createTextNode(tag)); // Agrega el contenido de la etiqueta al elemento
    tagElement.appendChild(tagButton); // Agrega el botón de eliminación al elemento
    return tagElement;
  });

  // Agrega cada elemento de etiqueta renderizado al contenedor de etiquetas
  html.forEach((element) => {
    tagsContainer.appendChild(element);
  });
  tagsContainer.appendChild(inputTag); // Agrega la etiqueta de entrada al final
  inputTag.focus(); // Enfoca la etiqueta de entrada para la siguiente edición
}

// Función para verificar si una etiqueta ya existe en la lista
function existTag(value) {
  return tags.includes(value);
}

// Función para eliminar una etiqueta de la lista y actualizar la visualización
function removeTag(value) {
  tags = tags.filter((tag) => tag !== value); // Filtra las etiquetas que no sean la que se va a eliminar
  renderTags(); // Actualiza la visualización de las etiquetas
}
