const { connection } = require("../db_connection");
const router = require("express").Router();
const cors = require("cors");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const { CLIENT_URL, JWT_SECRET } = process.env;

router.use(
  cors({
    origin: CLIENT_URL,
  })
);





router.post("/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      errorMessage: "Merci de renseigner votre mail ET votre mot de passe",
    });
  } else {
    const hash = bcrypt.hashSync(password, 10);
    connection.query(
      "INSERT INTO admin_login(email, password) VALUES (?, ?)",
      [email, hash],
      (error, result) => {
        if (error) {
          res.status(500).json({ errorMessage: error.message });
        } else {
          res.status(201).json({
            id: result.insertId,
            email,
            password: "hidden",
          });
        }
      }
    );
  }
});

router.post("/", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      errorMessage: "Merci d'entrer votre adresse mail ET votre mot de passe",
    });
  } else {
    connection.query(
      `SELECT * FROM admin_login WHERE email=?`,
      [email],
      (error, result) => {
        if (error) {
          res.status(500).json({ errorMessage: error.message });
        } else if (result.length === 0) {
          res.status(403).json({ errorMessage: "Adresse mail invalide" });
        } else if (bcrypt.compareSync(password, result[0].password)) {
          const user = {
            id: result[0].id,
            email,
            password: "hidden",
          };
          const token = jwt.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: "1h",
          });
          res.status(200).json({ user, token });
        } else {
          res.status(403).json({ errorMessage: "Mot de passe invalide" });
        }
      }
    );
  }
});

const authenticateWithJsonWebToken = (req, res, next) => {
  console.log(req.headers.authorization);
  if (req.headers.authorization !== undefined) {
    const token = req.headers.authorization.split(" ")[1];
    console.log("token : " + token);
    jwt.verify(token, JWT_SECRET, (err) => {
      if (err) {
        res.status(401).json({
          errorMessage: "Vous n'avez pas l'autorisation d'accès aux données",
        });
      } else {
        next();
      }
    });
  } else {
    console.log("undifined");
    res.status(401).json({
      errorMessage: "Vous n'avez pas l'autorisation d'accès à cette donnée",
    });
  }
};

router.get("/admin", authenticateWithJsonWebToken, (req, res) => {
  connection.query("SELECT * FROM about", (error, result) => {
    if (error) {
      res
        .status(500)
        .json({ errorMessage: "Sorry cannot get the about unvalidated" });
    } else {
      res.status(200).json(
        result.map((user) => {
          return { ...user, password: "hidden" };
        })
      );
    }
  });
});
router.get("/services", authenticateWithJsonWebToken, (req, res) => {
  connection.query("SELECT * FROM service", (error, result) => {
    if (error) {
      res
        .status(500)
        .json({ errorMessage: "Sorry cannot get the about unvalidated" });
    } else {
      res.status(200).json(
        result.map((user) => {
          return { ...user, password: "hidden" };
        })
      );
    }
  });
});



router.get("/abouts", authenticateWithJsonWebToken, (req, res) => {
  connection.query("SELECT * FROM about", (error, result) => {
    if (error) {
      res
        .status(500)
        .json({ errorMessage: "Sorry cannot get the about unvalidated" });
    } else {
      res.status(200).json(
        result.map((user) => {
          return { ...user, password: "hidden" };
        })
      );
    }
  });
});

router.get("/books", authenticateWithJsonWebToken, (req, res) => {
  connection.query("SELECT * FROM book", (error, result) => {
    if (error) {
      res.status(500).json({
        errorMessage: "Sorry cannot get the books unvalidated",
      });
    } else {
      res.status(200).json(
        result.map((user) => {
          return { ...user, password: "hidden" };
        })
      );
    }
  });
});

router.get("/buys", authenticateWithJsonWebToken, (req, res) => {
  connection.query("SELECT * FROM buy", (error, result) => {
    if (error) {
      res
        .status(500)
        .json({ errorMessage: "Sorry cannot get the news unvalidated" });
    } else {
      res.status(200).json(
        result.map((user) => {
          return { ...user, password: "hidden" };
        })
      );
    }
  });
});

