use std::sync::atomic::{AtomicBool, Ordering};

pub struct QuitState(AtomicBool);

impl QuitState {
    pub fn new() -> Self {
        Self(AtomicBool::new(false))
    }

    pub fn mark_quit(&self) {
        self.0.store(true, Ordering::SeqCst);
    }

    pub fn is_quitting(&self) -> bool {
        self.0.load(Ordering::SeqCst)
    }
}
