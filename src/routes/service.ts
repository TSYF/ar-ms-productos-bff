import { envs } from '@/config/env';
import { ErrorBody } from '@/types/ErrorBody';
import { CommonResponseBody } from '@/types/CommonResponseBody';
import express from 'express';
import { matches } from '@/utils';
import { Service, serviceMatcher } from '../types/Service';
import { RequestBody } from '../utils';
const router = express.Router();

const { SERVICE_ENDPOINT } = envs;

//* Index
router.get(
    "/",
    (req, res) => {
        /* #swagger.responses[200] = {
            content: {
                  "application/json": {
                    ok: true,
                    code: 200,
                    data: [
                        {
                            images: "uri.to.img/separated.jpg,by.commas.per/each?resource=identifier",
                            name: "Tintado de Vidrios",
                            description: `
* Limpieza y preparación del vidrio: Los vidrios se limpian a fondo para eliminar cualquier suciedad o residuos.
* Aplicación de la película de tinte: La película adhesiva de tinte se corta a la medida exacta de cada ventana y se coloca cuidadosamente sobre el vidrio.
* Activación del adhesivo: Se utiliza un líquido activador o aplicador para asegurar que la película se adhiera firmemente al vidrio sin burbujas o arrugas.
* Curado y acabado: Se deja que la película cure durante un período de tiempo específico (usualmente 24-48 horas) para que el adhesivo se fije completamente.
* Inspección final: Después del curado, se revisa que la aplicación del tinte haya quedado uniforme y sin defectos.`,
                            price: 100_000,
                            isActive: true
                        },
                        {
                            images: "uri.to.img/separated.jpg,by.commas.per/each?resource=identifier",
                            name: "Tintado de Vidrios",
                            description: `
* Limpieza y preparación del vidrio: Los vidrios se limpian a fondo para eliminar cualquier suciedad o residuos.
* Aplicación de la película de tinte: La película adhesiva de tinte se corta a la medida exacta de cada ventana y se coloca cuidadosamente sobre el vidrio.
* Activación del adhesivo: Se utiliza un líquido activador o aplicador para asegurar que la película se adhiera firmemente al vidrio sin burbujas o arrugas.
* Curado y acabado: Se deja que la película cure durante un período de tiempo específico (usualmente 24-48 horas) para que el adhesivo se fije completamente.
* Inspección final: Después del curado, se revisa que la aplicación del tinte haya quedado uniforme y sin defectos.`,
                            price: 100_000,
                            isActive: true
                        }
                    ]
                }
            }
          }
        */
        /* #swagger.responses[500] = {
            content: {
                "application/json": {
                    ok: false,
                    code: 500,
                    data: {
                        message: "¡Ha ocurrido un problema inesperado!"
                    } 
                }
            }
          }
        */
        fetch(SERVICE_ENDPOINT)
            .then(response => response.json())
            .then(services => {
                if (Array.isArray(services)) {
                    const CODE = 200;
                    const response = new CommonResponseBody(
                        true,
                        CODE,
                        services
                    )
                    res.status(CODE).send(response);
                } else {
                    const CODE = 500;
                    const error: ErrorBody = {
                        private: "La lista de serviceos no pasa el typecheck de array en Index",
                        public: new CommonResponseBody(
                            false,
                            CODE,
                            {
                                message: "¡Ha ocurrido un problema inesperado!"
                            }
                        )
                    }
                    console.log(error.private);
                    res.status(CODE).send(error.public);
                }
            }).catch(err => {
                const CODE = 500;
                const error: ErrorBody = {
                    private: "Error inesperado en llamado fetch en Index",
                    public: new CommonResponseBody(
                        false,
                        CODE,
                        {
                            message: "¡Ha ocurrido un problema inesperado!"
                        }
                    ),
                    errorObject: err
                }
                console.log(error.private);
                console.error(error.errorObject)
                res.status(CODE).send(error.public);
            })
    }
);

//* Show
router.get(
    "/:id",
    (req, res) => {
        /* #swagger.responses[200] = {
                content: {
                    "application/json": {
                        ok: false,
                        code: 200,
                        data: {
                            images: "uri.to.img/separated.jpg,by.commas.per/each?resource=identifier",
                            name: "Tintado de Vidrios",
                            description: `
* Limpieza y preparación del vidrio: Los vidrios se limpian a fondo para eliminar cualquier suciedad o residuos.
* Aplicación de la película de tinte: La película adhesiva de tinte se corta a la medida exacta de cada ventana y se coloca cuidadosamente sobre el vidrio.
* Activación del adhesivo: Se utiliza un líquido activador o aplicador para asegurar que la película se adhiera firmemente al vidrio sin burbujas o arrugas.
* Curado y acabado: Se deja que la película cure durante un período de tiempo específico (usualmente 24-48 horas) para que el adhesivo se fije completamente.
* Inspección final: Después del curado, se revisa que la aplicación del tinte haya quedado uniforme y sin defectos.`,
                            price: 100_000,
                            isActive: true
                        }
                    }
                }
            }
        */
        /* #swagger.responses[500] = {
            content: {
                "application/json": {
                    ok: false,
                    code: 500,
                    data: {
                        message: "¡Ha ocurrido un problema inesperado!"
                    } 
                }
            }
          }
        */
        fetch(
            `${SERVICE_ENDPOINT}${req.params.id}/`
        ).then(response => response.json())
        .then(service => {
            const CODE = 200;
            const response = new CommonResponseBody(
                true,
                CODE,
                service
            )
            res.status(CODE).send(response);
        }).catch(err => {
            const CODE = 500;
    
            const error: ErrorBody = {
                private: "Error inesperado en llamado fetch en Show",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "¡Ha ocurrido un problema inesperado!"
                    }
                ),
                errorObject: err
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
        })
    }
);

