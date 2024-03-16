## JWT

Generate JWT private key in base64

```bash
  openssl genrsa -out private_key.pem 2048
  base64 private_key.pem > private_key_base64.txt
```

Generate JWT public key in base64

```bash
  openssl rsa -pubout -in private_key.pem -out public_key.pem
  base64 public_key.pem > public_key_base64.txt
```