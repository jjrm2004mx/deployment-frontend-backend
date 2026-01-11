
# Guía Rápida: Publicar tu Primer Frontend en Vercel usando GitHub

Esta guía resume los pasos que seguimos para publicar un sitio estático en **Vercel** partiendo de un repositorio en **GitHub**.

---

## 0. Prerrequisitos

Antes de comenzar, necesitas:

- Cuenta en **GitHub** (ej. `https://github.com/tu-usuario`)
- Cuenta en **Vercel** (puedes iniciar sesión con GitHub)
- Git instalado en tu equipo
- Un editor de código (VS Code, por ejemplo)

---

## 1. Crear el repositorio en GitHub

1. Entra a GitHub y haz clic en **New repository**.
2. Asigna un nombre, por ejemplo:

   ```text
   deployment-frontend-backend
   ```

3. Déjalo como **Public**.
4. No marques opciones para crear README, .gitignore ni License (los agregaremos localmente).
5. Haz clic en **Create repository**.

GitHub mostrará la URL del repo, algo como:

```text
https://github.com/tu-usuario/deployment-frontend-backend.git
```

---

## 2. Crear el proyecto localmente

1. En tu equipo, crea una carpeta para el proyecto:

   ```bash
   mkdir deployment-frontend-backend
   cd deployment-frontend-backend
   ```

2. Inicializa Git:

   ```bash
   git init
   ```

3. Crea un archivo `index.html` sencillo (luego lo podrás reemplazar por tu HTML “bonito”):

   ```html
   <!DOCTYPE html>
   <html lang="es">
   <head>
     <meta charset="UTF-8" />
     <title>Hola, Vercel</title>
   </head>
   <body>
     <h1>¡Hola, Vercel!</h1>
     <p>Proyecto web básico listo para desplegar.</p>
   </body>
   </html>
   ```

4. Haz tu primer commit:

   ```bash
   git add .
   git commit -m "feat: proyecto web básico para Vercel"
   ```

---

## 3. Conectar el proyecto local con el repo de GitHub

En la misma carpeta del proyecto, agrega el remoto y haz push:

```bash
git branch -M main
git remote add origin https://github.com/tu-usuario/deployment-frontend-backend.git
git push -u origin main
```

Con esto:

- Tu código local se sube a GitHub.
- Tu `index.html` ya vive en el repo remoto.

---

## 4. Conectar GitHub con Vercel e importar el repositorio

1. Entra a **Vercel**:  
   `https://vercel.com/new`
2. Inicia sesión con tu cuenta de **GitHub** (si no lo has hecho ya).
3. En la sección **Import Git Repository**:
   - Instala la **GitHub App** de Vercel cuando te lo pida.
   - Autoriza al menos el repositorio `deployment-frontend-backend`.
4. Una vez autorizada la app:
   - En **Select a Git Namespace**, elige tu usuario de GitHub.
   - En el buscador, escribe `deployment-frontend-backend`.
   - Selecciona el repo y haz clic en **Import**.

---

## 5. Configurar el proyecto en Vercel (primer despliegue)

En la pantalla de configuración del proyecto:

- **Project Name**: puedes dejar el nombre por defecto.
- **Framework Preset**: selecciona **Other** (o “Static Site” si aparece).
- **Root Directory**: selecciona la raíz del proyecto (el nombre del repo).  
  Debe contener el `index.html`.
- **Build Command**: déjalo vacío (no hay build).
- **Output Directory**: déjalo vacío.

Luego haz clic en:

```text
Deploy
```

Vercel va a:

1. Clonar el repo desde GitHub.
2. Detectar que es un sitio estático.
3. Colocar tu proyecto en su CDN global.
4. Generar una URL pública del tipo:

```text
https://deployment-frontend-backend.vercel.app/
```

---

## 6. Actualizar el contenido (por ejemplo, usar una página HTML más completa)

Si tienes otro archivo HTML (por ejemplo, una guía con mejor diseño), puedes:

### Opción A — Usarlo como página principal

1. Reemplaza el contenido de `index.html` con el HTML completo que quieras publicar.
2. Haz commit y push:

   ```bash
   git add .
   git commit -m "feat: usar página principal estilizada"
   git push
   ```

Vercel detectará el push y redeplegará automáticamente.  
Al recargar la URL pública, verás la nueva versión.

### Opción B — Redirigir desde `index.html` a otra página

Si quieres mantener un archivo separado (por ejemplo `guia-despliegue.html`), puedes hacer que `index.html` redirija a ese archivo:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Redirigiendo…</title>
  <meta http-equiv="refresh" content="0; url=guia-despliegue.html">
</head>
<body>
  <p>Redirigiendo a la guía de despliegue…</p>
</body>
</html>
```

Sube los cambios a GitHub y Vercel se encargará del nuevo deploy.

---

## 7. Flujo de trabajo a partir de ahora

Cada vez que quieras actualizar el sitio:

1. Editas tus archivos (`index.html` u otros).
2. Haces:

   ```bash
   git add .
   git commit -m "mensaje de los cambios"
   git push
   ```

3. Vercel construye y despliega automáticamente.
4. La misma URL de producción siempre apunta a la última versión.

---

## 8. Próximos pasos

Cuando domines el flujo básico con HTML estático, puedes dar los siguientes pasos:

- Crear un proyecto con **React** o **Next.js**.
- Integrar **Tailwind CSS** para estilos modernos.
- Usar variables de entorno para conectarte a un backend.
- Integrar frontends en Vercel con backends en **OCI**, **Render**, **Fly.io**, etc.

Esta guía cubre el flujo mínimo pero completo para poner tu primer frontend público en Vercel usando GitHub como origen del código.
