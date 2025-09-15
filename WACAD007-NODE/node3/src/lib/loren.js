export default function gerarLorem(qtd = 1) {
  const texto = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eleifend arcu ac rhoncus porttitor. Nunc convallis, ex nec efficitur gravida, arcu nibh suscipit metus, sit amet luctus ligula mauris mollis nibh. Nunc ultrices finibus efficitur. Pellentesque vehicula est non elit luctus, vitae cursus odio auctor. Quisque ut enim condimentum, convallis quam sit amet, bibendum tellus. Sed ornare scelerisque nibh, nec laoreet ipsum finibus et. Suspendisse dui sapien, finibus id fermentum quis, tempor vel ipsum. Nam auctor turpis bibendum lacus pharetra dictum.`;
  return Array.from({ length: qtd }, () => `<br> <p>${texto}</p>`).join("\n");
}
