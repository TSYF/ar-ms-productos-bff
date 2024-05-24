import { envs } from '@/config/env';
import { Category, categoryMatcher } from '@/types/Category';
import { CommonResponseBody } from '@/types/CommonResponseBody';
import { ErrorBody } from '@/types/ErrorBody';
import { RequestBody, matches } from '@/utils';
import express from 'express';
const router = express.Router();

const { CATEGORY_ENDPOINT } = envs;

//* Index
router.get(
    "/",
    async (req, res) => {
        const categories: Category[] = await fetch(CATEGORY_ENDPOINT).then(response => response.json());
        
        if (Array.isArray(categories)) {
            res.status(200).send(categories);
        } else {
            const CODE = 500;
            const error: ErrorBody = {
                private: "La lista de categorías no pasa el typecheck de array en Index",
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
    }
);


//* Store
router.post(
    "/",
    async (req, res) => {

        const category = req.body;

        if (!matches(category, categoryMatcher)) {
            const CODE = 422;
            
            const error: ErrorBody = {
                private: "Error inesperado en llamado fetch en Store",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "La forma del cuerpo no corresponde a la Categoría"
                    }
                )
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
        }

        const insertedCategory: Category & RequestBody = await fetch(
            CATEGORY_ENDPOINT,
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(category)
            }
        ).then(response => response.json());

        if (!insertedCategory) {
            const CODE = 500;

            const error: ErrorBody = {
                private: "Error inesperado en inserción en Store",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "¡Ha ocurrido un problema inesperado!"
                    }
                )
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
        }

        if (matches(insertedCategory, categoryMatcher)) {
            const CODE = 201;
            const response = new CommonResponseBody(
                false,
                CODE,
                insertedCategory
            );

            res.status(CODE).send(response);
        } else {
            const CODE = 500;
            const error: ErrorBody = {
                private: "La lista de categoryos no pasa el typecheck de array en Store",
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
    }
)

module.exports = router;
export default router;