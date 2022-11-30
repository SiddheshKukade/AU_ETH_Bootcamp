import axios from "axios";

const server = axios.create({
    baseURL: "https://ecdsa-node-week1-git-main-pokhrelanmol.vercel.app",
});

export default server;
