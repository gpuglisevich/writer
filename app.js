const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/mark_code_as_used/:code', (req, res) => {
  const inputCode = req.params.code;
  const result = req.query.result === 'true'; // Convertir el valor de 'result' a boolean

  fs.readFile('codes.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el archivo codes.json');
    } else {
      const codes = JSON.parse(data);
      const codeIndex = codes.findIndex((row) => row.code === inputCode);
      if (codeIndex === -1) {
        res.status(404).send({ success: false });
      } else {
        codes[codeIndex].used = 'true';
        const updatedCodes = JSON.stringify(codes, null, 2);

        fs.writeFile('codes.json', updatedCodes, 'utf-8', (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error al actualizar el archivo codes.json');
          } else {
            const usedCode = {
              code: inputCode,
              won: result
            };
            fs.readFile('used_codes.json', 'utf-8', (err, data) => {
              if (err) {
                console.error(err);
                res.status(500).send('Error al leer el archivo used_codes.json');
              } else {
                const usedCodes = JSON.parse(data);
                usedCodes.push(usedCode);
                const updatedUsedCodes = JSON.stringify(usedCodes, null, 2);

                fs.writeFile('used_codes.json', updatedUsedCodes, 'utf-8', (err) => {
                  if (err) {
                    console.error(err);
                    res.status(500).send('Error al actualizar el archivo used_codes.json');
                  } else {
                    res.status(200).send({ success: true });
                  }
                });
              }
            });
          }
        });
      }
    }
  });
});

app.post('/used_codes', (req, res) => {
  const usedCode = req.body;
  // Asegúrate de que el objeto 'usedCode' incluya la propiedad 'result' antes de guardarlo
  fs.readFile('used_codes.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el archivo used_codes.json');
    } else {
      const usedCodes = JSON.parse(data);
      usedCodes.push(usedCode);
      const updatedUsedCodes = JSON.stringify(usedCodes, null, 2);

      fs.writeFile('used_codes.json', updatedUsedCodes, 'utf-8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error al actualizar el archivo used_codes.json');
        } else {
          res.status(200).send('Código usado agregado correctamente');
        }
      });
    }
  });
});

app.delete('/codes/:code', (req, res) => {
  const inputCode = req.params.code;
  fs.readFile('codes.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el archivo codes.json');
    } else {
      const codes = JSON.parse(data);
      const codeIndex = codes.findIndex((row) => row.code === inputCode);

      if (codeIndex === -1) {
        res.status(404).send(`Código ${inputCode} no encontrado.`);
        return;
      }

      codes.splice(codeIndex, 1);
      const updatedCodes = JSON.stringify(codes, null, 2);

      fs.writeFile('codes.json', updatedCodes, 'utf-8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error al actualizar el archivo codes.json');
        } else {
          res.status(200).send(`Código ${inputCode} eliminado con éxito.`);
        }
      });
    }
  });
});

app.get('/check_code/:code', (req, res) => {
  const inputCode = req.params.code;
  fs.readFile('codes.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el archivo codes.json');
    } else {
      const codes = JSON.parse(data);
      const codeIndex = codes.findIndex((row) => row.code === inputCode);
      if (codeIndex === -1) {
        res.status(404).send({ exists: false });
      } else {
        res.status(200).send({ exists: true, used: codes[codeIndex].used === 'true' });
      }
    }
  });
});

app.get('/mark_code_as_used/:code', (req, res) => {
  const inputCode = req.params.code;
  fs.readFile('codes.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el archivo codes.json');
    } else {
      const codes = JSON.parse(data);
      const codeIndex = codes.findIndex((row) => row.code === inputCode);
      if (codeIndex === -1) {
        res.status(404).send({ success: false });
      } else {
        codes[codeIndex].used = 'true';
        const updatedCodes = JSON.stringify(codes, null, 2);

        fs.writeFile('codes.json', updatedCodes, 'utf-8', (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error al actualizar el archivo codes.json');
          } else {
            const usedCode = {
              code: inputCode,
              result: 'acertaste'
            };
            fs.readFile('used_codes.json', 'utf-8', (err, data) => {
              if (err) {
                console.error(err);
                res.status(500).send('Error al leer el archivo used_codes.json');
              } else {
                const usedCodes = JSON.parse(data);
                usedCodes.push(usedCode);
                const updatedUsedCodes = JSON.stringify(usedCodes, null, 2);

                fs.writeFile('used_codes.json', updatedUsedCodes, 'utf-8', (err) => {
                  if (err) {
                    console.error(err);
                    res.status(500).send('Error al actualizar el archivo used_codes.json');
                  } else {
                    res.status(200).send({ success: true });
                  }
                });
              }
            });
          }
        });
      }
    }
  });
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
