// import express from 'express';
// const router = express.Router();

import { type Request, type Response } from "express";
import { Router } from "express";
import { Word } from "../models/word";
// import { randomUUID } from "crypto";

var db = require("../db/db");

type RequestBody = { mot: string; livre: string; page: number };
type RequestParams = { wordId: string };
// type Key = string | number;

const router = Router();
let words: Word[] = [];

// ROUTES

router.get("/", (req, res, next) => {
  getAllWords(res);
});

router.get("/word/:id", (req, res, next) => {
  getSingleWordById(req, res);
});

router.post("/word", (req, res, next) => {
  saveWord(req, res);
});

router.put("/word/:id", (req, res, next) => {
  updateWord(req, res);
});

router.delete("/word/:id", (req, res, next) => {
  deleteWord(req, res);
});

// FUNCTIONS

function getAllWords(res: Response) {
  var sql = "select * from words";
  var params: string[] = [];
  db.all(sql, params, (err: Error, rows: Word[]) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
}

function getSingleWordById(req: Request, res: Response) {
  var sql = "select * from words where id = ?";
  var params = [req.params.id];
  db.get(sql, params, (err: Error, row: Word) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Found the word",
      data: row,
    });
  });
}

function wordChecker(key: string | number) {
  if (typeof key === "number") {
    var sql = "select * from words where id = ?";
    db.get(sql, key, (err: Error, row: Word) => {
      if (err) {
        return err;
      }
      console.log(`Found an entry with id: ${key}.`);
      return row;
    })
  } else {
    var sql = "select * from words where word = ?";
    db.get(sql, key, (err: Error, row: Word) => {
      if (err) {
        return err;
      }
      console.log(`Found an entry with word: ${key}.`);
      return row;
    })
  }
}

function saveWord(req: Request, res: Response) {
  const body = req.body as RequestBody;
  const newWord: Word = {
    id: 0,
    mot: body.mot,
    livre: body.livre,
    page: body.page,
    date: new Date().toISOString(),
  };
  var sql = "INSERT INTO words (mot, livre, page, date) VALUES (?,?,?,?)";
  var params = [newWord.mot, newWord.livre, newWord.page, newWord.date];
  db.run(sql, params, function (err: Error, result: any) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: newWord,
      // "id" : this.lastID
    });
  });
}

function updateWord(req: Request, res: Response) {
  let id = req.params.id;
  let oldWord = wordChecker(id);

  var updatedWord = {
    mot: req.body.mot,
    livre: req.body.livre,
    page: req.body.page,
  };
  db.run(
    `UPDATE words set 
       mot = COALESCE(?,mot), 
       livre = COALESCE(?,livre), 
       page = COALESCE(?,page)`,
    [updatedWord.mot, updatedWord.livre, updatedWord.page],
    function (err: Error, result: any) {
      if (err) {
        // res.status(400).json({ error: res.message });
        console.log("Word couldn't be updated.");
        return;
      }
      console.log("Word couldn't be updated.");
      res.json({
        message: "Word was updated.",
        // data: data,
        // changes: this.changes,
      });
    }
  );
}

function deleteWord(req: Request, res: Response) {
  db.run(
    "DELETE FROM words WHERE id = ?",
    req.params.id,
    function (err: Error, result: any) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: "deleted" });
    }
  );
}

// module.exports = router;
export default router;
