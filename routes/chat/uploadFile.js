module.exports = (req, res) => {
  let paths = req.files.file.path.split('\\')
  let filename = paths[paths.length - 1]
  res.send({
    code: '200',
    msg: '上传成功',
    data: {
      filename: filename,
      filepath: 'http://localhost:3000/uploads/' + filename
    }
  })
}
