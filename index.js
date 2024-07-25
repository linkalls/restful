const express = require("express")
const app = express()
const path = require("path")
const { v4: uuid } = require("uuid") //* v4をuuidとして使えるようにしてる uuidはstring
const methodOverride = require("method-override")
const { render } = require("ejs")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static("public"))

app.use(express.urlencoded({ extended: true })) //* form空のリクエストを受け付ける postのとき
app.use(express.json()) //: jsonもパースしてくれる
app.use(methodOverride("_method"))

let comments = [
  { username: "poteto", comment: "hakwovfggigie", id: "a" },
  { username: "wgwg", comment: "hakwovfggwgwgigie", id: uuid() },
  { username: "poevgeggfwfwff", comment: "fwfrwbnhbrhg4g", id: uuid() },
]

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments })
})

app.get("/comments/new", (req, res) => {
  res.render("comments/new")
})

app.get("/comments/:id", (req, res) => {
  const { id } = req.params //* string
  // console.log(id)
  const comment = comments.find((c) => {
    return c.id === id //* return忘れずに uuidはstring
  })
  res.render("comments/show", { comment })
})

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params //* string
  const comment = comments.find((comment) => {
    return comment.id === id
  })
  res.render("comments/edit", { comment })
})

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params //* string
  const foundComment = comments.find((comment) => {
    return comment.id === id
  })
  console.log(foundComment)
  console.log(req.body)
  const newCommentText = req.body.comment //* postとpatchは一緒
  console.log(newCommentText)
  console.log(foundComment.comment)
  foundComment.comment = newCommentText
  console.log(foundComment.comment)
  res.redirect("/comments")
})

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params
 comments = comments.filter((c) => {
   return c.id !== id
  }) //* 一致しないものにすることで一致するものがいなくなる
  console.log(comments)
  res.redirect("/comments")
})

app.post("/comments", (req, res) => {
  console.log(req.body) //* postの場合はこれ　{ username: 'wf', comment: 'wfw' }
  const { username, comment } = req.body
  comments.push({ username, comment, id: uuid() })
  // res.send("hello") //* これいけてない
  res.redirect("/comments") //* redirect_to と一緒！！！！！！！！１ getだよ
})

app.get("/tacos", (req, res) => {
  res.send("tacos")
})

app.post("/tacos", (req, res) => {
  const { meat, qty } = req.body
  console.log(req.body)
  res.send(`${meat}を${qty}個どうぞ`)
})

app.listen(3000, () => {
  console.log("3000で実行中")
})
