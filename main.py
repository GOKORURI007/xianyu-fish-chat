import webview

if __name__ == '__main__':
    webview.create_window("Test", url="http://localhost:3000", height=600, width=800,
                          frameless=True, easy_drag=True)
    webview.start(debug=True)
