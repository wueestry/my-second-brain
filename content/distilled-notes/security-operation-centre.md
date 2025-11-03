---
{"publish":true,"title":"Security Operation Centre (SOC)","created":"2025-08-23 15:31","modified":"2025-11-03T20:43:24.508+01:00","tags":["cybersecurity/security-operation-centre"],"cssclasses":"center-images"}
---


# SECURITY OPERATION CENTRE (SOC)

---

A **Security Operations Centre (SOC)** is a centralised team of cybersecurity professionals that continuously monitors, detects, analyses, and responds to security threats across an organisation's IT infrastructure. The SOC acts as the first line of defence against cyber attacks, operating 24/7 to protect critical assets.

## Core Functions

### 1. Threat Detection

- **Log monitoring**: Collect and analyse logs from firewalls, IDS/IPS, servers, endpoints
- **SIEM analysis**: Use Security Information and Event Management tools to correlate events
- **Anomaly detection**: Identify unusual patterns indicating potential attacks
- **Threat intelligence**: Leverage feeds of known malicious indicators (IOCs)

### 2. Incident Response

- **Triage**: Classify and prioritise security alerts by severity
- **Investigation**: Analyse attack vectors, scope, and impact
- **Containment**: Isolate affected systems to prevent spread
- **Remediation**: Remove threats and restore normal operations
- **Post-incident review**: Document lessons learned

### 3. Vulnerability Management

- **Scanning**: Regular automated scans for known vulnerabilities
- **Assessment**: Evaluate risk and potential impact
- **Patch management**: Coordinate with IT to apply security updates
- **Penetration testing**: Simulate attacks to find weaknesses

### 4. Compliance and Reporting

- **Policy enforcement**: Ensure adherence to security policies
- **Regulatory compliance**: Meet requirements (GDPR, HIPAA, PCI-DSS)
- **Metrics and KPIs**: Track mean time to detect (MTTD), mean time to respond (MTTR)
- **Executive reporting**: Communicate security posture to leadership

## SOC Team Structure

### Tier 1: Alert Analysts

- Monitor SIEM dashboards and security alerts
- Perform initial triage and classification
- Escalate confirmed incidents to Tier 2
- False positive reduction

### Tier 2: Incident Responders

- Deep investigation of escalated incidents
- Forensic analysis and evidence collection
- Coordination with other IT teams
- Threat hunting activities

### Tier 3: Advanced Security Engineers

- Handle complex, sophisticated threats (APTs)
- Malware reverse engineering
- Develop detection rules and playbooks
- Threat intelligence research

### SOC Manager

- Oversee operations and resource allocation
- Strategic planning and process improvement
- Stakeholder communication
- Tool selection and budget management

## Essential SOC Technologies

### SIEM (Security Information and Event Management)

- **Examples**: Splunk, IBM QRadar, Elastic Stack, Microsoft Sentinel
- **Function**: Aggregate, correlate, and analyse security data from multiple sources
- **Key features**: Real-time alerting, dashboards, log retention, compliance reporting

### EDR/XDR (Endpoint/Extended Detection and Response)

- **Examples**: CrowdStrike Falcon, Microsoft Defender for Endpoint, SentinelOne
- **Function**: Monitor and respond to threats on endpoints (laptops, servers, mobile)
- **Capabilities**: Behavioural analysis, threat isolation, forensic data collection

### IDS/IPS (Intrusion Detection/Prevention System)

- **Examples**: Snort, Suricata, Palo Alto Networks
- **Function**: Detect and block malicious network traffic
- **Types**: Signature-based, anomaly-based, protocol analysis

### SOAR (Security Orchestration, Automation, and Response)

- **Examples**: Palo Alto Cortex XSOAR, Splunk Phantom, IBM Resilient
- **Function**: Automate repetitive tasks and orchestrate response workflows
- **Benefits**: Faster response times, consistency, reduced analyst fatigue

### Threat Intelligence Platform

- **Examples**: MISP, ThreatConnect, Recorded Future
- **Function**: Aggregate and analyse threat data from multiple sources
- **Outputs**: IOCs (IPs, domains, hashes), TTPs (tactics, techniques, procedures)

## Python Example: Simple SIEM Log Analyser

