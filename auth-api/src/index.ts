import express from "express";

const app = express();
const PORT = 8080;

app.get("/api/auth", (req, res) => {
  console.log("auth-api:start");
  const userToken = req.get("authorization");
  // TODO: Implement Auth
  if (userToken === "USERTOKEN") {
    console.log("auth-api:success");
    res.json({ ok: true, userToken, appToken: "APPTOKEN" });
  } else {
    console.log("auth-api:err");
    res.status(403).json({ ok: false });
  }
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}!`));
