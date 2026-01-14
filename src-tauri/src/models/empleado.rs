use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Empleado {
    pub id: i32,
    pub nombre: String,
    pub horas: i32,
    pub valor_hora: f64,
}
