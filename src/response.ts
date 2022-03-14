import express from 'express';
import * as DbType from "./types/MysqlType";

const jsonResponse = (err: DbType.QueryError, res: express.Response, message: string) => {
  if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
      throw new Error('too long to count table rows!');
  }
  if (err) return res.status(500).json({
      error: {
          message: err.message
      }
  });
  return res.status(200).json({ 'message': message })
}

export default jsonResponse;
