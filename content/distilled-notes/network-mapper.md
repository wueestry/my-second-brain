---
{"publish":true,"title":"Network Mapper (nmap)","created":"2025-10-26 10:12","modified":"2025-10-26T15:38:08.901+01:00","tags":["#nmap","#port-scanning","#network-discovery","#security-auditing","#cybersecurity","#network-protocol","#bash","#terminal","#scripting"],"cssclasses":"center-images"}
---


# NETWORK MAPPER (NMAP)

---

Nmap (Network Mapper) is a free and open-source tool primarily used for network discovery, port scanning, and security auditing. It's a versatile tool used by network admins and security professionals.

## Basic Usage

We generally use the following command to identify open ports on a target IP:

```bash
nmap -sV {TARGET_IP}
```

*   `-sV`:  This option enables version detection, attempting to determine the service and version running on each port.

## Scan Types

Nmap offers various scan types. Here are a few common ones:

*   **TCP Connect Scan (`-sT`):** The most basic TCP scan.  Requires a working TCP connection.
*   **SYN Scan (`-sS`):**  A stealthier scan that doesn't complete the TCP handshake. Requires root privileges.
*   **UDP Scan (`-sU`):** Scans for open UDP ports.  Can be slow and unreliable.
*   **Ping Scan (`-sP`):** Discovers active hosts on a network without port scanning.


## Service Detection

Nmap can also be used to detect services running on open ports. This is crucial for identifying vulnerabilities.

```bash
nmap -sV {TARGET_IP}
```

*   `-sV`: Enables version detection.


## OS Detection

Nmap can also attempt to identify the operating system of the target device.

```bash
nmap -O {TARGET_IP}
```

*   `-O`: Enables OS detection.  Requires root privileges and can be unreliable.


## Scripting Engine (NML)

Nmap’s scripting engine allows for complex tasks such as vulnerability assessment.

Examples:

```bash
nmap --script vuln {TARGET_IP}
```

*   `--script vuln`: Runs vulnerability scripts.

---

## References