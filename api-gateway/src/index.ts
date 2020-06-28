import express from "express";
import * as request from "request-promise";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const PORT = 8080;

// Service Discovery:
const AUTH_API = "http://jag-auth-api-svc.book-store-ns.svc.cluster.local";
const BOOKS_API = "http://jag-books-api-svc.book-store-ns.svc.cluster.local";

app.get("/hello", (req, res) => {
  console.log("api-gateway:: /hello", req.query);
  return res.send("Hello Jag!");
});

const authMiddleware = async function (req: any, res: any, next: any) {
  const { headers } = req;
  try {
    console.log("authMiddleware:start");
    const options = { headers, json: true };
    const authRes = await request.get(`${AUTH_API}/api/auth`, options);
    if (authRes.ok) {
      console.log("authMiddleware:success");
      next();
    } else {
      throw { error: "UnAuthorized: Invalid Auth" };
    }
  } catch (err) {
    console.log("authMiddleware:err");
    console.log(JSON.stringify(err));
    res.status(403).json({ msg: "Access denied" });
  }
};

// BOOKS_API:
const proxyToBookApiOptions = { target: BOOKS_API, changeOrigin: true };
const proxyToBookApi = createProxyMiddleware(proxyToBookApiOptions);
app.use("/api/**/books**", authMiddleware, proxyToBookApi);

// MICROSERVICE2_API: TODO
const proxyToMs2ApiOptions = { target: BOOKS_API, changeOrigin: true };
const proxyToMs2Api = createProxyMiddleware(proxyToMs2ApiOptions);
app.use("/api/**/ms2**", authMiddleware, proxyToMs2Api);

// APP:
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}!`));
