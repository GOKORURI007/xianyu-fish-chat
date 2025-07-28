use tauri::{App, Manager};
use tauri_plugin_global_shortcut::{Code, Modifiers, ShortcutState};

pub fn init_shortcuts(app: &mut App) {
    app.handle()
        .plugin(
            tauri_plugin_global_shortcut::Builder::new()
                .with_shortcuts(["ctrl+alt+q"])
                .unwrap()
                .with_handler(|app, shortcut, event| {
                    if event.state == ShortcutState::Pressed {
                        if shortcut.matches(Modifiers::CONTROL | Modifiers::ALT, Code::KeyQ) {
                            // let _ = app.emit("shortcut-event", "Ctrl+Alt+Q triggered");
                            println!("Ctrl+Alt+Q triggered");
                            let window = app.get_webview_window("main").unwrap();
                            if window.is_visible().unwrap() {
                                window.hide().unwrap();
                            } else {
                                window.show().unwrap();
                                window.unminimize().unwrap();
                                window.set_focus().unwrap();
                            }
                        }
                    }
                })
                .build(),
        )
        .unwrap();
}
