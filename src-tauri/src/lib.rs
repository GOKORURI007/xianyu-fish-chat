mod command;
mod shortcut;
mod state;
mod tray;

use command::rust_print;
use command::send_notification;
use command::flash_window;

use tauri::{Window, WindowEvent, webview::PageLoadPayload};

use state::QuitState;
use tauri::Manager;

fn on_page_load(webview: &tauri::Webview, payload: &PageLoadPayload) {
    println!("Rust 端：页面加载完毕：{}", payload.url());
    webview.eval(include_str!("../../src/inject.js")).unwrap();
}

fn on_window_event(window: &Window, event: &WindowEvent) {
    if let WindowEvent::CloseRequested { api, .. } = event {
        let quit_state = window.app_handle().state::<QuitState>();
        println!("quit state = {}", quit_state.is_quitting());
        if !quit_state.is_quitting() {
            api.prevent_close();
            window.hide().unwrap();
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_notification::init())
        .manage(QuitState::new())
        // 在所有插件和窗口构建完后立即调用
        .setup(|app| {
            tray::init_system_tray(app).unwrap();
            shortcut::init_shortcuts(app);
            let window = app.get_webview_window("main").unwrap();
            window
                .navigate("https://www.goofish.com/im".parse().unwrap())
                .unwrap();
            Ok(())
        })
        .on_page_load(|webview, payload| on_page_load(webview, payload))
        .on_window_event(|window, event| on_window_event(window, event))
        .invoke_handler(tauri::generate_handler![rust_print, send_notification, flash_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
