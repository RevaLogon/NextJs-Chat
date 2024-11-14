import socket
import threading
import json

HOST = "127.0.0.1"
PORT = 5000
clients = {}

# Load banned words
with open("banned_words.json", "r") as f:
    banned_words = set(json.load(f))

def contains_banned_words(message):
    return any(word in message for word in banned_words)

def broadcast(message, sender_socket=None):
    for client_socket in clients.keys():
        if client_socket != sender_socket:
            try:
                client_socket.send(message.encode("utf-8"))
            except:
                remove_client(client_socket)

def remove_client(client_socket):
    if client_socket in clients:
        del clients[client_socket]
        client_socket.close()

def handle_client(client_socket, addr):
    client_socket.send("Enter username: ".encode("utf-8"))
    username = client_socket.recv(1024).decode("utf-8")

    clients[client_socket] = username
    broadcast(f"{username} has joined the chat.")

    try:
        while True:
            message = client_socket.recv(1024).decode("utf-8")
            if contains_banned_words(message):
                client_socket.send("Message contains banned words.".encode("utf-8"))
                continue
            broadcast(f"{username}: {message}", client_socket)
    except:
        remove_client(client_socket)
        broadcast(f"{username} has left the chat.")

def start_server():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind((HOST, PORT))
    server.listen(5)
    print(f"Server running on {HOST}:{PORT}...")

    while True:
        client_socket, addr = server.accept()
        threading.Thread(target=handle_client, args=(client_socket, addr)).start()

if __name__ == "__main__":
    start_server()