router.get("/categorys", authenticateWithJsonWebToken, (req, res) => {
  connection.query("SELECT * FROM category", (error, result) => {
    if (error) {
      res
        .status(500)
        .json({ errorMessage: "Sorry cannot get the category unvalidated" });
    } else {
      res.status(200).json(
        result.map((user) => {
          return { ...user, password: "hidden" };
        })
      );
    }
  });
});

router.get("/gifts", authenticateWithJsonWebToken, (req, res) => {
  connection.query("SELECT * FROM  gift", (error, result) => {
    if (error) {
      res
        .status(500)
        .json({ errorMessage: "Sorry cannot get the gifts unvalidated" });
    } else {
      res.status(200).json(
        result.map((user) => {
          return { ...user, password: "hidden" };
        })
      );
    }
  });
});

router.get("/homes", authenticateWithJsonWebToken, (req, res) => {
  connection.query("SELECT * FROM home", (error, result) => {
    if (error) {
      res
        .status(500)
        .json({ errorMessage: "Sorry cannot get the home unvalidated" });
    } else {
      res.status(200).json(
        result.map((user) => {
          return { ...user, password: "hidden" };
        })
      );
    }
  });
});

router.get("/notices", authenticateWithJsonWebToken, (req, res) => {
  connection.query("SELECT * FROM notice", (error, result) => {
    if (error) {
      res.status(500).json({ errorMessage: "Sorry cannot get the notices" });
    } else {
      res.status(200).json(
        result.map((user) => {
          return { ...user, password: "hidden" };
        })
      );
    }
  });
});

router.get("/setpalettes", authenticateWithJsonWebToken, (req, res) => {
  connection.query("SELECT * FROM palette ", (error, result) => {
    if (error) {
      res.status(500).json({ errorMessage: "Sorry cannot get the news" });
    } else {
      res.status(200).json(
        result.map((user) => {
          return { ...user, password: "hidden" };
        })
      );
    }
  });
});

router.get("/products", authenticateWithJsonWebToken, (req, res) => {
  connection.query("SELECT * FROM product", (error, result) => {
    if (error) {
      res.status(500).json({ errorMessage: "Sorry cannot get the product" });
    } else {
      res.status(200).json(
        result.map((user) => {
          return { ...user, password: "hidden" };
        })
      );
    }
  });
});
router.get("/services", authenticateWithJsonWebToken, (req, res) => {
  connection.query("SELECT * FROM service", (error, result) => {
    if (error) {
      res.status(500).json({ errorMessage: "Sorry cannot get the services" });
    } else {
      res.status(200).json(
        result.map((user) => {
          return { ...user, password: "hidden" };
        })
      );
    }
  });
});
router.get(
  "/services_presentation",
  authenticateWithJsonWebToken,
  (req, res) => {
    connection.query("SELECT * FROM service_presentation", (error, result) => {
      if (error) {
        res
          .status(500)
          .json({ errorMessage: "Sorry cannot get the service_presentation" });
      } else {
        res.status(200).json(
          result.map((user) => {
            return { ...user, password: "hidden" };
          })
        );
      }
    });
  }
);

router.get("/sub_categorys", authenticateWithJsonWebToken, (req, res) => {
  connection.query("SELECT * FROM sub_category", (error, result) => {
    if (error) {
      res
        .status(500)
        .json({ errorMessage: "Sorry cannot get the sub_categorys" });
    } else {
      res.status(200).json(
        result.map((user) => {
          return { ...user, password: "hidden" };
        })
      );
    }
  });
});

router.get("/users", authenticateWithJsonWebToken, (req, res) => {
    connection.query("SELECT * FROM user", (error, result) => {
      if (error) {
        res
          .status(500)
          .json({ errorMessage: "Sorry cannot get the users" });
      } else {
        res.status(200).json(
          result.map((user) => {
            return { ...user, password: "hidden" };
          })
        );
      }
    });
  });

