// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn save_file(path: String, contents: String) -> Result<(), String> {
    println!("{}: {}", path, contents);
    fs::write(&path, contents).map_err(|err| format!("Failed to write to file {}: {}", &path, err))
}
