---
{"publish":true,"title":"Digital Forensics","created":"2025-08-23 15:37","modified":"2025-11-03T20:45:50.403+01:00","tags":[null],"cssclasses":"center-images"}
---


# DIGITAL FORENSICS

---

Forensics is the application of science to investigate crimes and establish facts. With the use and spread of digital systems, such as computers and smartphones, a new branch of forensics was born to investigate related crimes: computer forensics, which later evolved into *digital forensics*.

In defensive security, the focus of digital forensics shifts to analyzing evidence of an attack and its perpetrators and other areas such as intellectual property theft, cyber espionage, and possession of unauthorized content. Consequently, digital forensics will focus on different areas, such as:

- **File System:** Analyzing a digital forensics image (low-level copy) of a system’s storage reveals much information, such as installed programs, created files, partially overwritten files, and deleted files.

- **System memory:** If the attacker runs their malicious program in memory without saving it to the disk, taking a forensic image (low-level copy) of the system memory is the best way to analyze its contents and learn about the attack.

- **System logs:** Each client and server computer maintains different log files about what is happening. Log files provide plenty of information about what happened on a system. Even if the attacker tries to clear their traces, some traces will remain.

- **Network logs:** Logs of the network packets that have traversed a network would help answer more questions about whether an attack is occurring and what it entails.

## Forensic Process

Digital forensics follows a structured methodology to ensure evidence integrity:

1. **Identification**: Recognising potential sources of relevant digital evidence
2. **Preservation**: Creating forensic images and documenting the scene
3. **Collection**: Gathering data using forensically sound methods
4. **Analysis**: Examining data to find evidence and reconstruct events
5. **Documentation**: Recording all findings and methodologies used
6. **Presentation**: Reporting findings in a clear, legally admissible format

## Key Principles

- **Chain of custody**: Maintaining detailed records of evidence handling
- **Write protection**: Preventing modification of original evidence
- **Hashing**: Using MD5/SHA checksums to verify data integrity
- **Repeatability**: Ensuring analysis can be independently verified

## Common Tools

- **Autopsy/Sleuth Kit**: Open-source digital forensics platform
- **FTK (Forensic Toolkit)**: Comprehensive forensic analysis suite
- **EnCase**: Industry-standard forensic investigation tool
- **Volatility**: Memory forensics framework
- **Wireshark**: Network traffic analysis
- **dd/dc3dd**: Creating forensic disk images

## Forensic File Carving

Recovering deleted files by searching for file headers and footers:

```bash
# Example using foremost
foremost -i disk.img -o recovered_files/

# Example using scalpel
scalpel disk.img -o carved_output/
```

## Timeline Analysis

Reconstructing events based on timestamps:

- **MAC times**: Modified, Accessed, Changed timestamps
- **File system journals**: Transaction logs
- **Application logs**: Browser history, email timestamps
- **Registry analysis** (Windows): User activity tracking

## Challenges

- **Anti-forensics techniques**: Data wiping, encryption, steganography
- **Cloud storage**: Distributed data, jurisdiction issues
- **Mobile devices**: Diverse platforms, encryption, app sandboxing
- **Volume of data**: Big data analysis, storage constraints

---

## References

- [Digital Forensics - NIST](https://www.nist.gov/digital-forensics)
- [The Sleuth Kit & Autopsy](https://www.sleuthkit.org/)
- [SANS Digital Forensics](https://www.sans.org/digital-forensics-incident-response/)
