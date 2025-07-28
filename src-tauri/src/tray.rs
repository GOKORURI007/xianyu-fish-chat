use tauri::menu::{Menu, MenuItem};
use tauri::tray::{MouseButton, MouseButtonState, TrayIconBuilder};
use tauri::{App, Manager, tray::TrayIconEvent};

pub fn init_system_tray(app: &mut App) -> Result<(), Box<dyn std::error::Error>> {
    let show_i = MenuItem::with_id(app, "show", "显示", true, None::<&str>)?;
    let quit_i = MenuItem::with_id(app, "quit", "退出", true, None::<&str>)?;
    let menu = Menu::with_items(app, &[&show_i, &quit_i])?;

    fn restore_and_focus_window(app: &tauri::AppHandle) {
        if let Some(window) = app.get_webview_window("main") {
            let _ = window.show();
            let _ = window.unminimize();
            let _ = window.set_focus();
        }
    }

    let _ = TrayIconBuilder::with_id("main")
        .menu(&menu)
        .show_menu_on_left_click(false)
        .on_tray_icon_event(|tray, event| match event {
            TrayIconEvent::Click {
                button: MouseButton::Left,
                button_state: MouseButtonState::Up,
                ..
            } => {
                println!("left click pressed and released");
                // 在这个例子中，当点击托盘图标时，将展示并聚焦于主窗口
                let app = tray.app_handle();
                restore_and_focus_window(app)
            }
            _ => {
                // println!("unhandled event {event:?}");
            }
        })
        .on_menu_event(|app, event| match event.id.as_ref() {
            "quit" => {
                println!("quit menu item was clicked");
                let quit_state = app.state::<crate::state::QuitState>();
                quit_state.mark_quit();
                app.get_webview_window("main").unwrap().close().unwrap();
                app.exit(0);
            }
            "show" => {
                println!("show menu item was clicked");
                restore_and_focus_window(app);
            }
            _ => {
                // println!("menu item {:?} not handled", event.id);
            }
        })
        .icon(app.default_window_icon().unwrap().clone())
        .build(app)?;
    Ok(())
}
