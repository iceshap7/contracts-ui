const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs-extra');
const archiver = require('archiver');
const { exec } = require('child_process');
const { v4: uuidv4 } = require('uuid');
const { dirname } = require('path');

router.post('/', async function (req, res) {
  const contract = uuidv4();
  const source = 'templates/erc20';
  const destination = 'contracts/' + contract;

  try {
    await fs.copySync(source, destination);
    const destFile = destination + '/lib.rs';

    fs.readFile(destFile, 'utf-8', function (err, data) {
      if (err) {
        res.statusCode = 500;
        return res.json({ error: true, message: "Can't read file " + destFile });
      }

      const replacedData = data
        .replace(/:toAccountId:/gim, "[" + req.body.toAccountId.join(", ") + "]")
        .replace(/:condition:/gim, parseFloat(req.body.withdrawAt));

      fs.writeFile(destFile, replacedData, 'utf-8', function (err, data) {
        if (err) {
          res.statusCode = 500;
          return res.json({ error: true, message: "Can't write file " + destFile });
        }

        res.json({ error: false, contract });
      });
    });
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: true, message: "Can't clone " + source });
  }
});

router.get('/:contract', async function (req, res) {
  const contract = req.params.contract;
  const source = 'contracts/' + contract;
  const dest = 'contracts/' + contract + '.zip';
  const rootPath = path.resolve(dirname(__dirname));

  try {
    exec('cargo +nightly contract build', { cwd: rootPath + '/' + source }, (err, stdout, stderr) => {
      if (err) {
        res.statusCode = 500;
        return res.json({ error: true, message: err });
      }

      const output = fs.createWriteStream('public/' + dest);
      const archive = archiver('zip');

      archive.on('error', function (err) {
        res.statusCode = 500;
        return res.json({ error: true, message: "Can't zip " + source });
      });

      output.on('close', function () {
        return res.json({
          error: false,
          downloadUrl: 'http://localhost:3000/' + dest,
        });
      });

      archive.pipe(output);
      archive.append(fs.createReadStream(source + '/target/ink/erc20.contract'), { name: 'mycontract.contract' });
      archive.append(fs.createReadStream(source + '/target/ink/erc20.wasm'), { name: 'mycontract.wasm' });
      archive.append(fs.createReadStream(source + '/target/ink/metadata.json'), { name: 'metadata.json' });
      archive.finalize();
    });
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: true, message: err });
  }
});

module.exports = router;
