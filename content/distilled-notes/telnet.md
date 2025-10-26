---
{"publish":true,"title":"Telnet","created":"2025-10-26 10:16","modified":"2025-10-26T15:40:18.000+01:00","tags":["telnet","remote-access","unencrypted","cybersecurity","command-line","terminal","network-protocol"],"cssclasses":"center-images"}
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

---

## References
