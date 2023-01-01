import axios from "axios";

const server = axios.create({
    baseURL: "https://ecdsa-node-week1-git-main-pokhrelanmol.vercel.app",
    // baseURL: "http://localhost:3042",
});

export default server;
