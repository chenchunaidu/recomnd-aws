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
  sk **String # id

groups
  pk *String  # userId
