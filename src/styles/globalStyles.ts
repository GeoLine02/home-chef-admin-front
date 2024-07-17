import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {

--color-green-50: #f0fdf4;
--color-green-100: #dcfce7;
--color-green-200: #bbf7d0;
--color-green-300: #86efac;
--color-green-400: #4ade80;
--color-green-500: #22c55e;
--color-green-600: #16a34a; 
--color-green-700: #15803d;
--color-green-800: #166534;
--color-green-900: #14532d;
--color-green-950: #052e16;



    /* Text color */
    --color-white: #fff;

    --color-gray-200: #e5e7eb;
    --color-gray-500: #6b7280;
}


*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.2s, border 0.2s;
}


body {
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;

  color: var(--color-gray-500);


  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;

}



input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  border: none;
  background:none;
  outline:none;
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-gray-200);
  color: var(--color-gray-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline-offset: -1px;
}

button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
}
`;

export default GlobalStyle;
