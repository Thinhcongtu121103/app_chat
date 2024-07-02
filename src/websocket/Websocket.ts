class WebSocketService {
    private static instance: WebSocketService;
    private socket: WebSocket | null = null;
    private listeners: { [key: string]: ((data: any) => void)[] } = {};

    private constructor() {
        // Initialize WebSocket connection
        this.connect('ws://140.238.54.136:8080/chat/chat');
    }

    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    private connect(url: string) {
        // Initialize WebSocket connection
        this.socket = new WebSocket(url);

        // Handle events when connection is established
        this.socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        // Handle events when message is received from server
        this.socket.onmessage = (event) => {
            console.log('Received message:', event.data);
            this.notifyListeners('message', JSON.parse(event.data));
        };

        // Handle events when error occurs during connection
        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Handle events when connection is closed
        this.socket.onclose = () => {
            console.log('WebSocket connection closed');
        };
    }

    public login(username: string, password: string) {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            console.error('WebSocket connection is not open');
            return;
        }

        // Send login message via WebSocket
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
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not connected');
        }
    }

    public logout() {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            console.error('WebSocket connection is not open');
            return;
        }

        const logoutMessage = {
            action: 'onchat',
            data: {
                event: 'LOGOUT'
            }
        };

        this.sendMessage(logoutMessage);
    }

    public register(username: string, password: string) {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            console.error('WebSocket connection is not open');
            return;
        }

        // Send register message via WebSocket
        const registerMessage = {
            action: 'onchat',
            data: {
                event: 'REGISTER',
                data: {
                    user: username,
                    pass: password
                }
            }
        };
        this.sendMessage(registerMessage);
    }


    public addMessageListener(event: string, listener: (data: any) => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    }

    public removeMessageListener(event: string, listener: (data: any) => void) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(l => l !== listener);
        }
    }

    private notifyListeners(event: string, data: any) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(listener => listener(data));
        }
    }

    public close() {
        if (this.socket) {
            this.socket.close();
        }
    }

    public getUserList() {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            console.error('WebSocket connection is not open');
            return;
        }

        // Send getUserList message via WebSocket
        const getUserListMessage = {
            action: 'onchat',
            data: {
                event: 'GET_USER_LIST'
            }
        };
        this.sendMessage(getUserListMessage);
    }

    public createRoom(roomName: string) {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            console.error('WebSocket connection is not open');
            return;
        }

        // Send createRoom message via WebSocket
        const createRoomMessage = {
            action: 'onchat',
            data: {
                event: 'CREATE_ROOM',
                data: { name: roomName }
            }
        };
        this.sendMessage(createRoomMessage);
    }

    public sendChatMessage(type: string, to: string, mes: string) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            // Send SEND_CHAT message via WebSocket
            const sendChatMessage = {
                action: 'onchat',
                data: {
                    event: 'SEND_CHAT',
                    data: {
                        type: type,
                        to: to,
                        mes: mes
                    }
                }
            };
            this.sendMessage(sendChatMessage);
        } else {
            console.error('WebSocket connection is not open');
        }
    }

    public checkUserOnline(username: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
                console.error('WebSocket connection is not open');
                reject('WebSocket connection is not open');
                return;
            }

            const checkUserMessage = {
                action: 'onchat',
                data: {
                    event: 'CHECK_USER',
                    data: {
                        user: username
                    }
                }
            };

            const listener = (data: any) => {
                if (data.event === 'CHECK_USER' && data.status === 'success' && data.data && data.data.status !== undefined) {
                    resolve(data.data.status); // Assuming data.data.status is a boolean
                    this.removeMessageListener('message', listener); // Remove listener once resolved
                }
            };

            this.addMessageListener('message', listener);
            this.sendMessage(checkUserMessage);
        });
    }

}

export default WebSocketService;