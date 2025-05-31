export default {
  apps: [
    {
      name: "gendarmerie-api",
      script: "./server.js",
      cwd: "./", // Assure-toi d’être dans backend
      env: {
        NODE_ENV: "production",
        PORT: 3001,
        MONGO_URI: "mongodb://localhost:27017/gendarmerie",
        JWT_SECRET: "maCléUltraSecrète123"
      }
    }
  ]
};
