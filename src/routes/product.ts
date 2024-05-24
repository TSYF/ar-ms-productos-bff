import { envs } from '@/config/env';
import { ErrorBody } from '@/types/ErrorBody';
import { CommonResponseBody } from '@/types/CommonResponseBody';
import express from 'express';
import { matches } from '@/utils';
import { Product, productMatcher } from '../types/Product';
import { RequestBody } from '../utils';
const router = express.Router();

const { PRODUCT_ENDPOINT } = envs;

//* Index
router.get(
    "/",
    (req, res) => fetch(PRODUCT_ENDPOINT)
        .then(response => response.json())
        .then(products => {
            if (Array.isArray(products)) {
                const CODE = 200;
                const response = new CommonResponseBody(
                    true,
                    CODE,
                    products
                )
                res.status(CODE).send(response);
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
        `${PRODUCT_ENDPOINT}${req.params.id}/`
    ).then(response => response.json())
    .then(product => {
                const CODE = 200;
                const response = new CommonResponseBody(
                    true,
                    CODE,
                    product
                )
                res.status(CODE).send(response);
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
        `${PRODUCT_ENDPOINT}list/${req.params.ids}/`
    ).then(response => response.json())
    .then(products => {
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

        const product: Product & RequestBody = req.body;

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
            return;
        }
        
        fetch(
            PRODUCT_ENDPOINT,
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(product)
            }
        ).then(response => (console.log(response), response.json()))
        .then(product => {
            if (matches(product, productMatcher)) {
                const response = new CommonResponseBody(
                    true,
                    201,
                    product
                )
                res.status(201).send(response);
            } else {
                const CODE = 500;
                const error: ErrorBody = {
                    private: "El producto retornado no pasa el typecheck de array en Store",
                    public: new CommonResponseBody(
                        false,
                        CODE,
                        {
                            message: "¡Ha ocurrido un problema inesperado!"
                        }
                    )
                }
                console.log(product);
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