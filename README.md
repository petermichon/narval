# Narval

## Installation

### Clone the repository

```bash
git clone https://github.com/petermichon/narval.git narval &&
cd narval/src/
```

### Install dependencies

```bash
deno run install
```

### Build the website and copy it to the server

```bash
deno run build
```

### Add HTTPS certificates to the server

```bash
cp -r ~/secret/. server/secret
```

NOTE: see section [About certificates](#about-certificates)

### Serve the website over localhost (https://localhost:8443/)

```bash
deno run serve
```

NOTE: see section [About hosting](#about-hosting)

## About certificates

Your certificates must be located in the `~/secret/` directory.

```txt
~/
└ secret/
  ├ fullchain.pem
  └ privkey.pem
```

If you don't want your certificates to be in `~/secret/`, adapt the path in the `cp -r YOUR/PATH/HERE/. server/secret` command.

If you don't have them, you can generate self-signed certificates in the current directory by running the command `openssl req -x509 -newkey rsa:2048 -keyout privkey.pem -out fullchain.pem -days 365 -nodes -subj "/CN=localhost"`.

Make sure your `privkey.pem` file is readable by all users because Deno is not able to read it by default. You can enable this by running the command `sudo chmod a+r privkey.pem`, with the `privkey.pem` file in the current directory.

## About hosting

If you want the backend to run in the background, use `nohup deno run serve &`. Use `pkill deno` to terminate all Deno processes.
