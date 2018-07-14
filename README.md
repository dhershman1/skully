# skully
A simple starter screeps AI. Not optimal but it will get you going.

## Features

- Has Roles for both War and Peace
- Has basic action handling for movement, harvesting, building, repairing, etc.
- Has basic tower handling
- Has built in CPU limiting
- Auto scrubs memory for dead/disappeared creeps
- Panic capabilities for invasions
- Starter Multi room support

`Main` runs most of the script itself, `lib` contains the data grabbing and action distributing, as well as panic and linking rooms

`actions` are built on seperate files to keep them easy to maintain and expand upon

`spawner` uses `roles` to keep track of creep counts and tasks or what type of creep is spawned/should be spawned

For now that's about it
