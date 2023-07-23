class Config {
  //אובייקט אשר מאתחל את ההגדרות לחיבור למונגו
    public port = 3001;
    public mongoUri = "mongodb://localhost:27017";
    public mongoDatabase = "travalling";
}

const config = new Config();

export default config;
