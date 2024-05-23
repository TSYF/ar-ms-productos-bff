import { envs } from '@/config/env';
import { ErrorBody } from '@/types/ErrorBody';
import { CommonResponseBody } from '@/types/CommonResponseBody';
import express from 'express';
import { matches } from '@/utils';
import { Product, productMatcher } from '../types/Product';
const router = express.Router();

const { INDEX_ENDPOINT } = envs;

//* Index
router.get(
    "/",
    (req, res) => fetch(INDEX_ENDPOINT).then(products => {
        if (Array.isArray(products)) {
            res.status(200).send(products);
        } else {
            const CODE = 500;
            const error: ErrorBody = {
                private: "La lista de productos no pasa el typecheck de array en Index",
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
        `${INDEX_ENDPOINT}${req.params.id}/`
    ).then(product => {
            res.status(200).send(product);
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
        `${INDEX_ENDPOINT}${req.params.ids}/`
    ).then(products => {
            res.status(200).send(products);
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

        const product = req.body;

        if (!matches(product, productMatcher)) {
            const CODE = 422;
            
            const error: ErrorBody = {
                private: "Error inesperado en llamado fetch en Store",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "La forma del cuerpo no corresponde al Producto"
                    }
                )
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
        }
        
        fetch(
            INDEX_ENDPOINT,
            {
                method: "POST",
                body: product
            }
        ).then(products => {
            if (Array.isArray(products)) {
                res.status(200).send(products);
            } else {
                const CODE = 500;
                const error: ErrorBody = {
                    private: "La lista de productos no pasa el typecheck de array en Store",
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