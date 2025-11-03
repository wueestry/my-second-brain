---
{"publish":true,"title":"Telnet","created":"2025-10-26 10:16","modified":"2025-11-03T20:43:24.486+01:00","tags":["networking/protocols/telnet"],"cssclasses":"center-images"}
---


# TELNET

---

Telnet is a client-server network protocol used for providing access to virtual terminals of remote systems over TCP/IP networks. It enables users to log in to and interact with remote computers as if they were using a local terminal, primarily through a command-line interface.

## Vulnerabilities

Telnet is a dangerous service since it is not encrypted. Everyone on your local network can sniff the data that passes between the telnet client and the server. This includes logins and passwords.

### Impact:

Hosts on your local network can easily obtain usernames and passwords of users that connect to your telnet server.

### Mitigation:

Never expose a Telnet server to the public internet. Use SSH instead, which provides encrypted communication.

## How Telnet Works

Telnet operates on **port 23** by default and uses TCP for reliable communication.

```
Client <--- Plain Text Data ---> Server (Port 23)
```

All data, including usernames and passwords, is transmitted in **cleartext**.

## Basic Usage

### Connecting to a Server

```bash
telnet hostname port

# Example
telnet example.com 23
telnet 192.168.1.100 80
```

### Testing Services

Telnet is useful for testing whether services are running:

```bash
# Test web server
telnet example.com 80
GET / HTTP/1.1
Host: example.com

# Test SMTP server
telnet mail.example.com 25

# Test SSH availability
telnet server.com 22
```

### Common Commands

Once connected:

```
Ctrl + ]       : Escape to telnet prompt
quit           : Close connection
open host port : Open new connection
close          : Close current connection
status         : Display connection status
```

## Security Issues

### Packet Sniffing Example

An attacker on the same network can easily capture credentials:

```bash
# Using tcpdump to capture telnet traffic
sudo tcpdump -i eth0 -A 'port 23'

# Using Wireshark
# Filter: tcp.port == 23
```

This exposes:

- Usernames
- Passwords
- All commands executed
- Data transferred

### Common Attack Vectors

1. **Man-in-the-Middle (MITM)**: Intercept and modify traffic
2. **Credential theft**: Capture login credentials
3. **Session hijacking**: Take over active sessions
4. **Eavesdropping**: Monitor all communication

## Secure Alternatives

### SSH (Secure Shell)

```bash
# Connect via SSH
ssh username@hostname

# Specify port
ssh -p 2222 username@hostname

# Copy files securely
scp file.txt username@hostname:/path/
```

**Advantages over Telnet:**

- Encrypted communication
- Public key authentication
- Port forwarding
- SFTP for file transfer
- Widely supported

### Comparison

| Feature        | Telnet              | SSH                       |
| -------------- | ------------------- | ------------------------- |
| Encryption     | None                | Yes (AES, ChaCha20, etc.) |
| Authentication | Password only       | Password, keys, 2FA       |
| Port           | 23                  | 22                        |
| Security       | Insecure            | Secure                    |
| Use case       | Legacy systems only | Modern remote access      |

## When Telnet is Still Used

### Legacy Equipment

- Old network devices (routers, switches)
- Industrial control systems
- Embedded systems without SSH

### Testing and Debugging

- Testing TCP services
- Debugging network protocols
- Checking port availability

### Internal Networks

- Air-gapped networks
- Isolated lab environments
- Development/testing only

**Note**: Even on internal networks, SSH is preferred.

## Installing Telnet

### Linux

```bash
# Debian/Ubuntu
sudo apt install telnet

# RHEL/CentOS
sudo yum install telnet

# Arch Linux
sudo pacman -S inetutils
```

### macOS

```bash
# Telnet is no longer included by default
brew install telnet
```

### Windows

```powershell
# Enable Telnet Client
dism /online /Enable-Feature /FeatureName:TelnetClient
```

## Disabling Telnet Server

If a telnet server is running, disable it:

```bash
# Linux (systemd)
sudo systemctl stop telnet.socket
sudo systemctl disable telnet.socket

# Remove telnet server
sudo apt remove telnetd  # Debian/Ubuntu
sudo yum remove telnet-server  # RHEL/CentOS
```

## Best Practices

1. **Never use Telnet for remote administration**
2. **Use SSH instead** for all remote access needs
3. **Disable Telnet services** on production systems
4. **Block port 23** in firewalls
5. **Use Telnet only for testing** in controlled environments
6. **Monitor for Telnet usage** as it may indicate compromise

---

## References

- [Telnet Protocol - RFC 854](https://www.rfc-editor.org/rfc/rfc854)
- [SSH vs Telnet - Cisco](https://www.cisco.com/c/en/us/support/docs/security-vpn/secure-shell-ssh/4145-ssh.html)
- [Why Telnet is Insecure - SANS](https://www.sans.org/reading-room/whitepapers/protocols/paper/633)
