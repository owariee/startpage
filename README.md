# 🌾 Startpage

## How to use

This startpage only works on Firefox Developer Edition cause Mozilla require developers
to actually sign their extension xpi file trough AMO to use on normal Firefox releases.
Since this extension is made only for personal use, and i will not sign it, the only way
to use it is on alternative Firefox releases that respect disabling the requirement for
signed extensions.

### Disable Requirement for Signed Extension

1. Go to about:config
2. Set "xpinstall.signatures.required" to false

### Generate Extension

```sh
make build
```

### Install Extension

1. Go to about:addons
2. Gear -> Install Addon From File... -> Open startpage.xpi
