// websocket/WebSocketService.ts

class WebSocketService {
    private static instance: WebSocketService;
    private socket: WebSocket | null = null;

    private constructor() {
        // Khởi tạo kết nối WebSocket
        this.connect('ws://140.238.54.136:8080/chat/chat');
    }

    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    private connect(url: string) {
        // Khởi tạo kết nối WebSocket
        this.socket = new WebSocket(url);

        // Xử lý sự kiện khi kết nối được thiết lập
        this.socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        // Xử lý sự kiện khi nhận được tin nhắn từ server
        this.socket.onmessage = (event) => {
            console.log('Received message:', event.data);
            // Xử lý tin nhắn ở đây
        };

        // Xử lý sự kiện khi có lỗi xảy ra trong quá trình kết nối
        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Xử lý sự kiện khi kết nối bị đóng
        this.socket.onclose = () => {
            console.log('WebSocket connection closed');
        };
    }

    public login(username: string, password: string) {
        // Kiểm tra nếu kết nối WebSocket không tồn tại
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            console.error('WebSocket connection is not open');
            return;
        }

        // Gửi thông điệp đăng nhập qua kết nối WebSocket
        const loginMessage = {
            action: 'onchat',
            data: {
                event: 'LOGIN',
                data: { user: username, pass: password }
            }
        };
        this.sendMessage(loginMessage);
    }

    public sendMessage(message: any) {
        // Gửi tin nhắn qua kết nối WebSocket
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not connected');
        }
    }

    public addListener(event: string, listener: (data: any) => void) {
        // Thêm bộ lắng nghe cho các sự kiện WebSocket
    }

    public removeListener(event: string, listener: (data: any) => void) {
        // Xóa bộ lắng nghe cho các sự kiện WebSocket
    }

    public close() {
        // Đóng kết nối WebSocket
        if (this.socket) {
            this.socket.close();
        }
    }
}

export default WebSocketService;
