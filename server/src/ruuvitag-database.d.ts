declare module 'ruuvitag-database' {
  declare function init (options: {
    dialect?: string
    host?: string
    database?: string
    username?: string
    password?: string
    alter?: boolean
    logging?: boolean
  }): Promise<void>;

  export default init;
}
