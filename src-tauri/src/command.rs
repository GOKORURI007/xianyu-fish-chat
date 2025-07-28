use futures_util::FutureExt;
use image;
use serde::Deserialize;
use std::path::PathBuf;
use std::time::Duration;
use tauri::image::Image;
use tauri::{async_runtime, AppHandle, Listener, UserAttentionType};
use tauri_plugin_notification::NotificationExt;
use tokio::sync::Notify;

#[tauri::command]
pub fn rust_print(msg: String) {
    println!("{}", msg);
}

#[derive(Deserialize)]
pub struct NotificationParams {
    pub title: String,
    pub body: String,
}

#[tauri::command]
pub fn send_notification(params: NotificationParams, app: AppHandle) -> Result<(), String> {
    // NotificationExt 为 AppHandle 提供 .notification() 方法
    println!("send_notification!");
    let mut builder = app.notification().builder();
    builder = builder.title(&params.title).body(&params.body);
    builder = builder.icon("icons/icon.png");
    builder.show().map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub fn flash_window(window: tauri::Window, app: AppHandle) {
    // 1. 先让任务栏 /Dock 持续闪烁
    window
        .request_user_attention(Some(UserAttentionType::Critical))
        .unwrap();

    // 2. 获取托盘句柄
    let tray = app.tray_by_id("main").unwrap();

    // 3. 克隆一个 Window 句柄到异步块里，用于后面检测 focus
    let win = window.clone();
    let stop_notify = std::sync::Arc::new(Notify::new());
    let stop_listener = stop_notify.clone();

    // 监听窗口 focus 事件，一旦聚焦就通知停止
    app.listen("tauri://window-focus", move |_event| {
        stop_notify.notify_one();
    });

    // 预加载图标原始像素
    let img_path = PathBuf::from("icons/icon.png");
    let dyn_img = image::open(&img_path).unwrap().into_rgba8();
    let (width, height) = dyn_img.dimensions();
    let orig_pixels = dyn_img.into_vec(); // 原始 RGBA 缓冲

    // 4. 后台异步循环闪烁
    async_runtime::spawn(async move {
        let period = Duration::from_millis(800); // 完整呼吸周期
        let frame_time = Duration::from_millis(30);
        let total_frames = period.as_millis() / frame_time.as_millis();
        let two_pi = std::f32::consts::PI * 2.0;

        for frame in 0.. {
            // 如果窗口已聚焦或收到停止通知，跳出
            if win.is_focused().unwrap_or(false) {
                break;
            }
            if stop_listener.notified().now_or_never().is_some() {
                break;
            }

            // 正弦波计算亮度因子（范围 0.3 ~ 1.0）
            let t = frame as f32 % total_frames as f32;
            let sine = ((t / total_frames as f32) * two_pi).sin();
            let brightness = 0.5 + 0.5 * (sine + 1.0) / 2.0;

            // 生成新像素缓冲
            let mut rgba = Vec::with_capacity(orig_pixels.len());
            for chunk in orig_pixels.chunks_exact(4) {
                let r = (chunk[0] as f32 * brightness).min(255.0) as u8;
                let g = (chunk[1] as f32 * brightness).min(255.0) as u8;
                let b = (chunk[2] as f32 * brightness).min(255.0) as u8;
                let a = chunk[3];
                rgba.extend_from_slice(&[r, g, b, a]);
            }

            // 更新托盘图标
            let icon = Image::new(&rgba, width, height);
            tray.set_icon(Some(icon)).unwrap();

            // 等待下一帧
            tokio::time::sleep(frame_time).await;
        }

        // 恢复默认图标
        let default_icon = Image::from_path(PathBuf::from("icons/icon.png")).unwrap();
        tray.set_icon(Some(default_icon)).unwrap();
    });
}
