---
{"publish":true,"title":"RAID","created":"2025-01-11 16:37","modified":"2025-11-03T20:43:24.520+01:00","tags":["computer-science/storage/raid"],"cssclasses":"center-images"}
---


# RAID

---

RAID (Redundant Array of Inexpensive Disks), allows to turn multiple physical hard drives into a single logical hard drive.

## Hardware RAID vs. Software RAID

RAID can be either setup using a hard drive PCIe controller or use software to create it.

### Software RAID Setup Steps

#### 1. Format Hard drives

- Find device names using `sudo fdisk -l`
- Create partition table using `sudo parted /dev/sda mklabel gpt`
- Create partition by using `sudo fdisk /dev/sda
  - Type `n` to create a new partition
  - Type `1` to create `/dev/sda1`
  - Press Enter to choose default first sector
  - Press Enter to choose default last sector (Using the whole drive)
  - Change partition type by typing `t`
  - Enter `fd` to set partition type to `Linux raid autodetect`
  - Type `p` to check the partition type
  - Type `w` to apply all changes

### Create RAID x Logical Drive

- Using `mdadm` use the following command for a RAID 1 drive.

```bash
sudo mdadm --create /dev/md0 --level=mirror --raid-devices=2 /dev/sda1 /dev/sdb1
```

- Check progress by using `cat /proc/mdstat`

### Create File System on the RAID x Logical Drive

- Format the drive using `sudo mkfs.ext4 /dev/md0`
- Mount the drive using `sudo mkdir -p /mnt/raid1 && sudo mount /dev/md0 /mnt/raid1`

## RAID Levels Comparison

| RAID Level  | Description                 | Min Drives | Usable Capacity | Fault Tolerance | Performance               |
| ----------- | --------------------------- | ---------- | --------------- | --------------- | ------------------------- |
| **RAID 0**  | Striping                    | 2          | 100%            | None            | Excellent R/W             |
| **RAID 1**  | Mirroring                   | 2          | 50%             | 1 drive         | Good read, standard write |
| **RAID 5**  | Striping with parity        | 3          | (n-1)/n         | 1 drive         | Good read, moderate write |
| **RAID 6**  | Striping with double parity | 4          | (n-2)/n         | 2 drives        | Good read, slower write   |
| **RAID 10** | Mirrored stripes            | 4          | 50%             | Multiple drives | Excellent R/W             |

## Advanced mdadm Commands

```bash
# Check RAID array status
sudo mdadm --detail /dev/md0

# Monitor RAID arrays
sudo mdadm --monitor --scan --daemonise

# Mark a disk as failed
sudo mdadm --manage /dev/md0 --fail /dev/sda1

# Remove a failed disk
sudo mdadm --manage /dev/md0 --remove /dev/sda1

# Add a new disk to array
sudo mdadm --manage /dev/md0 --add /dev/sdc1

# Stop a RAID array
sudo mdadm --stop /dev/md0

# Assemble an existing array
sudo mdadm --assemble /dev/md0 /dev/sda1 /dev/sdb1

# Save RAID configuration
sudo mdadm --detail --scan | sudo tee -a /etc/mdadm/mdadm.conf
```

## Python RAID Monitoring Script

```python
import subprocess
import re
from typing import Dict, List

def parse_mdstat() -> List[Dict[str, str]]:
    """
    Parse /proc/mdstat to get RAID array status.

    Returns:
        List of dictionaries containing RAID array information
    """
    try:
        with open('/proc/mdstat', 'r') as f:
            content = f.read()

        arrays = []
        lines = content.split('\n')

        for i, line in enumerate(lines):
            if line.startswith('md'):
                # Parse array info
                parts = line.split()
                array_info = {
                    'device': parts[0],
                    'status': parts[2] if len(parts) > 2 else 'unknown',
                    'type': parts[3] if len(parts) > 3 else 'unknown'
                }

                # Check next line for health status
                if i + 1 < len(lines):
                    next_line = lines[i + 1]
                    if '[UU]' in next_line:
                        array_info['health'] = 'healthy'
                    elif '[U_]' in next_line or '[_U]' in next_line:
                        array_info['health'] = 'degraded'
                    else:
                        array_info['health'] = 'unknown'

                arrays.append(array_info)

        return arrays

    except FileNotFoundError:
        print("No RAID arrays found (/proc/mdstat not available)")
        return []
    except Exception as e:
        print(f"Error parsing RAID status: {e}")
        return []

def get_raid_details(device: str) -> Dict[str, str]:
    """Get detailed information about a RAID array."""
    try:
        result = subprocess.run(
            ['sudo', 'mdadm', '--detail', device],
            capture_output=True,
            text=True,
            check=True
        )

        details = {}
        for line in result.stdout.split('\n'):
            if ':' in line:
                key, value = line.split(':', 1)
                details[key.strip()] = value.strip()

        return details

    except subprocess.CalledProcessError as e:
        print(f"Error getting RAID details: {e}")
        return {}

# Example usage
if __name__ == "__main__":
    print("RAID Array Status:\n")

    for array in parse_mdstat():
        print(f"Device: {array['device']}")
        print(f"  Type: {array.get('type', 'unknown')}")
        print(f"  Status: {array.get('status', 'unknown')}")
        print(f"  Health: {array.get('health', 'unknown')}")
        print()
```

## Performance Considerations

**Read Performance:**

- RAID 0, 10: Best (data striped across multiple drives)
- RAID 1: Good (can read from multiple mirrors)
- RAID 5, 6: Good (striped reads)

**Write Performance:**

- RAID 0, 10: Best (parallel writes)
- RAID 1: Moderate (must write to all mirrors)
- RAID 5: Moderate (parity calculations)
- RAID 6: Slower (double parity calculations)

**Rebuild Time:**

- RAID 1: Fastest
- RAID 5: Moderate
- RAID 6: Slowest (more parity to rebuild)

---

## References

- [RAID - Wikipedia](https://en.wikipedia.org/wiki/RAID)
- [Linux RAID Wiki](https://raid.wiki.kernel.org/)
- [mdadm Manual Page](https://linux.die.net/man/8/mdadm)
