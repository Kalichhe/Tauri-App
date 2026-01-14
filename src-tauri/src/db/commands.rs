use rusqlite::params;
use tauri::command;
use tauri::AppHandle;

use crate::db::connection::connect;
use crate::models::empleado::Empleado;
use crate::models::labor::Labor;

// Empleados
#[command]
pub fn crear_empleado(app: AppHandle, nombre: String, horas: i32, valor_hora: f64) {
    let conn = connect(&app);

    conn.execute(
        "INSERT INTO empleados (nombre, horas, valor_hora)
        VALUES (?1, ?2, ?3)",
        params![nombre, horas, valor_hora],
    )
    .unwrap();
}

#[command]
pub fn obtener_empleados(app: AppHandle) -> Vec<Empleado> {
    let conn = connect(&app);

    let mut stmt = conn
        .prepare("SELECT id, nombre, horas, valor_hora FROM empleados")
        .unwrap();

    let empleados = stmt
        .query_map([], |row| {
            Ok(Empleado {
                id: row.get(0)?,
                nombre: row.get(1)?,
                horas: row.get(2)?,
                valor_hora: row.get(3)?,
            })
        })
        .unwrap();

    empleados.map(|e| e.unwrap()).collect()
}

#[command]
pub fn actualizar_empleado(app: AppHandle, id: i32, nombre: String, horas: i32, valor_hora: f64) {
    let conn = connect(&app);

    conn.execute(
        "UPDATE empleados
        SET nombre = ?1,
            horas = ?2,
            valor_hora = ?3
        WHERE id = ?4",
        params![nombre, horas, valor_hora, id],
    )
    .unwrap();
}

#[command]
pub fn eliminar_empleado(app: AppHandle, id: i32) {
    let conn = connect(&app);

    conn.execute("DELETE FROM empleados WHERE id = ?1", params![id])
        .unwrap();
}

// Labores
#[command]
pub fn crear_labor(app: AppHandle, codigo: String, nombre: String, precio: f64) {
    let conn = connect(&app);

    conn.execute(
        "INSERT OR REPLACE INTO labores (codigo, nombre, precio)
        VALUES (?1, ?2, ?3)",
        params![codigo, nombre, precio],
    )
    .unwrap();
}

#[command]
pub fn obtener_labores(app: AppHandle) -> Vec<Labor> {
    let conn = connect(&app);

    let mut stmt = conn
        .prepare("SELECT codigo, nombre, precio FROM labores")
        .unwrap();

    let rows = stmt
        .query_map([], |row| {
            Ok(Labor {
                codigo: row.get(0)?,
                nombre: row.get(1)?,
                precio: row.get(2)?,
            })
        })
        .unwrap();

    rows.map(|r| r.unwrap()).collect()
}

#[command]
pub fn eliminar_labor(app: AppHandle, codigo: String) {
    let conn = connect(&app);

    conn.execute("DELETE FROM labores WHERE codigo = ?1", params![codigo])
        .unwrap();
}

#[command]
pub fn actualizar_labor(app: AppHandle, codigo: String, nombre: String, precio: f64) {
    let conn = connect(&app);

    conn.execute(
        "UPDATE labores
        SET nombre = ?1,
        precio = ?2
        WHERE codigo = ?3",
        params![nombre, precio, codigo],
    )
    .unwrap();
}