//* ShowList
router.get(
    "/list/:ids",
    (req, res) => {
        /* #swagger.responses[200] = {
            content: {
                  "application/json": {
                    ok: true,
                    code: 200,
                    data: [
                        {
                            images: "uri.to.img/separated.jpg,by.commas.per/each?resource=identifier",
                            name: "Tintado de Vidrios",
                            description: `
* Limpieza y preparación del vidrio: Los vidrios se limpian a fondo para eliminar cualquier suciedad o residuos.
* Aplicación de la película de tinte: La película adhesiva de tinte se corta a la medida exacta de cada ventana y se coloca cuidadosamente sobre el vidrio.
* Activación del adhesivo: Se utiliza un líquido activador o aplicador para asegurar que la película se adhiera firmemente al vidrio sin burbujas o arrugas.
* Curado y acabado: Se deja que la película cure durante un período de tiempo específico (usualmente 24-48 horas) para que el adhesivo se fije completamente.
* Inspección final: Después del curado, se revisa que la aplicación del tinte haya quedado uniforme y sin defectos.`,
                            price: 100_000,
                            isActive: true
                        },
                        {
                            images: "uri.to.img/separated.jpg,by.commas.per/each?resource=identifier",
                            name: "Tintado de Vidrios",
                            description: `
* Limpieza y preparación del vidrio: Los vidrios se limpian a fondo para eliminar cualquier suciedad o residuos.
* Aplicación de la película de tinte: La película adhesiva de tinte se corta a la medida exacta de cada ventana y se coloca cuidadosamente sobre el vidrio.
* Activación del adhesivo: Se utiliza un líquido activador o aplicador para asegurar que la película se adhiera firmemente al vidrio sin burbujas o arrugas.
* Curado y acabado: Se deja que la película cure durante un período de tiempo específico (usualmente 24-48 horas) para que el adhesivo se fije completamente.
* Inspección final: Después del curado, se revisa que la aplicación del tinte haya quedado uniforme y sin defectos.`,
                            price: 100_000,
                            isActive: true
                        }
                    ]
                }
            }
          }
        */
        /* #swagger.responses[500] = {
            content: {
                "application/json": {
                    ok: false,
                    code: 500,
                    data: {
                        message: "¡Ha ocurrido un problema inesperado!"
                    } 
                }
            }
          }
        */
        fetch(
            `${SERVICE_ENDPOINT}list/${req.params.ids}/`
        ).then(response => response.json())
        .then(services => {
                res.status(200).send(services);
        }).catch(err => {
            const CODE = 500;
    
            const error: ErrorBody = {
                private: "Error inesperado en llamado fetch en ShowList",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "¡Ha ocurrido un problema inesperado!"
                    }
                ),
                errorObject: err
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
        })
    }
);

//* Store
router.post(
    "/",
    (req, res) => {
        /* #swagger.responses[201] = {
                content: {
                    "application/json": {
                        ok: false,
                        code: 201,
                        data: {
                            images: "uri.to.img/separated.jpg,by.commas.per/each?resource=identifier",
                            name: "Tintado de Vidrios",
                            description: `
* Limpieza y preparación del vidrio: Los vidrios se limpian a fondo para eliminar cualquier suciedad o residuos.
* Aplicación de la película de tinte: La película adhesiva de tinte se corta a la medida exacta de cada ventana y se coloca cuidadosamente sobre el vidrio.
* Activación del adhesivo: Se utiliza un líquido activador o aplicador para asegurar que la película se adhiera firmemente al vidrio sin burbujas o arrugas.
* Curado y acabado: Se deja que la película cure durante un período de tiempo específico (usualmente 24-48 horas) para que el adhesivo se fije completamente.
* Inspección final: Después del curado, se revisa que la aplicación del tinte haya quedado uniforme y sin defectos.`,
                            price: 100_000,
                            isActive: true
                        }
                    }
                }
            }
        */
        /* #swagger.responses[422] = {
            content: {
                "application/json": {
                    ok: false,
                    code: 422,
                    data: {
                        message: "La forma del cuerpo no coincide con la forma de Servicio"
                    } 
                }
            }
          }
        */
        /* #swagger.responses[500] = {
            content: {
                "application/json": {
                    ok: false,
                    code: 500,
                    data: {
                        message: "¡Ha ocurrido un problema inesperado!"
                    } 
                }
            }
          }
        */
        const service: Service & RequestBody = req.body;

        if (!matches(service, serviceMatcher)) {
            const CODE = 422;
            
            const error: ErrorBody = {
                private: "Error inesperado en llamado fetch en Store",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "La forma del cuerpo no coincide con la forma de Servicio"
                    }
                )
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
            return;
        }
        
        fetch(
            SERVICE_ENDPOINT,
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(service)
            }
        ).then(response => response.json())
        .then(service => {
            if (matches(service, serviceMatcher)) {
                const response = new CommonResponseBody(
                    true,
                    201,
                    service
                )
                res.status(201).send(response);
            } else {
                const CODE = 500;
                const error: ErrorBody = {
                    private: "El servicio retornado no pasa el typecheck en Store",
                    public: new CommonResponseBody(
                        false,
                        CODE,
                        {
                            message: "¡Ha ocurrido un problema inesperado!"
                        }
                    )
                }
                console.log(service);
                console.log(error.private);
                res.status(CODE).send(error.public);
            }
        }).catch(err => {
            const CODE = 500;

            const error: ErrorBody = {
                private: "Error inesperado en llamado fetch en Store",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "¡Ha ocurrido un problema inesperado!"
                    }
                ),
                errorObject: err
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
        })
    }
)

