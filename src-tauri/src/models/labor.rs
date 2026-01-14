use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Labor {
    pub codigo: String,
    pub nombre: String,
    pub precio: f64,
}