```python
import re
from datetime import datetime
from collections import Counter
from typing import List, Dict
import json

class SimpleLogAnalyzer:
    """Basic log analyser for detecting security events."""

    def __init__(self):
        self.failed_logins = Counter()
        self.suspicious_ips = set()
        self.alerts = []

        # Simple threat intelligence (example IOCs)
        self.known_malicious_ips = {
            '203.0.113.42',  # Example malicious IP
            '198.51.100.99'
        }

        # Detection rules
        self.failed_login_threshold = 5
        self.port_scan_threshold = 20

    def parse_log_line(self, line: str) -> Dict:
        """Parse a log line into structured data."""
        # Example format: 2025-10-30 14:23:45 INFO [192.168.1.100] User admin login failed
        pattern = r'(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) (\w+) \[([^\]]+)\] (.+)'
        match = re.match(pattern, line)

        if match:
            return {
                'timestamp': datetime.strptime(match.group(1), '%Y-%m-%d %H:%M:%S'),
                'level': match.group(2),
                'source_ip': match.group(3),
                'message': match.group(4)
            }
        return None

    def detect_brute_force(self, log_entry: Dict):
        """Detect brute force login attempts."""
        if 'login failed' in log_entry['message'].lower():
            source_ip = log_entry['source_ip']
            self.failed_logins[source_ip] += 1

            if self.failed_logins[source_ip] >= self.failed_login_threshold:
                self.create_alert(
                    severity='HIGH',
                    category='Brute Force Attack',
                    description=f"Multiple failed login attempts from {source_ip}",
                    source_ip=source_ip,
                    count=self.failed_logins[source_ip]
                )

    def detect_known_malicious_ip(self, log_entry: Dict):
        """Check against threat intelligence."""
        source_ip = log_entry['source_ip']
        if source_ip in self.known_malicious_ips:
            self.create_alert(
                severity='CRITICAL',
                category='Known Malicious IP',
                description=f"Traffic from known malicious IP: {source_ip}",
                source_ip=source_ip
            )
            self.suspicious_ips.add(source_ip)

    def detect_port_scan(self, log_entry: Dict):
        """Detect potential port scanning activity."""
        if 'connection attempt' in log_entry['message'].lower():
            source_ip = log_entry['source_ip']
            # In real implementation, would track unique ports per IP
            # Simplified for demonstration
            if self.failed_logins[source_ip] > self.port_scan_threshold:
                self.create_alert(
                    severity='MEDIUM',
                    category='Port Scan',
                    description=f"Possible port scan from {source_ip}",
                    source_ip=source_ip
                )

    def create_alert(self, severity: str, category: str,
                    description: str, **kwargs):
        """Create a security alert."""
        alert = {
            'timestamp': datetime.now().isoformat(),
            'severity': severity,
            'category': category,
            'description': description,
            'details': kwargs
        }
        self.alerts.append(alert)
        print(f"[{severity}] {category}: {description}")

    def analyse_logs(self, log_lines: List[str]):
        """Analyse multiple log lines."""
        for line in log_lines:
            entry = self.parse_log_line(line)
            if entry:
                self.detect_brute_force(entry)
                self.detect_known_malicious_ip(entry)
                self.detect_port_scan(entry)

    def generate_report(self) -> str:
        """Generate security report."""
        report = "=== SOC SECURITY REPORT ===\n\n"
        report += f"Total Alerts: {len(self.alerts)}\n"
        report += f"Suspicious IPs: {len(self.suspicious_ips)}\n\n"

        # Count by severity
        severity_counts = Counter(alert['severity'] for alert in self.alerts)
        report += "Alerts by Severity:\n"
        for severity, count in severity_counts.most_common():
            report += f"  {severity}: {count}\n"

        report += "\nTop Failed Login Sources:\n"
        for ip, count in self.failed_logins.most_common(5):
            report += f"  {ip}: {count} attempts\n"

        return report

# Example usage
def soc_demo():
    """Demonstrate SOC log analysis."""
    sample_logs = [
        "2025-10-30 14:23:45 INFO [192.168.1.100] User admin login failed",
        "2025-10-30 14:23:50 INFO [192.168.1.100] User admin login failed",
        "2025-10-30 14:23:55 INFO [192.168.1.100] User admin login failed",
        "2025-10-30 14:24:00 INFO [192.168.1.100] User admin login failed",
        "2025-10-30 14:24:05 INFO [192.168.1.100] User admin login failed",
        "2025-10-30 14:24:10 INFO [203.0.113.42] User root login failed",
        "2025-10-30 14:24:15 INFO [10.0.0.50] User john login successful",
        "2025-10-30 14:24:20 WARNING [203.0.113.42] Suspicious outbound connection",
    ]

    analyzer = SimpleLogAnalyzer()
    analyzer.analyse_logs(sample_logs)

    print("\n" + analyzer.generate_report())

    # Export alerts as JSON
    with open('soc_alerts.json', 'w') as f:
        json.dump(analyzer.alerts, f, indent=2)
    print("\nAlerts exported to soc_alerts.json")

if __name__ == "__main__":
    soc_demo()
```

## SOC Metrics and KPIs

| Metric                    | Description                      | Target         |
| ------------------------- | -------------------------------- | -------------- |
| **MTTD**                  | Mean Time To Detect              | < 1 hour       |
| **MTTR**                  | Mean Time To Respond             | < 4 hours      |
| **Dwell Time**            | Time attacker remains undetected | < 24 hours     |
| **False Positive Rate**   | Alerts that aren't real threats  | < 10%          |
| **Alert Volume**          | Alerts generated per day         | Monitor trends |
| **Incident Closure Rate** | % of incidents fully resolved    | > 95%          |

## SOC Challenges

1. **Alert fatigue**: High volume of false positives overwhelms analysts
2. **Skill shortage**: Difficulty hiring experienced security professionals
3. **Tool sprawl**: Too many disparate tools without integration
4. **Sophisticated threats**: Advanced persistent threats (APTs) evade detection
5. **Resource constraints**: Limited budget and staffing

## Best Practices

- **Automate repetitive tasks**: Use SOAR to handle tier-1 activities
- **Continuous training**: Keep analysts updated on latest threats
- **Threat hunting**: Proactively search for threats, don't just react to alerts
- **Documentation**: Maintain playbooks for common incident types
- **Collaboration**: Work closely with IT, legal, and business units
- **Regular testing**: Conduct tabletop exercises and simulations

---

## References

- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [MITRE ATT&CK Framework](https://attack.mitre.org/)
- [SANS SOC Survey](https://www.sans.org/white-papers/state-of-the-soc/)
- [Building a World-Class SOC - Gartner](https://www.gartner.com/en/documents/3899373)
