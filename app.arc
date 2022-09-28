@app
recomnd-aws-72b8

@http
/*
  method any
  src server

@static

@tables
user
  pk *String

recommendations
  pk *String  # userId
  sk **Number # groupId

groups
  pk *String  # userId
