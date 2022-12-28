# Jekyll Profile Using Docker Compose

This project using docker compose to develop a jekyll blog.

To run this project, you need Python3, Docker, and Docker Compose.

## Init

Create file `.env` by copy `_env`
```
cp _config/_env _config/.env
```
Edit file `_config/.env` with your config.

## Docker

Fist you need to start the docker compose
```
./cli docker up
```
Make sure your Docker~=20.10.22, Docker Compose~=v2.14.1, if you can not run this command.

When you finish the work, and want to off docker, use this command
```
./cli docker down
```

When you edit Gemfile (add more dependency), you need to re-build docker image, use this command
```
./cli docker build
```

## App

After run `./cli docker up`, now you can start this blog app.

### Developing
Use this command when developing the app
```
./cli app serve
```
The blog app now live in [http://localhost:4000](http://localhost:4000/)

### Deploy
To build the blog app, run this command.
```
./cli app build
```
Now you can go to [http://localhost:3000](http://localhost:3000/) to re-check the blog page.

## Testing via LAN (using multi device)

First you need to find your IP address, run this command.
```
ifconfig eno1
```
or just `ifconfig`

Look for something like this `inet 192.168.1.135`.

Replace `localhost` at URL by the found IP. Example: [http://192.168.1.135:3000](http://192.168.1.135:3000/)

Now you can use your phone which is connected to the same wifi router, to access this URL.

## Others

### Encrypt private post
Create file `_store_files/encrypted.csv` with this format
```
<blog-title>,<password>
```

Example
```
blog-thu-nghiem,impose-partner-hamstring
huong-dan-dang-bai,roundup-refold-decibel
```

**Note:** No space between `blog-title` and `password`, only separate them by comma (`,`)

### Compress images
```
./cli tool tinify <image-folder-path>
```

### Convert images to Webp formant
```
./cli tool cwebp <image-folder-path>
```
