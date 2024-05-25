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
    (req, res) => fetch(SERVICE_ENDPOINT)
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
);

//* Show
router.get(
    "/:id",
    (req, res) => fetch(
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
            res.status(200).send(service);
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
);

//* ShowList
router.get(
    "/list/:ids",
    (req, res) => fetch(
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
);

//* Store
router.post(
    "/",
    (req, res) => {

        const service: Service & RequestBody = req.body;

        if (!matches(service, serviceMatcher)) {
            const CODE = 422;
            
            const error: ErrorBody = {
                private: "Error inesperado en llamado fetch en Store",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "La forma del cuerpo no corresponde al Serviceo"
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
        ).then(response => (console.log(response), response.json()))
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
                    private: "El serviceo retornado no pasa el typecheck de array en Store",
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


module.exports = router;
export default router;