router.post("/add-abouts", authenticateWithJsonWebToken, (req, res) => {
  const sql = "INSERT INTO about SET ?";
  connection.query(sql, req.body, (err, results) => {
    if (err) {
      res.status(500).send({ errorMessage: "Sorry cannot add your about" });
    } else {
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  });
});

router.post("/add-books", authenticateWithJsonWebToken, (req, res) => {
  const sql = "INSERT INTO book SET ?";
  connection.query(sql, req.body, (err, results) => {
    if (err) {
      res.status(500).send({ errorMessage: "Sorry cannot add your book" });
    } else {
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  });
});

router.post("/add-buys", authenticateWithJsonWebToken, (req, res) => {
  const sql = "INSERT INTO buy SET ?";
  connection.query(sql, req.body, (err, results) => {
    if (err) {
      res.status(500).send({ errorMessage: "Sorry cannot add your buy" });
    } else {
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  });
});
router.post("/add-categorys", authenticateWithJsonWebToken, (req, res) => {
  const sql = "INSERT INTO category SET ?";
  connection.query(sql, req.body, (err, results) => {
    if (err) {
      res.status(500).send({ errorMessage: "Sorry cannot add your category" });
    } else {
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  });
});
router.post("/add-gifts", authenticateWithJsonWebToken, (req, res) => {
  const sql = "INSERT INTO gift SET ?";
  connection.query(sql, req.body, (err, results) => {
    if (err) {
      res.status(500).send({ errorMessage: "Sorry cannot add your gift" });
    } else {
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  });
});
router.post("/add-homes", authenticateWithJsonWebToken, (req, res) => {
  const sql = "INSERT INTO home SET ?";
  connection.query(sql, req.body, (err, results) => {
    if (err) {
      res.status(500).send({ errorMessage: "Sorry cannot add your home" });
    } else {
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  });
});
router.post("/add-notices", authenticateWithJsonWebToken, (req, res) => {
  const sql = "INSERT INTO notice SET ?";
  connection.query(sql, req.body, (err, results) => {
    if (err) {
      res.status(500).send({ errorMessage: "Sorry cannot add your notice" });
    } else {
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  });
});
router.post("/add-palettes", authenticateWithJsonWebToken, (req, res) => {
  const sql = "INSERT INTO palette SET ?";
  connection.query(sql, req.body, (err, results) => {
    if (err) {
      res.status(500).send({ errorMessage: "Sorry cannot add your palette" });
    } else {
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  });
});
router.post("/add-product", authenticateWithJsonWebToken, (req, res) => {
  const sql = "INSERT INTO product SET ?";
  connection.query(sql, req.body, (err, results) => {
    if (err) {
      res.status(500).send({ errorMessage: "Sorry cannot add your product" });
    } else {
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  });
});
router.post("/add-services", authenticateWithJsonWebToken, (req, res) => {
  const sql = "INSERT INTO service SET ?";
  connection.query(sql, req.body, (err, results) => {
    if (err) {
      res.status(500).send({ errorMessage: "Sorry cannot add your service" });
    } else {
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  });
});

router.post(
  "/add-services_presentation",
  authenticateWithJsonWebToken,
  (req, res) => {
    const sql = "INSERT INTO service_presentation SET ?";
    connection.query(sql, req.body, (err, results) => {
      if (err) {
        res
          .status(500)
          .send({ errorMessage: "Sorry cannot add your service_presentation" });
      } else {
        res.status(201).json({ id: results.insertId, ...req.body });
      }
    });
  }
);

router.post("/add-sub_categorys", authenticateWithJsonWebToken, (req, res) => {
  const sql = "INSERT INTO sub_category SET ?";
  connection.query(sql, req.body, (err, results) => {
    if (err) {
      res
        .status(500)
        .send({ errorMessage: "Sorry cannot add your sub_category" });
    } else {
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  });
});

router.put("/abouts/:id", authenticateWithJsonWebToken, (req, res) => {
  let sql = "UPDATE about SET ? WHERE id=?";
  connection.query(sql, [req.body, req.params.id], (err, results) => {
    if (err) {
      res.status(500).send({
        errorMessage: `Sorry cannot modify this abouts, id: ${req.params.id}`,
      });
    } else {
      sql = "SELECT * FROM about WHERE id=?";
      connection.query(sql, req.params.id, (err, result) => {
        if (result.length === 0) {
          res.status(404).send({
            errorMessage: `About with id: ${req.params.id} not found`,
          });
        } else {
          res.status(200).json(result[0]);
        }
      });
    }
  });
});

router.put("/books/:id", authenticateWithJsonWebToken, (req, res) => {
  let sql = "UPDATE book SET ? WHERE id=?";
  connection.query(sql, [req.body, req.params.id], (err, results) => {
    if (err) {
      res.status(500).send({
        errorMessage: `Sorry cannot modify this books, id: ${req.params.id}`,
      });
    } else {
      sql = "SELECT * FROM book WHERE id=?";
      connection.query(sql, req.params.id, (err, result) => {
        if (result.length === 0) {
          res
            .status(404)
            .send({ errorMessage: `books with id: ${req.params.id} not found` });
        } else {
          res.status(200).json(result[0]);
        }
      });
    }
  });
});

router.put("/buys/:id", authenticateWithJsonWebToken, (req, res) => {
  let sql = "UPDATE buy SET ? WHERE id=?";
  connection.query(sql, [req.body, req.params.id], (err, results) => {
    if (err) {
      res.status(500).send({
        errorMessage: `Sorry cannot modify this buy, id: ${req.params.id}`,
      });
    } else {
      sql = "SELECT * FROM buy WHERE id=?";
      connection.query(sql, req.params.id, (err, result) => {
        if (result.length === 0) {
          res.status(404).send({
            errorMessage: `Buy with id: ${req.params.id} not found`,
          });
        } else {
          res.status(200).json(result[0]);
        }
      });
    }
  });
});

router.put(
  "/categorys/:id",
  authenticateWithJsonWebToken,
  (req, res) => {
    let sql = "UPDATE category SET ? WHERE id=?";
    connection.query(sql, [req.params.id], (err, results) => {
      if (err) {
        res.status(500).send({
          errorMessage: `Sorry cannot modify this category, id: ${req.params.id}`,
        });
      } else {
        sql = "SELECT * FROM category WHERE id=?";
        connection.query(sql, req.params.id, (err, result) => {
          if (result.length === 0) {
            res.status(404).send({
              errorMessage: `category with id: ${req.params.id} not found`,
            });
          } else {
            res.status(200).json(result[0]);
          }
        });
      }
    });
  }
);

router.put("/gifts/:id", authenticateWithJsonWebToken, (req, res) => {
  let sql = "UPDATE gift SET ? WHERE id=?";
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      res.status(500).send({
        errorMessage: `Sorry cannot modify this gift, id: ${req.params.id}`,
      });
    } else {
      sql = "SELECT * FROM gift WHERE id=?";
      connection.query(sql, req.params.id, (err, result) => {
        if (result.length === 0) {
          res
            .status(404)
            .send({ errorMessage: `gift with id: ${req.params.id} not found` });
        } else {
          res.status(200).json(result[0]);
        }
      });
    }
  });
});

router.put("/homes/:id", authenticateWithJsonWebToken, (req, res) => {
  let sql = "UPDATE home SET ? WHERE id=?";
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      res.status(500).send({
        errorMessage: `Sorry cannot modify this homes, id: ${req.params.id}`,
      });
    } else {
      sql = "SELECT * FROM home WHERE id=?";
      connection.query(sql, req.params.id, (err, result) => {
        if (result.length === 0) {
          res.status(404).send({
            errorMessage: `home with id: ${req.params.id} not found`,
          });
        } else {
          res.status(200).json(result[0]);
        }
      });
    }
  });
});

router.put("/notices/:id", authenticateWithJsonWebToken, (req, res) => {
    let sql = "UPDATE notice SET ? WHERE id=?";
    connection.query(sql, [req.params.id], (err, results) => {
      if (err) {
        res.status(500).send({
          errorMessage: `Sorry cannot modify this notice, id: ${req.params.id}`,
        });
      } else {
        sql = "SELECT * FROM notice WHERE id=?";
        connection.query(sql, req.params.id, (err, result) => {
          if (result.length === 0) {
            res.status(404).send({
              errorMessage: `notice with id: ${req.params.id} not found`,
            });
          } else {
            res.status(200).json(result[0]);
          }
        });
      }
    });
  });

  router.put("/palettes/:id", authenticateWithJsonWebToken, (req, res) => {
    let sql = "UPDATE palette SET ? WHERE id=?";
    connection.query(sql, [req.params.id], (err, results) => {
      if (err) {
        res.status(500).send({
          errorMessage: `Sorry cannot modify this palette, id: ${req.params.id}`,
        });
      } else {
        sql = "SELECT * FROM palette WHERE id=?";
        connection.query(sql, req.params.id, (err, result) => {
          if (result.length === 0) {
            res.status(404).send({
              errorMessage: `palette with id: ${req.params.id} not found`,
            });
          } else {
            res.status(200).json(result[0]);
          }
        });
      }
    });
  });
  router.put("/products/:id", authenticateWithJsonWebToken, (req, res) => {
    let sql = "UPDATE product SET ? WHERE id=?";
    connection.query(sql, [req.params.id], (err, results) => {
      if (err) {
        res.status(500).send({
          errorMessage: `Sorry cannot modify this product, id: ${req.params.id}`,
        });
      } else {
        sql = "SELECT * FROM product WHERE id=?";
        connection.query(sql, req.params.id, (err, result) => {
          if (result.length === 0) {
            res.status(404).send({
              errorMessage: `product with id: ${req.params.id} not found`,
            });
          } else {
            res.status(200).json(result[0]);
          }
        });
      }
    });
  });
  router.put("/services/:id", authenticateWithJsonWebToken, (req, res) => {
    let sql = "UPDATE service SET ? WHERE id=?";
    connection.query(sql, [req.params.id], (err, results) => {
      if (err) {
        res.status(500).send({
          errorMessage: `Sorry cannot modify this service, id: ${req.params.id}`,
        });
      } else {
        sql = "SELECT * FROM service WHERE id=?";
        connection.query(sql, req.params.id, (err, result) => {
          if (result.length === 0) {
            res.status(404).send({
              errorMessage: `service with id: ${req.params.id} not found`,
            });
          } else {
            res.status(200).json(result[0]);
          }
        });
      }
    });
  });

  router.put("/services_presentation/:id", authenticateWithJsonWebToken, (req, res) => {
    let sql = "UPDATE service_presentation SET ? WHERE id=?";
    connection.query(sql, [req.params.id], (err, results) => {
      if (err) {
        res.status(500).send({
          errorMessage: `Sorry cannot modify this service_presentation, id: ${req.params.id}`,
        });
      } else {
        sql = "SELECT * FROM service_presentation WHERE id=?";
        connection.query(sql, req.params.id, (err, result) => {
          if (result.length === 0) {
            res.status(404).send({
              errorMessage: `service_presentation with id: ${req.params.id} not found`,
            });
          } else {
            res.status(200).json(result[0]);
          }
        });
      }
    });
  });


  router.put("/sub_categorys/:id", authenticateWithJsonWebToken, (req, res) => {
    let sql = "UPDATE sub_category SET ? WHERE id=?";
    connection.query(sql, [req.params.id], (err, results) => {
      if (err) {
        res.status(500).send({
          errorMessage: `Sorry cannot modify this sub_category, id: ${req.params.id}`,
        });
      } else {
        sql = "SELECT * FROM sub_category WHERE id=?";
        connection.query(sql, req.params.id, (err, result) => {
          if (result.length === 0) {
            res.status(404).send({
              errorMessage: `sub_category with id: ${req.params.id} not found`,
            });
          } else {
            res.status(200).json(result[0]);
          }
        });
      }
    });
  });

router.delete(
  "/services/:id",
  authenticateWithJsonWebToken,
  (req, res) => {
    const sql = "DELETE FROM service WHERE id=?";
    connection.query(sql, req.params.id, (err, results) => {
      if (err) {
        res.status(500).send({
          errorMessage: `Could not delete service, id: ${req.params.id}`,
        });
      } else {
        res.sendStatus(200);
      }
    });
  }
);

router.delete("/categorys/:id", authenticateWithJsonWebToken, (req, res) => {
  const sql = "DELETE FROM category WHERE id=?";
  connection.query(sql, req.params.id, (err, results) => {
    if (err) {
      res
        .status(500)
        .send({ errorMessage: `Could not delete category, id: ${req.params.id}` });
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete(
  "/sub_categorys/:id",
  authenticateWithJsonWebToken,
  (req, res) => {
    const sql = "DELETE FROM sub_category WHERE id=?";
    connection.query(sql, req.params.id, (err, results) => {
      if (err) {
        res.status(500).send({
          errorMessage: `Could not delete sub_category, id: ${req.params.id}`,
        });
      } else {
        res.sendStatus(200);
      }
    });
  }
);

module.exports = router;
