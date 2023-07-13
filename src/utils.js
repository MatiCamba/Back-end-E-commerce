import path from 'path';

import { fileURLToPath } from 'url';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));
// __dirname hace refencia a la ruta del archivo SRC