import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
const router = express.Router();

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany({

  })
  res.json(users)
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.post('/', async (req: Request, res: Response) => {

});
export = router