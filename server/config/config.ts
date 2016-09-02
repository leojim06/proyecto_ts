export class Config {
    static PORT: number = parseInt(process.env.PORT, 10) || 3000;
    static DB: string = process.env.MONGOLAB_URI || "mongodb://localhost/hero_vs_villanos";
    static SECRET: string = 'super.super.secret.shhh';
}