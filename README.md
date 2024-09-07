# Open Tank

## What is this

> [!CAUTION]
I am not a specialized developer in NodeJS, for this reason, you may not like something in the code. If you want to improve the project or encounter any errors, write about it in issues but I'm not sure I can find the time to answer. If you are the owner of Tanki Online and you don't like that this project exists, contact me at issues and we will be able to solve this problem.

This is a client for the [Tanki Online](https://tankionline.com) game written in NodeJS and wrapped in electron. The game does not have a native client for Linux (there is only one for Windows), for this reason I decided to create this client.
The Windows client is created in a similar way, just a Chromium engine and an electron wrapper. In principle, there is almost no difference with the original client.

## How to build

* Install npm & nodejs. Manjaro/ArchLinux:
```
sudo pacman -S nodejs npm
```

* Debian/Ubuntu/Linux Mint:
```
sudo apt install nodejs npm
```

* Clone git repository and navigate to the project folder:
```
git clone https://github.com/WolfAURman/opentank && cd opentank
```

* Run the dependency installation:
```
npm install
```

* Run build:
```
npm run build
```

* Get the finished project in the directory:
```
dist/opentank-1.0.0.AppImage
```

* For a test run during development:
```
npm start
```

## How to use

> [!IMPORTANT] By default, the client runs without hardware virtualization, which can cause you to get performance problems!

To launch the project, download from the [releases](https://github.com/WolfAURman/opentank/releases) ```section opentank-1.0.0.AppImage``` package (or if you used manual build, you will receive a ready-made package from ``dist/opentank-1.0.0.AppImage``) and run it from the terminal:
```
./opentank-1.0.0.AppImage
```


### If you want to run with hardware virtualization, use this command:
```
./dist/opentank-1.0.0.AppImage --enable-features=VaapiVideoDecoder,VaapiIgnoreDriverChecks,Vulkan,DefaultANGLEVulkan,VulkanFromANGLE
```

For AMD graphics cards using the OpenSource driver, game runs perfectly and has a high FPS. For more information, visit wikipedia: [Arch Linux Wiki - Chromium](https://wiki.archlinux.org/title/Chromium)

## Data storage:
Almost all AppImage applications save data & config in your home folder. OpenTank is no exception. You can find the application data in ```~/.config/opentank/```

## Fix errors:

### Error:
```
AppImages require FUSE to run. 
You might still be able to extract the contents of this AppImage 
if you run it with the --appimage-extract option
```

* Install fuse. pacman -S fuse. Manjaro/ArchLinux:
```
sudo pacman -S fuse
```

* Debian/Ubuntu/Linux Mint:
```
sudo apt install fuse
```