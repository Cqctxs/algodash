const roomList = {
    rooms: [],
    setRooms: function (newRooms) {
        this.rooms = newRooms;
    }
}

const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const joinRoom = async (io, socket) => {
    socket.on("join-room", (player) => {
        const target = roomList.rooms.find(o => o.vacant);
        if (target) {
            target.players.push(player);
            target.vacant = false;
            socket.join(target.room);
            console.log(`User with id: ${player.id} joined room ${target.room}`);
            io.in(target.room).emit("player-found", target.room, target.players, Math.floor(Math.random() * 10000000));
        } else {
            const roomId = makeid(5);
            let players = [player];
            const newRoom = {
                room: roomId,
                players: players,
                vacant: true,
            }
            roomList.setRooms([...roomList.rooms, newRoom]);
            socket.join(roomId);
            console.log(`User with id: ${player.id} joined room ${roomId}`);
        }
    });
}

const sendUpdate = async (io, socket) => {
    socket.on("sendUpdate", (room, win, lose) => {
        console.log("sending update...");
        socket.to(room).emit("update", (win, lose));
    });
}

const win = async (io, socket) => {
    socket.on("win", (room, winner, loser, winChange, loseChange) => {
        socket.to(room).emit("lost", winner, loser, winChange, loseChange);
    });
}

const removeRoom = async (io, socket) => {
    socket.on("remove-room", (room) => {
        roomList.setRooms(roomList.rooms.filter((o) => { if (o.room !== room) { return o } }));
        io.in(room).emit("close");
    })
}

module.exports = {
    joinRoom,
    sendUpdate,
    win,
    removeRoom
}