//* Update
router.put(
    "/:id",
    (req, res) => {
        /* #swagger.responses[200] = {
                content: {
                    "application/json": {
                        ok: false,
                        code: 200,
                        data: {
                            images: "uri.to.img/separated.jpg,by.commas.per/each?resource=identifier",
                            name: "Tintado de Vidrios",
                            description: `
* Limpieza y preparación del vidrio: Los vidrios se limpian a fondo para eliminar cualquier suciedad o residuos.
* Aplicación de la película de tinte: La película adhesiva de tinte se corta a la medida exacta de cada ventana y se coloca cuidadosamente sobre el vidrio.
* Activación del adhesivo: Se utiliza un líquido activador o aplicador para asegurar que la película se adhiera firmemente al vidrio sin burbujas o arrugas.
* Curado y acabado: Se deja que la película cure durante un período de tiempo específico (usualmente 24-48 horas) para que el adhesivo se fije completamente.
* Inspección final: Después del curado, se revisa que la aplicación del tinte haya quedado uniforme y sin defectos.`,
                            price: 100_000,
                            isActive: true
                        }
                    }
                }
            }
        */
        /* #swagger.responses[500] = {
            content: {
                "application/json": {
                    ok: false,
                    code: 500,
                    data: {
                        message: "¡Ha ocurrido un problema inesperado!"
                    } 
                }
            }
          }
        */
        fetch(
            `${SERVICE_ENDPOINT}${req.params.id}/`
        ).then(response => response.json())
        .then(service => {
            const CODE = 200;
            const response = new CommonResponseBody(
                true,
                CODE,
                service
            )
            res.status(CODE).send(response);
        }).catch(err => {
            const CODE = 500;
    
            const error: ErrorBody = {
                private: "Error inesperado en llamado fetch en Update",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "¡Ha ocurrido un problema inesperado!"
                    }
                ),
                errorObject: err
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
        })
    }
);

//* Delete
router.delete(
    "/:id",
    (req, res) => {
        /* #swagger.responses[200] = {
                content: {
                    "application/json": {
                        ok: false,
                        code: 200,
                        data: {
                            images: "uri.to.img/separated.jpg,by.commas.per/each?resource=identifier",
                            name: "Tintado de Vidrios",
                            description: `
* Limpieza y preparación del vidrio: Los vidrios se limpian a fondo para eliminar cualquier suciedad o residuos.
* Aplicación de la película de tinte: La película adhesiva de tinte se corta a la medida exacta de cada ventana y se coloca cuidadosamente sobre el vidrio.
* Activación del adhesivo: Se utiliza un líquido activador o aplicador para asegurar que la película se adhiera firmemente al vidrio sin burbujas o arrugas.
* Curado y acabado: Se deja que la película cure durante un período de tiempo específico (usualmente 24-48 horas) para que el adhesivo se fije completamente.
* Inspección final: Después del curado, se revisa que la aplicación del tinte haya quedado uniforme y sin defectos.`,
                            price: 100_000,
                            isActive: true
                        }
                    }
                }
            }
        */
        /* #swagger.responses[500] = {
            content: {
                "application/json": {
                    ok: false,
                    code: 500,
                    data: {
                        message: "¡Ha ocurrido un problema inesperado!"
                    } 
                }
            }
          }
        */
        fetch(
            `${SERVICE_ENDPOINT}${req.params.id}/`
        ).then(response => response.json())
        .then(service => {
            const CODE = 200;
            const response = new CommonResponseBody(
                true,
                CODE,
                service
            )
            res.status(CODE).send(response);
        }).catch(err => {
            const CODE = 500;
    
            const error: ErrorBody = {
                private: "Error inesperado en llamado fetch en Delete",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "¡Ha ocurrido un problema inesperado!"
                    }
                ),
                errorObject: err
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
        })
    }
);

export default router;