---
{"publish":true,"title":"Network Mapper (nmap)","created":"2025-10-26 10:12","modified":"2025-11-03T20:43:36.625+01:00","tags":["cybersecurity/tools/network-mapper"],"cssclasses":"center-images"}
---


# NETWORK MAPPER (NMAP)

---

Nmap (Network Mapper) is a free and open-source tool primarily used for network discovery, port scanning, and security auditing. It's a versatile tool used by network admins and security professionals.

## Basic Usage

We generally use the following command to identify open ports on a target IP:

```bash
nmap -sV {TARGET_IP}
```

- `-sV`: This option enables version detection, attempting to determine the service and version running on each port.

## Scan Types

Nmap offers various scan types. Here are a few common ones:

- **TCP Connect Scan (`-sT`):** The most basic TCP scan. Requires a working TCP connection.
- **SYN Scan (`-sS`):** A stealthier scan that doesn't complete the TCP handshake. Requires root privileges.
- **UDP Scan (`-sU`):** Scans for open UDP ports. Can be slow and unreliable.
- **Ping Scan (`-sP`):** Discovers active hosts on a network without port scanning.

## Service Detection

Nmap can also be used to detect services running on open ports. This is crucial for identifying vulnerabilities.

```bash
nmap -sV {TARGET_IP}
```

- `-sV`: Enables version detection.

## OS Detection

Nmap can also attempt to identify the operating system of the target device.

```bash
nmap -O {TARGET_IP}
```

- `-O`: Enables OS detection. Requires root privileges and can be unreliable.

## Scripting Engine (NSE)

Nmap's scripting engine allows for complex tasks such as vulnerability assessment.

Examples:

```bash
# Run vulnerability detection scripts
nmap --script vuln {TARGET_IP}

# Run all default scripts
nmap --script=default {TARGET_IP}

# Run specific script category
nmap --script=auth {TARGET_IP}
nmap --script=malware {TARGET_IP}

# Run multiple scripts
nmap --script "http-*" {TARGET_IP}

# List available scripts
nmap --script-help all
```

Common script categories:

- `auth`: Authentication scripts
- `default`: Default safe scripts
- `discovery`: Network discovery
- `exploit`: Exploitation scripts
- `vuln`: Vulnerability detection
- `malware`: Malware detection

## Advanced Scanning Techniques

```bash
# Scan specific port ranges
nmap -p 1-1000 {TARGET_IP}
nmap -p 22,80,443 {TARGET_IP}
nmap -p- {TARGET_IP}  # All ports

# Timing templates (T0-T5)
nmap -T0 {TARGET_IP}  # Paranoid (slowest, IDS evasion)
nmap -T4 {TARGET_IP}  # Aggressive (fast, common choice)

# Output formats
nmap -oN output.txt {TARGET_IP}     # Normal text
nmap -oX output.xml {TARGET_IP}     # XML format
nmap -oG output.grep {TARGET_IP}    # Greppable format
nmap -oA output {TARGET_IP}         # All formats

# Aggressive scan (OS detection, version detection, scripts, traceroute)
nmap -A {TARGET_IP}

# Fast scan (top 100 ports)
nmap -F {TARGET_IP}

# Scan multiple targets
nmap 192.168.1.1-10
nmap 192.168.1.0/24
nmap -iL targets.txt
```

## Python Integration

```python
import nmap
import json

class NetworkScanner:
    """Network scanner using python-nmap wrapper"""

    def __init__(self):
        self.nm = nmap.PortScanner()

    def scan_host(self, target: str, ports: str = '1-1024') -> dict:
        """
        Perform basic port scan on target.

        Args:
            target: IP address or hostname
            ports: Port range to scan (e.g., '22,80,443' or '1-1024')

        Returns:
            Dictionary with scan results
        """
        try:
            print(f"Scanning {target} on ports {ports}...")
            self.nm.scan(target, ports, arguments='-sV')

            results = {
                'target': target,
                'scan_time': self.nm.scanstats(),
                'hosts': {}
            }

            for host in self.nm.all_hosts():
                host_info = {
                    'state': self.nm[host].state(),
                    'protocols': {}
                }

                for proto in self.nm[host].all_protocols():
                    ports_info = {}
                    for port in self.nm[host][proto].keys():
                        ports_info[port] = {
                            'state': self.nm[host][proto][port]['state'],
                            'service': self.nm[host][proto][port]['name'],
                            'version': self.nm[host][proto][port].get('version', 'unknown')
                        }

                    host_info['protocols'][proto] = ports_info

                results['hosts'][host] = host_info

            return results

        except nmap.PortScannerError as e:
            print(f"Nmap scan error: {e}")
            return {}
        except Exception as e:
            print(f"Unexpected error: {e}")
            return {}

    def scan_network(self, network: str) -> list:
        """
        Discover active hosts on a network.

        Args:
            network: Network range (e.g., '192.168.1.0/24')

        Returns:
            List of active host IPs
        """
        try:
            print(f"Scanning network {network} for active hosts...")
            self.nm.scan(hosts=network, arguments='-sn')

            active_hosts = []
            for host in self.nm.all_hosts():
                if self.nm[host].state() == 'up':
                    active_hosts.append(host)

            return active_hosts

        except Exception as e:
            print(f"Network scan error: {e}")
            return []

# Example usage
if __name__ == "__main__":
    scanner = NetworkScanner()

    # Scan specific host
    results = scanner.scan_host('192.168.1.1', '22,80,443')
    print(json.dumps(results, indent=2))

    # Discover network hosts
    hosts = scanner.scan_network('192.168.1.0/24')
    print(f"Active hosts: {hosts}")
```

## Common Use Cases

### 1. Network Inventory

```bash
# Discover all devices on network
nmap -sn 192.168.1.0/24 -oX network_inventory.xml
```

### 2. Vulnerability Assessment

```bash
# Scan for vulnerabilities
nmap --script vuln -sV 192.168.1.1
```

### 3. Web Server Enumeration

```bash
# Enumerate web server details
nmap -p 80,443 --script=http-enum,http-headers 192.168.1.1
```

### 4. Service Version Detection

```bash
# Detect service versions for security assessment
nmap -sV --version-intensity 5 192.168.1.1
```

### 5. Firewall Detection

```bash
# Test firewall rules
nmap -sA 192.168.1.1
```

## Best Practices

1. **Authorization**: Always obtain written permission before scanning networks you don't own
2. **Rate Limiting**: Use appropriate timing templates to avoid overwhelming targets
3. **Documentation**: Save scan results for compliance and future reference
4. **Targeted Scans**: Scan only necessary ports and hosts to minimize impact
5. **Legal Compliance**: Be aware that unauthorized scanning may violate laws in many jurisdictions

## Ethical and Legal Considerations

⚠️ **Warning**: Unauthorized port scanning may be illegal in many jurisdictions and could be considered a cyber attack. Always ensure you have explicit permission before scanning any network or system you do not own.

---

## References

- [Nmap Official Website](https://nmap.org/)
- [Nmap Reference Guide](https://nmap.org/book/man.html)
- [NSE Documentation](https://nmap.org/book/nse.html)
- [Python-nmap Library](https://pypi.org/project/python-nmap/)
