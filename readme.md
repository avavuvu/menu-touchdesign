## Touch Designer Menu

Hi,

This is a socket.io project for ordering on a fictional digital menu.

In its current state, the backend will fire "order" events on a socket.io server.

#### Setup

Make sure you have Bun installed. (It is a Node alternative that supports Typescript out of the box)

```
cd backend
bun install
bun run start
```

It will listen on http://localhost:3000
Connect to the socket.io on ws://localhost:3000 (3000 is Port Number)

It will spit out some test data, that will look something like this:
```json
{
    "username": "Rian",
    "order": {
        "course": "entree",
        "item": "A dozen oysters",
        "price": 5
    }
}
```

----

If you want to change the test data or the fire rate, edit config/testdata.yaml

#### Frontend
Frontend is WIP
