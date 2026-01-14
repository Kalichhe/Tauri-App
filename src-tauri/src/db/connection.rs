use rusqlite::Connection;
use tauri::{path::BaseDirectory, AppHandle, Manager};

pub fn connect(app: &AppHandle) -> Connection {
    let path = app
        .path()
        .resolve("nomina.db", BaseDirectory::AppData)
        .expect("No se pudo resolver la ruta de la DB");

    Connection::open(path).expect("No se pudo abrir la DB")
}

pub fn init_db(app: &AppHandle) {
    let conn = connect(app);

    // TABLA EMPLEADOS
    conn.execute(
        "CREATE TABLE IF NOT EXISTS empleados (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            horas INTEGER NOT NULL,
            valor_hora REAL NOT NULL
        )",
        [],
    )
    .unwrap();

    // TABLA LABORES
    conn.execute(
        "CREATE TABLE IF NOT EXISTS labores (
            codigo TEXT PRIMARY KEY,
            nombre TEXT NOT NULL,
            precio REAL NOT NULL
        )",
        [],
    )
    .unwrap();

    // TABLA INTERMEDIA
    conn.execute(
        "CREATE TABLE IF NOT EXISTS empleado_labores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            empleado_id INTEGER NOT NULL,
            labor_codigo TEXT NOT NULL,
            cantidad INTEGER NOT NULL,
            FOREIGN KEY (empleado_id) REFERENCES empleados(id),
            FOREIGN KEY (labor_codigo) REFERENCES labores(codigo)
        )",
        [],
    )
    .unwrap();
}
