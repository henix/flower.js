# Flower.js

flower.js is a tiny javascript library

## Dependency

* [base.js](https://github.com/henix/base.js)

## Build

Build tool is [rainy](https://github.com/henix/rainy).

Build:

```bash
RAINY_PATH=~/rainy BASEJS_PATH=~/base.js make
```

If you don't want to type "RAINY_PATH=" every time, create a file `config.mk`:

```makefile
# you'd better use absolute path
RAINY_PATH=/where/you/install/rainy
BASEJS_PATH=/where/you/install/base.js
```

## Run Test

	lighttpd -D -f lighttpd.conf
	firefox http://localhost:8080/test/cookie.htm # and others
