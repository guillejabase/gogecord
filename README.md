# Gogecord

Cliente de Discord simple, ultra ligero, rápido y sin dependencias externas.<br>
Diseñado específicamente para **Bun** y enfocado en **slash commands**.

## 1. Filosofía de diseño

- **Cero dependencias:** Construido únicamente sobre las APIs nativas de Bun y Node/Web.
- **Rendimiento $O(1)$**<sup>1</sup>**:** Mapeos de eventos, presencias y llamadas mediante estructuras estáticas, evitando loops o búsquedas innecesarias en runtime.
- **Tipado estricto y DX**<sup>2</sup> **superior:** Olvídate de importar enums. Gogecord utiliza uniones de string literales (`'Online'`, `'Playing'`, etc.).
- **Arquitectura modular:** Procesamiento de eventos en la gateway con carga perezosa y memoria en caché.

<sup>1</sup> *Notación O grande de 1, máxima eficiencia y velocidad.*<br>
<sup>2</sup> *Experiencia del desarrollador.*

## 2. Instalación

```bash
bun add gogecord
```

## 3. Ejemplo de uso

#### `./.env`:
```env
APP_TOKEN=app_token
```

#### `./index.ts`:
```ts
import { Client } from 'gogecord';

const token = Bun.env['APP_TOKEN'];

if (!token) {
  throw new Error('App token is missing from your .env file');
}

const client = new Client({
  intents: ['GuildMembers', 'GuildPresences', 'Guilds'],
});

client.on('READY', (c) => {
  console.log(`Logged in as ${c.user.username}#${c.user.discriminator}`);

  c.gateway.setPresence({
    activities: [{
      name: 'Gogecord',
      type: 'Playing'
    }],
    status: 'online'
  });
});

client.login(token);
```
