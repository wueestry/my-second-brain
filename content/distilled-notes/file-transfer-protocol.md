---
{"publish":true,"title":"File transfer protocol (FTP)","created":"2025-10-26 10:23","modified":"2025-11-03T20:27:08.271+01:00","tags":[null],"cssclasses":"center-images"}
---


# FILE TRANSFER PROTOCOL (FTP)

---

## What is FTP?

FTP stands for File Transfer Protocol. It's a standard network protocol used for transferring files between a client (your computer) and a server (like a web server) over a TCP-based network (e.g., the Internet). It's one of the oldest protocols still in use.

## How does it work?

FTP uses a client-server model with two connections:

- **Control Connection:** Used for commands (port 21).
- **Data Connection:** Used for file transfer (dynamic ports).

### Common Uses:

- Uploading/downloading files to web servers.
- Website content management.
- Efficient transfer of large files. (Historically, the primary method for website deployment.)

## Security Concerns & Alternatives:

Traditional FTP transmits data and credentials in plain text—it's insecure! Use these safer options instead:

- **FTPS (FTP Secure):** Adds TLS/SSL encryption.
- **SFTP (SSH File Transfer Protocol):** Uses SSH for secure file transfer. **Always prefer SFTP.**

Use `ftp -?` for the help menu

## FTP Commands

Common FTP commands from the command-line client:

```bash
ftp <hostname>          # Connect to FTP server
open <hostname>         # Open connection
user <username>         # Specify username
pass <password>         # Specify password
ls                      # List files
cd <directory>          # Change directory
get <filename>          # Download file
put <filename>          # Upload file
mget *.txt              # Download multiple files
mput *.jpg              # Upload multiple files
binary                  # Set binary transfer mode
ascii                   # Set ASCII transfer mode
pwd                     # Print working directory
delete <filename>       # Delete file
mkdir <directory>       # Create directory
quit                    # Exit FTP session
```

## Active vs Passive Mode

### Active Mode

- Client opens random port and tells server via control connection
- Server initiates data connection from port 20 to client's port
- **Problem**: Firewalls often block incoming connections

### Passive Mode

- Client requests passive mode with `PASV` command
- Server opens random port and tells client
- Client initiates data connection to server's port
- **Preferred**: Works better with firewalls

## Port Numbers

- **Port 21**: FTP control connection
- **Port 20**: FTP data connection (active mode)
- **Dynamic ports**: Used for data in passive mode (typically 1024-65535)

## Example Usage

```bash
# Connect to FTP server
ftp ftp.example.com

# Login
Name: username
Password: ********

# Navigate and transfer
ftp> ls
ftp> cd public_html
ftp> binary
ftp> put index.html
ftp> get backup.zip
ftp> bye
```

## Modern Alternatives

### SFTP (SSH File Transfer Protocol)

```bash
sftp user@hostname
sftp> put localfile.txt
sftp> get remotefile.txt
```

### SCP (Secure Copy)

```bash
scp localfile.txt user@hostname:/remote/path/
scp user@hostname:/remote/file.txt /local/path/
```

### rsync over SSH

```bash
rsync -avz -e ssh /local/dir/ user@hostname:/remote/dir/
```

## Security Best Practices

- **Never use plain FTP** for sensitive data
- Use **SFTP or FTPS** for all file transfers
- Implement **strong authentication** (SSH keys for SFTP)
- Restrict **user permissions** on the server
- Use **encrypted connections** (TLS 1.2 or higher)
- Enable **logging** for audit trails
- Consider **IP whitelisting** for additional security

---

## References

- [FTP Protocol - RFC 959](https://www.rfc-editor.org/rfc/rfc959)
- [FTPS vs SFTP - KeyCDN](https://www.keycdn.com/support/ftps-vs-sftp)
- [FTP Security - OWASP](https://owasp.org/www-community/vulnerabilities/Insecure_Transport)
