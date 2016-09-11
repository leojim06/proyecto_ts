export class Config {
    static PORT: number = parseInt(process.env.PORT, 10) || 3000;
    static PORT_TEST: number = 3001;
    static DB: string = process.env.MONGOLAB_URI || "mongodb://localhost/hero_vs_villanos";
    static DB_TEST: string = process.env.MONGOLAB_URI || "mongodb://localhost/hero_vs_villanos_test";
    static SECRET: string = 'super.super.secret.shhh';
}