import db from './dbConnect.js';
import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import { locales as AdminJSLocales } from 'adminjs';

import Consulta from './models/consulta.js';
import Funcionario from './models/funcionario.js';
import Medicamento from './models/medicamento.js';
import Paciente from './models/paciente.js';
import Pedido from './models/pedido.js';
import Posto from './models/posto.js';
import Receita from './models/receita.js';

const app = express();

const port = process.env.PORT || 3000;

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log(`Conexão com o banco na porta ${port} feita com sucesso`);
});

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const PORT = 3001;

// ADMINJS
const start = async () => {
  const app = express();

  const adminOptions = {
    resources: [Consulta, Receita, Medicamento, Funcionario, Paciente, Pedido, Posto],
    locale: {
      language: 'pt-BR',
      availableLanguages: Object.keys(AdminJSLocales),
    },
  };

  const admin = new AdminJS(adminOptions);

  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`);
  });
};

start();

export default app;
