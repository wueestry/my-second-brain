---
{"publish":true,"title":"File transfer protocol (FTP)","created":"2025-10-26 10:23","modified":"2025-10-26T15:30:12.831+01:00","tags":["#file-transfer","#ftp","#protocols","#data-transfer","#databases","#terminal","#cybersecurity","#data-recovery"],"cssclasses":"center-images"}
---


# FILE TRANSFER PROTOCOL (FTP)

---

## What is FTP?
FTP stands for File Transfer Protocol. It's a standard network protocol used for transferring files between a client (your computer) and a server (like a web server) over a TCP-based network (e.g., the Internet). It's one of the oldest protocols still in use.

## How does it work?
FTP uses a client-server model with two connections:
*   **Control Connection:** Used for commands (port 21).
*   **Data Connection:** Used for file transfer (dynamic ports).

### Common Uses:
*   Uploading/downloading files to web servers.
*   Website content management.
*   Efficient transfer of large files. (Historically, the primary method for website deployment.)

## Security Concerns & Alternatives:
Traditional FTP transmits data and credentials in plain text—it's insecure!  Use these safer options instead:
*   **FTPS (FTP Secure):**  Adds TLS/SSL encryption.
*   **SFTP (SSH File Transfer Protocol):** Uses SSH for secure file transfer. **Always prefer SFTP.**

Use `ftp -?` for the help menu

---

## References
