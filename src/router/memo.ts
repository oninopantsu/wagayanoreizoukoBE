import express from 'express';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.send("メモ情報を取得するエンドポイント")
})

// 登録と更新
router.post('/', (req: express.Request, res: express.Response) => {
    res.send(`POST request to homepage${req.body.name}`)
})

// 削除
router.delete('/', (req: express.Request, res: express.Response) => {
    res.send(`DELETE request to homepage${req.body.name}`)
})

export default router;