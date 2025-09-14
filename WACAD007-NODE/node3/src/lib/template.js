export default function template(body) {
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="public/style.css" />
    <title>página</title>
  </head>
  <body>
    <form method="get" action="/">
      <input type="number"/ name="p">
      <button type="submit">Enviar</button>
    </form>
    ${body}
  </body>
</html>

    `;
}
