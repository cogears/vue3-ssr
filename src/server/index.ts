import { Router } from 'express';
const router: Router = Router();
router.get("/api/hello", function (req, res, next) {
    res.send('hello world')
})

export default router;

