export class Config {
    static PORT: number = parseInt(process.env.PORT, 10) || 3000;
    static PORT_TEST: number = 3001;
    static DB: string = process.env.MONGOLAB_URI || "mongodb://localhost/h_vs_v";
    static DB_TEST: string = process.env.MONGOLAB_URI || "mongodb://localhost/h_vs_v_test";
    static SECRET: string = 'super.super.secret.shhh';

    static TOKEN_EXPIRES_TIME: number = 6;
}