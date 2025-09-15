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
  <h2>Gerador de Lorem Ipsum</h2>
    <form method="get" action="/">
      <input type="number" id="p" name="p">
      <button type="submit">Enviar</button>
    </form>
    ${body}
  </body>
</html>

    `;
}
