let socket;

export function connectSocket(url){
    socket = new WebSocket(url);
    socket.addEventListener("message", (socketEvent) => {

        const data = JSON.parse(socketEvent.data);
        const event = new CustomEvent(data.target, {
            detail: JSON.parse(data.value)
        })
        document.dispatchEvent(event);
    });

    document.addEventListener("SEND2SOCKET", (event) => {
        socket.send(event.detail);
    })
}

export function logSocket(){
    console.log(socket);
}
