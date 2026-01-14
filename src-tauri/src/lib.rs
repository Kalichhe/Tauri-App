mod db;
mod models;

use db::commands::{
    crear_empleado,
    actualizar_empleado,
    obtener_empleados,
    eliminar_empleado,
    crear_labor,
    actualizar_labor,
    eliminar_labor,
    obtener_labores,
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            println!("Inicializando DB...");
            db::connection::init_db(&app.handle());
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            crear_empleado,
            obtener_empleados,
            actualizar_empleado,
            eliminar_empleado,
            crear_labor,
            obtener_labores,
            eliminar_labor,
            actualizar_labor,
        ])
        .run(tauri::generate_context!())
        .expect("error al ejecutar tauri");
}
