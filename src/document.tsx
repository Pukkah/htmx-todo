import h from "vhtml";

export const Document = ({ children }: { children: string | string[] }) =>
  "<!DOCTYPE html>\n" +
  (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="styles.css" rel="stylesheet" />
        <script
          src="https://unpkg.com/htmx.org@1.9.3"
          integrity="sha384-lVb3Rd/Ca0AxaoZg5sACe8FJKF0tnUgR2Kd7ehUOG5GCcROv5uBIZsOqovBAcWua"
          crossorigin="anonymous"
        ></script>
        <title>vHTMX Todo</title>
      </head>
      <body class="bg-rose-100">{children}</body>
    </html>
  );
