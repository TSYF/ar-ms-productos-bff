import { CommonResponseBody } from '@/types/CommonResponseBody';
import swaggerAutogen from 'swagger-autogen';
import { Service as IService } from '../types/Service';

const Service: IService = {
    images: [
      "uri.to.img/separated.jpg",
      "by.commas.per/each?resource=identifier"
    ],
    name: "Tintado de Vidrios",
    description: `
* Limpieza y preparación del vidrio: Los vidrios se limpian a fondo para eliminar cualquier suciedad o residuos.
* Aplicación de la película de tinte: La película adhesiva de tinte se corta a la medida exacta de cada ventana y se coloca cuidadosamente sobre el vidrio.
* Activación del adhesivo: Se utiliza un líquido activador o aplicador para asegurar que la película se adhiera firmemente al vidrio sin burbujas o arrugas.
* Curado y acabado: Se deja que la película cure durante un período de tiempo específico (usualmente 24-48 horas) para que el adhesivo se fije completamente.
* Inspección final: Después del curado, se revisa que la aplicación del tinte haya quedado uniforme y sin defectos.
    `,
    minPrice: 100_000,
    maxPrice: 200_000, 
    isActive: true
};

const doc = {
  info: {
    title: 'Servicios',
    description: 'API de Servicios para AR Detailing'
  },
  host: 'localhost:8000',
  components: {
    schemas: {
      Service
    }
  }
};

const outputFile = '../../openapi-contract.json';
const routes = [
  '../routes/service.ts'
];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({openapi: "3.0.3"})(outputFile, routes, doc);