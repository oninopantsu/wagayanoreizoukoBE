import express from 'express';
import * as DbType from "./types/MysqlType";

const jsonGetResponse = (err: DbType.QueryError, res: express.Response, rows: any) => {
  if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
      throw new Error('too long to count table rows!');
  }
  if (err) throw err
  res.status(200).json(rows)
}

export default jsonGetResponse;
